/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  media: false, // or 'media' or 'class'
  content: [],
  theme: {
    extend: {
      colors: {
        mainGreen: '#aafbdc',
        subGreen: '#c0ffee',
        white: '#ffffff',
        subPink: '#ffd6e4',
        mainPink: '#ffc8d2',
        buttonColor1: '#aafbdc',
        buttonColor2: '#ffc8d2',
        fadedGreen: '#aafbdc1f',
      },
      gradients: {
        radial: {
          type: 'radial',
          colors: ['#aafbdc', '#ffc8d2'],
        },
      },
    },
  },
  plugins: [require('tailwindcss-gradients')],
};
