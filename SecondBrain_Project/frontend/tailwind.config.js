/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors : {
        purple : {
          300 : "#e0e7ff",
          500 : "#514abb",
          600 : "#5046e3",
          700 : "#adabec",
          900 : "#3B30DA"
        }
      }
    },
  },
  plugins: [],
}

