/** @type {import('tailwindcss').Config}*/
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      colors: {
        primary: "#adfa1d"
      }
    },
  },

  plugins: [],
};

module.exports = config;
