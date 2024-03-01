/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: { // Add additional font families and color codes
      fontFamily: { 
        satoshi: ['Satoshi', 'sans-serif'],
        inter: ['Inter', 'san-serif'],
      },
      colors: {
        'primary-orange': '#FF5722',
        'plasma': '#45cce3ff',
        'navy': '#1c525b',
        'garnet': '#9b2a17',
        'swamp': '#179b2a'
      }
    },
  },
  plugins: [],
};
