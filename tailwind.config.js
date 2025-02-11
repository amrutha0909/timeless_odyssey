/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        golden: {
          DEFAULT: '#a87b00',
          dark: '#8b6500',
          light: '#c49000',
        },
      },
    },
  },
  plugins: [],
};