/**
 * The legacy (widely transpiled) pdf.js build ships its own `.d.mts`, which the
 * TypeScript `node` module resolution used by CRA cannot pick up. Its API is
 * identical to the package entry point, so reuse those declarations.
 */
declare module 'pdfjs-dist/legacy/build/pdf.mjs' {
  export * from 'pdfjs-dist'
}
