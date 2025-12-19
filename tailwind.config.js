/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        fortu: {
          dark: '#101111',
          medium: '#7D7D7D',
          light: '#BFBFBF',
          'off-white': '#F9F9F9',
        },
      },
    },
  },
  plugins: [],
}


