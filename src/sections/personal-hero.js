// Portada de la página personal: nombre, frase, datos rápidos y foto
import { personal } from '../data/personal.js';
import { LOGO, HEADER_NAV } from '../data/site.js';
import { navLinks } from '../components/nav-links.js';
import { menuToggle } from '../components/menu-toggle.js';
import { sectionBackground } from '../components/section-background.js';
import { picture } from '../components/picture.js';

// Los enlaces del menú llevan a las secciones de la página principal
const homeNav = HEADER_NAV.map(i => ({ ...i, href: `./${i.href}` }));

export const renderPersonalHero = () => `<section class="personal-hero">
  <header>
    <a class="logo" href="./">${picture({ ...LOGO, sizes: '250px', loading: 'eager' })}</a>

    <nav class="main" id="main-nav" aria-label="Principal">
      ${navLinks(homeNav, '      ')}
    </nav>

    ${menuToggle()}
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
      ${picture({ src: 'media/renzo-ramos-de-los-rios-sobre-mi.png', w: 1040, h: 966, priority: true, sizes: '(max-width: 1000px) 480px, 610px',
        alt: 'Renzo Ramos de los Ríos, desarrollador de software e IA en Madrid, saludando con las manos' })}
    </div>
  </div>
</section>`;
