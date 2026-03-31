import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        foreground: "#ffffff",
        muted: "#444444",
        "muted-light": "#666666",
        subtle: "#1a1a1a",
        "subtle-border": "#151515",
      },
      fontFamily: {
        display: ["var(--font-display)", "Playfair Display", "serif"],
        body: ["var(--font-body)", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
