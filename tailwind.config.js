/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#db4c3e",
        dark: {
          100: "#333333",
          200: "#282828",
          300: "#242424",
          400: "#171717",
          500: "#1f1f1f",
        },
      },
    },
  },

  plugins: [],
};
