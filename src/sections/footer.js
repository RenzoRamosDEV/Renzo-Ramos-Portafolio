// Pie de página: logo, navegación, botón de volver arriba y créditos
import { LOGO, FOOTER_NAV } from '../data/site.js';
import { navLinks } from '../components/nav-links.js';
import { circleText } from '../svg/circle-text.js';
import { arrowUp } from '../svg/icons.js';
import { $ } from '../utils/dom.js';

// nav: enlaces del pie (por defecto, a las secciones de esta misma página)
export const renderFooter = (nav = FOOTER_NAV) => `<footer class="footer">
  <div class="top">
    <img class="logo" src="${LOGO.src}" alt="${LOGO.alt}">
    <nav>
      ${navLinks(nav, '      ')}
    </nav>
    <button class="to-top" id="to-top" aria-label="Volver arriba">
      ${circleText({ cls: 'spin', size: 104, radius: 40, pathId: 'top-circ', textLength: 251, text: 'VOLVER ARRIBA · VOLVER ARRIBA ·', ariaHidden: true })}
      <span class="core">${arrowUp}</span>
    </button>
  </div>
  <div class="bottom">
    <span>© <span id="year"></span> RENZO RAMOS · TODOS LOS DERECHOS RESERVADOS</span>
    <span>HECHO CON MIS <b>MANOS</b> Y MUCHOS <b>CAFÉS</b></span>
  </div>
</footer>`;

export function initFooter() {
  $('year').textContent = new Date().getFullYear();
  $('to-top').onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
}
