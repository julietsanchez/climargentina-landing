/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'clima-white': '#ffffff',
        'clima-red': '#be3624',
        'clima-blue': '#1c457f',
      },
    },
  },
  plugins: [],
}

