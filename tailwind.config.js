const { nextui } = require("@nextui-org/react");


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '360px',
        // 'sm': '640px',
        // 'md': '768px',
        // 'lg': '1024px',
        // 'xl': '1280px',
        // '2xl': '1536px',
      },
      maxWidth: {
        'screen': '100vw',
      },
      colors: {
        'custom-red': '#FF0000',
        'custom-red-dark': '#A60000',
        'custom-gray': '#404040',
        'custom-gray-1': '#4D4D4D',
        'custom-gray-2': '#6B6B6B',
        'custom-gray-3': '#808080',
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};