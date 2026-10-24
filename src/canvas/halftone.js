import { cssVar } from '../utils/theme.js';

// Trama de puntos entre educación y certificados: círculos completos que crecen
// de forma continua hacia abajo hasta cubrir todo de negro
export function initHalftone(c) {
  const ctx = c.getContext('2d');
  function draw() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = c.clientWidth, h = c.clientHeight;
    c.width = w * dpr; c.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = cssVar('--surface-dark');
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
}
