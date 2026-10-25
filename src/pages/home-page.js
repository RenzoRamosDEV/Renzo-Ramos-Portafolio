// Contenido de la página principal: un markup por marcador <div data-mount="…"> de index.html, en orden.
// Lo usa el prerender del build (vite/prerender.js) y, si faltara, main.js al cargar
import { nameBar } from '../components/name-bar.js';
import { renderHero } from '../sections/hero.js';
import { renderProjects } from '../sections/projects.js';
import { renderExperience } from '../sections/experience.js';
import { renderEducation } from '../sections/education.js';
import { renderCertificates, renderCertViewer } from '../sections/certificates.js';
import { renderSummarySection } from '../sections/summary.js';
import { renderContact } from '../sections/contact.js';
import { renderFooter } from '../sections/footer.js';

export const homeSlots = () => ({
  'hero': renderHero(),
  'projects': renderProjects(),
  'bar-renzo': nameBar('RENZO', 18),
  'experience': renderExperience(),
  'bar-ivan': nameBar('IVÁN', 20),
  'education': renderEducation(),
  'certificates': renderCertificates(),
  'summary': renderSummarySection(),
  'bar-ramos': nameBar('RAMOS', 18),
  'contact': renderContact(),
  'footer': renderFooter(),
  'cert-viewer': renderCertViewer(),
});
