const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeInOutUp: {
          '0%': {
            opacity: 0,
            transform: 'translateY(100vh)',
            visibility: 'visible',
          },

          '25%, 50%, 75%': {
            opacity: 1,
            transform: 'translateY(25vh)',
          },

          '100%': {
            opacity: 0,
            visibility: 'hidden',
          },
        },
      },
      animation: {
        fadeInOutUp: 'fadeInOutUp 4s linear',
      },
    },
  },
  plugins: [
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          "animation-delay": (value) => {
            return {
              "animation-delay": value,
            };
          },
        },
        {
          values: theme("transitionDelay"),
        }
      );
    }),
  ],
}
