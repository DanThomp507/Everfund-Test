/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ever: {
          DEFAULT: '#009681',
          50: '#4FFFE6',
          100: '#3AFFE3',
          200: '#11FFDE',
          300: '#00E8C7',
          400: '#00BFA4',
          500: '#009681',
          600: '#005E51',
          700: '#002621',
          800: '#000000',
          900: '#000000',
        },
      },
      listStyleType: {
        auto: 'auto',
      },
    },
  },
  plugins: [],
}
