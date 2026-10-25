// Humo de la portada: nubes grises difuminadas que flotan despacio, unas detrás de la figura y otras delante
import { prefersReducedMotion } from '../utils/motion.js';

// Se fijan al iniciar el humo (mismo momento que en el script original)
let reduceMotion, puffs;
// El humo solo se anima mientras la portada está en pantalla (fuera de ella no se ve y gastaría CPU)
let heroVisible = true;

// Texturas de las bocanadas de humo (512×512, transparentes). Antes se calculaban en cada visita con un
// desenfoque de canvas (≈1,8 s de CPU en móvil); ahora vienen precalculadas: scripts/smoke-textures.mjs las regenera
const PUFFS = [1, 2, 3, 4].map(n => `opt/media/humo/humo-${n}-512.webp`);
const loadPuff = src => { const img = new Image(); img.src = src; return img.decode().then(() => img); };

function smokeLayer(canvas, opts) {
  const ctx = canvas.getContext('2d');
  let W, H, clouds = [];

  function resize() {
    W = canvas.clientWidth; H = canvas.clientHeight;
    canvas.width = W; canvas.height = H;
  }

  function makeCloud(initial) {
    const size = opts.size[0] + Math.random() * (opts.size[1] - opts.size[0]);
    return {
      x: initial ? Math.random() * (W + size) - size : -size,
      y: H * (opts.band[0] + Math.random() * (opts.band[1] - opts.band[0])) - size / 2,
      size,
      vx: 0.15 + Math.random() * 0.45,
      vy: (Math.random() - 0.5) * 0.12,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.0012,
      alpha: opts.alpha * (0.5 + Math.random() * 0.5),
      sprite: puffs[(Math.random() * puffs.length) | 0],
      life: initial ? Math.random() : 0,
    };
  }

  function frame() {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < clouds.length; i++) {
      const c = clouds[i];
      if (!reduceMotion) {
        c.x += c.vx; c.y += c.vy; c.rot += c.vr;
        c.life = Math.min(1, c.life + 0.004);
      }
      if (c.x > W) clouds[i] = makeCloud(false);
      ctx.save();
      ctx.globalAlpha = c.alpha * c.life;
      ctx.translate(c.x + c.size / 2, c.y + c.size / 2);
      ctx.rotate(c.rot);
      ctx.drawImage(c.sprite, -c.size / 2, -c.size / 2, c.size, c.size);
      ctx.restore();
    }
    if (!reduceMotion) requestAnimationFrame(heroVisible ? frame : waitForHero);
  }
  // Mientras la portada no se ve, comprueba cada fotograma si ha vuelto sin dibujar nada
  function waitForHero() { requestAnimationFrame(heroVisible ? frame : waitForHero); }

  resize();
  clouds = Array.from({ length: opts.count }, () => makeCloud(true));
  window.addEventListener('resize', resize);
  requestAnimationFrame(frame);
}

export async function initSmoke() {
  reduceMotion = prefersReducedMotion();
  puffs = await Promise.all(PUFFS.map(loadPuff));
  new IntersectionObserver(([e]) => { heroVisible = e.isIntersecting; }).observe(document.querySelector('.hero'));
  smokeLayer(document.getElementById('smoke-back'),  { count: 14, size: [380, 760], band: [0.25, 0.95], alpha: 0.4 });
  smokeLayer(document.getElementById('smoke-front'), { count: 7,  size: [420, 700], band: [0.8, 1.05], alpha: 0.5 });
}
