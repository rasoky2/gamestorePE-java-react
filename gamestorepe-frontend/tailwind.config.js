/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        SteamBackground: '#1b2838', // Añade tu color personalizado aquí
      },
      fontFamily: {
        motivaSans: ['"Motiva Sans"', 'sans-serif'], // Añade la fuente personalizada aquí
      },
    },
  },
  plugins: [],
}
