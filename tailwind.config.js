/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  media: false, // or 'media' or 'class'
  content: [],
  theme: {
    extend: {
      colors: {
        buttonColor1: '#aafbdc',
        buttonColor2: '#ffc8d2'
      }
    },
  },
  plugins: [],
};
