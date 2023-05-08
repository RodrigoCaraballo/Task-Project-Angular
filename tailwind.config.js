/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      screens: {
        'xsm': '375px', // => @media (min-width: 375px)
        'sm': '420px', // => @media (min-width: 420px)
        'md': '720px', // => @media (min-width: 720px)
        'lg': '1024px', // => @media (min-width: 1024px)
        'xl': '1366px', // => @media (min-width: 1366px)
      },
    },
  },
  plugins: [],
}

