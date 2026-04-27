import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0F172A",
        panel: "#1F2A44",
        panelSoft: "#253352",
        homicide: "#3B82F6",
        sexual: "#EC4899",
        theft: "#22C55E",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Manrope'", "sans-serif"],
      },
      boxShadow: {
        glass: "0 20px 80px rgba(15, 23, 42, 0.45)",
        glow: "0 0 0 1px rgba(255,255,255,0.08), 0 20px 70px rgba(59, 130, 246, 0.18)",
      },
      backgroundImage: {
        mesh: "radial-gradient(circle at top, rgba(59,130,246,0.18), transparent 35%), radial-gradient(circle at 80% 0%, rgba(236,72,153,0.15), transparent 25%), radial-gradient(circle at 50% 100%, rgba(34,197,94,0.14), transparent 35%)",
      },
      maxWidth: {
        "8xl": "88rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
