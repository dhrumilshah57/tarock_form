/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    screens: {
      'sm': '650px',
      'xs': '390px',
      'xxs': '300px',
      ...defaultTheme.screens,
    }
  },
  plugins: [],
}
