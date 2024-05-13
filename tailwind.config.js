/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgba(var(--background))",
        titlecolor: "rgba(var(--titlecolor))",
        subtitlecolor: "rgba(var(--subtitlecolor))",
        hoverbordercolor: "rgba(var(--hoverbordercolor))",
        bordercolor: "rgba(var(--bordercolor))",
        inputbackground: "rgba(var(--inputbackground))",
      },
    },
  },
  plugins: [],
};
