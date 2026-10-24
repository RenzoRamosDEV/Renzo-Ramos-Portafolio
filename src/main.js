// Punto de entrada: monta las secciones en index.html y arranca su comportamiento
// en el mismo orden que el script original (importa para listeners y animaciones)
import './styles/main.css';
import { mount } from './utils/dom.js';
import { prefersReducedMotion } from './utils/motion.js';
import { nameBar } from './components/name-bar.js';
import { renderHero } from './sections/hero.js';
import { renderProjects, initProjects } from './sections/projects.js';
import { renderExperience, renderJobModal, initExperience } from './sections/experience.js';
import { renderEducation, initEducation } from './sections/education.js';
import { renderCertificates, renderCertViewer, initCertificates } from './sections/certificates.js';
import { renderContact, initContact } from './sections/contact.js';
import { renderFooter, initFooter } from './sections/footer.js';
import { initHalftone } from './canvas/halftone.js';
import { initSmoke } from './canvas/smoke.js';

// 1. Markup, en el orden de la página
mount('hero', renderHero());
mount('projects', renderProjects());
mount('bar-renzo', nameBar('RENZO', 18));
mount('experience', renderExperience());
mount('bar-ivan', nameBar('IVÁN', 20));
mount('education', renderEducation());
mount('certificates', renderCertificates());
mount('bar-ramos', nameBar('RAMOS', 18));
mount('contact', renderContact());
mount('footer', renderFooter());
mount('job-modal', renderJobModal());
mount('cert-viewer', renderCertViewer());

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
