// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// jsdom is missing two globals every browser has and the page gate needs:
// crypto.subtle (PBKDF2) and TextEncoder. Node supplies both.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { webcrypto } = require('crypto')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { TextDecoder, TextEncoder } = require('util')

if (!globalThis.crypto || !globalThis.crypto.subtle) {
  Object.defineProperty(globalThis, 'crypto', {
    value: webcrypto,
    configurable: true
  })
}
if (!globalThis.TextEncoder) {
  Object.assign(globalThis, { TextDecoder, TextEncoder })
}
