/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        base:"#FFFFFF",
        accent:"#007BFF",
        primary:"#F5F5DC",
        secondary:"#F0F8FF",
        secondary2:"#f5f3f2",
        btn: "#9CA3AF",
        btnCorrect: "green",
        btnInCorrect:"red",

        bgr:"#D0E7FF",
        green:"#32d102",
        BgGreen:"#d8ffcc",
        Orange:"#ffbc1f",
        BgOrange:"#fcecc5",
        reds:"#fa0d05",
        BgRed:"#ffcbc9"
    }


    },
  },
  plugins: [],
}

