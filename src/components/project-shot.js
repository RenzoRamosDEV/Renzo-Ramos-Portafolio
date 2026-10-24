// Pantalla del portátil: la captura del proyecto o, si no hay, una captura de relleno
export const projectShot = p => p.image
  ? `<img src="${p.image}" alt="${p.name}">`
  : `<div class="shot" style="--c1:${p.c1};--c2:${p.c2}"><div class="bar"><i></i><i></i><i></i></div><div class="blob"></div>
         <div class="sh-hero"><div class="t"></div><div class="t s"></div><div class="btn"></div></div><div class="cards"><i></i><i></i><i></i></div></div>`;
