const root = document.documentElement;
const tb = document.getElementById('themeBtn');
const clk = document.getElementById('clock');

export function setTheme(t) {
  root.setAttribute('data-theme', t);
  tb.textContent = t === 'dark' ? '☀' : '☾';
  localStorage.setItem('pf-theme', t);
}

export function initTheme() {
  const saved = localStorage.getItem('pf-theme');
  const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(saved || (prefersDark ? 'dark' : 'light'));
  tb.onclick = () => setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
}

export function initClock() {
  function tick() {
    clk.textContent = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  }
  tick();
  setInterval(tick, 1000);
}
