import { GATE_HASH, isGateConfigured, verifyGatePassword } from './gate'

/**
 * Produced by `node scripts/hash-gate-password.js "correct horse battery staple"`.
 * Verifying it here keeps the browser code and the generator script in step: if
 * either changes its PBKDF2 parameters, this fails.
 */
const PASSWORD = 'correct horse battery staple'
const STORED =
  '42a7c8c9244eee0b1b430c7e20d700d5:1d9437484be9b7df69df8b1ac4f46460c90fc30bf4c8a666568e63349b8fb1bc'

describe('isGateConfigured', () => {
  it('accepts a well-formed salt:key pair', () => {
    expect(isGateConfigured(STORED)).toBe(true)
  })

  it.each([
    ['empty', ''],
    ['no separator', '42a7c8c9244eee0b1b430c7e20d700d5'],
    ['short salt', `42a7c8:${STORED.split(':')[1]}`],
    ['short key', `${STORED.split(':')[0]}:1d9437`],
    ['non-hex', `${'z'.repeat(32)}:${STORED.split(':')[1]}`]
  ])('rejects %s', (_label, stored) => {
    expect(isGateConfigured(stored)).toBe(false)
  })
})

describe('verifyGatePassword', () => {
  it('accepts the password the hash was made from', async () => {
    await expect(verifyGatePassword(PASSWORD, STORED)).resolves.toBe(true)
  })

  it.each([
    ['a wrong password', 'wrong password'],
    ['an empty password', ''],
    ['a near miss', 'correct horse battery stapl'],
    ['different case', 'Correct Horse Battery Staple']
  ])('rejects %s', async (_label, attempt) => {
    await expect(verifyGatePassword(attempt, STORED)).resolves.toBe(false)
  })

  it('stays shut when the gate is unconfigured', async () => {
    await expect(verifyGatePassword(PASSWORD, '')).resolves.toBe(false)
  })

  it('stays shut when Web Crypto is unavailable', async () => {
    const real = globalThis.crypto
    Object.defineProperty(globalThis, 'crypto', {
      value: { getRandomValues: real.getRandomValues },
      configurable: true
    })
    try {
      await expect(verifyGatePassword(PASSWORD, STORED)).resolves.toBe(false)
    } finally {
      Object.defineProperty(globalThis, 'crypto', {
        value: real,
        configurable: true
      })
    }
  })

  it('has a GATE_HASH that is either empty or well-formed', () => {
    // Catches a malformed paste, which would otherwise look like a gate that
    // is configured but rejects every password.
    expect(isGateConfigured(GATE_HASH)).toBe(GATE_HASH !== '')
  })
})
