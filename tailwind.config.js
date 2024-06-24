/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [,
    "./src/**/*.{js,ts,jsx,tsx,vue, html}",
    "index.html"
  ],
  theme: {
    extend: {
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },
    },
  },
  plugins: [
    require("daisyui"),
    require("tailwindcss"),
    require("autoprefixer"),
  ],
  daisyui: {
    themes: [
      "dark",
      "light",
    ],
  }
}