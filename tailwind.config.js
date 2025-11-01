/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#ECFEFF',
          100: '#CFFAFE',
          200: '#A5F3FC',
          300: '#67E8F9',
          400: '#22D3EE',
          500: '#06B6D4',
          600: '#0891B2',
          700: '#0E7490',
          800: '#155E75',
          900: '#164E63',
        },
      },
      boxShadow: {
        soft: '0 10px 30px -10px rgba(2,132,199,0.25)',
      },
      backgroundImage: {
        'radial-fade': 'radial-gradient(800px 300px at 50% -20%, rgba(34,211,238,0.18), transparent)',
      },
    },
  },
  plugins: [],
};


