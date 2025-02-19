import { Config } from 'tailwindcss';

const config: Config = {
  theme: {
    extend: {
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      fontSize: {
        // Headlines (Desktop)
        "h1-d": ["48px", { lineHeight: "150%" }],
        "h2-d": ["38px", { lineHeight: "150%" }],
        "h3-d": ["34px", { lineHeight: "150%" }],
        // Headlines (Mobile)
        "h1-m": ["32px", { lineHeight: "150%" }],
        "h2-m": ["28px", { lineHeight: "150%" }],
        "h3-m": ["24px", { lineHeight: "150%" }],
        // Titles (Desktop)
        "title1-d": ["28px", { lineHeight: "150%" }],
        "title2-d": ["24px", { lineHeight: "150%" }],
        "title3-d": ["22px", { lineHeight: "150%" }],
        "subtitle": ["15px", { lineHeight: "150%" }],
        "overline": ["15px", { lineHeight: "150%" }],
        // Titles (Mobile)
        "title1-m": ["22px", { lineHeight: "150%" }],
        "title2-m": ["20px", { lineHeight: "150%" }],
        "title3-m": ["18px", { lineHeight: "150%" }],
        // Body
        "body1": ["18px", { lineHeight: "150%" }],
        "body2": ["16px", { lineHeight: "150%" }],
        "body3": ["14px", { lineHeight: "150%" }],
        "caption": ["12px", { lineHeight: "150%" }],
      },
      colors: {
        primary: "#6A0DAD",
        secondary: "#FF9800",
        accent: "#03A9F4", 
        neutral: "#F5F5F5", 
        muted: "#9E9E9E", 
        destructive: "#D32F2F",
        background: "#FFFFFF",
        foreground: "#000000",
      },
    },
  },
};

export default config;
