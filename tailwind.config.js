/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: '#f5f0e8',
        sand: '#e8e0d0',
        olive: '#818356',
        warmblack: '#0e0d0b',
        muted: '#6b6560',
        border: '#e0d9ce',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}