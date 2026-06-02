const PILLS = ['Java', 'Spring Boot', 'REST API Design', 'Microservicios', 'Docker', 'Clean Architecture', 'SOLID', 'DDD']

export function About() {
  return (
    <div className="about">
      <div className="side">
        <div className="avatar">RR</div>
        <h3>Renzo Ramos</h3>
        <div className="r">
          Backend-Oriented
          <br />
          Full Stack Developer
        </div>
        <ul>
          <li>
            <span className="i">📍</span> Madrid, España
          </li>
          <li>
            <span className="i">💼</span> renzoramosivan@gmail.com
          </li>
          <li>
            <span className="i">☕</span> Java · Spring Boot
          </li>
          <li>
            <span className="i">🗣</span> Español · English
          </li>
        </ul>
      </div>
      <div className="main">
        <h2>Hola, soy Renzo 👋</h2>
        <p>
          Desarrollador <b>Full Stack con orientación backend</b> afincado en Madrid. Me especializo en{' '}
          <b>Java y Spring Boot</b>, construyendo APIs REST escalables y mantenibles aplicando arquitectura limpia,
          principios SOLID y diseño orientado al dominio.
        </p>
        <p>
          Conecto la lógica de backend con la interfaz usando <b>React y TypeScript</b>, e integro herramientas de IA de
          forma deliberada en mi flujo de trabajo — no como muleta, sino como multiplicador de fuerza.
        </p>
        <div className="pillrow">
          {PILLS.map(p => (
            <span className="pill" key={p}>
              {p}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
