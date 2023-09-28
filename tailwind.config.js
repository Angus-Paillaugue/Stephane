/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,svelte}',
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily:{
        sans:["Poppins"]
      },
      colors: {
        primary: {
          '50': '#f9fcf5', 
          '100': '#f6fced', 
          '200': '#e7f7d5', 
          '300': '#d3f0bb', 
          '400': '#aae68c', 
          '500': '#7cdb61', 
          '600': '#66c44f', 
          '700': '#4aa336', 
          '800': '#338522', 
          '900': '#206314', 
          '950': '#104008'
        },
        "text-main":"#2D2E32"
      },
      boxShadow: {
        "shadow":"0 4px 8px -2px rgba(26, 27, 31, 0.08)"
      }
    },
  },
  darkMode: 'class',
  plugins: [
    require('flowbite/plugin')
  ]
}