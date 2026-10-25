// Lee una variable CSS de :root (los colores viven en styles/base/variables.css).
// Al prerenderizar en Node no hay documento: vite/prerender.js deja esos valores en globalThis.__CSS_VARS__
export const cssVar = name => typeof document === 'undefined'
  ? globalThis.__CSS_VARS__?.[name] ?? ''
  : getComputedStyle(document.documentElement).getPropertyValue(name).trim();
