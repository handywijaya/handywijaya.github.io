import {
  MAX_FILE_BYTES,
  PdfFileError,
  assertLooksLikePdf,
  itemsToLines,
  readFileAsBytes
} from './pdfFile'

const pdfBytes = (extra = 0): Uint8Array => {
  const bytes = new Uint8Array(5 + extra)
  bytes.set([0x25, 0x50, 0x44, 0x46, 0x2d]) // %PDF-
  return bytes
}

const fileNamed = (name: string): File => ({ name }) as File

const item = (str: string, x: number, y: number, width: number) => ({
  str,
  width,
  transform: [1, 0, 0, 1, x, y]
})

describe('assertLooksLikePdf', () => {
  it('accepts a file starting with the PDF magic bytes', () => {
    expect(() =>
      assertLooksLikePdf(fileNamed('statement.pdf'), pdfBytes(100))
    ).not.toThrow()
  })

  it('rejects a file that is not a PDF, whatever it is named', () => {
    const notPdf = new Uint8Array([0x50, 0x4b, 0x03, 0x04, 0x00, 0x00])
    expect(() => assertLooksLikePdf(fileNamed('statement.pdf'), notPdf)).toThrow(
      PdfFileError
    )
    expect(() =>
      assertLooksLikePdf(fileNamed('statement.pdf'), notPdf)
    ).toThrow("'statement.pdf' is not a PDF file.")
  })

  it('rejects an empty file', () => {
    expect(() =>
      assertLooksLikePdf(fileNamed('empty.pdf'), new Uint8Array(0))
    ).toThrow('The file is empty.')
  })

  it('rejects a file over the size limit', () => {
    expect(() =>
      assertLooksLikePdf(
        fileNamed('huge.pdf'),
        pdfBytes(MAX_FILE_BYTES) // one byte over the limit
      )
    ).toThrow('The file is larger than 20 MB.')
  })

  it('accepts a file exactly on the limit', () => {
    expect(() =>
      assertLooksLikePdf(fileNamed('big.pdf'), pdfBytes(MAX_FILE_BYTES - 5))
    ).not.toThrow()
  })
})

describe('readFileAsBytes', () => {
  it('reads a Blob into bytes', async () => {
    const file = new File([new Uint8Array([1, 2, 3])], 'statement.pdf')
    await expect(readFileAsBytes(file)).resolves.toEqual(
      new Uint8Array([1, 2, 3])
    )
  })
})

describe('itemsToLines', () => {
  it('groups fragments by baseline and orders them left to right', () => {
    const lines = itemsToLines([
      item('65.000', 420, 700, 30),
      item('02-JUN', 50, 700, 30),
      item('STARBUCKS', 150, 700, 50),
      item('second line', 50, 686, 40)
    ])

    expect(lines).toEqual(['02-JUN STARBUCKS 65.000', 'second line'])
  })

  it('joins fragments of one word without inserting a space', () => {
    // "STAR" ends at x=170, "BUCKS" starts there: same word.
    expect(itemsToLines([item('STAR', 150, 700, 20), item('BUCKS', 170, 700, 25)]))
      .toEqual(['STARBUCKS'])
  })

  it('treats slightly different baselines as the same line', () => {
    expect(
      itemsToLines([item('02-JUN', 50, 700, 30), item('65.000', 420, 700.4, 30)])
    ).toEqual(['02-JUN 65.000'])
  })

  it('keeps pages in reading order, top line first', () => {
    expect(
      itemsToLines([item('bottom', 50, 100, 30), item('top', 50, 700, 30)])
    ).toEqual(['top', 'bottom'])
  })

  it('drops empty fragments and empty lines', () => {
    expect(itemsToLines([item('', 50, 700, 0), item('   ', 50, 300, 5)])).toEqual(
      []
    )
  })

  it('returns nothing for a page without text', () => {
    expect(itemsToLines([])).toEqual([])
  })
})
