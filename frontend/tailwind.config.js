/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css}",
  ],
  safelist: [
    { pattern: /^(bg|text|border|ring|fill|stroke)-brand-(cream|charcoal|gold|gold-dark|surface|surface-dark)(\/\d+)?$/ },
    { pattern: /^shadow-(card|card-hover|soft)$/ },
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          cream: '#fdfbf7',
          charcoal: '#1a1a1a',
          gold: '#d4af37',
          'gold-dark': '#b88934',
          surface: '#f5f0e6',
          'surface-dark': '#ebe5d9',
        },
        primary: {
          light: '#fdfbf7',
          DEFAULT: '#1a1a1a',
          accent: '#d4af37',
        },
        gold: {
          50: '#fbf9f1',
          100: '#f5f0db',
          200: '#ebdcae',
          300: '#ddc27b',
          400: '#cca34d',
          500: '#b88934',
          600: '#a3712a',
          700: '#855622',
          800: '#6c441f',
          900: '#5c381c',
          950: '#351d0d',
        },
      },
      fontFamily: {
        serif: ['Poppins', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 8px rgba(26, 26, 26, 0.06)',
        'card-hover': '0 8px 24px rgba(26, 26, 26, 0.1)',
        soft: '0 4px 12px rgba(26, 26, 26, 0.06)',
      },
      borderRadius: {
        card: '0.75rem',
      },
    },
  },
  plugins: [],
}
