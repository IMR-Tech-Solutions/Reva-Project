/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Your core (updated for construction)
        primary: "#2F3F8F",        // Dark authority (headers/nav)
        secondary: "#F4B400",      // Red energy (CTAs/buttons)
       

        // Construction neutrals
        gray: {
          500: "#6B7280",        // Text/borders (your old secondary)
          100: "#F3F4F6",        // Light backgrounds
        },

        // UI essentials
        background: "#F8FAFC",     // Clean pages
        text: "#111827",           // Body text
      },
    },
  },
  plugins: [],
};
