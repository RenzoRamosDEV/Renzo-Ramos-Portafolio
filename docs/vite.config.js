import { defineConfig } from 'vite';

export default defineConfig({
  base: '/RenzoRamosPortafolio/',
  server: {
    port: 5173,
    open: true
  },
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: 'react'
  }
});
