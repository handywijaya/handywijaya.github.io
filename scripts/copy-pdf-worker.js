/**
 * Copy the pdf.js worker into public/ so it is served from our own origin.
 *
 * pdf.js needs its worker as a standalone file. Loading it from a CDN would
 * hand a third party the code that decrypts the user's statement, so it is
 * copied out of node_modules at install/build time instead (and git-ignored,
 * since it is generated).
 */
const fs = require('fs')
const path = require('path')

const SOURCE_FILE = 'pdf.worker.min.mjs'
// Served as .js: some static hosts (GitHub Pages included) do not reliably send
// a JavaScript MIME type for .mjs, and a worker with the wrong type is blocked.
const PUBLIC_FILE = 'pdf.worker.min.js'

const source = path.join(
  __dirname,
  '..',
  'node_modules',
  'pdfjs-dist',
  'legacy',
  'build',
  SOURCE_FILE
)
const destination = path.join(__dirname, '..', 'public', PUBLIC_FILE)

if (!fs.existsSync(source)) {
  console.error(`copy-pdf-worker: ${source} not found. Run npm install first.`)
  process.exit(1)
}

fs.copyFileSync(source, destination)
console.log(`copy-pdf-worker: ${SOURCE_FILE} -> public/${PUBLIC_FILE}`)
