// Capítulo de la historia en la página personal: número, título, etiqueta y texto
import { pad } from '../utils/format.js';

export const storyRow = (c, i) => `
      <article class="story-row">
        <div class="n">${pad(i + 1)}</div>
        <div><h3>${c.title}</h3><div class="meta">${c.meta}</div></div>
        <p>${c.text}</p>
      </article>`;
