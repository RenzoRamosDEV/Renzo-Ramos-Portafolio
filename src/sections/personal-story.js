// Historia de la página personal: capítulos que aparecen al entrar en pantalla
import { personal } from '../data/personal.js';
import { sectionBackground } from '../components/section-background.js';
import { storyRow } from '../components/story-row.js';
import { onceInViewport } from '../utils/viewport.js';

export const renderPersonalStory = () => `<section class="personal-story" id="historia">
  ${sectionBackground('MI HISTORIA')}
  <h2>MI HISTORIA: DE DÓNDE VENGO Y HACIA DÓNDE VOY</h2>
  <div class="story-list">${personal.chapters.map(storyRow).join('')}
  </div>
</section>`;

export function initPersonalStory() {
  document.querySelectorAll('.story-row').forEach(row => onceInViewport(row, 0.25, el => el.classList.add('on')));
}
