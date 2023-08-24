/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html,css,js}",
  ],  theme: {
    extend: {
      colors: {
        primary: "#e6e5de",
        secondary: "#feae49",
        tertiary: "#c0c0be",
        fourth:"#3b72ff",
        fifth:"#3d424a",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
      },    
    },
  },
  plugins: [],
}

