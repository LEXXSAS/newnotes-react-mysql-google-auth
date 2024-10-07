/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // "./app/**/*.{js,ts,jsx,tsx,mdx}",
    // "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    // "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // "./src/**/*.{js,ts,jsx,tsx,mdx}",
    // "./src/**/*.{html,js}",
  ],
  // content: ["./src/**/*.{html,js}"],
  theme: {
    // colors: {
    //   primary: '#7856ff',
    //   white: '#fff',
    // },
    extend: {
      colors: {
        primary: '#7856ff',
        primaryhover: '#5D42C5'
      },
      fontSize: {
        extrasmall: '12px'
      }
    }
  },
  plugins: [],
}
