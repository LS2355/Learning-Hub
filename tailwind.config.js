/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend:{
      colors:{
        card1: '#121212',
        navbar: '#1c1c1c',
        background: '#161616',
        hoveredGrey: '#2c2c2c',
        cardbg: '#191919',
        subtext: '#515151',
        border: '#171717',
        focused: "white",
        spotify: "#1db954",


      },
    },
    screens: {
      'xs': '480px',
      'learningCardBreakpoint': '900px',
      ...defaultTheme.screens,
    }
  },
  plugins: [],
}

