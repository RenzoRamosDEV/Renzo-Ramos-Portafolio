// Pantalla del portátil: varias capturas que se van pasando, una sola captura o, si no hay, una captura de relleno
export const projectShot = p => p.images?.length
  ? `<div class="slides">${p.images.map((src, n) => `<img class="slide${n ? '' : ' cur'}" src="${src}" alt="${n ? '' : p.name}"${n ? ' loading="lazy" aria-hidden="true"' : ''} decoding="async">`).join('')}</div>
         <div class="slide-dots" aria-hidden="true">${p.images.map((_, n) => `<i${n ? '' : ' class="on"'}></i>`).join('')}</div>`
  : p.image
  ? `<img src="${p.image}" alt="${p.name}">`
  : `<div class="shot" style="--c1:${p.c1};--c2:${p.c2}"><div class="bar"><i></i><i></i><i></i></div><div class="blob"></div>
         <div class="sh-hero"><div class="t"></div><div class="t s"></div><div class="btn"></div></div><div class="cards"><i></i><i></i><i></i></div></div>`;
