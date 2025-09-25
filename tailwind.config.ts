import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        washappYellow: "#FFF5D7",
        washappBlue: "#0A2A45"
      }
    }
  },
  plugins: []
};

export default config;
