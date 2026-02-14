/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./App.tsx",
    "./index.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        micron: ['Kaushan Script', 'cursive'],
      },
      colors: {
        micron: {
          green: '#008f25',
          eggplant: {
            DEFAULT: '#2c0f38',
            light: '#7db0d3',
          },
          black: '#0e0a0f',
          grey1: '#353942',
          grey2: '#5d6270',
          grey3: '#878d9f',
          grey4: '#dadde6',
        }
      },
      animation: {
        'slow-zoom': 'zoom 20s ease-out forwards',
      },
      keyframes: {
        zoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' },
        }
      }
    }
  },
  plugins: [],
}
