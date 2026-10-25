// Experiencia: tarjetas de puesto (dos a la vez) y card de detalle que sale al lado con "VER MÁS"
import { jobs } from '../data/experience.js';
import { sectionBackground } from '../components/section-background.js';
import { expCard } from '../components/exp-card.js';
import { expDetail } from '../components/exp-detail.js';
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

  <!-- Una tarjeta por puesto; su detalle sale al lado con VER MÁS -->
  <div class="exp-pairs">
    <div class="exp-pair">
      ${expCard('a', { dur: '7.0s', path: 'M0 0 C 22 -18, 34 18, 4 26 C -26 34, -34 -6, 0 0' })}
      ${expDetail('a')}
    </div>
    <div class="exp-pair mirror">
      ${expCard('b', { dur: '8.5s', path: 'M0 0 C -24 -14, -30 22, -4 28 C 22 34, 30 -8, 0 0' })}
      ${expDetail('b')}
    </div>
  </div>
</section>`;

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

  // "VER MÁS": la card de detalle sale desde detrás de su tarjeta y la otra tarjeta se aparta
  const current = {};
  const pairs = document.querySelector('#experiencia .exp-pairs');
  let openSlot = null;
  function openJob(g) {
    const d = current[g], $d = id => el(g, `d-${id}`);
    $d('kicker').textContent = d.kicker; $d('role').textContent = d.role;
    $d('meta').innerHTML = jobMeta(d);
    $d('h').textContent = d.left[0]; $d('p').textContent = d.left[1];
    $d('list').innerHTML = listItems(d.list);
    closeJob(false);
    openSlot = g;
    pairs.classList.add('detail');
    el(g, 'card').parentElement.classList.add('open');
    // La card de detalle mide lo mismo de alto que su tarjeta
    el(g, 'detail').style.setProperty('--card-h', `${el(g, 'card').offsetHeight}px`);
    el(g, 'detail').setAttribute('aria-hidden', 'false');
    el(g, 'more').setAttribute('aria-expanded', 'true');
  }
  function closeJob(focus = true) {
    if (!openSlot) return;
    const g = openSlot; openSlot = null;
    pairs.classList.remove('detail');
    el(g, 'card').parentElement.classList.remove('open');
    el(g, 'detail').setAttribute('aria-hidden', 'true');
    el(g, 'more').setAttribute('aria-expanded', 'false');
    if (focus) el(g, 'more').focus({ preventScroll: true });
  }
  ids.forEach(g => {
    el(g, 'more').onclick = () => openSlot === g ? closeJob() : openJob(g);
    el(g, 'd-close').onclick = () => closeJob();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeJob(); });
  function go(step) {
    closeJob(false);
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
