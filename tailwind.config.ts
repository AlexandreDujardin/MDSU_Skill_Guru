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
        primary: { DEFAULT: "#6A0DAD", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "#FF9800", foreground: "hsl(var(--secondary-foreground))" },
        accent: { DEFAULT: "#03A9F4", foreground: "hsl(var(--accent-foreground))" },
        neutral: "#F5F5F5",
        muted: { DEFAULT: "#9E9E9E", foreground: "hsl(var(--muted-foreground))" },
        destructive: { DEFAULT: "#D32F2F", foreground: "hsl(var(--destructive-foreground))" },
        background: "#FFFFFF",
        foreground: "#000000",
        border: "#E6E6E6",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))"
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))"
        }
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
