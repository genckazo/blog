import { defineConfig } from 'astro/config';

// Repo: genckazo/blog -> served by GitHub Pages at https://genckazo.github.io/blog/
// To serve at the root https://genckazo.github.io/ instead, rename the repo to
// "genckazo.github.io" and set base: '/' (see README).
export default defineConfig({
  site: 'https://genckazo.github.io',
  base: '/blog',
  output: 'static',
  trailingSlash: 'always',
});
