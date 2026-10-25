// Portada: cabecera, enlaces sociales, aros giratorios, nombre, foto, humo e insignia
import { LOGO, HEADER_NAV, GITHUB_URL, LINKEDIN_URL, GITHUB_ICON, LINKEDIN_ICON } from '../data/site.js';
import { navLinks } from '../components/nav-links.js';
import { socialLink } from '../components/social-link.js';
import { outerRings, innerDial } from '../svg/rings.js';
import { circleText } from '../svg/circle-text.js';

export const renderHero = () => `<section class="hero">
  <header>
    <a class="logo" href="#"><img src="${LOGO.src}" alt="${LOGO.alt}"></a>

    <nav class="main">
      ${navLinks(HEADER_NAV, '      ')}
    </nav>

  </header>

  <div class="tags">
    ${socialLink({ href: GITHUB_URL, icon: GITHUB_ICON, label: 'GITHUB' })}
    ${socialLink({ href: LINKEDIN_URL, icon: LINKEDIN_ICON, label: 'LINKEDIN' })}
  </div>


  ${outerRings()}
  <div class="circle"></div>
  ${innerDial()}
  <div class="orbit"></div>
  <!-- Se ve "RENZO"; el resto del H1 (quién es y dónde) lo leen buscadores y lectores de pantalla -->
  <h1 class="title"><span>RENZO</span><span class="sr-only"> Ramos, Junior AI Engineer y desarrollador de software en Madrid</span></h1>

  <canvas class="smoke back" id="smoke-back"></canvas>

  <img class="person" src="media/renzo.png" alt="Renzo">
  <canvas class="smoke front" id="smoke-front"></canvas>


  <div class="cta">
    <div class="badge">
      ${circleText({ cls: 'ring', size: 104, radius: 40, pathId: 'circ', textLength: 251, text: 'RENZO · RAMOS · RENZO · RAMOS · RENZO · RAMOS ·' })}
      <div class="core"><img src="media/emblem.png" alt=""></div>
    </div>
  </div>
</section>`;
