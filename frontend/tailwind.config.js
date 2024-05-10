/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"),
    require("tailwind-scrollbar"),
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#222222",
          "secondary": "#f0f0f0",
          "neutral": "#dbdbdb",
        },
      },
    ],
  },
}

