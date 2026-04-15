import type { Config } from "tailwindcss";
import { BRAND } from "./lib/training/constants";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "gc-dark-blue": BRAND.DARK_BLUE,
        "gc-mid-blue": BRAND.MID_BLUE,
        "gc-gold": BRAND.GOLD,
        "gc-cream": BRAND.CREAM,
        "gc-warm": BRAND.WARM,
        "gc-body": BRAND.BODY_TEXT,
        "gc-dim": BRAND.DIM,
        "gc-rose": BRAND.ROSE,
        "gc-red": BRAND.RED_ACCENT,
        "gc-green": BRAND.GREEN_ACCENT,
      },
      fontFamily: {
        serif: ["Georgia", "Times New Roman", "serif"],
        sans: ["Helvetica Neue", "Helvetica", "Arial", "system-ui", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
