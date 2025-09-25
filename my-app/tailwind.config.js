/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-color": "#f4f3ee",
        "sub-color": "#bcb8b1",
        "opposite-color": "#8a817c",
        "opposite-sub-color": "#996947ff",
        "color-background": "#FFFFFF",
        "color-foreground": "#282c34",
        "gradient-color-start": "#f4f3ee",
        "gradient-color-end": "#bcb8b1",
        "shadow-color": "#102a43",
      },
      keyframes: {
        floatA: {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "25%": { transform: "translate3d(10vw,3vh,0) scale(1.04)" },
          "50%": { transform: "translate3d(-5vw,6vh,0) scale(0.96)" },
          "75%": { transform: "translate3d(-8vw,-6vh,0) scale(1.02)" },
        },
        floatB: {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "25%": { transform: "translate3d(-4vw,-2vh,0) scale(1.06)" },
          "50%": { transform: "translate3d(6vw,3vh,0) scale(0.95)" },
          "75%": { transform: "translate3d(3vw,6vh,0) scale(1.02)" },
        },
        floatC: {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "25%": { transform: "translate3d(3vw,-2vh,0) scale(1.03)" },
          "50%": { transform: "translate3d(-7vw,6vh,0) scale(0.98)" },
          "75%": { transform: "translate3d(0,3vh,0) scale(1.01)" },
        },
        streakFlow: {
          "0%, 100%": {
            transform: "translateX(0) rotate(-12deg)",
            opacity: "0.6",
          },
          "50%": {
            transform: "translateX(-6%) rotate(-12deg)",
            opacity: "0.8",
          },
        },
      },
      animation: {
        floatA: "floatA 18s linear infinite",
        floatB: "floatB 24s linear infinite reverse",
        floatC: "floatC 30s linear infinite",
        streakFlow: "streakFlow 28s linear infinite",
      },
    },
  },
  plugins: [],
};
