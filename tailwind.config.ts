import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

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
        background: "#0A0A0A",
        card: "#18181B",
        border: "#27272A",
        primary: "#22C55E",
        "primary-dim": "#16A34A",
        foreground: "#FFFFFF",
        muted: "#A1A1AA",
        "card-hover": "#1E1E21",
      },
      fontFamily: {
        sans: ["Space Grotesk", "system-ui", "sans-serif"],
        display: ["Outfit", "system-ui", "sans-serif"],
      },
      animation: {
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(34,197,94,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(34,197,94,0.6)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(34,197,94,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.03) 1px, transparent 1px)",
        "hero-gradient":
          "radial-gradient(ellipse at 50% 0%, rgba(34,197,94,0.15) 0%, transparent 60%)",
        "card-gradient":
          "linear-gradient(135deg, rgba(34,197,94,0.05) 0%, transparent 60%)",
      },
      backgroundSize: {
        "grid": "50px 50px",
      },
      boxShadow: {
        "glow-sm": "0 0 15px rgba(34,197,94,0.2)",
        "glow-md": "0 0 30px rgba(34,197,94,0.3)",
        "glow-lg": "0 0 60px rgba(34,197,94,0.4)",
        "card": "0 4px 24px rgba(0,0,0,0.4)",
        "card-hover": "0 8px 40px rgba(0,0,0,0.6), 0 0 20px rgba(34,197,94,0.15)",
      },
    },
  },
  plugins: [animate],
};

export default config;
