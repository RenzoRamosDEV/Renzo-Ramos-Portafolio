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

  el.addEventListener('click', e => {
    e.stopPropagation();
    openApp(apps, item.id);
  });


  desktop.appendChild(el);
});


initSpotlight(
  (id) => openApp(apps, id),
  setTheme
);

// Layout inicial sin solapamiento: columna izquierda + columna derecha
const PAD = 100, TOP = 50, GAP = 18, DOCK = 80;
const vw = innerWidth, vh = innerHeight;

const aboutW = 620, aboutH = 400;
const projW  = 500, projH  = Math.min(400, vh - TOP - aboutH - GAP - DOCK);
const pathW  = Math.min(520, vw - PAD - aboutW - GAP - PAD), pathH = Math.min(520, vh - TOP - DOCK);

// columna izquierda
const leftX = PAD;
const aboutPos = { x: leftX, y: TOP };
const projPos  = { x: leftX, y: TOP + aboutH + GAP };

// columna derecha
const rightX = leftX + aboutW + GAP;
const pathPos  = { x: rightX, y: TOP };

setTimeout(() => openApp(apps, 'about', aboutPos), 300);
setTimeout(() => openApp(apps, 'proj',  projPos),  500);
setTimeout(() => openApp(apps, 'path',  pathPos),  700);
