/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        neutral: { 900: '#1b1b1f', 800: '#26262c', 700: '#31313a' },
      },
    },
  },
  plugins: [],
}

