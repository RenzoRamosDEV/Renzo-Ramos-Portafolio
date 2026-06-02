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
  { id: 'v1',     label: 'Portfolio v1', ico: '①',  cls: 'd-v1'    },
  { id: 'v1',     label: 'Portfolio v1', ico: '①',  cls: 'd-v1'    },
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

const vw = innerWidth, vh = innerHeight;
const DOCK_H = 90, TOP = 140;

// Sobre mí — izquierda, ocupa casi toda la altura
const aboutW = Math.round(vw * 0.46);
const aboutH = Math.round(vh * 0.72);
apps.about.w = aboutW;
apps.about.h = aboutH;
const LEFT = 110; // deja espacio a los iconos del escritorio (72px + margen)
const aboutPos = { x: LEFT, y: TOP };

// Proyectos — arriba derecha
const projW = Math.round(vw * 0.26);
const projH = Math.round(vh * 0.40);
apps.proj.w = projW;
apps.proj.h = projH;
const projPos = { x: LEFT + aboutW + 14, y: TOP };

// Trayectoria — abajo derecha, solapada bajo Proyectos
const pathW = Math.round(vw * 0.28);
const pathH = Math.round(vh * 0.55);
apps.path.w = pathW;
apps.path.h = pathH;
const pathPos = { x: LEFT + aboutW + projW + 28, y: TOP + projH + 16 };

setTimeout(() => openApp(apps, 'about', aboutPos), 300);
setTimeout(() => openApp(apps, 'proj',  projPos),  500);
setTimeout(() => openApp(apps, 'path',  pathPos),  700);
