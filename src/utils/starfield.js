export function initStarfield(canvas) {
  const ctx = canvas.getContext('2d');
  let stars = [];
  let shootingStars = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function initStars() {
    stars = [];
    for (let i = 0; i < 260; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.4 + 0.2,
        a: Math.random() * 0.7 + 0.05,
        speed: Math.random() * 0.004 + 0.001,
        offset: Math.random() * Math.PI * 2
      });
    }
  }

  function createShootingStar() {
    const startX = Math.random() * canvas.width;
    const startY = Math.random() * canvas.height * 0.5;
    shootingStars.push({
      x: startX,
      y: startY,
      vx: Math.random() * 3 + 3,
      vy: Math.random() * 2 + 1.5,
      life: 1,
      maxLife: 1,
      trail: []
    });
  }

  function draw(t) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar estrellas fijas
    for (const s of stars) {
      const alpha = s.a * (0.5 + 0.5 * Math.sin(t * s.speed * 100 + s.offset));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.fill();
    }

    // Crear nuevas estrellas fugaces ocasionalmente
    if (Math.random() < 0.01) {
      createShootingStar();
    }

    // Dibujar estrellas fugaces
    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const ss = shootingStars[i];

      // Agregar punto actual al trail
      ss.trail.push({ x: ss.x, y: ss.y, age: 0 });
      if (ss.trail.length > 80) ss.trail.shift();

      ss.x += ss.vx;
      ss.y += ss.vy;
      ss.life -= 0.015;

      if (ss.life <= 0) {
        shootingStars.splice(i, 1);
        continue;
      }

      // Dibujar la estela
      for (let j = 0; j < ss.trail.length; j++) {
        const point = ss.trail[j];
        point.age += 1;
        const trailAlpha = (1 - point.age / ss.trail.length) * ss.life * 0.7;

        ctx.beginPath();
        ctx.arc(point.x, point.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${trailAlpha})`;
        ctx.fill();
      }

      // Dibujar la estrella principal
      const headAlpha = ss.life * 0.95;
      ctx.beginPath();
      ctx.arc(ss.x, ss.y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${headAlpha})`;
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  resize();
  initStars();
  window.addEventListener('resize', () => {
    resize();
    initStars();
  });
  requestAnimationFrame(draw);
}
