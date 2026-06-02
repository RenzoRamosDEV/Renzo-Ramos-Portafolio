import { apps } from './data/apps.js';
import { initTheme, initClock, setTheme } from './theme.js';
import { openApp } from './windows.js';
import { initSpotlight, toggleSpot } from './spotlight.js';

initTheme();
initClock();

// Dock
document.querySelectorAll('.dapp').forEach(d => {
  d.onclick = () => {
    const id = d.dataset.app;
    if (id === 'spot') { toggleSpot(true); return; }
    openApp(apps, id);
  };
});

// Desktop icons
const dockItems = [
  { id: 'about',  label: 'Sobre mí',     ico: '☻', cls: 'd-about' },
  { id: 'proj',   label: 'Proyectos',    ico: '▦', cls: 'd-proj'  },
  { id: 'stack',  label: 'Tech Stack',   ico: '{ }', cls: 'd-stack' },
  { id: 'path',   label: 'Trayectoria',  ico: '◷', cls: 'd-path'  },
  { id: 'cert',   label: 'Certificados', ico: '✦', cls: 'd-cert'  },
  { id: 'mail',   label: 'Contacto',     ico: '✉', cls: 'd-mail'  },
];

const desktop = document.getElementById('desktop');
const COL_X = 16, ROW_START = 48, ROW_GAP = 96;

dockItems.forEach((item, i) => {
  const el = document.createElement('div');
  el.className = 'desk-icon';
  el.style.left = COL_X + 'px';
  el.style.top  = (ROW_START + i * ROW_GAP) + 'px';
  el.innerHTML  = `<div class="di-ico ${item.cls}">${item.ico}</div><div class="di-lbl">${item.label}</div>`;

  // single click = select, double click = open
  el.addEventListener('click', e => {
    e.stopPropagation();
    document.querySelectorAll('.desk-icon').forEach(d => d.classList.remove('selected'));
    el.classList.add('selected');
  });
  el.addEventListener('dblclick', e => {
    e.stopPropagation();
    openApp(apps, item.id);
  });

  // drag
  let drag = false, sx, sy, ox, oy;
  el.addEventListener('mousedown', e => {
    drag = false; sx = e.clientX; sy = e.clientY;
    ox = el.offsetLeft; oy = el.offsetTop;
    e.stopPropagation();
  });
  addEventListener('mousemove', e => {
    if (!e.buttons) return;
    const dx = e.clientX - sx, dy = e.clientY - sy;
    if (!drag && Math.hypot(dx, dy) < 4) return;
    drag = true;
    el.style.left = Math.max(0, ox + dx) + 'px';
    el.style.top  = Math.max(34, oy + dy) + 'px';
  });
  el.addEventListener('click', e => { if (drag) e.stopImmediatePropagation(); drag = false; });

  desktop.appendChild(el);
});

// Deselect icons when clicking empty desktop
desktop.addEventListener('click', () => {
  document.querySelectorAll('.desk-icon').forEach(d => d.classList.remove('selected'));
});

initSpotlight(
  (id) => openApp(apps, id),
  setTheme
);

setTimeout(() => openApp(apps, 'about'), 300);
