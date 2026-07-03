import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { App } from './App'

/** Renderiza la app a HTML estático para el pre-render (SSG) en build. */
export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
