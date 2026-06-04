import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Static SPA, deployed to GitHub Pages. base './' keeps asset paths relative
// so it works under any subpath without rebuild config.
export default defineConfig({
  plugins: [react()],
  base: './',
})
