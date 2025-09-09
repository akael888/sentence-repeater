/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-color": "#f4f3ee",
        "sub-color": "#bcb8b1",
        "opposite-color": "#8a817c",
        "opposite-sub-color": "#463f3a",
        "color-background": "#FFFFFF",
        "color-foreground": "#282c34",
        "gradient-color-start": "#f4f3ee",
        "gradient-color-end": "#bcb8b1",
        "shadow-color": "#102a43",
      },
    },
  },
  plugins: [],
};
