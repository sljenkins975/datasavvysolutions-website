import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Use the future GitHub Pages address until a custom-domain change is approved.
export default defineConfig({
  site: 'https://sljenkins975.github.io',
  base: '/datasavvysolutions-website',
  trailingSlash: 'always',
  output: 'static',
  integrations: [sitemap({ filter: (page) => !page.endsWith('/404/') })],
  vite: { plugins: [tailwindcss()] },
});
