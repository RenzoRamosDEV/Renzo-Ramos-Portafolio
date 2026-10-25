// "Sobre mí en 30 segundos": respuesta directa y datos clave en texto plano, entre certificados y contacto
// (para reclutadores y para buscadores y asistentes de IA)
import { sectionBackground } from '../components/section-background.js';
import { summary } from '../components/summary.js';

// Fecha de la última actualización: la deja el prerender (último commit); en el navegador, la de hoy
const updated = () => new Date(globalThis.__LAST_UPDATED__ || Date.now());

export const renderSummarySection = () => `<section class="summary-section" aria-labelledby="summary-title">
  ${sectionBackground('SOBRE MÍ')}
  ${summary(updated())}
</section>`;
