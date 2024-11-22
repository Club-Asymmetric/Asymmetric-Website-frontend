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
      },
      keyframes: {
          zoomIn: {
            '0%':{
              transform: 'scale(0)',
              opacity: '0',
            },'100%':{
              transform: 'scale(1)',
              opacity: '1',
            },
          },
          fadeIn:{
            '0%':{
                opacity: '0',
            },'100%':{
                opacity:'1',
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
          fadeIn: "fadeIn 2s ease-in-out forwards"
        },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
