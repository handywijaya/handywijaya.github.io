import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import {
  isGateConfigured as realIsGateConfigured,
  verifyGatePassword as realVerifyGatePassword
} from './gate'
import CcBillToCsv from './index'

// PBKDF2 itself is covered in gate.test.ts; these tests are about the screen.
jest.mock('./gate', () => ({
  isGateConfigured: jest.fn(),
  verifyGatePassword: jest.fn()
}))

// The real converter pulls in pdf.js and is covered by Converter.test.tsx.
jest.mock('./Converter', () => () => <div>converter loaded</div>)

const isGateConfigured = realIsGateConfigured as jest.Mock
const verifyGatePassword = realVerifyGatePassword as jest.Mock

const unlock = async (password: string) => {
  const user = userEvent.setup()
  await user.type(screen.getByLabelText(/page password/i), password)
  await user.click(screen.getByRole('button', { name: /unlock/i }))
}

beforeEach(() => {
  jest.clearAllMocks()
  sessionStorage.clear()
  isGateConfigured.mockReturnValue(true)
  verifyGatePassword.mockResolvedValue(false)
})

describe('CcBillToCsv gate', () => {
  it('asks for a password instead of rendering the converter', () => {
    render(<CcBillToCsv />)

    expect(screen.getByLabelText(/page password/i)).toBeInTheDocument()
    expect(screen.queryByText('converter loaded')).not.toBeInTheDocument()
  })

  it('reveals the converter once the password matches', async () => {
    verifyGatePassword.mockResolvedValue(true)
    render(<CcBillToCsv />)

    await unlock('opensesame')

    expect(await screen.findByText('converter loaded')).toBeInTheDocument()
    expect(verifyGatePassword).toHaveBeenCalledWith('opensesame')
  })

  it('keeps the converter hidden and explains a wrong password', async () => {
    render(<CcBillToCsv />)

    await unlock('nope')

    expect(await screen.findByRole('alert')).toHaveTextContent(/wrong password/i)
    expect(screen.queryByText('converter loaded')).not.toBeInTheDocument()
  })

  it('does not remember the unlock, and stores nothing', async () => {
    verifyGatePassword.mockResolvedValue(true)
    const { unmount } = render(<CcBillToCsv />)
    await unlock('opensesame')
    await screen.findByText('converter loaded')

    expect(sessionStorage.length).toBe(0)
    expect(localStorage.length).toBe(0)

    unmount()
    render(<CcBillToCsv />)

    expect(screen.getByLabelText(/page password/i)).toBeInTheDocument()
    expect(screen.queryByText('converter loaded')).not.toBeInTheDocument()
  })

  it('stays closed, with no password box, when no hash is configured', () => {
    isGateConfigured.mockReturnValue(false)
    render(<CcBillToCsv />)

    expect(screen.queryByLabelText(/page password/i)).not.toBeInTheDocument()
    expect(screen.queryByText('converter loaded')).not.toBeInTheDocument()
    expect(screen.getByRole('alert')).toHaveTextContent(/no password set/i)
  })

  it('disables the button while the password is being checked', async () => {
    let release: (value: boolean) => void = () => {}
    verifyGatePassword.mockReturnValue(
      new Promise<boolean>((resolve) => {
        release = resolve
      })
    )
    render(<CcBillToCsv />)

    await unlock('opensesame')

    const button = screen.getByRole('button', { name: /checking/i })
    expect(button).toBeDisabled()

    release(true)
    expect(await screen.findByText('converter loaded')).toBeInTheDocument()
  })
})
