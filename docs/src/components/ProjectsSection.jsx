import { useRef, useState, useEffect } from 'react';
import { ProjectCard } from './ProjectCard';
import { SCHEMES } from '../constants/schemes';
import { PROJECTS } from '../data/projects';

export function ProjectsSection({ scheme }) {
  const s = SCHEMES[scheme] || SCHEMES['purple-pink'];
  const wrapperRef = useRef(null);
  const [current, setCurrent] = useState(0);

  function scrollTo(index) {
    const el = wrapperRef.current;
    if (!el) return;
    const card = el.querySelectorAll('.project-card')[index];
    if (card) {
      el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: 'smooth' });
      setCurrent(index);
    }
  }

  function scrollBy(dir) {
    const next = Math.max(0, Math.min(PROJECTS.length - 1, current + dir));
    scrollTo(next);
  }

  // Sincroniza el índice activo al hacer scroll manual
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    function onScroll() {
      const cards = el.querySelectorAll('.project-card');
      let closest = 0;
      let minDist = Infinity;
      cards.forEach((card, i) => {
        const dist = Math.abs(card.offsetLeft - el.offsetLeft - el.scrollLeft);
        if (dist < minDist) { minDist = dist; closest = i; }
      });
      setCurrent(closest);
    }
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="section" id="proyectos">
      <div className="section-tag" style={{ color: s.a }}>Portafolio</div>
      <h2 className="section-title">
        Proyectos
        <br />
        destacados
      </h2>

      <div className="projects-scroll-wrapper" ref={wrapperRef}>
        {PROJECTS.map((p) => (
          <ProjectCard key={p.num} proj={p} scheme={scheme} />
        ))}
      </div>

      {PROJECTS.length > 1 && <div className={`projects-pagination ${PROJECTS.length <= 2 ? 'projects-pagination--desktop-hidden' : ''}`}>
        <button
          className={`projects-nav-btn ${current === 0 ? 'disabled' : ''}`}
          onClick={() => scrollBy(-1)}
          aria-label="Anterior"
        >
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
            <path d="M11 4l-5 5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="projects-dots">
          {PROJECTS.map((_, i) => (
            <button
              key={i}
              className={`projects-dot ${i === current ? 'active' : ''}`}
              onClick={() => scrollTo(i)}
              aria-label={`Proyecto ${i + 1}`}
            />
          ))}
        </div>

        <button
          className={`projects-nav-btn ${current === PROJECTS.length - 1 ? 'disabled' : ''}`}
          onClick={() => scrollBy(1)}
          aria-label="Siguiente"
        >
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
            <path d="M7 4l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>}
    </section>
  );
}
