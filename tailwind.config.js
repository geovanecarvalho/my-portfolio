/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
       scrollPadding: {
        header: '106px', // 96 do menu + 10 de margem
      },
    },
  },
  plugins: [require('tailwindcss-animated')],
}
