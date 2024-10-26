const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8750F7",
        secondary: "#5550F7",
        black: "#130D0D",
        white: "#FFFFFF",
        bgPrimary: "#0A0A0A",
        bgSecondary: "#181818",
      },
      backgroundImage: {
        primaryGradient: "linear-gradient(90deg, #8750F7 0%, #2A1454 100%)",
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "10rem",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
