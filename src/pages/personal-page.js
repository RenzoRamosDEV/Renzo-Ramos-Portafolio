// Contenido de la página personal: un markup por marcador <div data-mount="…"> de personal.html, en orden
import { FOOTER_NAV } from '../data/site.js';
import { nameBar } from '../components/name-bar.js';
import { renderPersonalHero } from '../sections/personal-hero.js';
import { renderPersonalStory } from '../sections/personal-story.js';
import { renderFooter } from '../sections/footer.js';

// Los enlaces del pie llevan a las secciones de la página principal
const homeNav = FOOTER_NAV.map(i => ({ ...i, href: `./${i.href}` }));

export const personalSlots = () => ({
  'personal-hero': renderPersonalHero(),
  'bar-renzo': nameBar('RENZO', 18),
  'personal-story': renderPersonalStory(),
  'bar-ramos': nameBar('RAMOS', 18),
  'footer': renderFooter(homeNav),
});
