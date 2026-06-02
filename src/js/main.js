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

setTimeout(() => openApp(apps, 'about'),  300);
setTimeout(() => openApp(apps, 'proj'),   500);
setTimeout(() => openApp(apps, 'path'),   700);
