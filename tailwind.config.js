/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgCream: '#fbfaf6',
        cardGrey: '#F5F5F7',
        appleDark: '#111111',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        header: ['Archivo Black', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        appleSoft: '0 30px 60px rgba(0,0,0,0.04)',
        appleFocus: '0 20px 40px rgba(0,0,0,0.08)',
      }
    },
  },
  plugins: [],
}
