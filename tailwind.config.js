/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Add your custom colors here
        darkGreen: '#163300',
        lightGreen: '#9FE870',
        blue: '#0F5CCD',
        lightBlue: '#699FEF',
        orange: '#EE8C55',
        brandGreen: '#28a745',
        lightGrey: '#EDEAEA',
        textGrey: '#585858'
      },
      fontFamily: {
        // Add your custom fonts here
        display: ['Thunder', 'sans-serif'],
        body: ['TT Interphases Pro', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

