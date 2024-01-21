/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    safelist: [
      "done",
      "workingOn",
      "retry",
      "next"
    ],
    extend:{
      colors:{
        card1: '#121212',
        navbar: '#1c1c1c',
        background: '#161616',
        hoveredGrey: '#2c2c2c',
        cardbg: '#191919',
        subtext: '#515151',
        borderColor: 'grey',
        focused: "white",
        spotify: "#1db954",
        "done": "#16a34a",
        "workingOn": "#facc15",
        "retry": "#EA580C",
        "next": "#93c5fd",

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

