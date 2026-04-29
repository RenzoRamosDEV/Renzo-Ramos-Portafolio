import { SCHEMES } from '../constants/schemes';

// Card compacta del listado izquierdo. Al hacer clic selecciona la entrada y muestra su detalle.
export function ExpCardSmall({ data, isSelected, onSelect, scheme }) {
  const s = SCHEMES[scheme] || SCHEMES['purple-pink'];

  return (
    <div
      className={`exp-card-small ${isSelected ? 'selected' : ''}`}
      onClick={onSelect}
      style={isSelected ? { borderLeftColor: s.a, backgroundColor: 'rgba(255,255,255,0.05)' } : {}}
    >
      <div className="exp-card-small-content">
        <h4 className="exp-card-small-title">{data.title}</h4>
        <p className="exp-card-small-company">{data.company}</p>
        <p className="exp-card-small-period">{data.period}</p>
      </div>
    </div>
  );
}
