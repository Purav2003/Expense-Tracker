/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html,css,js}",
  ],  theme: {
    extend: {
      colors: {
        primary: "#00001a",
        secondary: "#333333",
        tertiary: "#eeeeee",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
      },    
    },
  },
  plugins: [],
}

