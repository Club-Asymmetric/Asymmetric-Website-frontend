import test from "node:test";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'ass-gradient': 'linear-gradient(138deg, #080b09 26.48%, rgba(0, 10, 50, 0.60) 48.68%, rgba(0, 0, 139, 0.45) 81.92%)'
      },
      backgroundColor: {
        'ass-button': 'rgba(0, 0, 139, 0.85)'
      },
      keyframes: {
        zoomIn: {
          '0%': {
            transform: 'scale(0)',
            opacity: '0',
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '1',
          },
        },
        fadeIn: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        fadeOut:{
          '0%': {
            opacity: '1',
          },
          '100%': {
            opacity: '0',
          },
        },
        skewIn: {
          '0%': {
            transform: 'skewY(0deg)',
            opacity: '0',
          },
          '100%': {
            transform: 'skewY(20deg)',
            opacity: '1',
          },
        },
        tilt: {
          '0%': {
            transform: 'perspective(1000px) rotateY(0deg)',
          },
          '100%': {
            transform: 'perspective(1000px) rotateY(10deg)',
          },
        },
        slideRight: {
          '0%': {
            transform: 'translateX(-100%)',
          },
          '100%': {
            transform: 'translateX(0)',
          },
        },
        slideLeft:{
          '0%': {
            transform: 'translateX(100%)',
          },
          '100%': {
            transform: 'translateX(0)',
          },
        },
        rotateIn : {
          '0%': {
            transform: 'rotate(0deg) translateY(-100%)',
          },
          '100%': {
            transform: 'rotate(360deg) translateY(0)',
          },
        },
        slideup:{
          '0%': {
            transform: 'translateY(100%)',
          },
          '100%': {
            transform: 'translateY(0)',
          },
        },
      },
      fontFamily: {
        outfit: ['var(--font-outfit)', 'sans-serif'],
        oswald: ['var(--font-oswald)', 'sans-serif'],
        aBeeZee: ['var(--font-ABeeZee)', 'sans-serif'],
        parisienne: ['var(--font-parisienne)', 'sans-serif'],
        nicoMoji: ['var(--font-nicomoji)', 'sans-serif'],
        metal: ['var(--font-metal)', 'sans-serif'],
        imprintMTShadow: ['var(--font-imprintMTShadow)', 'sans-serif'],
        'geist-sans': ['var(--font-geist-sans)', 'sans-serif'],
      },
      animation: {
        zoomIn: "zoomIn 1s ease-in-out forwards",
        fadeIn: "fadeIn 2s ease-in-out forwards",
        tilt: "tilt 1s ease-in-out forwards",
        slideRight: "slideRight 1s ease-in-out",
        slideLeft: "slideLeft 1s ease-in-out",
        rotateIn: "rotateIn 2s ease-in-out forwards",
        fadeOut: "fadeOut 1s ease-in-out forwards",
        slideup: "slideup 1s ease-in-out forwards",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
