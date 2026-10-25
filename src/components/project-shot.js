// Pantalla del portátil: las capturas del proyecto (se van pasando) enlazadas al proyecto o, si no hay, una captura de relleno
import { picture } from './picture.js';

const SIZES = '(max-width: 1000px) calc(100vw - 32px), 820px';

export function projectShot(p, eager = false) {
  if (!p.images?.length)
    return `<div class="shot" style="--c1:${p.c1};--c2:${p.c2}"><div class="bar"><i></i><i></i><i></i></div><div class="blob"></div>
         <div class="sh-hero"><div class="t"></div><div class="t s"></div><div class="btn"></div></div><div class="cards"><i></i><i></i><i></i></div></div>`;
  const href = p.live || p.code;
  const slides = p.images.map((img, n) => picture({
    src: img.src, w: 1536, h: 800, alt: img.alt, sizes: SIZES,
    cls: n ? 'slide' : 'slide cur', loading: n || !eager ? 'lazy' : 'eager', attrs: n ? ' aria-hidden="true"' : '',
  })).join('');
  const box = href
    ? `<a class="slides" href="${href}" target="_blank" rel="noopener" aria-label="Abrir ${p.name} (pestaña nueva)">${slides}</a>`
    : `<div class="slides">${slides}</div>`;
  return `${box}
         <div class="slide-dots" aria-hidden="true">${p.images.map((_, n) => `<i${n ? '' : ' class="on"'}></i>`).join('')}</div>`;
}
