/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,scss}",
  ],
  theme: {
    screens: {
      'xs': '1px',      
      'sm': '500px',       
      'md': '650px',      
      'lg': '800px',       
      'xl':  '1080px',      
      '2xl': '1440px',     
    },
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        tinos: ['Tinos', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'],
      },
      colors: {
        colorO: '#FF8A00', 
        colorB: '#5C4529',
        colorBd: '#311F09',
      },
    },
  },
  plugins: [],
}
