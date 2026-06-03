import { getProject } from '../data/projects'

export function ProjectDetail({ id }: { id: string }) {
  const p = getProject(id)
  if (!p) return null

  return (
    <div className="pd">
      <div className="hero">
        <div className={`pico ${p.iconClass}`}>{p.icon}</div>
        <div>
          <h2>{p.title}</h2>
          <div className="sub">{p.role}</div>
        </div>
      </div>
      <div className="body">
        <div className="blk">
          <div className="gallery">
            {p.images.map((src, i) => (
              <img className="gimg" key={i} src={src} alt={`${p.title} captura ${i + 1}`} loading="lazy" />
            ))}
          </div>
        </div>
        <div className="blk">
          <div className="h">Resumen</div>
          <p>{p.summary}</p>
        </div>
        <div className="blk">
          <div className="h">{p.pointsLabel ?? 'Características clave'}</div>
          <ul className="feat">
            {p.points.map((pt, i) => (
              <li key={i}>
                <b>{pt.title}</b>
                <span>{pt.body}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="blk">
          <div className="h">Tecnologías</div>
          <div className="chips">
            {p.badges.map(b => (
              <span className="chip2" key={b}>
                {b}
              </span>
            ))}
          </div>
        </div>
        <div className="proj-btns">
          <a className="repo-btn" href={p.repo} target="_blank" rel="noopener">
            ⎇ Ver repositorio en GitHub
          </a>
          {p.preview && (
            <a className="repo-btn preview-btn" href={p.preview} target="_blank" rel="noopener">
              ↗ Ver demo en vivo
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
