// Punto de entrada: arranca el comportamiento de las secciones de index.html (el markup llega prerenderizado)
// en el mismo orden que el script original (importa para listeners y animaciones)
import './styles/main.css';
import { mountSlots } from './utils/dom.js';
import { prefersReducedMotion } from './utils/motion.js';
import { homeSlots } from './pages/home-page.js';
import { initProjects } from './sections/projects.js';
import { initExperience } from './sections/experience.js';
import { initEducation } from './sections/education.js';
import { initCertificates } from './sections/certificates.js';
import { initContact } from './sections/contact.js';
import { initFooter } from './sections/footer.js';
import { initHalftone } from './canvas/halftone.js';
import { initSmoke } from './canvas/smoke.js';

// 1. Markup: llega prerenderizado en el HTML; solo se monta aquí si faltara
mountSlots(homeSlots);

// 2. Comportamiento
initExperience();
initHalftone(document.getElementById('halftone'));
initEducation();
initCertificates();
initProjects();

// Detiene el giro de los aros y los pines del mapa si el usuario prefiere menos movimiento
if (prefersReducedMotion())
  document.querySelectorAll('svg.gear, .tile.map svg').forEach(svg => svg.pauseAnimations());

initSmoke();
initContact();
initFooter();
