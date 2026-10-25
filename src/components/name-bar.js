// Barra negra fina con una palabra repetida que se desliza (separa secciones).
// Cada mitad de la cinta se repite 4 veces más de lo pedido para que cubra hasta pantallas de 5120px
// (si no, en pantallas anchas se veía el fondo negro); la duración se multiplica igual para mantener la velocidad
const COVER = 4;

export function nameBar(word, times) {
  const unit = `${word}<i>✦</i>`.repeat(times * COVER);
  return `<div class="name-bar" aria-hidden="true"><div class="track" style="animation-duration:${30 * COVER}s"><span>${unit}</span><span>${unit}</span></div></div>`;
}
