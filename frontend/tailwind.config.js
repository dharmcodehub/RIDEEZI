/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          200: "#EDFAF0",
          300: "#E8F5E9",
          500: "#28A745",
          600: "#218838",
          700: "#1E7E34",
        },
        gray: {
          200: "#F8F9FA",
          300: "#E9ECEF",
          400 : "#D1D4DB",
          500: "#6C757D",
          600: "#495057",
          700: "#212529",
        },
        success: {
          200: "#D4EDDA",
          300: "#C3E6CB",
          500: "#28A745",
          600: "#218838",
          700: "#1E7E34",
        },
        error: {
          200: "#F8D7DA",
          300: "#F5C6CB",
          500: "#DC3545",
          600: "#C82333",
          700: "#BD2130",
        },
      },
      width :{
        '30' : '30%',
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"], // Font for headings
        body: ["Inter", "sans-serif"], // Font for body text
      },
    },
  },
  plugins: [],
}

