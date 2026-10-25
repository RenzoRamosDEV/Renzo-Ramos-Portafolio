// Sello giratorio de un certificado (botón que abre el visor)
import { circleText } from '../svg/circle-text.js';
import { pad } from '../utils/format.js';

export const seal = (c, i) => `
      <button class="seal" data-i="${i}">
        <span class="sr-only">Ver certificado</span>
        <span class="ring-wrap" style="display:block">
          ${circleText({
            cls: 'ring', size: 230, radius: 95, pathId: `seal-path-${i}`, textLength: 595, ariaHidden: true,
            inner: '\n            <circle class="dash" cx="115" cy="115" r="80"/>',
            text: `${c.title} · ${c.org} · ${c.year} · `,
          })}
          <span class="core"><b>${pad(i + 1)}</b></span>
        </span>
        <h3>${c.title}</h3><small>${c.org} · ${c.year}</small>
      </button>`;
