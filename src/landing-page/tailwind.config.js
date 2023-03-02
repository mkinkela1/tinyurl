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
      primary: "#6929c4",
      secondary: "#fff"
    },
    outlineWidth: {},
    outlineColor: {},
    outlineOffset: {},
    screens: {
      sm: { max: "640px" },
      md: { min: "641px", max: "1023px" },
      lg: { min: "1024px", max: "1279px" },
      xl: { min: "1280px", max: "1535px" },
      "2xl": { min: "1536px" }
    }
  },
  plugins: [require("@tailwindcss/forms")]
};
