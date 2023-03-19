const colors = require("tailwindcss/colors");

/** @type {import("tailwindcss").Config} */
module.exports = {
  mode: "jit",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
    colors: {
      ...colors,
      primary: {
        DEFAULT: "#6929c4",
        500: "#9573c4"
      },
      secondary: "#fff",
      tertiary: "#1C2434",
      quaternary: "#F3F4F6",
      background: "#f2f5f9"
    },
    outlineWidth: {},
    outlineColor: {},
    outlineOffset: {},
    screens: {
      sm: { max: "640px" },
      md: { min: "641px", max: "1023px" },
      lg: { min: "1024px" },
      xl: { min: "1280px" }
    }
  },
  plugins: [require("@tailwindcss/forms")]
};
