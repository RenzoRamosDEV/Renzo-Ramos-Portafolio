import { apps } from './data/apps.js';
import { initTheme, initClock, setTheme } from './theme.js';
import { openApp } from './windows.js';
import { initSpotlight, toggleSpot } from './spotlight.js';
import { applyStoredConfig, initConfig } from './config.js';

initTheme();
initClock();
applyStoredConfig();

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
  { id: 'about',  label: 'Sobre mí',     ico: '☻',  cls: 'd-about' },
  { id: 'proj',   label: 'Proyectos',    ico: '▦',  cls: 'd-proj'  },
  { id: 'stack',  label: 'Tech Stack',   ico: '{ }',cls: 'd-stack' },
  { id: 'path',   label: 'Trayectoria',  ico: '◷',  cls: 'd-path'  },
  { id: 'cert',   label: 'Certificados', ico: '✦',  cls: 'd-cert'  },
  { id: 'mail',   label: 'Contacto',     ico: '✉',  cls: 'd-mail'  },
  { id: 'config', label: 'Preferencias', ico: '⚙',  cls: 'd-cfg'   },
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


initConfig(setTheme);

initSpotlight(
  (id) => openApp(apps, id),
  setTheme
);

const aboutW = 960, aboutH = 620;
const aboutPos = {
  x: Math.round((innerWidth  - aboutW) / 2),
  y: Math.round((innerHeight - aboutH) / 2) + 15,
};

// Override size for the initial open
apps.about.w = aboutW;
apps.about.h = aboutH;

setTimeout(() => openApp(apps, 'about', aboutPos), 300);
