import type { Config } from "tailwindcss";

const colors = require('tailwindcss/colors')

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: "#00C95C",
      secondary: "#F1F2F6",
      accent: {
        700: "#1B3660",
        600: "#182c3f",
        500: "#12212f",
      },
      background: "#0D1620",
      text: {
        white: {
          700: "#ffffff",
          600: "#F1F2F6",
          500: "#E5E7EB",
          400: "#D1D5DB",
          300: "#bbbac6",
          200: "#5b6471",
        },
        black: {
          700: "#000000",
          600: "#1B1B1B",
          500: "#2E2E2E",
          400: "#4F4F4F",
        },
      },
      ...colors
    },
    screens: {
      'xs': "480px",
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
