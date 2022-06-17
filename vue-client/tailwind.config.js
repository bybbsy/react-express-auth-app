/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,tsx}'
  ],
  theme: {
    extend: {
      width: {
        'md': '1440px'
      }
    },
  },
  plugins: [],
}
