import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

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
        "gc-dark-blue": "rgb(var(--bg) / <alpha-value>)",
        "gc-mid-blue": "rgb(var(--line) / <alpha-value>)",
        "gc-gold": "rgb(var(--accent) / <alpha-value>)",
        "gc-cream": "rgb(var(--ink) / <alpha-value>)",
        "gc-warm": "rgb(var(--soft) / <alpha-value>)",
        "gc-body": "rgb(var(--ink) / <alpha-value>)",
        "gc-dim": "rgb(var(--muted) / <alpha-value>)",
        "gc-rose": "rgb(var(--accent) / <alpha-value>)",
        "gc-red": "rgb(var(--negative) / <alpha-value>)",
        "gc-green": "rgb(var(--positive) / <alpha-value>)",
      },
      fontFamily: {
        serif: ["GCDisplay", "Helvetica Neue", "Arial", "sans-serif"],
        sans: ["GCText", "Helvetica Neue", "Arial", "sans-serif"],
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
  plugins: [animate],
};

export default config;
