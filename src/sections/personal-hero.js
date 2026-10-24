// Portada de la página personal: nombre, frase, datos rápidos y foto
import { personal } from '../data/personal.js';
import { LOGO, HEADER_NAV } from '../data/site.js';
import { navLinks } from '../components/nav-links.js';
import { sectionBackground } from '../components/section-background.js';

const randomPhoto = () => personal.photos[Math.floor(Math.random() * personal.photos.length)];

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
      <div class="kicker">PERSONAL · SOBRE MÍ</div>
      <h1>${personal.name}<br><em>${personal.surname}</em></h1>
      <p>${personal.tagline}</p>
      <div class="facts">${personal.facts.map((f, i) => `<span${i === 0 ? ' class="hl"' : ''}>${f}</span>`).join('')}</div>
    </div>
    <div class="personal-photo">
      <div class="ring"></div>
      <img src="${randomPhoto()}" alt="Renzo Ramos">
    </div>
  </div>
</section>`;
