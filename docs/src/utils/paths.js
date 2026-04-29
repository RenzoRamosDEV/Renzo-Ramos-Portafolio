/**
 * Helper para manejar rutas de imágenes públicas
 * Agrega automáticamente el base path configurado en Vite
 * 
 * @param {string} path - Ruta relativa desde public/ (ej: '/icons/react.png')
 * @returns {string} - Ruta completa con base path
 */
export const getPublicPath = (path) => {
  // import.meta.env.BASE_URL contiene el base path configurado en vite.config.js
  const basePath = import.meta.env.BASE_URL;
  
  // Si path ya incluye basePath, no lo duplicamos
  if (path.startsWith(basePath)) {
    return path;
  }
  
  // Eliminar '/' inicial de path si existe para evitar duplicar barras
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Combinar basePath con cleanPath
  return `${basePath}${cleanPath}`;
};