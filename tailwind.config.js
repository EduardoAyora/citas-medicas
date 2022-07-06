module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#313131',
          ligth: '#494949',
          dark: '#2a2a2a',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
