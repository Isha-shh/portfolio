/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sky: {
          retro: '#63a3f5',
          pale: '#bcd7ff',
          deep: '#4380db',
        },
        retro: {
          window: '#d3dbf0',
          windowBorder: '#8fa0cb',
          windowClose: '#7b8ebc',
          cardBg: '#faf8f5',
          cream: '#fffdf5',
          pillBorder: '#23334c',
          navy: '#1b2a47',
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        pixel: ['"Silkscreen"', '"Press Start 2P"', 'monospace'],
        cursive: ['"Caveat"', '"Homemade Apple"', 'cursive'],
        script: ['"Yellowtail"', '"Satisfy"', 'cursive'],
        heading: ['"Montserrat"', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
