/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'netflix-black': '#141414',
        'netflix-red': '#E50914',
        'netflix-gray': '#222222',
        'netflix-light-gray': '#333333',
      },
      backgroundImage: {
        'netflix-gradient': 'linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0.3))',
      },
      fontFamily: {
        'netflix': ['Netflix Sans', 'sans-serif'],
      },
      spacing: {
        'netflix-card': '16rem',
      },
    },
  },
  plugins: [],
}