/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors : {
        blue : {
          700 : '#002a5a',
          500 : '#193f6a',
          200 : '#7f95ac',
          150 : '#40e0d0',
          100 : '#39597f'
        }
      }
    },
  },
  plugins: [],
}

