/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["var(--font-hind)", "Hind Siliguri", "Nirmala UI", "system-ui", "sans-serif"] },
      colors: {
        brand: { DEFAULT: "#05893e", dark: "#047f39", content: "#f3fbf4" },
        ink: "#1d271f",
        canvas: "#f0f5f0",
        surface: "#fafcfa",
        line: "#e1e8e1",
        up: "#d03739",
        down: "#1a9951",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    base: false,
    logs: false,
    themes: [
      {
        bazardor: {
          primary: "#05893e",
          "primary-content": "#f3fbf4",
          secondary: "#047f39",
          accent: "#f59e0b",
          neutral: "#1d271f",
          "base-100": "#fafcfa",
          "base-200": "#f0f5f0",
          "base-300": "#e1e8e1",
          "base-content": "#1d271f",
          info: "#0ea5e9",
          success: "#1a9951",
          warning: "#f59e0b",
          error: "#d03739",
        },
      },
    ],
  },
};
