import './styles/main.css';
import { jobs } from './data/experience.js';
import { studies } from './data/education.js';
import { certs } from './data/certificates.js';
import { projects } from './data/projects.js';
import { CONTACT_EMAIL } from './data/site.js';

const listItems = xs => xs.map(x => `<li>${x}</li>`).join('');

// Experiencia: dos puestos a la vez (bloque a y b); las flechas avanzan de dos en dos
(function () {
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
  const modal = document.getElementById('job-modal');
  const $m = id => document.getElementById(`jm-${id}`);
  function openJob(d) {
    $m('kicker').textContent = d.kicker; $m('role').textContent = d.role;
    $m('meta').innerHTML = `<span class="hl">${d.company}</span><span>${d.from} — ${d.to}</span><span>${d.place}</span>`;
    $m('h').textContent = d.left[0]; $m('p').textContent = d.left[1];
    $m('list').innerHTML = listItems(d.list);
    modal.classList.add('open');
  }
  const closeJob = () => modal.classList.remove('open');
  ids.forEach(g => el(g, 'more').onclick = () => openJob(current[g]));
  $m('close').onclick = closeJob;
  modal.addEventListener('click', e => { if (e.target === modal) closeJob(); });
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
})();
// Trama de puntos entre educación y certificados: círculos completos que crecen
// de forma continua hacia abajo hasta cubrir todo de negro
(function () {
  const c = document.getElementById('halftone');
  const ctx = c.getContext('2d');
  function draw() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = c.clientWidth, h = c.clientHeight;
    c.width = w * dpr; c.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#0b0b0b';
    const gap = 11, rowH = gap * 0.866;          // rejilla hexagonal
    const maxR = gap * 0.62;                     // suficiente para que se toquen y tapen el fondo
    for (let row = 0, y = 0; y < h + gap; row++, y = row * rowH) {
      const t = Math.min(1, Math.max(0, (y / h - 0.05) / 0.85));
      const r = maxR * t * t * (3 - 2 * t);      // crecimiento suave (smoothstep)
      if (r < 0.35) continue;
      const off = row % 2 ? gap / 2 : 0;
      for (let x = -gap + off; x < w + gap; x += gap) {
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
      }
    }
  }
  draw();
  window.addEventListener('resize', draw);
})();

// Educación: línea de tiempo que se enciende al entrar en pantalla
(function () {
  const tl = document.getElementById('edu-tl');
  tl.insertAdjacentHTML('beforeend', studies.map(s => `
    <div class="step">
      <div class="date">${s.from} — ${s.to}</div>
      <div class="node"></div>
      <div class="body"><h3>${s.center}</h3><div class="degree">${s.degree}</div><p>${s.text}</p><span class="place">${s.place}</span></div>
    </div>`).join(''));
  new IntersectionObserver((entries, obs) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); obs.unobserve(e.target); } });
  }, { threshold: 0.35 }).observe(tl);
})();

(function () {
  const $ = id => document.getElementById(id);
  const pad = n => String(n).padStart(2, '0');
  const isPdf = f => /\.pdf($|\?)/i.test(f);

  $('seals').innerHTML = certs.map((c, i) => `
    <button class="seal" data-i="${i}" aria-label="Ver certificado ${c.title}">
      <span class="ring-wrap" style="display:block">
        <svg class="ring" viewBox="0 0 230 230" aria-hidden="true">
          <defs><path id="seal-path-${i}" d="M20 115 a95 95 0 1 1 190 0 a95 95 0 1 1 -190 0"/></defs>
          <circle class="dash" cx="115" cy="115" r="80"/>
          <text><textPath href="#seal-path-${i}" textLength="595" lengthAdjust="spacing">${c.title} · ${c.org} · ${c.year} · </textPath></text>
        </svg>
        <span class="core"><b>${pad(i + 1)}</b></span>
      </span>
      <h3>${c.title}</h3><small>${c.org} · ${c.year}</small>
    </button>`).join('');

  const viewer = $('viewer');
  function open(c) {
    $('v-doc').innerHTML = isPdf(c.file) ? `<iframe src="${c.file}" title="${c.title}"></iframe>` : `<img src="${c.file}" alt="${c.title}">`;
    $('v-title').textContent = c.title;
    $('v-meta').textContent = `${c.org} · ${c.year}`;
    $('v-open').href = c.file; $('v-down').href = c.file;
    $('v-cred').href = c.credential; $('v-cred').style.display = c.credential ? '' : 'none';
    viewer.classList.add('open');
  }
  const close = () => viewer.classList.remove('open');
  $('seals').addEventListener('click', e => { const b = e.target.closest('.seal'); if (b) open(certs[b.dataset.i]); });
  $('v-close').onclick = close;
  viewer.addEventListener('click', e => { if (e.target === viewer) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();

(function () {
  const $ = id => document.getElementById(id);
  const pad = n => String(n).padStart(2, '0');
  const shot = p => p.image
    ? `<img src="${p.image}" alt="${p.name}">`
    : `<div class="shot" style="--c1:${p.c1};--c2:${p.c2}"><div class="bar"><i></i><i></i><i></i></div><div class="blob"></div>
       <div class="sh-hero"><div class="t"></div><div class="t s"></div><div class="btn"></div></div><div class="cards"><i></i><i></i><i></i></div></div>`;
  let i = 0;
  $('pj-total').textContent = pad(projects.length);
  function render() {
    const p = projects[i];
    $('pj-num').textContent = pad(i + 1); $('pj-name').textContent = p.name; $('pj-sub').textContent = p.sub; $('pj-desc').textContent = p.desc;
    const shown = p.stack.slice(0, 8), rest = p.stack.length - shown.length;
    $('pj-stack').innerHTML = shown.map(t => `<span>${t.toUpperCase()}</span>`).join('') + (rest > 0 ? `<span>+${rest}</span>` : '');
    $('pj-screen').innerHTML = shot(p) + '<div class="shine"></div>';
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
})();

// Detiene el giro del engranaje y los pines del mapa si el usuario prefiere menos movimiento
if (matchMedia('(prefers-reduced-motion: reduce)').matches)
  document.querySelectorAll('svg.gear, .tile.map svg').forEach(svg => svg.pauseAnimations());

// Humo: nubes grises difuminadas que flotan despacio, unas detrás de la figura y otras delante
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Textura de una bocanada de humo irregular, generada una sola vez
function makePuff(size) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d');
  g.filter = `blur(${size * 0.06}px)`;
  for (let i = 0; i < 14; i++) {
    const r = size * (0.12 + Math.random() * 0.18);
    const x = size / 2 + (Math.random() - 0.5) * size * 0.4;
    const y = size / 2 + (Math.random() - 0.5) * size * 0.3;
    const grad = g.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0, 'rgba(200,200,200,0.14)');
    grad.addColorStop(1, 'rgba(210,210,210,0)');
    g.fillStyle = grad;
    g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill();
  }
  return c;
}
const puffs = Array.from({ length: 4 }, () => makePuff(512));

function smokeLayer(canvas, opts) {
  const ctx = canvas.getContext('2d');
  let W, H, clouds = [];

  function resize() {
    W = canvas.clientWidth; H = canvas.clientHeight;
    canvas.width = W; canvas.height = H;
  }

  function makeCloud(initial) {
    const size = opts.size[0] + Math.random() * (opts.size[1] - opts.size[0]);
    return {
      x: initial ? Math.random() * (W + size) - size : -size,
      y: H * (opts.band[0] + Math.random() * (opts.band[1] - opts.band[0])) - size / 2,
      size,
      vx: 0.15 + Math.random() * 0.45,
      vy: (Math.random() - 0.5) * 0.12,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.0012,
      alpha: opts.alpha * (0.5 + Math.random() * 0.5),
      sprite: puffs[(Math.random() * puffs.length) | 0],
      life: initial ? Math.random() : 0,
    };
  }

  function frame() {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < clouds.length; i++) {
      const c = clouds[i];
      if (!reduceMotion) {
        c.x += c.vx; c.y += c.vy; c.rot += c.vr;
        c.life = Math.min(1, c.life + 0.004);
      }
      if (c.x > W) clouds[i] = makeCloud(false);
      ctx.save();
      ctx.globalAlpha = c.alpha * c.life;
      ctx.translate(c.x + c.size / 2, c.y + c.size / 2);
      ctx.rotate(c.rot);
      ctx.drawImage(c.sprite, -c.size / 2, -c.size / 2, c.size, c.size);
      ctx.restore();
    }
    if (!reduceMotion) requestAnimationFrame(frame);
  }

  resize();
  clouds = Array.from({ length: opts.count }, () => makeCloud(true));
  window.addEventListener('resize', resize);
  requestAnimationFrame(frame);
}

smokeLayer(document.getElementById('smoke-back'),  { count: 14, size: [380, 760], band: [0.25, 0.95], alpha: 0.4 });
smokeLayer(document.getElementById('smoke-front'), { count: 7,  size: [420, 700], band: [0.8, 1.05], alpha: 0.5 });

// Contacto: el formulario abre el correo del visitante con el mensaje ya escrito
(function () {
  const $ = id => document.getElementById(id);
  $('mail-text').textContent = CONTACT_EMAIL.toUpperCase();
  $('mail-link').href = `mailto:${CONTACT_EMAIL}`;
  $('contact-form').addEventListener('submit', e => {
    e.preventDefault();
    const f = new FormData(e.target);
    const subject = `Contacto desde la web — ${f.get('name')}`;
    const body = `${f.get('message')}\n\n— ${f.get('name')} (${f.get('email')})`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
  $('year').textContent = new Date().getFullYear();
  $('to-top').onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
})();
