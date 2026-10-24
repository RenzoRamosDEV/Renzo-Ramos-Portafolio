// Fondo animado de sección: trama de puntos + palabra gigante en contorno deslizándose en dos filas
export function sectionBackground(word) {
  const run = ` ${word} ·`.repeat(6);
  return `<div class="bg-dots" aria-hidden="true"></div>
  <div class="bg-word" aria-hidden="true">
    <div class="row"><span>${run}</span><span>${run}</span></div>
    <div class="row rev"><span>${run}</span><span>${run}</span></div>
  </div>`;
}
