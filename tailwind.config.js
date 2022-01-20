// const colors = require('tailwindcss/colors');
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        app: {
          light: '#3d68ff',
          default: '#1947ee',
          dark: '#0038fd',
          hover: '#3d68ff',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
