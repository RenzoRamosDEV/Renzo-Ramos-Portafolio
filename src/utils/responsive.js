// Versiones WebP de cada imagen: anchos de 480, 960 y 1600 px (sin agrandar nunca el original).
// La usan el componente picture() y scripts/images.mjs, que genera los archivos en public/opt/
export const WIDTHS = [480, 960, 1600];

export const widthsFor = w => [...new Set([...WIDTHS.filter(x => x < w), Math.min(w, WIDTHS.at(-1))])];

// "media/foto.png" + 480 → "opt/media/foto-480.webp"
export const webpPath = (src, w) => `opt/${src.replace(/^\.?\//, '').replace(/\.\w+$/, '')}-${w}.webp`;
