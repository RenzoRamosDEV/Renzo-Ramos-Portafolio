// Portada: cabecera, enlaces sociales, aros giratorios, nombre, foto, humo e insignia
import { LOGO, HEADER_NAV, GITHUB_URL, LINKEDIN_URL, GITHUB_ICON, LINKEDIN_ICON } from '../data/site.js';
import { navLinks } from '../components/nav-links.js';
import { socialLink } from '../components/social-link.js';
import { outerRings, innerDial } from '../svg/rings.js';
import { circleText } from '../svg/circle-text.js';
import { picture } from '../components/picture.js';

export const renderHero = () => `<section class="hero">
  <header>
    <a class="logo" href="#">${picture({ ...LOGO, sizes: '250px', loading: 'eager' })}</a>

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

  ${picture({ src: 'media/renzo-ramos-desarrollador-ia-madrid-portada.png', w: 931, h: 1302, cls: 'person', priority: true,
    alt: 'Renzo Ramos, Junior AI Engineer en Madrid, con máscara blanca y sudadera negra', sizes: '(max-width: 640px) 460px, 630px' })}
  <canvas class="smoke front" id="smoke-front"></canvas>


  <div class="cta">
    <div class="badge">
      ${circleText({ cls: 'ring', size: 104, radius: 40, pathId: 'circ', textLength: 251, text: 'RENZO · RAMOS · RENZO · RAMOS · RENZO · RAMOS ·', ariaHidden: true })}
      <div class="core">${picture({ src: 'media/renzo-ramos-emblema.png', w: 160, h: 160, alt: '', sizes: '58px' })}</div>
    </div>
  </div>
</section>`;
