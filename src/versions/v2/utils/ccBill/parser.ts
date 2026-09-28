/**
 * Credit card e-statement (BCA layout) text -> transaction rows.
 *
 * Pure text in / rows out: no PDF, DOM or network here so the rules can be
 * unit-tested directly. PDF decryption + text extraction lives in `pdfText.ts`.
 *
 * Port of cc_bill2csv.py (Scripts/cc-bill2csv).
 */

export interface Transaction {
  date: string
  description: string
  amount: string
  category: string
}

/** Longer lines are ignored: a statement line is never this long, and feeding
 *  huge lines to the backtracking regexes below is a cheap DoS. */
export const MAX_LINE_LENGTH = 400

/** Upper bound on parsed lines, guards against a crafted PDF with a huge page. */
export const MAX_LINES = 20000

// BCA-style line: transaction date + posting date + description + amount [+ CR/DB]
const TWO_DATE_RE =
  /^\s*(\d{1,2}-[A-Za-z]{3})\s+(\d{1,2}-[A-Za-z]{3})\s+(.+?)\s+(\d{1,3}(?:[.,]\d{3})*(?:,\d{2})?)\s*(CR|DB|DR)?\s*$/i

// Generic single-date line: "02/06 MERCHANT 100.000 [CR]"
const ONE_DATE_RE =
  /^\s*(\d{1,2}[/-]\d{1,2}(?:[/-]\d{2,4})?)\s+(.+?)\s+(\d{1,3}(?:[.,]\d{3})*(?:,\d{2})?)\s*(CR|DB|DR)?\s*$/i

// Continuation line carrying FX or other detail, e.g. "(USD 10,98 X 17.079,33)"
const CONTINUATION_RE = /^\s*\(.+\)\s*$/

// Previous-month balance line, e.g. "SALDO SEBELUMNYA 13.654.202"
const SALDO_RE = /SALDO SEBELUMNYA\s+(\d{1,3}(?:[.,]\d{3})*(?:,\d{2})?)/i

/**
 * Indonesian month abbreviations as printed on the statement -> English.
 * Variants exist across issuers (AGS/AGT for August, NOP for November).
 */
const MONTH_ID_TO_EN: Record<string, string> = {
  MEI: 'MAY',
  AGU: 'AUG',
  AGS: 'AUG',
  AGT: 'AUG',
  OKT: 'OCT',
  NOP: 'NOV',
  DES: 'DEC'
}

/** Ordered rules — first match wins, no match -> `Other`. */
const CATEGORY_RULES: Array<[RegExp, string]> = [
  [/PEMBAYARAN/i, 'Payment'],
  [/CICILAN/i, 'Installment'],
  [/BEA METERAI|IURAN TAHUNAN|BIAYA ADM|BUNGA|DENDA|ADMIN FEE/i, 'Fee'],
  [/SPBU|PERTAMINA|SHELL |VIVO ENERGY|BP-AKR/i, 'Fuel'],
  // Grab/Gojek left blank: the same merchant name covers both rides and food,
  // so the category is filled in manually.
  [/GRAB\*|GOJEK/i, ''],
  [/BLUE ?BIRD|TRANSJAKARTA|MRT |RAILINK/i, 'Transport'],
  [
    /KERETA API|TIKET\.COM|TRAVELOKA|GARUDA|CITILINK|AIRASIA|LION ?AIR|BATIK ?AIR|WHOOSH|KAI /i,
    'Travel'
  ],
  [/BOBOBOX|HOTEL|NOVOTEL|IBIS |ASTON |REDDOORZ|OYO |AIRBNB/i, 'Accommodation'],
  [
    /SHOPEEFOOD|GOFOOD|GRABFOOD|MCD|KFC|STARBUCKS|RESTO|RAMEN|SUSHI|CURRY|GRILL|CAFE|COFFEE|BAKERY|BAKESHOPPE|BAKPIA|JUICE|SHAKE|KIMUKATSU|EMPAL|WARUNG|SATE|BAKSO|PIZZA|BURGER|DONUT|ROTI/i,
    'Food & Dining'
  ],
  [
    /SUPERINDO|INDOMARET|ALFAMART|TRANSMART|HYPERMART|CARREFOUR|ASTRO \*|FARMERS? MARKET|GROCER/i,
    'Groceries'
  ],
  [
    /APOTEK|K24|PHARMA|KLINIK|LAB |PRAMITA|DENTAL|OBGYN|RUMAH SAKIT|HOSPITAL|DOKTER/i,
    'Health'
  ],
  [
    /XXI|CGV|CINEPOLIS|CINEMA|NETFLIX|SPOTIFY|DISNEY|VIDIO|HBO|YOUTUBE|STEAM|PLAYSTATION|NINTENDO|GOOGLE ?\*?|PAYPAL \*|APPLE\.COM|ITUNES/i,
    'Entertainment & Digital'
  ],
  [
    /BIZNET|INDIHOME|FIRSTMEDIA|MYREPUBLIC|TELKOMSEL|XL ?AXIATA|INDOSAT|PLN|PDAM|TOKEN LISTRIK/i,
    'Utilities & Internet'
  ],
  [/GOPAY|OVO|DANA |SHOPEEPAY|E-?WALLET|TOPUP|TOP UP/i, 'E-Wallet Top-up'],
  [
    /SHOPEE|TOKOPEDIA|TTS BY TKPD|BLIBLI|LAZADA|ZALORA|AMAZON|ALIEXPRESS/i,
    'Online Shopping'
  ]
]

/** '1-AGU' -> '1-AUG'. Months already English (or unknown) pass through. */
export const toEnglishDate = (date: string): string => {
  const upper = date.toUpperCase()
  const separator = upper.indexOf('-')
  if (separator === -1) return upper

  const day = upper.slice(0, separator)
  const month = upper.slice(separator + 1)
  return `${day}-${MONTH_ID_TO_EN[month] || month}`
}

export const categorize = (description: string): string => {
  const rule = CATEGORY_RULES.find(([pattern]) => pattern.test(description))
  return rule ? rule[1] : 'Other'
}

/** '1.234.567,89' -> '-1234567.89' when marked CR, else '1234567.89'. */
export const toNumber = (amount: string, creditMarker: string): string => {
  const value = /,\d{2}$/.test(amount)
    ? amount.replace(/\./g, '').replace(',', '.') // Indonesian decimal comma
    : amount.replace(/[.,]/g, '')

  return creditMarker.toUpperCase() === 'CR' ? `-${value}` : value
}

/**
 * Extract transactions from the statement's raw text.
 *
 * Tries the BCA two-date format first and falls back to generic single-date
 * lines only when that finds nothing. A parenthesized line right after a
 * transaction (FX conversion detail) is appended to its description.
 */
export const parseStatementText = (text: string): Transaction[] => {
  const twoDateRows: string[][] = []
  const oneDateRows: string[][] = []

  const saldoMatch = SALDO_RE.exec(text)
  const saldoSebelumnya = saldoMatch ? toNumber(saldoMatch[1], '') : null

  const lines = text.split('\n', MAX_LINES)
  lines.forEach((rawLine) => {
    const line = rawLine.replace(/\r$/, '')
    console.log('line', line)
    if (line.length > MAX_LINE_LENGTH) return

    const twoDate = TWO_DATE_RE.exec(line)
    if (twoDate) {
      const [, date, , description, amount, marker] = twoDate
      twoDateRows.push([
        toEnglishDate(date),
        description.trim(),
        amount,
        marker || ''
      ])
      return
    }

    if (twoDateRows.length > 0 && CONTINUATION_RE.test(line)) {
      twoDateRows[twoDateRows.length - 1][1] += ` ${line.trim()}`
      return
    }

    const oneDate = ONE_DATE_RE.exec(line)
    if (oneDate) {
      const [, date, description, amount, marker] = oneDate
      oneDateRows.push([date, description.trim(), amount, marker || ''])
    }
  })

  const raw = twoDateRows.length > 0 ? twoDateRows : oneDateRows
  const rows: Transaction[] = raw.map(
    ([date, description, amount, marker]) => ({
      date,
      description,
      amount: toNumber(amount, marker),
      category: categorize(description)
    })
  )

  // Drop the payment that settles the previous month's balance (amount equal
  // to SALDO SEBELUMNYA) — it belongs to last month's statement. Only the
  // first such row is removed, in case another payment has the same amount.
  if (saldoSebelumnya !== null) {
    const index = rows.findIndex(
      (row) =>
        row.description.toUpperCase().includes('PEMBAYARAN') &&
        row.amount === `-${saldoSebelumnya}`
    )
    if (index !== -1) rows.splice(index, 1)
  }

  return rows
}

const toFields = (row: Transaction): string[] => [
  row.date,
  row.description,
  row.amount,
  row.category
]

/** Minimal RFC 4180 quoting, matching Python's csv.writer defaults. */
const quoteCsvField = (field: string): string =>
  /[",\r\n]/.test(field) ? `"${field.replace(/"/g, '""')}"` : field

/** No header row, columns: date, description, amount, category. */
export const toCsv = (rows: Transaction[]): string =>
  rows.map((row) => toFields(row).map(quoteCsvField).join(',')).join('\n')

/** Tab-separated: pasting into Excel/Sheets lands one column per field.
 *  Tabs inside a field would shift columns, so they are collapsed to a space. */
export const toTsv = (rows: Transaction[]): string =>
  rows
    .map((row) =>
      toFields(row)
        .map((field) => field.replace(/[\t\r\n]+/g, ' '))
        .join('\t')
    )
    .join('\n')
