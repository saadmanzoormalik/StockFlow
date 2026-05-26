import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#15202B",
        line: "#D9E2EC",
        panel: "#F7FAFC",
        growth: "#147D64",
        caution: "#B7791F",
        danger: "#C53030",
        signal: "#2B6CB0"
      },
      boxShadow: {
        soft: "0 18px 45px rgba(21, 32, 43, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
