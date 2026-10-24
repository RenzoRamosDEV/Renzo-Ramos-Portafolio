// Barra negra fina con una palabra repetida que se desliza (separa secciones)
export function nameBar(word, times) {
  const unit = `${word}<i>✦</i>`.repeat(times);
  return `<div class="name-bar" aria-hidden="true"><div class="track"><span>${unit}</span><span>${unit}</span></div></div>`;
}
