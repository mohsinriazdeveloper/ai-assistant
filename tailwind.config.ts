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
      // animation: {
      //   spinSlow: "spin 5s linear infinite",
      // },
      keyframes: {
        // spin: {
        //   from: { transform: "rotate(0deg)" },
        //   to: { transform: "rotate(360deg)" },
        // },
        pulseExpandContract: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.2)" },
        },
      },
      animation: {
        slowSpin: "spin 5s linear infinite",
        slowPulse: "pulseExpandContract 2s ease-in-out infinite",
      },
      fontFamily: {
        customQuicksand: ["Quicksand"],
      },
    },
    screens: {
      xxs: "350px",
      xs: "450px",
      sm: "640px", //@media (min-width: 640px) { ... }
      md: "768px", //@media (min-width: 768px) { ... }
      tab: "950px",
      lg: "1024px", //@media (min-width: 1024px) { ... }
      xl: "1280px", //@media (min-width: 1280px) { ... }
      "2xl": "1537px", //@media (min-width: 1536px) { ... }
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
export default config;
