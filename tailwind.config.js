/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#43a7ca",
        secondary: "#5B31DD",
        dark: "#334155",
      },
    },
  },
  plugins: [],
};
