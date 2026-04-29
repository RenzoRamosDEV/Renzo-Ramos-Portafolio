import { ProjectCard } from './ProjectCard';
import { SCHEMES } from '../constants/schemes';
import { PROJECTS } from '../data/projects';

export function ProjectsSection({ scheme }) {
  const s = SCHEMES[scheme] || SCHEMES['purple-pink'];

  return (
    <section className="section" id="proyectos">
      <div className="section-tag" style={{ color: s.a }}>
        Portafolio
      </div>
      <h2 className="section-title">
        Proyectos
        <br />
        destacados
      </h2>

      <div className="projects-grid">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.num} proj={p} scheme={scheme} />
        ))}
      </div>
    </section>
  );
}
