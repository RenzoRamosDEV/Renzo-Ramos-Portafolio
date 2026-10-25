import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { prerender } from './vite/prerender.js'
import { sitemap } from './vite/sitemap.js'
import { inlineCss } from './vite/inline-css.js'
import { securityMeta } from './vite/security-meta.js'
import { llms } from './vite/llms.js'

// Static SPA, deployed to GitHub Pages. base './' keeps asset paths relative
// so it works under any subpath without rebuild config.
export default defineConfig({
  // prerender: el contenido de cada sección llega ya en el HTML (ver vite/prerender.js)
  // sitemap: dist/sitemap.xml con todas las páginas e imágenes (ver vite/sitemap.js)
  // inlineCss: el CSS va dentro del HTML en el build (ver vite/inline-css.js)
  // securityMeta: CSP y Referrer-Policy como <meta> en el build (ver vite/security-meta.js)
  // llms: llms.txt y llms-full.txt para asistentes de IA (ver vite/llms.js)
  plugins: [react(), prerender(), sitemap(), inlineCss(), securityMeta(), llms()],
  base: './',
  build: {
    // Dos páginas: la principal y la personal
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        personal: fileURLToPath(new URL('./personal.html', import.meta.url)),
      },
    },
  },
})
