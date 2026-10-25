import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { prerender } from './vite/prerender.js'

// Static SPA, deployed to GitHub Pages. base './' keeps asset paths relative
// so it works under any subpath without rebuild config.
export default defineConfig({
  // prerender: el contenido de cada sección llega ya en el HTML (ver vite/prerender.js)
  plugins: [react(), prerender()],
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
