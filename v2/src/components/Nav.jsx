import { SCHEMES } from '../constants/schemes';

export function Nav({ scheme, onScrollTo }) {
  const s = SCHEMES[scheme] || SCHEMES['purple-pink'];
  const gradBtn = `linear-gradient(135deg, ${s.a}, ${s.b})`;

  const links = [
    ['stack', 'Stack'],
    ['experiencia', 'Experiencia'],
    ['proyectos', 'Portafolio']
  ];

  return (
    <nav className="nav">
      <a className="nav-logo" href="#hero" onClick={(e) => {
        e.preventDefault();
        onScrollTo('hero');
      }}>
        <div className="nav-dot" style={{ background: gradBtn }} />
        Renzo Ramos
      </a>
      <div className="nav-center">
        <div className="nav-links">
          {links.map(([id, label]) => (
            <span
              key={id}
              className="nav-link"
              onClick={() => onScrollTo(id)}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </nav>
  );
}
