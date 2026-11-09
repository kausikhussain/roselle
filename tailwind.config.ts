import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        roselle: {
          dark: "#140204",
          burgundy: "#280308",
          wine: "#42050E",
          ruby: "#5C0612",
          crimson: "#6E0B1A",
          garnet: "#8A1224",
          rose: "#D48D76",
          gold: "#E5A995",
          gilt: "#E6B97A",
          champagne: "#F3DFC1",
          silk: "#F7ECE1",
          cream: "#FAF7F2",
          blush: "#E8A29A",
          powder: "#FCEEEB",
          petal: "#D95B72",
        },
      },
      fontFamily: {
        serif: ["var(--font-bodoni)", "Didot", "Bodoni MT", "Cinzel", "serif"],
        sans: ["var(--font-inter)", "Helvetica Neue", "Arial", "sans-serif"],
      },
      boxShadow: {
        "luxury-sm": "0 4px 20px -2px rgba(92, 6, 18, 0.25)",
        "luxury-md": "0 10px 40px -4px rgba(66, 5, 14, 0.45)",
        "luxury-lg": "0 20px 60px -8px rgba(20, 2, 4, 0.7)",
        "gold-glow": "0 0 35px rgba(229, 169, 149, 0.35)",
        "ruby-glow": "0 0 45px rgba(110, 11, 26, 0.5)",
      },
      letterSpacing: {
        widest: "0.25em",
        ultra: "0.35em",
      },
      animation: {
        "float-slow": "float 8s ease-in-out infinite",
        "pulse-subtle": "pulseSubtle 4s ease-in-out infinite",
        "spin-slow": "spin 24s linear infinite",
        "marquee": "marquee 35s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.75" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
