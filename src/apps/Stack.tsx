import { STACK, STACK_GROUPS } from '../data/stack'

export function Stack() {
  return (
    <div className="sect">
      <h2>Tech Stack &amp; Metodologías</h2>
      <div className="lead">Herramientas y prácticas que uso en el día a día.</div>

      {STACK_GROUPS.map(group => (
        <div key={group.cat}>
          <div className="grouptitle">
            {group.label} <span className="ln" />
          </div>
          <div className="stack-icons">
            {STACK.filter(s => s.cat === group.cat).map(s => (
              <div className="sico" key={s.name} title={s.desc}>
                <img src={s.icon} alt={s.name} loading="lazy" />
                <span>{s.name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="grouptitle">
        Metodologías <span className="ln" />
      </div>
      <div className="chips">
        {['SOLID', 'Clean Architecture', 'TDD', 'Integration Testing', 'Testcontainers', 'Agile (Scrum/Kanban)', 'Spec-Driven Development', 'Agentic Workflows', 'DDD'].map(m => (
          <span className="chip2" key={m}>
            {m}
          </span>
        ))}
      </div>

      <div className="ainote">
        Uso la IA de forma deliberada: <b>Claude Code</b> en refactors y decisiones de arquitectura, <b>Copilot CLI</b>{' '}
        para sugerencias en terminal y <b>OpenSpec</b> para redactar specs técnicas antes de implementar. No como muleta
        — como multiplicador de fuerza.
      </div>
    </div>
  )
}
