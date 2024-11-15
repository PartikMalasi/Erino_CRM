/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {},
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".no-scrollbar": {
          overflow: "hidden",
          scrollbarWidth: "none", // For Firefox
          "-ms-overflow-style": "none", // For Internet Explorer and Edge
          "&::-webkit-scrollbar": {
            display: "none", // For Chrome, Safari, and Opera
          },
        },
      });
    },
  ],
};
