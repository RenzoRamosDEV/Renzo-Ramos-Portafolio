import { useState } from 'react';
import { SCHEMES } from '../constants/schemes';
import { STACK } from '../data/stack';
import { METHODOLOGIES } from '../data/methodologies';

const BACK  = STACK.filter(i => i.cat === 'back');
const FRONT = STACK.filter(i => i.cat === 'front');
const IA    = STACK.filter(i => i.cat === 'ia');
const TOOLS = STACK.filter(i => i.cat === 'tools');

const METHOD_ARCH    = METHODOLOGIES.filter(i => i.cat === 'arch');
const METHOD_DEV     = METHODOLOGIES.filter(i => i.cat === 'dev');
const METHOD_TESTING = METHODOLOGIES.filter(i => i.cat === 'testing');
const METHOD_PROCESS = METHODOLOGIES.filter(i => i.cat === 'process');

const CAT_LABEL = { back: 'Backend', front: 'Frontend', ia: 'IA', tools: 'IDEs & SO' };

function Chip({ item, selected, accent, onClick }) {
  return (
    <div
      className={`stack-chip${selected ? ' stack-chip--selected' : ''}`}
      style={selected ? { borderColor: accent, background: `${accent}18` } : {}}
      title={item.desc}
      onClick={onClick}
    >
      <img src={item.icon} alt={item.name} />
      <span className="stack-chip-name">{item.name}</span>
    </div>
  );
}

function MethodChip({ item, selected, onClick }) {
  return (
    <div
      className={`stack-chip${selected ? ' stack-chip--selected' : ''}`}
      style={selected ? { borderColor: item.color, background: `${item.color}18` } : {}}
      title={item.desc}
      onClick={onClick}
    >
      <div
        className="stack-chip-badge"
        style={{ background: `${item.color}22`, color: item.color }}
      >
        {item.label}
      </div>
      <span className="stack-chip-name">{item.name}</span>
    </div>
  );
}

function DetailCard({ item, accent, onClose }) {
  const isMethod = !item.icon;
  return (
    <div className="stack-detail" style={{ borderColor: `${accent}30` }}>
      <button className="stack-detail-close" onClick={onClose} aria-label="Cerrar">×</button>
      <div className="stack-detail-icon">
        {isMethod ? (
          <div
            className="stack-detail-badge"
            style={{ background: `${accent}22`, color: accent }}
          >
            {item.label}
          </div>
        ) : (
          <img src={item.icon} alt={item.name} />
        )}
      </div>
      <div className="stack-detail-cat" style={{ color: accent }}>
        {isMethod ? item.cat.toUpperCase() : CAT_LABEL[item.cat]}
      </div>
      <div className="stack-detail-name">{item.name}</div>
      <p className="stack-detail-desc">{item.desc}</p>
    </div>
  );
}

export function StackSection({ scheme }) {
  const s = SCHEMES[scheme] || SCHEMES['purple-pink'];
  const [selected, setSelected]     = useState(null);
  const [selectedM, setSelectedM]   = useState(null);

  const stackGroups = [
    { label: 'Backend',  items: BACK,  color: s.a },
    { label: 'Frontend', items: FRONT, color: `${s.b}99` },
    { label: 'IA',       items: IA,    color: s.b },
    { label: 'IDEs & SO',items: TOOLS, color: `${s.a}99` },
  ];

  const methodGroups = [
    { label: 'Arquitectura', items: METHOD_ARCH,    color: `${s.a}99` },
    { label: 'Desarrollo',   items: METHOD_DEV,     color: s.b },
    { label: 'Testing',      items: METHOD_TESTING, color: `${s.b}99` },
    { label: 'Proceso & UI', items: METHOD_PROCESS, color: s.a },
  ];

  const handleChip    = (item) => setSelected(prev  => prev?.name  === item.name ? null : item);
  const handleMethod  = (item) => setSelectedM(prev => prev?.name  === item.name ? null : item);

  return (
    <section className="stack-section" id="stack">
      {/* ── Stack ── */}
      <div className="section-tag" style={{ color: s.a }}>
        Stack Tecnológico
      </div>
      <h2 className="section-title" style={{ marginBottom: 48 }}>
        Herramientas
        <br />
        en mi stack
      </h2>

      <div className="stack-layout">
        <div className="stack-compact-list">
          {stackGroups.map(({ label, items, color }) => (
            <div className="stack-row" key={label}>
              <div className="stack-row-label" style={{ color }}>{label}</div>
              <div className="stack-row-chips">
                {items.map((item, i) => (
                  <Chip
                    key={i}
                    item={item}
                    selected={selected?.name === item.name}
                    accent={s.a}
                    onClick={() => handleChip(item)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {selected && (
          <DetailCard
            item={selected}
            accent={selected.cat === 'ia' || selected.cat === 'front' ? s.b : s.a}
            onClose={() => setSelected(null)}
          />
        )}
      </div>

      {/* ── Metodologías ── */}
      <div className="section-tag section-tag--right" style={{ color: s.b, marginTop: 72 }}>
        Forma de trabajar
      </div>
      <h2 className="section-title section-title--right" style={{ marginBottom: 48 }}>
        Metodologías que
        <br />
        aplico
      </h2>

      <div className={`stack-layout stack-layout--rev${selectedM ? ' has-card' : ''}`}>
        {selectedM && (
          <DetailCard
            item={selectedM}
            accent={selectedM.color}
            onClose={() => setSelectedM(null)}
          />
        )}

        <div className="stack-compact-list">
          {methodGroups.map(({ label, items, color }) => (
            <div className="stack-row" key={label}>
              <div className="stack-row-label" style={{ color }}>{label}</div>
              <div className="stack-row-chips">
                {items.map((item, i) => (
                  <MethodChip
                    key={i}
                    item={item}
                    selected={selectedM?.name === item.name}
                    onClick={() => handleMethod(item)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
