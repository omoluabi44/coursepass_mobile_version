/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
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
        // assignmet page color
        bgr:"#D0E7FF",
        green:"#32d102",
        BgGreen:"#d8ffcc",
        Orange:"#ffbc1f",
        BgOrange:"#fcecc5",
        red:"#fa0d05",
        BgRed:"#ffcbc9"
        
       
      },
      fontSize: {
        lg: "20px",
        sm: "16px"
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      serif: ['Georgia', 'serif'],
      mono: ['Courier New', 'monospace'],
    }
    },
  },
  plugins: [],
}