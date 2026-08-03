/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        band: {
          dark: '#0a0a0a',
          light: '#f5f5f5',
          accent: '#d946ef',
        },
      },
      fontFamily: {
        sans: ['"Cooper Black Regular"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
