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
        
       
      },
      fontSize: {
        lg: "20px",
        sm: "16px"
    }
    },
  },
  plugins: [],
}