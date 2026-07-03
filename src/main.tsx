import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { App } from './App'

const root = document.getElementById('root')!

const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Si el HTML viene pre-renderizado (SSG), hidrata; si no, monta normal.
if (root.hasChildNodes()) {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}
