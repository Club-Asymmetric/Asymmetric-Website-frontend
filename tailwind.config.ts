import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
