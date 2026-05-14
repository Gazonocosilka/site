import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#050505",
          900: "#0F0F10",
          800: "#161618",
          700: "#1F1F22",
        },
        bone: {
          50: "#F5F5F3",
          200: "#C9C7C2",
          400: "#7A7F87",
        },
        glow: {
          blue: "#8BA8FF",
          violet: "#B7A7FF",
          holo: "#D6D6FF",
          pink: "#FFDEE9",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
        mono: ["ui-monospace", "SFMono-Regular", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.06em",
        tighter: "-0.04em",
      },
      transitionTimingFunction: {
        cinema: "cubic-bezier(0.22, 1, 0.36, 1)",
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
