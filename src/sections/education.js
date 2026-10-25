// Educación: línea de tiempo que se enciende al entrar en pantalla
import { studies } from '../data/education.js';
import { sectionBackground } from '../components/section-background.js';
import { timelineStep } from '../components/timeline-step.js';
import { onceInViewport } from '../utils/viewport.js';

export const renderEducation = () => `<section class="experience alt" id="educacion">
  ${sectionBackground('EDUCACIÓN')}

  <h2>MI EDUCACIÓN: ESTUDIOS, CURSOS Y TODO LO QUE ME FORMÓ</h2>

  <!-- Línea de tiempo: cada estudio se enciende al llegar a la sección -->
  <div class="edu-tl" id="edu-tl"><div class="rail"><i></i></div>${studies.map(timelineStep).join('')}</div>
</section>`;

export function initEducation() {
  const tl = document.getElementById('edu-tl');
  onceInViewport(tl, 0.35, el => el.classList.add('on'));
}
