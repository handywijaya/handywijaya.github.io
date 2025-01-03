/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    spacing: {
      'header-height': '90px',
      'header-padding': '5px',
      'footer-height': '145px'
    },
    extend: {
      minHeight: {
        header: '90px',
        content: 'calc(100vh - theme("spacing.header-height") - 1px - (theme("spacing.header-padding") * 2) - theme("spacing.footer-height") - 1px)'
      },
      colors: {
        headerBg: '#333333',
      },
      boxShadow: {
        black: '0px 0px 4px 0px black',
        white: '0px 0px 4px 0px white'
      },
      backgroundImage: {
        'gradient-175deg': 'linear-gradient(175deg, #fff, #c5edf8)'
      }
    }
  },
  plugins: [],
}