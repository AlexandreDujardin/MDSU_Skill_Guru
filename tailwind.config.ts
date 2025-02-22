import { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      fontSize: {
        "h1-d": ["48px", { lineHeight: "150%" }],
        "h2-d": ["38px", { lineHeight: "150%" }],
        "h3-d": ["34px", { lineHeight: "150%" }],
        "h1-m": ["32px", { lineHeight: "150%" }],
        "h2-m": ["28px", { lineHeight: "150%" }],
        "h3-m": ["24px", { lineHeight: "150%" }],
        "title1-d": ["28px", { lineHeight: "150%" }],
        "title2-d": ["24px", { lineHeight: "150%" }],
        "title3-d": ["22px", { lineHeight: "150%" }],
        "subtitle": ["15px", { lineHeight: "150%" }],
        "overline": ["15px", { lineHeight: "150%" }],
        "title1-m": ["22px", { lineHeight: "150%" }],
        "title2-m": ["20px", { lineHeight: "150%" }],
        "title3-m": ["18px", { lineHeight: "150%" }],
        "body1": ["18px", { lineHeight: "150%" }],
        "body2": ["16px", { lineHeight: "150%" }],
        "body3": ["14px", { lineHeight: "150%" }],
        "caption": ["12px", { lineHeight: "150%" }],
      },
      colors: {
        // 🎨 🎯 BUTTONS STYLES
        button: {
          primary: {
            DEFAULT: "#823B79",
            hover: "#62205A", 
            pressed: "#4C1545",
            disabled: "#E7E7E7",
          },
          secondary: {
            DEFAULT: "#FFFEFD",
            secondary: "#823B79", 
            hover: "#62205A", 
            pressed: "#4C1545",
            disabled: "#E7E7E7",
          },
          tertiary: {
            DEFAULT: "#FFFEFD",
            hover: "#F3EDE4", 
            pressed: "#CDC4B6",
            disabled: "#E7E7E7",
          },
        },
        // 🎨 🎯 TEXT COLORS
        text: {
          primary: "#3F0C38",
          secondary: "#7D7F7F",
          tertiary: "#383A3A",
          disabled: "#A0A1A1",
          alternative: "#FFFEFD",
          success: "#38862C",
          info: "#005F79",
          warning: "#BC560A",
          error: "#A10833",
        },

        // 🎨 🎯 BACKGROUND COLORS
        background: {
          primary: "#FFFEFD",
          secondary: "#3F0C38",
          surface: "#F5F8F8",
          elevated: "#FFFEFD",
          success: "62205A",
          info: "#EDFBFF",
          warning: "#FFF6EC",
          error: "#FFF5F8",
        },

        // 🎨 🎯 BORDER COLORS
        border: {
          default: "#E7E7E7",
          hover: "#A0A1A1",
          active: "#62205A",
          success: "#61C851",
          info: "#00C3FF",
          warning: "#E4963E",
          error: "#E50C4A",
        },

        // 🎨 🎯 OTHER COMPONENT COLORS
        input: "#F4F8F8",
        ring: "#621F59",
        sidebar: {
          DEFAULT: "#FAFAFA",
          foreground: "#333333",
          primary: "#6A0DAD",
          "primary-foreground": "#FFFFFF",
          accent: "#03A9F4",
          "accent-foreground": "#FFFFFF",
          border: "#E6E6E6",
          ring: "#621F59"
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
