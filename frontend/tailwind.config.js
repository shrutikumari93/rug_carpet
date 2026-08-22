/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        clay: {
          50: "#FBF3EC",
          100: "#F4E3D3",
          200: "#E6C6A8",
          300: "#D6A679",
          400: "#C4854E",
          500: "#A8632F",
          600: "#8A4E25",
          700: "#6B3B1D",
          800: "#4A2914",
          900: "#2E190C",
        },
        ink: "#231A14",
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        body: ["'Inter'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
