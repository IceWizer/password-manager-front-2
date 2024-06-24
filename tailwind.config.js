/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [,
        "./src/**/*.{js,ts,jsx,tsx,vue, html}",
        'index.html'
      ],
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