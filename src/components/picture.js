// Imagen con versiones WebP responsive (srcset) y la original como respaldo.
// w y h son las dimensiones de la original: evitan saltos de diseño (CLS). alt="" para las decorativas
import { widthsFor, webpPath } from '../utils/responsive.js';

export function picture({ src, w, h, alt, sizes, cls = '', loading = 'lazy', priority = false, attrs = '' }) {
  const srcset = widthsFor(w).map(x => `${webpPath(src, x)} ${x}w`).join(', ');
  const decorative = alt === '' ? ' role="presentation"' : '';
  const load = priority ? ' fetchpriority="high"' : ` loading="${loading}"`;
  return `<picture><source type="image/webp" srcset="${srcset}" sizes="${sizes}"><img${cls ? ` class="${cls}"` : ''} src="${src}" alt="${alt}"${decorative} width="${w}" height="${h}"${load} decoding="async"${attrs}></picture>`;
}
