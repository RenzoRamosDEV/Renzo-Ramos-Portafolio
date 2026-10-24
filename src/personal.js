// Punto de entrada de la página personal (personal.html)
import './styles/main.css';
import './styles/pages/personal.css';
import { mount } from './utils/dom.js';
import { FOOTER_NAV } from './data/site.js';
import { nameBar } from './components/name-bar.js';
import { renderPersonalHero } from './sections/personal-hero.js';
import { renderPersonalStory, initPersonalStory } from './sections/personal-story.js';
import { renderFooter, initFooter } from './sections/footer.js';

// Los enlaces del pie llevan a las secciones de la página principal
const homeNav = FOOTER_NAV.map(i => ({ ...i, href: `./${i.href}` }));

mount('personal-hero', renderPersonalHero());
mount('bar-renzo', nameBar('RENZO', 18));
mount('personal-story', renderPersonalStory());
mount('bar-ramos', nameBar('RAMOS', 18));
mount('footer', renderFooter(homeNav));

initPersonalStory();
initFooter();
