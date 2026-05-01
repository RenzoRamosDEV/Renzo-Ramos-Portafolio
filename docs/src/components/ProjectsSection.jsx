import { useRef, useState, useEffect } from 'react';
import { ProjectCard } from './ProjectCard';
import { SCHEMES } from '../constants/schemes';
import { PROJECTS } from '../data/projects';

export function ProjectsSection({ scheme }) {
  const s = SCHEMES[scheme] || SCHEMES['purple-pink'];
  const wrapperRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  function updateArrows() {
    const el = wrapperRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }

  useEffect(() => {
    updateArrows();
    const el = wrapperRef.current;
    el?.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);
    return () => {
      el?.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
  }, []);

  function scrollBy(dir) {
    const el = wrapperRef.current;
    if (!el) return;
    const cardWidth = el.querySelector('.project-card')?.offsetWidth || 400;
    el.scrollBy({ left: dir * (cardWidth + 16), behavior: 'smooth' });
  }

  return (
    <section className="section" id="proyectos">
      <div className="projects-header">
        <div>
          <div className="section-tag" style={{ color: s.a }}>Portafolio</div>
          <h2 className="section-title">
            Proyectos
            <br />
            destacados
          </h2>
        </div>

        {PROJECTS.length > 2 && (
          <div className="projects-nav">
            <button
              className={`projects-nav-btn ${!canPrev ? 'disabled' : ''}`}
              onClick={() => scrollBy(-1)}
              aria-label="Anterior"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M11 4l-5 5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              className={`projects-nav-btn ${!canNext ? 'disabled' : ''}`}
              onClick={() => scrollBy(1)}
              aria-label="Siguiente"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M7 4l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        )}
      </div>

      <div className="projects-scroll-wrapper" ref={wrapperRef}>
        {PROJECTS.map((p) => (
          <ProjectCard key={p.num} proj={p} scheme={scheme} />
        ))}
      </div>
    </section>
  );
}
