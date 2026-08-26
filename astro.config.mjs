// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Canonical origin. Every canonical URL, the sitemap, robots.txt and the
  // og:image URL derive from this one value — if the live domain changes,
  // change it here and nowhere else.
  site: 'https://aayushsapkota.vercel.app',
  integrations: [
    sitemap({
      // The two /projects/<slug> filter pages are the same listing re-sorted,
      // so they would be near-duplicates in the index.
      filter: (page) => !page.includes('/projects/?'),
      changefreq: 'monthly',
      lastmod: new Date(),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
