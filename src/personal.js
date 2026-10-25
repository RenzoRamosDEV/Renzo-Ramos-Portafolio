// Punto de entrada de la página personal (personal.html); el markup llega prerenderizado
import './styles/main.css';
import './styles/pages/personal.css';
import { mountSlots } from './utils/dom.js';
import { initAnchorLinks } from './utils/anchors.js';
import { initMenu } from './utils/menu.js';
import { personalSlots } from './pages/personal-page.js';
import { initPersonalStory } from './sections/personal-story.js';
import { initFooter } from './sections/footer.js';

mountSlots(personalSlots);

initPersonalStory();
initFooter();
initAnchorLinks();
initMenu();
