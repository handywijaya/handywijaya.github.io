import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { extractPdfText as realExtractPdfText } from '../../utils/ccBill/pdfText'
import Converter from './Converter'

// The real module pulls in pdf.js; PDF decoding itself is covered elsewhere.
jest.mock('../../utils/ccBill/pdfText', () => ({
  extractPdfText: jest.fn()
}))

const extractPdfText = realExtractPdfText as jest.Mock

const STATEMENT_TEXT = [
  'SALDO SEBELUMNYA 1.500.000',
  '02-JUN 04-JUN STARBUCKS JAKARTA ID 65.000',
  '05-JUN 06-JUN PEMBAYARAN VIA BCA 1.500.000 CR',
  '10-AGU 11-AGU KFC BINTARO 55.000'
].join('\n')

const EXPECTED_CSV = [
  '02-JUN,STARBUCKS JAKARTA ID,65000,Food & Dining',
  '10-AUG,KFC BINTARO,55000,Food & Dining'
].join('\n')

const pdfFile = (name = 'statement.pdf') =>
  new File([new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d, 0x31])], name, {
    type: 'application/pdf'
  })

const writeText = jest.fn().mockResolvedValue(undefined)

/** userEvent.setup() installs its own clipboard stub, so take it over after. */
const spyOnClipboard = () => {
  Object.defineProperty(navigator, 'clipboard', {
    value: { writeText },
    configurable: true
  })
}

beforeEach(() => {
  jest.clearAllMocks()
  extractPdfText.mockResolvedValue(STATEMENT_TEXT)
  Object.defineProperty(window, 'isSecureContext', {
    value: true,
    configurable: true
  })
})

const convert = async (password = 'secret123') => {
  const user = userEvent.setup()
  spyOnClipboard()
  render(<Converter />)

  await user.upload(screen.getByLabelText(/statement pdf/i), pdfFile())
  if (password) {
    await user.type(screen.getByLabelText(/pdf password/i), password)
  }
  await user.click(screen.getByRole('button', { name: /convert/i }))

  const output = (await screen.findByRole('textbox', {
    name: /converted csv output/i
  })) as HTMLTextAreaElement
  return { user, output }
}

describe('Converter', () => {
  it('converts the picked PDF and shows the CSV', async () => {
    const { output } = await convert()

    expect(output).toHaveValue(EXPECTED_CSV)
    expect(output).toHaveAttribute('readonly')
    expect(
      screen.getByRole('heading', { name: /2 transactions/i })
    ).toBeInTheDocument()
    expect(extractPdfText).toHaveBeenCalledWith(
      expect.any(Uint8Array),
      'secret123'
    )
  })

  it('clears the password field once the conversion succeeded', async () => {
    await convert()
    expect(screen.getByLabelText(/pdf password/i)).toHaveValue('')
  })

  it('copies the output to the clipboard when the box is clicked', async () => {
    const { user, output } = await convert()

    await user.click(output)

    expect(writeText).toHaveBeenCalledWith(EXPECTED_CSV)
    expect(await screen.findByText('Copied to clipboard.')).toBeInTheDocument()
  })

  it('copies the tab-separated version after switching format', async () => {
    const { user, output } = await convert()

    await user.click(screen.getByRole('button', { name: 'tsv' }))
    await user.click(output)

    expect(writeText).toHaveBeenCalledWith(
      '02-JUN\tSTARBUCKS JAKARTA ID\t65000\tFood & Dining\n' +
        '10-AUG\tKFC BINTARO\t55000\tFood & Dining'
    )
  })

  it('reports a failed clipboard write instead of claiming success', async () => {
    writeText.mockRejectedValueOnce(new Error('denied'))
    document.execCommand = jest.fn().mockReturnValue(false)

    const { user, output } = await convert()
    await user.click(output)

    expect(
      await screen.findByText(/could not copy/i)
    ).toBeInTheDocument()
  })

  it('shows the error message when the password is wrong', async () => {
    extractPdfText.mockRejectedValue(new Error('Wrong password, or unsupported encryption.'))
    const user = userEvent.setup()
    render(<Converter />)

    await user.upload(screen.getByLabelText(/statement pdf/i), pdfFile())
    await user.click(screen.getByRole('button', { name: /convert/i }))

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Wrong password, or unsupported encryption.'
    )
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
  })

  it('rejects a file that is not a PDF without calling the parser', async () => {
    const user = userEvent.setup()
    render(<Converter />)

    await user.upload(
      screen.getByLabelText(/statement pdf/i),
      new File(['not a pdf at all'], 'notes.pdf', { type: 'application/pdf' })
    )
    await user.click(screen.getByRole('button', { name: /convert/i }))

    expect(await screen.findByRole('alert')).toHaveTextContent(
      "'notes.pdf' is not a PDF file."
    )
    expect(extractPdfText).not.toHaveBeenCalled()
  })

  it('explains when the statement holds no recognisable transactions', async () => {
    extractPdfText.mockResolvedValue('TOTAL TAGIHAN\nLEMBAR 1 DARI 2')
    const user = userEvent.setup()
    render(<Converter />)

    await user.upload(screen.getByLabelText(/statement pdf/i), pdfFile())
    await user.click(screen.getByRole('button', { name: /convert/i }))

    expect(await screen.findByRole('alert')).toHaveTextContent(
      /no transactions found/i
    )
  })

  it('does not convert until a file is picked', async () => {
    render(<Converter />)

    expect(screen.getByRole('button', { name: /convert/i })).toBeDisabled()
    expect(extractPdfText).not.toHaveBeenCalled()
  })

  it('drops file, password and output on Clear', async () => {
    const { user } = await convert()

    await user.click(screen.getByRole('button', { name: /clear/i }))

    await waitFor(() =>
      expect(screen.queryByRole('textbox', { name: /converted/i })).not.toBeInTheDocument()
    )
    expect(screen.getByLabelText(/pdf password/i)).toHaveValue('')
    expect(screen.getByRole('button', { name: /convert/i })).toBeDisabled()
  })
})
