import { PROJECTS } from '../data/projects'
import { useDesktop } from '../desktop/desktop-context'

export function Projects() {
  const { launch } = useDesktop()
  return (
    <div className="grid">
      {PROJECTS.map(p => (
        <div className="proj" key={p.id} onClick={() => launch('proj-' + p.id)}>
          <div className="ptop">
            <div className={`pico ${p.iconClass}`}>{p.icon}</div>
            <div className="pmeta">
              <div className="pk">{p.role}</div>
              <h4>{p.title}</h4>
              <p>{p.summary.split('. ')[0]}.</p>
            </div>
          </div>
          <div className="ptags">
            {p.badges.slice(0, 6).map(b => (
              <span className="ptag" key={b}>
                {b}
              </span>
            ))}
          </div>
          <div className="open">
            <span>Ver caso completo</span>
            <span>→</span>
          </div>
        </div>
      ))}
    </div>
  )
}
