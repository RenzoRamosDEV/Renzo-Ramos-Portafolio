// "Sobre mí en 30 segundos" y preguntas frecuentes: respuestas cortas para reclutadores (y para buscadores y
// asistentes de IA). Las mismas preguntas van en el JSON-LD como FAQPage (vite/structured-data.js)
import { faq } from '../data/faq.js';
import { sectionBackground } from '../components/section-background.js';
import { faqItem } from '../components/faq-item.js';
import { summary } from '../components/summary.js';

// Fecha de la última actualización: la deja el prerender (último commit); en el navegador, la de hoy
const updated = () => new Date(globalThis.__LAST_UPDATED__ || Date.now());

export const renderFaq = () => `<section class="faq" id="preguntas" aria-labelledby="faq-title">
  ${sectionBackground('PREGUNTAS')}
  ${summary(updated())}
  <h2 id="faq-title">PREGUNTAS <em>FRECUENTES</em></h2>
  <div class="faq-list">${faq.map(faqItem).join('')}
  </div>
</section>`;
