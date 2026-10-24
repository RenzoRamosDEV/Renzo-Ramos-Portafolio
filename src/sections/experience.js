// Experiencia: tarjetas de puesto (dos a la vez) y ventana de detalle con "VER MÁS"
import { jobs } from '../data/experience.js';
import { sectionBackground } from '../components/section-background.js';
import { expCard } from '../components/exp-card.js';
import { modal } from '../components/modal.js';
import { listItems } from '../components/list-items.js';
import { jobMeta } from '../components/job-meta.js';
import { longArrowRight, longArrowLeft } from '../svg/icons.js';

export const renderExperience = () => `<section class="experience" id="experiencia">
  ${sectionBackground('EXPERIENCIA')}

  <h2>MI EXPERIENCIA: EMPRESAS, ROLES Y TODO LO QUE NECESITAS SABER</h2>

  <div class="exp-center">
      <div class="switch">
        <button id="exp-next" aria-label="Siguiente experiencia">${longArrowRight}</button>
        <button class="back" id="exp-prev" aria-label="Experiencia anterior">${longArrowLeft}</button>
      </div>
  </div>

  <!-- Una tarjeta por puesto; el detalle se abre con VER MÁS -->
  <div class="exp-pairs">
    <div class="exp-pair">
      ${expCard('a', { dur: '7.0s', path: 'M0 0 C 22 -18, 34 18, 4 26 C -26 34, -34 -6, 0 0' })}
    </div>
    <div class="exp-pair mirror">
      ${expCard('b', { dur: '8.5s', path: 'M0 0 C -24 -14, -30 22, -4 28 C 22 34, 30 -8, 0 0' })}
    </div>
  </div>
</section>`;

export const renderJobModal = () => modal({
  id: 'job-modal', labelledBy: 'jm-role', closeId: 'jm-close', boxClass: 'box job-box',
  content: `
    <div class="kicker" id="jm-kicker"></div>
    <h4 id="jm-role"></h4>
    <div class="job-meta" id="jm-meta"></div>
    <h5 id="jm-h"></h5>
    <p id="jm-p"></p>
    <ul class="exp-list" id="jm-list"></ul>`,
});

// Dos puestos a la vez (bloque a y b); las flechas avanzan de dos en dos
export function initExperience() {
  let page = 0;
  const pages = Math.ceil(jobs.length / 2);
  const ids = ['a', 'b'];
  const el = (g, id) => document.getElementById(`exp-${g}-${id}`);
  const swapEls = ids.map(g => el(g, 'card'));
  function render() {
    ids.forEach((g, i) => {
      const d = jobs[(page * 2 + i) % jobs.length];
      el(g, 'kicker').textContent = d.kicker; el(g, 'role').textContent = d.role; el(g, 'place').textContent = d.place;
      el(g, 'company').textContent = d.company; el(g, 'from').textContent = d.from; el(g, 'to').textContent = d.to;
      current[g] = d;
    });
  }

  // "VER MÁS": abre el detalle del puesto en una ventana
  const current = {};
  const box = document.getElementById('job-modal');
  const $m = id => document.getElementById(`jm-${id}`);
  function openJob(d) {
    $m('kicker').textContent = d.kicker; $m('role').textContent = d.role;
    $m('meta').innerHTML = jobMeta(d);
    $m('h').textContent = d.left[0]; $m('p').textContent = d.left[1];
    $m('list').innerHTML = listItems(d.list);
    box.classList.add('open');
  }
  const closeJob = () => box.classList.remove('open');
  ids.forEach(g => el(g, 'more').onclick = () => openJob(current[g]));
  $m('close').onclick = closeJob;
  box.addEventListener('click', e => { if (e.target === box) closeJob(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeJob(); });
  function go(step) {
    swapEls.forEach(e => e.classList.add('out'));
    setTimeout(() => {
      page = (page + step + pages) % pages;
      render();
      swapEls.forEach(e => e.classList.remove('out'));
    }, 250);
  }
  // Con dos puestos caben en una sola página: las flechas sobran
  if (pages < 2) document.querySelector('#experiencia .exp-center').style.display = 'none';
  document.getElementById('exp-next').onclick = () => go(1);
  document.getElementById('exp-prev').onclick = () => go(-1);
  render();
}
