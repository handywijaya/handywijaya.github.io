import React, { useCallback, useEffect, useRef, useState } from 'react'

import {
  Transaction,
  parseStatementText,
  toCsv,
  toTsv
} from '../../utils/ccBill/parser'
import {
  MAX_FILE_BYTES,
  assertLooksLikePdf,
  readFileAsBytes
} from '../../utils/ccBill/pdfFile'
import { extractPdfText } from '../../utils/ccBill/pdfText'

type OutputFormat = 'csv' | 'tsv'

const COPY_FEEDBACK_MS = 1600

const copyText = async (text: string): Promise<boolean> => {
  try {
    // Only available on secure origins; the fallback covers plain http.
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    // fall through to the legacy path
  }

  try {
    const helper = document.createElement('textarea')
    helper.value = text
    helper.setAttribute('readonly', '')
    helper.style.position = 'fixed'
    helper.style.opacity = '0'
    document.body.appendChild(helper)
    helper.select()
    const copied = document.execCommand('copy')
    document.body.removeChild(helper)
    return copied
  } catch {
    return false
  }
}

const Converter: React.FC = () => {
  const [fileName, setFileName] = useState('')
  const [password, setPassword] = useState('')
  const [format, setFormat] = useState<OutputFormat>('csv')
  const [rows, setRows] = useState<Transaction[] | null>(null)
  const [error, setError] = useState('')
  const [isBusy, setIsBusy] = useState(false)
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>(
    'idle'
  )

  const fileRef = useRef<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(
    () => () => {
      if (copyTimer.current) clearTimeout(copyTimer.current)
    },
    []
  )

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]
    fileRef.current = file || null
    setFileName(file ? file.name : '')
    setRows(null)
    setError('')
  }

  const handleConvert = async (event: React.FormEvent) => {
    event.preventDefault()
    const file = fileRef.current
    if (!file) {
      setError('Choose a statement PDF first.')
      return
    }

    setIsBusy(true)
    setError('')
    setRows(null)
    try {
      const bytes = await readFileAsBytes(file)
      assertLooksLikePdf(file, bytes)
      const text = await extractPdfText(bytes, password)
      const transactions = parseStatementText(text)
      if (transactions.length === 0) {
        setError(
          'No transactions found. The PDF may be a scan (needs OCR) or use a layout this tool does not recognise.'
        )
        return
      }
      setRows(transactions)
      // The password is only needed for this one conversion.
      setPassword('')
    } catch (caught) {
      // PdfPasswordError / PdfFileError carry a message meant for the user.
      setError(caught instanceof Error ? caught.message : 'Conversion failed.')
    } finally {
      setIsBusy(false)
    }
  }

  const handleReset = () => {
    fileRef.current = null
    if (fileInputRef.current) fileInputRef.current.value = ''
    setFileName('')
    setPassword('')
    setRows(null)
    setError('')
    setCopyState('idle')
  }

  const output = rows ? (format === 'csv' ? toCsv(rows) : toTsv(rows)) : ''

  const handleCopy = useCallback(async () => {
    if (!output) return
    const copied = await copyText(output)
    setCopyState(copied ? 'copied' : 'failed')
    if (copyTimer.current) clearTimeout(copyTimer.current)
    copyTimer.current = setTimeout(() => setCopyState('idle'), COPY_FEEDBACK_MS)
  }, [output])

  return (
    <div className="flex flex-1 flex-col px-5 py-10 md:px-8">
      <div className="mx-auto w-full max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
          Credit Card Bill to CSV
        </h1>
        <p className="mt-3 text-neutral-500">
          Turns a password-protected credit card e-statement (BCA layout) into
          rows of <em>date, description, amount, category</em>.
        </p>
        <p className="mt-2 text-sm text-neutral-500">
          Everything runs in this browser tab. The PDF and its password are
          never uploaded, stored, or logged — reload the page and they are gone.
        </p>

        <form
          onSubmit={handleConvert}
          className="mt-8 flex flex-col gap-5 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm md:p-6"
        >
          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-neutral-800">
              Statement PDF
            </span>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf,.pdf"
              onChange={handleFileChange}
              className="block w-full cursor-pointer rounded-lg border border-neutral-200 p-2 text-sm text-neutral-700 file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-neutral-900 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-neutral-800"
            />
            <span className="text-xs text-neutral-400">
              PDF only, up to {MAX_FILE_BYTES / (1024 * 1024)} MB.
            </span>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-neutral-800">
              PDF password
            </span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              placeholder="Leave empty if the PDF is not protected"
              className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-900 outline-none focus:border-neutral-900"
            />
          </label>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={isBusy || !fileName}
              className="rounded-full bg-neutral-900 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-300"
            >
              {isBusy ? 'Converting…' : 'Convert'}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="rounded-full border border-neutral-300 px-5 py-2 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-100"
            >
              Clear
            </button>
          </div>

          {error && (
            <p role="alert" className="text-sm font-medium text-red-600">
              {error}
            </p>
          )}
        </form>

        {rows && (
          <section className="mt-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-neutral-900">
                {rows.length} transaction{rows.length === 1 ? '' : 's'}
              </h2>
              <div className="flex items-center gap-2">
                {(['csv', 'tsv'] as OutputFormat[]).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setFormat(option)}
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors ${
                      format === option
                        ? 'bg-neutral-900 text-white'
                        : 'border border-neutral-300 text-neutral-600 hover:bg-neutral-100'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <p className="mt-2 text-sm text-neutral-500">
              Click the box below to copy everything.{' '}
              {format === 'tsv'
                ? 'Tab-separated: pasting into Excel or Sheets lands one column per field.'
                : 'Comma-separated, no header row.'}
            </p>

            <textarea
              readOnly
              value={output}
              onClick={handleCopy}
              onFocus={(event) => event.target.select()}
              title="Click to copy"
              aria-label={`Converted ${format.toUpperCase()} output. Click to copy.`}
              className="mt-3 h-80 w-full cursor-pointer resize-y rounded-2xl border border-neutral-200 bg-neutral-50 p-4 font-mono text-xs leading-relaxed text-neutral-800 outline-none focus:border-neutral-900"
            />

            <p
              aria-live="polite"
              className={`mt-2 text-sm font-medium ${
                copyState === 'failed' ? 'text-red-600' : 'text-green-600'
              }`}
            >
              {copyState === 'copied' && 'Copied to clipboard.'}
              {copyState === 'failed' &&
                'Could not copy — select the text and copy manually.'}
              {copyState === 'idle' && ' '}
            </p>
          </section>
        )}
      </div>
    </div>
  )
}

export default Converter
