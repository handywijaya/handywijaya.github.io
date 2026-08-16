import {
  MAX_LINE_LENGTH,
  categorize,
  parseStatementText,
  toCsv,
  toEnglishDate,
  toNumber,
  toTsv
} from './parser'

describe('toEnglishDate', () => {
  it('translates Indonesian month abbreviations', () => {
    expect(toEnglishDate('1-AGU')).toBe('1-AUG')
    expect(toEnglishDate('12-AGS')).toBe('12-AUG')
    expect(toEnglishDate('12-AGT')).toBe('12-AUG')
    expect(toEnglishDate('05-MEI')).toBe('05-MAY')
    expect(toEnglishDate('30-OKT')).toBe('30-OCT')
    expect(toEnglishDate('09-NOP')).toBe('09-NOV')
    expect(toEnglishDate('25-DES')).toBe('25-DEC')
  })

  it('passes English and unknown months through, uppercased', () => {
    expect(toEnglishDate('02-jun')).toBe('02-JUN')
    expect(toEnglishDate('02-ZZZ')).toBe('02-ZZZ')
    expect(toEnglishDate('02/06')).toBe('02/06')
  })
})

describe('toNumber', () => {
  it('strips thousand separators', () => {
    expect(toNumber('319.600', '')).toBe('319600')
    expect(toNumber('1.234.567', '')).toBe('1234567')
    expect(toNumber('600', '')).toBe('600')
  })

  it('keeps the Indonesian decimal comma as a decimal point', () => {
    expect(toNumber('1.234.567,89', '')).toBe('1234567.89')
    expect(toNumber('10,98', '')).toBe('10.98')
  })

  it('makes CR entries negative, DB entries positive', () => {
    expect(toNumber('319.600', 'CR')).toBe('-319600')
    expect(toNumber('319.600', 'cr')).toBe('-319600')
    expect(toNumber('319.600', 'DB')).toBe('319600')
  })
})

describe('categorize', () => {
  it('applies the first matching rule', () => {
    expect(categorize('PEMBAYARAN - THANK YOU')).toBe('Payment')
    expect(categorize('CICILAN 3/12 TOKO ABC')).toBe('Installment')
    expect(categorize('BEA METERAI')).toBe('Fee')
    expect(categorize('SPBU PERTAMINA 3411')).toBe('Fuel')
    expect(categorize('STARBUCKS GRAND INDONESIA')).toBe('Food & Dining')
    expect(categorize('INDOMARET CIPUTAT')).toBe('Groceries')
    expect(categorize('NETFLIX.COM')).toBe('Entertainment & Digital')
    expect(categorize('SHOPEE INDONESIA')).toBe('Online Shopping')
  })

  it('leaves Grab and Gojek blank on purpose', () => {
    expect(categorize('GRAB* A-1B2C3D')).toBe('')
    expect(categorize('GOJEK JAKARTA')).toBe('')
  })

  it('falls back to Other', () => {
    expect(categorize('SOME UNKNOWN MERCHANT')).toBe('Other')
  })

  it('matches regardless of case', () => {
    expect(categorize('Starbucks Grand Indonesia')).toBe('Food & Dining')
  })
})

describe('parseStatementText', () => {
  const statement = [
    'KARTU KREDIT BCA',
    'TANGGAL TANGGAL KETERANGAN JUMLAH',
    'TRANSAKSI PEMBUKUAN',
    '02-JUN 04-JUN STARBUCKS JAKARTA ID 65.000',
    '03-JUN 05-JUN NETFLIX.COM SINGAPORE SG 186.000',
    '(USD 10,98 X 17.079,33)',
    '05-JUN 06-JUN PEMBAYARAN VIA BCA 1.500.000 CR',
    '10-AGU 11-AGU GRAB* TRIP JAKARTA ID 43.500'
  ].join('\n')

  it('reads the BCA two-date layout', () => {
    expect(parseStatementText(statement)).toEqual([
      {
        date: '02-JUN',
        description: 'STARBUCKS JAKARTA ID',
        amount: '65000',
        category: 'Food & Dining'
      },
      {
        date: '03-JUN',
        description: 'NETFLIX.COM SINGAPORE SG (USD 10,98 X 17.079,33)',
        amount: '186000',
        category: 'Entertainment & Digital'
      },
      {
        date: '05-JUN',
        description: 'PEMBAYARAN VIA BCA',
        amount: '-1500000',
        category: 'Payment'
      },
      {
        date: '10-AUG',
        description: 'GRAB* TRIP JAKARTA ID',
        amount: '43500',
        category: ''
      }
    ])
  })

  it('drops the payment that settles the previous balance', () => {
    const text = [
      'SALDO SEBELUMNYA 1.500.000',
      '05-JUN 06-JUN PEMBAYARAN VIA BCA 1.500.000 CR',
      '06-JUN 07-JUN PEMBAYARAN VIA BCA 1.500.000 CR',
      '07-JUN 08-JUN STARBUCKS JAKARTA ID 65.000'
    ].join('\n')

    const rows = parseStatementText(text)
    // Only the first matching payment is removed.
    expect(rows.map((row) => row.date)).toEqual(['06-JUN', '07-JUN'])
  })

  it('keeps payments whose amount differs from the previous balance', () => {
    const text = [
      'SALDO SEBELUMNYA 1.500.000',
      '05-JUN 06-JUN PEMBAYARAN VIA BCA 900.000 CR'
    ].join('\n')

    expect(parseStatementText(text)).toHaveLength(1)
  })

  it('falls back to single-date lines when no two-date line exists', () => {
    const text = ['02/06 MERCHANT ABC 100.000', '03/06 KFC BINTARO 55.000'].join(
      '\n'
    )

    expect(parseStatementText(text)).toEqual([
      {
        date: '02/06',
        description: 'MERCHANT ABC',
        amount: '100000',
        category: 'Other'
      },
      {
        date: '03/06',
        description: 'KFC BINTARO',
        amount: '55000',
        category: 'Food & Dining'
      }
    ])
  })

  it('prefers two-date lines and ignores single-date noise', () => {
    const text = [
      '02-JUN 04-JUN STARBUCKS JAKARTA ID 65.000',
      '02/06 SOME FOOTER 1.000'
    ].join('\n')

    expect(parseStatementText(text)).toHaveLength(1)
  })

  it('ignores headers, totals and blank lines', () => {
    expect(parseStatementText('TOTAL TAGIHAN\n\nLEMBAR 1 DARI 2')).toEqual([])
  })

  it('handles CRLF line endings', () => {
    const text = '02-JUN 04-JUN STARBUCKS JAKARTA ID 65.000\r\n'
    expect(parseStatementText(text)).toHaveLength(1)
  })

  it('skips absurdly long lines instead of running the regexes on them', () => {
    const long = `02-JUN 04-JUN ${'A'.repeat(MAX_LINE_LENGTH)} 65.000`
    const started = Date.now()
    expect(parseStatementText(long)).toEqual([])
    expect(Date.now() - started).toBeLessThan(1000)
  })

  it('returns nothing for text that holds no transactions', () => {
    expect(parseStatementText('')).toEqual([])
  })
})

describe('toCsv / toTsv', () => {
  const rows = parseStatementText(
    '02-JUN 04-JUN STARBUCKS, JAKARTA "ID" 65.000\n03-JUN 05-JUN KFC 55.000'
  )

  it('writes CSV without a header row, quoting only when needed', () => {
    expect(toCsv(rows)).toBe(
      '02-JUN,"STARBUCKS, JAKARTA ""ID""",65000,Food & Dining\n' +
        '03-JUN,KFC,55000,Food & Dining'
    )
  })

  it('writes TSV for pasting into a spreadsheet', () => {
    expect(toTsv(rows)).toBe(
      '02-JUN\tSTARBUCKS, JAKARTA "ID"\t65000\tFood & Dining\n' +
        '03-JUN\tKFC\t55000\tFood & Dining'
    )
  })

  it('produces empty output for no rows', () => {
    expect(toCsv([])).toBe('')
    expect(toTsv([])).toBe('')
  })
})
