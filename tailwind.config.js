/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode: "class",
  content: ["./**/*.svelte"],
  plugins: [],
  theme: {
    fontFamily: {
      sans: ['Nunito Sans', 'sans-serif']
    },
    extend: {
      colors: {
        'olx-orange-500': '#f28000',
        'olx-orange-600': '#df7400',
        'olx-purple-400': '#6e0ad6',
        'olx-red-500': '#e22828',
        'olx-red-600': '#901111',
      }
    }
  }
}