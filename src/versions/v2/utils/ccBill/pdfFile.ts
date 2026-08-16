/**
 * Browser-side file handling for the statement converter, free of pdf.js so it
 * can be unit-tested: reading the picked file, rejecting anything that is not a
 * PDF, and rebuilding text lines out of positioned PDF text fragments.
 */

/** Statements are a few hundred KB; anything larger is not one of ours. */
export const MAX_FILE_BYTES = 20 * 1024 * 1024

const PDF_MAGIC = '%PDF-'

/** Two text fragments closer than this (PDF units) belong to the same word. */
const SAME_WORD_GAP = 1

/** Text fragments within this vertical distance are on the same line. */
const SAME_LINE_TOLERANCE = 2

/** Wrong or missing PDF password. */
export class PdfPasswordError extends Error {}

/** Unreadable file: not a PDF, empty, too large, or corrupt. */
export class PdfFileError extends Error {}

export const readFileAsBytes = (file: File): Promise<Uint8Array> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new PdfFileError('Could not read the file.'))
    reader.onload = () => resolve(new Uint8Array(reader.result as ArrayBuffer))
    reader.readAsArrayBuffer(file)
  })

/** Reject anything that is not a PDF before handing bytes to the parser. */
export const assertLooksLikePdf = (file: File, bytes: Uint8Array): void => {
  if (bytes.byteLength === 0) throw new PdfFileError('The file is empty.')
  if (bytes.byteLength > MAX_FILE_BYTES) {
    throw new PdfFileError(
      `The file is larger than ${MAX_FILE_BYTES / (1024 * 1024)} MB.`
    )
  }

  const header = Array.from(bytes.slice(0, PDF_MAGIC.length))
    .map((byte) => String.fromCharCode(byte))
    .join('')
  if (header !== PDF_MAGIC) {
    throw new PdfFileError(`'${file.name}' is not a PDF file.`)
  }
}

/** The part of pdf.js' TextItem this module needs. */
export interface PdfTextItem {
  str: string
  width: number
  /** [a, b, c, d, x, y] — only the x/y translation is used here. */
  transform: number[]
}

/**
 * Rebuild visual lines out of pdf.js text fragments.
 *
 * pdf.js returns positioned fragments, not lines, so group them by their
 * baseline (y) and join left to right, inserting a space wherever the
 * horizontal gap is wider than the gap inside a single word.
 */
export const itemsToLines = (items: PdfTextItem[]): string[] => {
  const lines = new Map<number, PdfTextItem[]>()

  items.forEach((item) => {
    if (!item.str) return
    const key = Math.round(item.transform[5] / SAME_LINE_TOLERANCE)
    const line = lines.get(key)
    if (line) line.push(item)
    else lines.set(key, [item])
  })

  return Array.from(lines.entries())
    .sort(([a], [b]) => b - a) // top of the page first
    .map(([, lineItems]) =>
      lineItems
        .sort((a, b) => a.transform[4] - b.transform[4])
        .reduce((text, item, index, sorted) => {
          if (index === 0) return item.str
          const previous = sorted[index - 1]
          const gap =
            item.transform[4] - (previous.transform[4] + previous.width)
          return gap > SAME_WORD_GAP ? `${text} ${item.str}` : text + item.str
        }, '')
        .trim()
    )
    .filter((line) => line.length > 0)
}
