// Lee una variable CSS de :root (los colores viven en styles/base/variables.css)
export const cssVar = name => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
