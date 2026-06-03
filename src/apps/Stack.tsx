import { STACK, STACK_GROUPS } from '../data/stack'

export function Stack() {
  return (
    <div className="sect">
      <h2>Tech Stack</h2>
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

    </div>
  )
}
