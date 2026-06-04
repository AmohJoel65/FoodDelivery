/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#fdfbf7', // Warm Cream
          DEFAULT: '#1a1a1a', // Deep charcoal
          accent: '#d4af37', // Warm Gold
        },
        gold: {
          50: '#fbf9f1',
          100: '#f5f0db',
          200: '#ebdcae',
          300: '#ddc27b',
          400: '#cca34d',
          500: '#b88934', // #d4af37 is close to gold-400/500
          600: '#a3712a',
          700: '#855622',
          800: '#6c441f',
          900: '#5c381c',
          950: '#351d0d',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Outfit"', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
