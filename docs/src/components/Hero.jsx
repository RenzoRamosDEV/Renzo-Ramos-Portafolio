import { SCHEMES } from '../constants/schemes';

export function Hero({ scheme, onScrollTo }) {
  const s = SCHEMES[scheme] || SCHEMES['purple-pink'];
  const gradText = `linear-gradient(135deg, ${s.a} 0%, ${s.b} 100%)`;
  const gradBtn = `linear-gradient(135deg, ${s.a}, ${s.b})`;

  return (
    <section className="hero" id="hero">
      <div
        className="hero-blob-1"
        style={{ background: `radial-gradient(circle, rgba(${s.aRgb},0.9), transparent)` }}
      />
      <div
        className="hero-blob-2"
        style={{ background: `radial-gradient(circle, rgba(${s.bRgb},0.8), transparent)` }}
      />
      <div className="hero-blob-3" />

      <h1 className="hero-name fade-up fade-up-1">
        <span className="hero-name-line1">Renzo</span>
        <span className="hero-name-line2" style={{ backgroundImage: gradText }}>
          Ramos
        </span>
      </h1>

      <div className="hero-pill fade-up fade-up-2">
        <div className="hero-pill-dot" style={{ background: s.a }} />
        <span className="hero-pill-text" style={{
          backgroundImage: gradText,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Desarrollador de Aplicaciones Multiplataforma
        </span>
      </div>

      <p className="hero-desc fade-up fade-up-3">
        Desarrollador backend especializado en Java y Spring Boot, enfocado en la creación de APIs robustas, escalables y mantenibles. Aplico principios de arquitectura limpia, buenas prácticas y diseño orientado al dominio para construir sistemas sólidos centrados en la lógica de negocio.
        <br></br>
        Cuento además con experiencia en frontend y diseño gráfico, lo que me permite entender el producto de forma integral y facilitar la integración entre backend y UI/UX. Esto se traduce en soluciones más coherentes, eficientes y alineadas con la experiencia de usuario final.
      </p>

      <div className="hero-actions fade-up fade-up-4">
        <a
          href="https://github.com/RenzoRamosDEV"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary"
          style={{ textDecoration: 'none' }}
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/renzoinv04/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary"
          style={{ textDecoration: 'none' }}
        >
          LinkedIn
        </a>
      </div>

      <button
        className="hero-scroll-hint"
        onClick={() => onScrollTo('proyectos')}
        aria-label="Scroll down"
      >
        <svg width="32" height="32" viewBox="0 0 20 20" fill="none">
          <path d="M10 3v14M4 11l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

    </section>
  );
}
