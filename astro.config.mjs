// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://syncwave.example.com', // TODO: URL de production
  vite: {
    plugins: [tailwindcss()],
  },
});
