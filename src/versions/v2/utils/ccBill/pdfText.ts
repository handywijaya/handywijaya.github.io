/**
 * Password-protected PDF -> plain text, entirely in the browser.
 *
 * The statement never leaves the device: the file is read with FileReader and
 * decoded by pdf.js in a same-origin web worker. Nothing is uploaded, stored or
 * logged, and the options below keep a malicious PDF from doing more than
 * failing to parse.
 */
import {
  getDocument,
  GlobalWorkerOptions
} from 'pdfjs-dist/legacy/build/pdf.mjs'

import {
  PdfFileError,
  PdfPasswordError,
  PdfTextItem,
  itemsToLines
} from './pdfFile'

/** Bounds the work a crafted PDF can ask for. */
export const MAX_PAGES = 100

/** pdf.js runs its parser in a worker; serve it from our own origin (never a
 *  CDN) so the code that touches the statement is the code we deployed. */
GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.min.js`

const isPasswordException = (error: unknown): boolean =>
  typeof error === 'object' &&
  error !== null &&
  (error as { name?: string }).name === 'PasswordException'

/**
 * Decrypt `bytes` with `password` and return the text of every page.
 *
 * Throws `PdfPasswordError` for a wrong/missing password and `PdfFileError` for
 * a file pdf.js cannot read.
 */
export const extractPdfText = async (
  bytes: Uint8Array,
  password: string
): Promise<string> => {
  const task = getDocument({
    data: bytes,
    password,
    // A malicious PDF must not be able to run code or pull in remote resources.
    enableXfa: false, // no XFA forms (their own scripting surface)
    disableFontFace: true, // no @font-face injected into the page
    useSystemFonts: false, // no local font probing
    useWorkerFetch: false, // worker performs no network requests
    useWasm: false, // no WebAssembly module fetched or instantiated
    disableAutoFetch: true,
    stopAtErrors: false,
    verbosity: 0 // keep statement content out of the console
  })

  let doc
  try {
    doc = await task.promise
  } catch (error) {
    if (isPasswordException(error)) {
      throw new PdfPasswordError('Wrong password, or unsupported encryption.')
    }
    throw new PdfFileError('This file could not be read as a PDF.')
  }

  try {
    const pageCount = Math.min(doc.numPages, MAX_PAGES)
    const pages: string[] = []
    for (let pageNumber = 1; pageNumber <= pageCount; pageNumber += 1) {
      // Sequential on purpose: pages share one worker, and a statement is small.
      // eslint-disable-next-line no-await-in-loop
      const page = await doc.getPage(pageNumber)
      // eslint-disable-next-line no-await-in-loop
      const content = await page.getTextContent()
      pages.push(itemsToLines(content.items as PdfTextItem[]).join('\n'))
      page.cleanup()
    }
    return pages.join('\n')
  } finally {
    // Tears down the worker and drops the decrypted document from memory.
    await task.destroy()
  }
}
