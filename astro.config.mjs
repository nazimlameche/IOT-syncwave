// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

export default defineConfig({
  // TODO: URL de production
  site: 'https://syncwave.example.com',

  vite: {
    plugins: [tailwindcss()],
    // Dépendances des îlots du hero pré-bundlées au démarrage du serveur de dev : ogl
    // n'est importé qu'en dynamique (HeroBackground), et les découvrir tard provoque un 504 « Outdated Optimize Dep ».
    optimizeDeps: {
      include: ['ogl', 'gsap', 'gsap/ScrollTrigger', 'motion/react'],
    },
  },

  integrations: [react()],
});