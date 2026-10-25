// Proyectos: carrusel con el portátil 3D que se inclina siguiendo el ratón
import { projects } from '../data/projects.js';
import { sectionBackground } from '../components/section-background.js';
import { projectShot } from '../components/project-shot.js';
import { stackPills } from '../components/stack-pills.js';
import { chevronLeft, chevronRight } from '../svg/icons.js';
import { $ } from '../utils/dom.js';
import { pad } from '../utils/format.js';

// El primer proyecto ya va en el markup; las flechas cambian de proyecto desde initProjects
const first = projects[0];
const hidden = on => on ? '' : ' style="display:none"';

export const renderProjects = () => `<section class="projects" id="proyectos">
  <div class="guide"></div>
  ${sectionBackground('PROYECTOS')}
  <h2 class="projects-title">MIS PROYECTOS: APPS, WEBS Y TODO LO QUE HE CONSTRUIDO</h2>
  <div class="wrap">
    <div class="swap" id="pj-text">
      <div class="kicker">PROYECTOS</div>
      <div class="count"><b id="pj-num">${pad(1)}</b> / <span id="pj-total">${pad(projects.length)}</span></div>
      <h3 class="pj-name" id="pj-name">${first.name}</h3>
      <div class="pj-tag" id="pj-tag"${hidden(first.tag)}><i></i><span id="pj-tag-text">${first.tag || ''}</span></div>
      <div class="sub" id="pj-sub">${first.sub}</div>
      <p id="pj-desc">${first.desc}</p>
      <div class="stack" id="pj-stack">${stackPills(first.stack)}</div>
      <div class="links">
        <a class="btn-o solid" id="pj-live" href="${first.live || '#'}"${hidden(first.live)} target="_blank" rel="noopener">VER PROYECTO ↗</a>
        <a class="btn-o" id="pj-code" href="${first.code || '#'}"${hidden(first.code)} target="_blank" rel="noopener">CÓDIGO</a>
      </div>
      <div class="nav">
        <button id="pj-prev" aria-label="Proyecto anterior">${chevronLeft}</button>
        <button id="pj-next" aria-label="Proyecto siguiente">${chevronRight}</button>
      </div>
    </div>
    <div class="stage">
      <div class="laptop" id="pj-laptop">
        <div class="screen swap" id="pj-screen">${projectShot(first, true)}<div class="shine"></div></div>
        <div class="base"></div>
      </div>
    </div>
  </div>
</section>`;

export function initProjects() {
  let i = 0;
  function render() {
    const p = projects[i];
    $('pj-num').textContent = pad(i + 1); $('pj-name').textContent = p.name; $('pj-sub').textContent = p.sub; $('pj-desc').textContent = p.desc;
    $('pj-stack').innerHTML = stackPills(p.stack);
    $('pj-tag-text').textContent = p.tag || ''; $('pj-tag').style.display = p.tag ? '' : 'none';
    $('pj-screen').innerHTML = projectShot(p) + '<div class="shine"></div>';
    $('pj-live').href = p.live || '#'; $('pj-live').style.display = p.live ? '' : 'none';
    $('pj-code').href = p.code || '#'; $('pj-code').style.display = p.code ? '' : 'none';
    startSlides();
  }

  // Si el proyecto tiene varias capturas, cada una se queda quieta unos segundos y el cambio
  // alterna entre deslizamiento lateral y scroll hacia arriba (solo mientras la sección está a la vista)
  const SLIDE_MS = 3500, FX = ['fx-slide', 'fx-scroll'], FX_MS = 850;
  let timer = null, visible = false;
  function startSlides() {
    clearInterval(timer);
    const box = $('pj-screen').querySelector('.slides');
    const slides = $('pj-screen').querySelectorAll('.slide');
    if (slides.length < 2) return;
    const dots = $('pj-screen').querySelectorAll('.slide-dots i');
    let n = 0, k = 0;
    timer = setInterval(() => {
      if (!visible || document.hidden) return;
      const prev = slides[n];
      n = (n + 1) % slides.length;
      const next = slides[n];
      box.classList.remove(...FX); void box.offsetWidth; box.classList.add(FX[k++ % FX.length]);
      prev.className = 'slide out'; next.className = 'slide in';
      dots.forEach((d, j) => d.classList.toggle('on', j === n));
      setTimeout(() => { prev.className = 'slide'; if (next.classList.contains('in')) next.className = 'slide cur'; }, FX_MS);
    }, SLIDE_MS + FX_MS);
  }
  new IntersectionObserver(([e]) => visible = e.isIntersecting).observe($('pj-screen'));

  const swaps = [$('pj-text'), $('pj-screen')];
  const go = step => {
    swaps.forEach(e => e.classList.add('out'));
    setTimeout(() => { i = (i + step + projects.length) % projects.length; render(); swaps.forEach(e => e.classList.remove('out')); }, 260);
  };
  $('pj-next').onclick = () => go(1);
  $('pj-prev').onclick = () => go(-1);
  startSlides();

  // El portátil se inclina siguiendo el ratón
  const sec = $('proyectos'), laptop = $('pj-laptop');
  sec.addEventListener('mousemove', e => {
    const r = sec.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    laptop.style.transform = `rotateY(${-14 + x * 22}deg) rotateX(${6 - y * 14}deg)`;
  });
  sec.addEventListener('mouseleave', () => laptop.style.transform = '');
}
