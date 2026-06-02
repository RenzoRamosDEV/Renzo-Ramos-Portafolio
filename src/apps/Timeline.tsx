import { EDUCATION, EXPERIENCE } from '../data/timeline'
import type { TimelineItem } from '../data/timeline'

function Item({ item }: { item: TimelineItem }) {
  return (
    <div className="titem">
      <div className="dot" />
      <div className="when">{item.when}</div>
      <h4>{item.title}</h4>
      <div className="where">{item.where}</div>
      <p>{item.desc}</p>
    </div>
  )
}

export function Timeline() {
  return (
    <div className="timeline">
      <div className="tl-group">Experiencia</div>
      {EXPERIENCE.map((it, i) => (
        <Item item={it} key={'e' + i} />
      ))}
      <div className="tl-group">Formación</div>
      {EDUCATION.map((it, i) => (
        <Item item={it} key={'f' + i} />
      ))}
    </div>
  )
}
