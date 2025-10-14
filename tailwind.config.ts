// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./app/**/*.{ts,tsx,js,jsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1rem", sm: "1rem" },
      screens: { sm: "640px", md: "768px", lg: "1024px" },
    },
    extend: {
      colors: {
        wash: {
          bg: "#FFF9ED",          // Fondo crema original de washapp1
          primary: "#3E95D6",     // Azul celeste corporativo
          accent: "#FFD84D",      // Amarillo para promociones o botones
          bannerDark: "#0A2A45",  // Azul profundo para headers oscuros
          bannerLight: "#FFD100", // Amarillo brillante alternativo
          success: "#4CAF50",     // Verde confirmación
          error: "#F44336",       // Rojo error o alertas
        },
      },
      boxShadow: {
        card: "0 6px 18px rgba(0,0,0,0.08)", // Sombra suave de tarjetas
      },
      borderRadius: {
        xl: "14px",
        "2xl": "20px",
      },
      fontFamily: {
        sans: ["'Montserrat'", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"), // mejora inputs, selects y textareas
  ],
};

export default config;
