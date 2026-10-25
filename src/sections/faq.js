// Preguntas frecuentes: respuestas cortas para reclutadores (y para buscadores y asistentes de IA).
// Las mismas preguntas van en el JSON-LD como FAQPage (vite/structured-data.js)
import { faq } from '../data/faq.js';
import { sectionBackground } from '../components/section-background.js';
import { faqItem } from '../components/faq-item.js';

export const renderFaq = () => `<section class="faq" id="preguntas" aria-labelledby="faq-title">
  ${sectionBackground('PREGUNTAS')}
  <h2 id="faq-title">PREGUNTAS <em>FRECUENTES</em></h2>
  <div class="faq-list">${faq.map(faqItem).join('')}
  </div>
</section>`;
