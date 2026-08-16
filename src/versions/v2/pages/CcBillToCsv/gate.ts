/**
 * Access gate for the statement converter page.
 *
 * NOT a security boundary, and must never be treated as one. Everything here
 * ships to the browser: the stored hash sits in the published bundle, the page
 * behind it is downloadable JavaScript, and the check is one boolean a visitor
 * can step over in devtools. It exists to keep the page out of the way of
 * casual visitors and to mark it as a personal tool.
 *
 * Nothing confidential is protected by it: statements are parsed in the tab and
 * never leave the device with or without the gate.
 *
 * PBKDF2 is used regardless so that the *password* stays expensive to recover
 * from the published hash, even though the *gate* is cheap to bypass. A bare
 * SHA-256 of a short password falls to an offline GPU search in seconds.
 */

/** OWASP's floor for PBKDF2-SHA256; also makes a wrong guess cost ~0.3s here. */
const ITERATIONS = 310_000
const KEY_BITS = 256
const SALT_BYTES = 16

/**
 * `<saltHex>:<keyHex>` produced by `node scripts/hash-gate-password.js`.
 *
 * Empty means the gate is unconfigured, and the page stays closed — a missing
 * value must not fall open.
 *
 * Annotated as `string` on purpose: without it the value is inferred as its own
 * literal type, and comparing it against '' becomes a compile error.
 */
export const GATE_HASH: string =
  '01874714ec7d0279985bca1907bf9549:c16c214daceba5a4738056a1022e7de485271e4440b35c6a877c848df4c8cbee'

const toHex = (bytes: Uint8Array): string =>
  Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')

const fromHex = (hex: string): Uint8Array => {
  const bytes = new Uint8Array(hex.length / 2)
  for (let i = 0; i < bytes.length; i += 1) {
    bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16)
  }
  return bytes
}

const isHex = (value: string, byteLength: number): boolean =>
  value.length === byteLength * 2 && /^[0-9a-f]+$/.test(value)

/** Gate is usable only once a well-formed `<saltHex>:<keyHex>` is pasted in. */
export const isGateConfigured = (stored: string = GATE_HASH): boolean => {
  const [salt, key] = stored.split(':')
  if (!salt || !key) return false
  return isHex(salt, SALT_BYTES) && isHex(key, KEY_BITS / 8)
}

/** Length-independent comparison. Mostly form, but free and correct. */
const equals = (a: string, b: string): boolean => {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i += 1) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return diff === 0
}

/** Derive the PBKDF2 key for `password` against `salt`, as lowercase hex. */
export const deriveKey = async (
  password: string,
  salt: Uint8Array
): Promise<string> => {
  const material = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  )
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt: salt as BufferSource, iterations: ITERATIONS, hash: 'SHA-256' },
    material,
    KEY_BITS
  )
  return toHex(new Uint8Array(bits))
}

/**
 * True when `password` matches the stored hash.
 *
 * Returns false rather than throwing when the gate is unconfigured or Web
 * Crypto is unavailable (`crypto.subtle` needs a secure origin), so an
 * unusable gate stays shut instead of opening.
 */
export const verifyGatePassword = async (
  password: string,
  stored: string = GATE_HASH
): Promise<boolean> => {
  if (!isGateConfigured(stored)) return false
  if (typeof crypto === 'undefined' || !crypto.subtle) return false

  const [saltHex, keyHex] = stored.split(':')
  try {
    return equals(await deriveKey(password, fromHex(saltHex)), keyHex)
  } catch {
    return false
  }
}
