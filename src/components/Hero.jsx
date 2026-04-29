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
        Enfoque en Backend (Java/Spring Boot), especializado en la construcción de servicios escalables y mantenibles. Trabajo principalmente en la lógica de negocio y APIs, aplicando buenas prácticas y arquitectura limpia.<br></br>
        También cuento con experiencia en frontend y diseño gráfico, lo que me permite tener una visión completa del producto y facilitar la integración entre backend y UI/UX, logrando soluciones coherentes y eficientes.
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
        <a
          href="mailto:renzoramosivan@gmail.com"
          className="btn-secondary"
          style={{ textDecoration: 'none' }}
        >
          Correo
        </a>
      </div>

    </section>
  );
}
