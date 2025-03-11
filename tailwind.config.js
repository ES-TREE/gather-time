/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eefbf3",
          100: "#d6f5e0",
          200: "#afebc5",
          300: "#7cd9a5",
          400: "#57c78c",
          500: "#23a666",
          600: "#158651",
          700: "#116b42",
          800: "#105537",
          900: "#0e462e",
          950: "#07271b",
        },
      },
      keyframes: {
        rotation: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
}
