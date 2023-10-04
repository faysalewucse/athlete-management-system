/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",
        primary2: "#2563eb",
        secondary: "#6366f1",
        secondary2: "#4f46e5",
        dark: "#334155",
        light: "#f9fafb",
        danger: "#ef4444",
        danger2: "#dc2626",
        success: "#22c55e",
        success2: "#16a34a",
      },
    },
  },
  plugins: [],
};
