const overlay = document.getElementById('spotOverlay');
const input = document.getElementById('spotInput');
const resultsEl = document.getElementById('spotResults');

const index = [
  { t: 'Sobre mí',             k: 'Perfil',                     app: 'about',      ico: '☻', c: 'd-about' },
  { t: 'Proyectos',            k: 'Trabajo',                    app: 'proj',       ico: '▦', c: 'd-proj'  },
  { t: 'Booqi',                k: 'Proyecto · Microservicios',  app: 'proj-booqi', ico: 'B', c: 'd-proj'  },
  { t: 'Sistema de Inventario',k: 'Proyecto · Full-stack',      app: 'proj-inv',   ico: 'I', c: 'd-stack' },
  { t: 'Tech Stack',           k: 'Habilidades',                app: 'stack',      ico: '{}',c: 'd-stack' },
  { t: 'Trayectoria',          k: 'Experiencia y formación',    app: 'path',       ico: '◷', c: 'd-path'  },
  { t: 'Certificados',         k: 'Credenciales',               app: 'cert',       ico: '✦', c: 'd-cert'  },
  { t: 'Contacto',             k: 'Email · GitHub · LinkedIn',  app: 'mail',       ico: '✉', c: 'd-mail'  },
  { t: 'Cambiar tema',         k: 'Claro / Oscuro',             app: 'theme',      ico: '☾', c: 'd-spot'  },
];

let sel = 0, filtered = index.slice();

export function toggleSpot(on) {
  overlay.classList.toggle('on', on);
  if (on) { input.value = ''; renderSpot(''); input.focus(); }
}

function renderSpot(q, openAppFn) {
  filtered = index.filter(i =>
    i.t.toLowerCase().includes(q.toLowerCase()) ||
    i.k.toLowerCase().includes(q.toLowerCase())
  );
  sel = 0;
  resultsEl.innerHTML = filtered.map((r, i) =>
    `<div class="res ${i === 0 ? 'sel' : ''}" data-i="${i}"><div class="ico ${r.c}">${r.ico}</div><div class="rt">${r.t}</div><div class="rk">${r.k}</div></div>`
  ).join('') || `<div class="res"><div class="rt" style="color:var(--text2)">Sin resultados</div></div>`;
  if (openAppFn) {
    resultsEl.querySelectorAll('.res').forEach(el => el.onclick = () => runSpot(+el.dataset.i, openAppFn, null));
  }
}

function runSpot(i, openAppFn, setThemeFn) {
  const r = filtered[i]; if (!r) return;
  toggleSpot(false);
  if (r.app === 'theme' && setThemeFn) {
    const root = document.documentElement;
    setThemeFn(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  } else {
    openAppFn(r.app);
  }
}

function upd() {
  resultsEl.querySelectorAll('.res').forEach((el, i) => el.classList.toggle('sel', i === sel));
}

export function initSpotlight(openAppFn, setThemeFn) {
  input.addEventListener('input', e => {
    renderSpot(e.target.value, openAppFn);
    resultsEl.querySelectorAll('.res').forEach(el => el.onclick = () => runSpot(+el.dataset.i, openAppFn, setThemeFn));
  });

  addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.code === 'Space') {
      e.preventDefault();
      toggleSpot(!overlay.classList.contains('on'));
      return;
    }
    if (!overlay.classList.contains('on')) return;
    if (e.key === 'Escape') toggleSpot(false);
    if (e.key === 'ArrowDown') { e.preventDefault(); sel = Math.min(filtered.length - 1, sel + 1); upd(); }
    if (e.key === 'ArrowUp') { e.preventDefault(); sel = Math.max(0, sel - 1); upd(); }
    if (e.key === 'Enter') runSpot(sel, openAppFn, setThemeFn);
  });

  overlay.addEventListener('click', e => { if (e.target === overlay) toggleSpot(false); });
  renderSpot('', openAppFn);
}
