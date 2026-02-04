/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
      },
      colors: {
        paper: 'rgb(var(--paper) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        accent2: 'rgb(var(--accent-2) / <alpha-value>)',
        accent3: 'rgb(var(--accent-3) / <alpha-value>)',
        card: 'rgb(var(--card) / <alpha-value>)',
        mainGreen: '#aafbdc',
        subGreen: '#c0ffee',
        white: '#ffffff',
        subPink: '#ffd6e4',
        mainPink: '#ffc8d2',
        buttonColor1: '#aafbdc',
        buttonColor2: '#ffc8d2',
        fadedGreen: '#aafbdc1f',
        darkGreen: '#38c28d',
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
