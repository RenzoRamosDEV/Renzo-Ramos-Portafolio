// Portada de la página personal: nombre, frase, datos rápidos y foto
import { personal } from '../data/personal.js';
import { LOGO, HEADER_NAV } from '../data/site.js';
import { navLinks } from '../components/nav-links.js';
import { sectionBackground } from '../components/section-background.js';

// Los enlaces del menú llevan a las secciones de la página principal
const homeNav = HEADER_NAV.map(i => ({ ...i, href: `./${i.href}` }));

export const renderPersonalHero = () => `<section class="personal-hero">
  <header>
    <a class="logo" href="./"><img src="${LOGO.src}" alt="${LOGO.alt}"></a>

    <nav class="main">
      ${navLinks(homeNav, '      ')}
    </nav>
  </header>

  ${sectionBackground('PERSONAL')}

  <div class="personal-wrap">
    <div class="personal-intro">
      <!-- Migas de pan: Inicio › Sobre mí (también en el JSON-LD de personal.html) -->
      <nav class="kicker" aria-label="Migas de pan"><a href="./">INICIO</a> · <span aria-current="page">SOBRE MÍ</span></nav>
      <h1>${personal.name}<br><em>${personal.surname}</em></h1>
      <p>${personal.tagline}</p>
      <div class="facts">${personal.facts.map((f, i) => `<span${i === 0 ? ' class="hl"' : ''}>${f}</span>`).join('')}</div>
    </div>
    <div class="personal-photo">
      <div class="ring"></div>
      <img src="media/renzo-personal.png" alt="Renzo Ramos de los Ríos, desarrollador de software e IA en Madrid, saludando con las manos">
    </div>
  </div>
</section>`;
