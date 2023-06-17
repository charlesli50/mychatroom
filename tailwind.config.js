/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridRow: {
        "span-7": "span 7 / span 7",
        "span-11": "span 11 / span 11",
        "span-15": "span 15 / span 15",
      },
      gridTemplateRows: {
        8: "repeat(8, minmax(0, 1fr))",
        12: "repeat(12, minmax(0, 1fr))",
        16: "repeat(16, minmax(0, 1fr))",

        // Complex site-specific row configuration
        // 'layout': '200px minmax(900px, 1fr) 100px',
      },
    },
  },
  plugins: [],
};
