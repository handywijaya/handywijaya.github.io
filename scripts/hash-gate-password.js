/**
 * Print the GATE_HASH value for the statement converter page.
 *
 * Usage: node scripts/hash-gate-password.js
 *
 * Prompts for the password without echoing it, so it does not end up in shell
 * history. Also accepts the password on stdin for scripted use.
 *
 * Paste the printed `salt:key` line into GATE_HASH in
 * src/versions/v2/pages/CcBillToCsv/gate.ts. The parameters below must stay in
 * step with that file; gate.test.ts fails if they drift apart.
 *
 * Reminder: the result is published in the site bundle and in this repo. It
 * gates the page against casual visitors, it does not keep anything secret, and
 * a guessable or reused password can be recovered from it offline. Use a long
 * random password that is used nowhere else.
 */
const crypto = require('crypto')

const ITERATIONS = 310_000
const KEY_BYTES = 32
const SALT_BYTES = 16

const ENTER = ['\r', '\n', '\u0004'] // \u0004 = Ctrl-D
const INTERRUPT = '\u0003' // Ctrl-C
const BACKSPACE = ['\u007f', '\b']

/** Read a line from a pipe, so `... | node scripts/hash-gate-password.js` works. */
const readPiped = () =>
  new Promise((resolve) => {
    let data = ''
    process.stdin.setEncoding('utf8')
    process.stdin.on('data', (chunk) => {
      data += chunk
    })
    process.stdin.on('end', () => resolve(data.replace(/\r?\n$/, '')))
  })

/** Read a line from the terminal with echo suppressed. */
const readPrompted = () =>
  new Promise((resolve) => {
    process.stdout.write('Gate password (not echoed): ')
    process.stdin.setRawMode(true)
    process.stdin.resume()
    process.stdin.setEncoding('utf8')

    let value = ''
    const onData = (chunk) => {
      // Raw mode delivers a chunk, which a paste can fill with many characters.
      for (const char of chunk) {
        if (ENTER.includes(char)) {
          process.stdin.off('data', onData)
          process.stdin.setRawMode(false)
          process.stdin.pause()
          process.stdout.write('\n')
          resolve(value)
          return
        }
        if (char === INTERRUPT) {
          process.stdin.setRawMode(false)
          process.stdout.write('\n')
          process.exit(130)
        }
        if (BACKSPACE.includes(char)) value = value.slice(0, -1)
        else value += char
      }
    }
    process.stdin.on('data', onData)
  })

const main = async () => {
  const password = process.stdin.isTTY
    ? await readPrompted()
    : await readPiped()

  if (!password) {
    console.error('hash-gate-password: no password given.')
    process.exit(1)
  }

  const salt = crypto.randomBytes(SALT_BYTES)
  const key = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_BYTES, 'sha256')

  console.log(`${salt.toString('hex')}:${key.toString('hex')}`)
}

main()
