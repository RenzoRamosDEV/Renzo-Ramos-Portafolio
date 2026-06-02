const desktop = document.getElementById('desktop');
let z = 10;
const openWins = {};

export function focusWin(win) {
  win.style.zIndex = ++z;
}

function markRunning() {
  document.querySelectorAll('.dapp[data-app]').forEach(d => {
    const id = d.dataset.app;
    d.classList.toggle('running', !!openWins[id]);
  });
}

function closeWin(id) {
  const w = openWins[id];
  if (!w) return;
  w.classList.remove('open');
  setTimeout(() => w.remove(), 260);
  delete openWins[id];
  markRunning();
}

function minimizeWin(win) {
  if (win.dataset.minimized === '1') {
    win.style.opacity = '1';
    win.style.pointerEvents = '';
    win.style.transform = 'scale(1)';
    win.dataset.minimized = '0';
    focusWin(win);
  } else {
    win.style.opacity = '0';
    win.style.pointerEvents = 'none';
    win.style.transform = 'scale(0.85)';
    win.dataset.minimized = '1';
  }
}

function toggleFullscreen(win) {
  if (win.dataset.fullscreen === '1') {
    win.style.left   = win.dataset.prevLeft;
    win.style.top    = win.dataset.prevTop;
    win.style.width  = win.dataset.prevW;
    win.style.height = win.dataset.prevH2;
    win.style.borderRadius = '14px';
    win.dataset.fullscreen = '0';
  } else {
    win.dataset.prevLeft = win.style.left;
    win.dataset.prevTop  = win.style.top;
    win.dataset.prevW    = win.style.width;
    win.dataset.prevH2   = win.style.height;
    win.style.left   = '0px';
    win.style.top    = '30px';
    win.style.width  = '100vw';
    win.style.height = 'calc(100vh - 30px)';
    win.style.borderRadius = '0';
    win.dataset.fullscreen = '1';
  }
}

function dragify(win, handle) {
  let sx, sy, ox, oy, drag = false;
  handle.addEventListener('mousedown', e => {
    if (win.dataset.fullscreen === '1') return;
    drag = true; sx = e.clientX; sy = e.clientY;
    ox = win.offsetLeft; oy = win.offsetTop;
    focusWin(win); e.preventDefault();
  });
  addEventListener('mousemove', e => {
    if (!drag) return;
    win.style.left = Math.max(0, ox + e.clientX - sx) + 'px';
    win.style.top = Math.max(32, oy + e.clientY - sy) + 'px';
  });
  addEventListener('mouseup', () => drag = false);
}

function resizify(win) {
  const MIN_W = 280, MIN_H = 160;
  const handles = [
    { cls: 'rc-nw', dx: -1, dy: -1 },
    { cls: 'rc-ne', dx:  1, dy: -1 },
    { cls: 'rc-sw', dx: -1, dy:  1 },
    { cls: 'rc-se', dx:  1, dy:  1 },
    { cls: 're-l',  dx: -1, dy:  0 },
    { cls: 're-r',  dx:  1, dy:  0 },
    { cls: 're-b',  dx:  0, dy:  1 },
    { cls: 're-t',  dx:  0, dy: -1 },
  ];
  handles.forEach(({ cls, dx, dy }) => {
    const handle = document.createElement('div');
    handle.className = 'resize-handle ' + cls;
    win.appendChild(handle);

    let sx, sy, ow, oh, ol, ot;
    const onMove = e => {
      const dw = (e.clientX - sx) * dx;
      const dh = (e.clientY - sy) * dy;
      if (dx !== 0) {
        const newW = Math.max(MIN_W, ow + dw);
        win.style.width = newW + 'px';
        if (dx === -1) win.style.left = (ol + ow - newW) + 'px';
      }
      if (dy !== 0) {
        const newH = Math.max(MIN_H, oh + dh);
        win.style.height = newH + 'px';
        if (dy === -1) win.style.top = (ot + oh - newH) + 'px';
      }
    };
    const onUp = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    handle.addEventListener('mousedown', e => {
      if (win.dataset.fullscreen === '1') return;
      e.stopPropagation(); e.preventDefault();
      sx = e.clientX; sy = e.clientY;
      ow = win.offsetWidth; oh = win.offsetHeight;
      ol = win.offsetLeft;  ot = win.offsetTop;
      focusWin(win);
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp);
    });
  });
}

export function openApp(apps, id, pos = null) {
  if (openWins[id]) { minimizeWin(openWins[id]); return; }
  const a = apps[id]; if (!a) return;
  const win = document.createElement('div');
  win.className = 'win';
  win.style.width = a.w + 'px'; win.style.height = a.h + 'px';
  const ix = pos ? pos.x : a.x;
  const iy = pos ? pos.y : a.y;
  const maxX = Math.max(20, innerWidth - a.w - 20);
  const maxY = Math.max(40, innerHeight - a.h - 90);
  win.style.left = Math.min(ix, maxX) + 'px';
  win.style.top = Math.min(iy, maxY) + 'px';
  win.style.zIndex = ++z;
  win.innerHTML = `<div class="titlebar"><div class="lights"><span class="light l-r"></span><span class="light l-y"></span><span class="light l-g"></span></div><div class="wtitle">${a.title}</div></div><div class="wbody">${a.html}</div>`;
  desktop.appendChild(win);
  openWins[id] = win;
  requestAnimationFrame(() => win.classList.add('open'));
  win.querySelector('.l-r').onclick = e => { e.stopPropagation(); closeWin(id); };
  win.querySelector('.l-y').onclick = e => { e.stopPropagation(); minimizeWin(win); };
  win.querySelector('.l-g').onclick = e => { e.stopPropagation(); toggleFullscreen(win); };
  win.addEventListener('mousedown', () => focusWin(win));
  dragify(win, win.querySelector('.titlebar'));
  resizify(win);
  win.querySelectorAll('[data-open]').forEach(p => p.onclick = () => openApp(apps, p.dataset.open));
  markRunning();
}
