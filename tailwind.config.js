/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors:{
        base:"#FFF",
        accent:"#3498DB",
        secondary:"#F1C40F"
      }
    },
  },
  plugins: [],
}