// Proyectos: carrusel con el portátil 3D que se inclina siguiendo el ratón
import { projects } from '../data/projects.js';
import { sectionBackground } from '../components/section-background.js';
import { projectShot } from '../components/project-shot.js';
import { stackPills } from '../components/stack-pills.js';
import { chevronLeft, chevronRight } from '../svg/icons.js';
import { $ } from '../utils/dom.js';
import { pad } from '../utils/format.js';

export const renderProjects = () => `<section class="projects" id="proyectos">
  <div class="guide"></div>
  ${sectionBackground('PROYECTOS')}
  <div class="wrap">
    <div class="swap" id="pj-text">
      <div class="kicker">PROYECTOS</div>
      <div class="count"><b id="pj-num"></b> / <span id="pj-total"></span></div>
      <h2 id="pj-name"></h2>
      <div class="sub" id="pj-sub"></div>
      <p id="pj-desc"></p>
      <div class="stack" id="pj-stack"></div>
      <div class="links">
        <a class="btn-o solid" id="pj-live" href="#" target="_blank" rel="noopener">VER PROYECTO ↗</a>
        <a class="btn-o" id="pj-code" href="#" target="_blank" rel="noopener">CÓDIGO</a>
      </div>
      <div class="nav">
        <button id="pj-prev" aria-label="Proyecto anterior">${chevronLeft}</button>
        <button id="pj-next" aria-label="Proyecto siguiente">${chevronRight}</button>
      </div>
    </div>
    <div class="stage">
      <div class="laptop" id="pj-laptop">
        <div class="screen swap" id="pj-screen"></div>
        <div class="base"></div>
      </div>
    </div>
  </div>
</section>`;

export function initProjects() {
  let i = 0;
  $('pj-total').textContent = pad(projects.length);
  function render() {
    const p = projects[i];
    $('pj-num').textContent = pad(i + 1); $('pj-name').textContent = p.name; $('pj-sub').textContent = p.sub; $('pj-desc').textContent = p.desc;
    $('pj-stack').innerHTML = stackPills(p.stack);
    $('pj-screen').innerHTML = projectShot(p) + '<div class="shine"></div>';
    $('pj-live').href = p.live || '#'; $('pj-live').style.display = p.live ? '' : 'none';
    $('pj-code').href = p.code;
  }
  const swaps = [$('pj-text'), $('pj-screen')];
  const go = step => {
    swaps.forEach(e => e.classList.add('out'));
    setTimeout(() => { i = (i + step + projects.length) % projects.length; render(); swaps.forEach(e => e.classList.remove('out')); }, 260);
  };
  $('pj-next').onclick = () => go(1);
  $('pj-prev').onclick = () => go(-1);
  render();

  // El portátil se inclina siguiendo el ratón
  const sec = $('proyectos'), laptop = $('pj-laptop');
  sec.addEventListener('mousemove', e => {
    const r = sec.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    laptop.style.transform = `rotateY(${-14 + x * 22}deg) rotateX(${6 - y * 14}deg)`;
  });
  sec.addEventListener('mouseleave', () => laptop.style.transform = '');
}
