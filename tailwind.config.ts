import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        gray: {
          50: "#FAFAFA",
          200: "#E5E5E5",
          300: "#71717A",
          900: "#3F3F46",
        },
        red: {
          400: "#F15656",
          500: "#EF4444",
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
export default config;
