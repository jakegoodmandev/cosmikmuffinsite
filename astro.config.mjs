import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

export default defineConfig({
  output: 'static',
  adapter: vercel({
    imageService: true,
  }),
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
