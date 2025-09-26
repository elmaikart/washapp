// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1rem", sm: "1rem" },
      screens: { sm: "640px", md: "768px", lg: "1024px" },
    },
    extend: {
      colors: {
        wash: {
          bg: "#FFF5D7",        // crema de fondo
          primary: "#0A2A45",   // azul marca
          accent: "#FFD84D",    // amarillo promos
          bannerDark: "#0A2A45",
          bannerLight: "#FFD100",
        },
      },
      boxShadow: {
        card: "0 6px 18px rgba(0,0,0,0.08)",
      },
      borderRadius: {
        xl: "14px",
        "2xl": "20px",
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "Segoe UI", "Roboto", "Helvetica", "Arial"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

export default config;

