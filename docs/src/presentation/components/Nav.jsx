import { SCHEMES } from '../../config/schemes';

/**
 * Barra de navegación superior fija.
 *
 * Renderiza el logo (con un punto coloreado según el scheme activo) y
 * los enlaces a las secciones principales. Cada link delega el scroll
 * al callback `onScrollTo` provisto por el padre, en lugar de usar
 * anchors nativos, para tener control sobre el offset del nav fijo.
 *
 * @param {Object}   props
 * @param {import('../../domain/types.js').SchemeId} props.scheme      - Esquema activo.
 * @param {(id: string) => void}                     props.onScrollTo  - Scroll suave a sección por id.
 * @returns {JSX.Element}
 */
export function Nav({ scheme, onScrollTo }) {
  const s = SCHEMES[scheme] || SCHEMES['purple-pink'];
  const gradBtn = `linear-gradient(135deg, ${s.a}, ${s.b})`;

  // Orden visible en el nav: portafolio → experiencia → stack
  const links = [
    ['proyectos', 'Portafolio'],
    ['experiencia', 'Experiencia'],
    ['stack', 'Stack']
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
