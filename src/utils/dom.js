// Helpers de DOM

export const $ = id => document.getElementById(id);

// Sustituye los marcadores <div data-mount="nombre"> por su markup. En el build el HTML ya llega
// prerenderizado (vite/prerender.js) y no queda ningún marcador, así que no hace nada
export function mountSlots(slots) {
  if (!document.querySelector('[data-mount]')) return;
  for (const [name, markup] of Object.entries(slots())) {
    const slot = document.querySelector(`[data-mount="${name}"]`);
    if (!slot) continue;
    const tpl = document.createElement('template');
    tpl.innerHTML = markup;
    slot.replaceWith(tpl.content);
  }
}
