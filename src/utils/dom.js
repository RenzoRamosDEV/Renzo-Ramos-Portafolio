// Helpers de DOM

export const $ = id => document.getElementById(id);

// Sustituye el marcador <div data-mount="nombre"> de index.html por el markup dado
export function mount(name, markup) {
  const slot = document.querySelector(`[data-mount="${name}"]`);
  const tpl = document.createElement('template');
  tpl.innerHTML = markup;
  slot.replaceWith(tpl.content);
}
