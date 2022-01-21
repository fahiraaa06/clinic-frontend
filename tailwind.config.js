// const colors = require('tailwindcss/colors');
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        app: {
          light: '#051622',
          default: '#373A36',
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
