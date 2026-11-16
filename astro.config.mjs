import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

export default defineConfig({
  output: 'static',
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    icon({
      include: {
        'simple-icons': ['instagram', 'youtube'],
      },
    }),
  ],
  site: 'https://cosmikmuffinsite.vercel.app',
});
