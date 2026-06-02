const WALLS = {
  blue:   'linear-gradient(150deg,#d7e3ff 0%,#e9f0ff 38%,#eef7ff 70%,#f4fbff 100%)',
  night:  'linear-gradient(150deg,#06122e 0%,#0a1838 42%,#0c1430 72%,#06101f 100%)',
  aurora: 'linear-gradient(150deg,#0d1b2a 0%,#1b4332 50%,#081c15 100%)',
  sunset: 'linear-gradient(150deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%)',
  rose:   'linear-gradient(150deg,#fce4ec 0%,#f8bbd9 50%,#fdf2f8 100%)',
  slate:  'linear-gradient(150deg,#1e293b 0%,#334155 50%,#0f172a 100%)',
};

function saveConfig(key, val) {
  localStorage.setItem('pf-cfg-' + key, val);
}

function loadConfig(key, fallback) {
  return localStorage.getItem('pf-cfg-' + key) || fallback;
}

function applyAccent(hex) {
  document.documentElement.style.setProperty('--accent', '#' + hex);
  document.documentElement.style.setProperty('--accent-dark', '#' + hex);
  saveConfig('accent', hex);
}

function applyWall(name) {
  document.body.style.background = WALLS[name] || WALLS.blue;
  saveConfig('wall', name);
}

function applySpeed(ms) {
  document.documentElement.style.setProperty('--win-speed', ms + 'ms');
  saveConfig('speed', ms);
}

export function applyStoredConfig() {
  const accent = loadConfig('accent', null);
  if (accent) applyAccent(accent);

  const wall = loadConfig('wall', null);
  if (wall) applyWall(wall);

  const speed = loadConfig('speed', null);
  if (speed) applySpeed(speed);
}

export function initConfig(setThemeFn) {
  // Espera a que el DOM de la ventana Config esté montado usando MutationObserver
  const observer = new MutationObserver(() => {
    const panel = document.querySelector('.cfg');
    if (!panel) return;
    observer.disconnect();
    bindConfig(panel, setThemeFn);
  });
  observer.observe(document.getElementById('desktop'), { childList: true, subtree: true });
}

function bindConfig(panel, setThemeFn) {
  const root = document.documentElement;

  // --- Tema ---
  const themeGroup = panel.querySelector('#cfg-theme');
  const currentTheme = root.getAttribute('data-theme');
  themeGroup.querySelectorAll('button').forEach(btn => {
    if (btn.dataset.val === currentTheme) btn.classList.add('active');
    btn.onclick = () => {
      themeGroup.querySelectorAll('button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const val = btn.dataset.val;
      if (val === 'auto') {
        setThemeFn(matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      } else {
        setThemeFn(val);
      }
    };
  });

  // --- Acento ---
  const accentGroup = panel.querySelector('#cfg-accent');
  const savedAccent = loadConfig('accent', '0071e3');
  accentGroup.querySelectorAll('.cfg-dot').forEach(dot => {
    if (dot.dataset.color === savedAccent) dot.classList.add('active');
    dot.onclick = () => {
      accentGroup.querySelectorAll('.cfg-dot').forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
      applyAccent(dot.dataset.color);
    };
  });

  // --- Fondo ---
  const wallGroup = panel.querySelector('#cfg-wall');
  const savedWall = loadConfig('wall', 'blue');
  wallGroup.querySelectorAll('.cfg-wall-opt').forEach(opt => {
    if (opt.dataset.wall === savedWall) opt.classList.add('active');
    opt.onclick = () => {
      wallGroup.querySelectorAll('.cfg-wall-opt').forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      applyWall(opt.dataset.wall);
    };
  });

  // --- Velocidad ---
  const speedRange = panel.querySelector('#cfg-speed');
  const speedVal   = panel.querySelector('#cfg-speed-val');
  const savedSpeed = loadConfig('speed', '280');
  speedRange.value = savedSpeed;
  speedVal.textContent = savedSpeed + 'ms';
  speedRange.oninput = () => {
    speedVal.textContent = speedRange.value + 'ms';
    applySpeed(speedRange.value);
  };
}
