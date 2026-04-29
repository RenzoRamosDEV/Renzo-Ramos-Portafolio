export function initCursorTrail(canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouse = { x: -999, y: -999 };

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  function getAccent() {
    return window.__trailAccent || '#7b2ff7';
  }

  function spawnParticles() {
    const color = '#ffffff';
    for (let i = 0; i < 3; i++) {
      particles.push({
        x: mouse.x + (Math.random() - 0.5) * 8,
        y: mouse.y + (Math.random() - 0.5) * 8,
        r: Math.random() * 18 + 10,
        alpha: Math.random() * 0.12 + 0.04,
        decay: Math.random() * 0.018 + 0.012,
        color: color
      });
    }
    if (particles.length > 120) particles.splice(0, particles.length - 120);
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    spawnParticles();
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      const hex = Math.round(p.alpha * 255).toString(16).padStart(2, '0');
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
      grad.addColorStop(0, p.color + hex);
      grad.addColorStop(1, p.color + '00');
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      p.alpha -= p.decay;
      p.r *= 0.97;
      if (p.alpha <= 0) particles.splice(i, 1);
    }
    requestAnimationFrame(draw);
  }

  draw();
}
