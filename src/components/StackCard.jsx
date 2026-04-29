import { SCHEMES } from '../constants/schemes';

export function StackCard({ item, scheme }) {
  const s = SCHEMES[scheme] || SCHEMES['purple-pink'];

  return (
    <div className="stack-card">
      <div className="stack-card-icon">
        {item.icon ? (
          <img src={item.icon} alt={item.name} />
        ) : (
          <div
            className="stack-card-icon-placeholder"
            style={{ background: `${item.color}22`, color: item.color }}
          >
            {item.label}
          </div>
        )}
      </div>
      <div className="stack-card-name">{item.name}</div>
      <div className="stack-card-desc">{item.desc}</div>
    </div>
  );
}
