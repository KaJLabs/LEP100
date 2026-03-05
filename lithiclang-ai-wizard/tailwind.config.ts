import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "Segoe UI", "Roboto", "Helvetica", "Arial"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "Liberation Mono"],
      },
      colors: {
        bg: "rgb(10 10 12)",
        panel: "rgb(16 16 20)",
        border: "rgb(34 34 40)",
        muted: "rgb(150 150 160)",
        brand: "rgb(170 120 255)",
      },
    },
  },
  plugins: [],
} satisfies Config;
