import { useState } from 'react';
import { SCHEMES } from '../constants/schemes';
import { experienceItems } from '../data/experience';
import { educationItems } from '../data/education';
import { certificateItems } from '../data/certificates';
import { ExpCardSmall } from './ExpCardSmall';
import { ExpCardDetail } from './ExpCardDetail';

// Número máximo de cards visibles en la lista antes de paginar con flechas
const VISIBLE_ITEMS = 3;

const TABS = [
  { id: 'experiencia',  label: 'Experiencia',  items: experienceItems },
  { id: 'formacion',    label: 'Formación',    items: educationItems },
  { id: 'certificados', label: 'Certificados', items: certificateItems },
];

export function ExperienceSection({ scheme }) {
  const s = SCHEMES[scheme] || SCHEMES['purple-pink'];

  const [activeTab, setActiveTab]     = useState('experiencia');
  const [selectedCard, setSelectedCard] = useState(0);
  const [scrollIndex, setScrollIndex]   = useState(0);

  const currentItems = TABS.find(t => t.id === activeTab)?.items ?? [];
  const canScrollUp   = scrollIndex > 0;
  const canScrollDown = scrollIndex < currentItems.length - VISIBLE_ITEMS;

  function handleTabChange(tabId) {
    setActiveTab(tabId);
    setSelectedCard(0);
    setScrollIndex(0);
  }

  return (
    <section className="section" id="experiencia">
      <div className="section-tag" style={{ color: s.b }}>Trayectoria</div>
      <h2 className="section-title">
        Experiencia &amp;<br />Formación
      </h2>

      {/* Pestañas de filtro */}
      <div className="exp-tabs-container">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`exp-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => handleTabChange(tab.id)}
            style={activeTab === tab.id ? { color: s.a } : {}}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Layout: lista | flechas | detalle */}
      <div className="exp-layout">

        {/* Lista izquierda — muestra VISIBLE_ITEMS cards a la vez */}
        <div className="exp-list-container">
          <div className="exp-list">
            {currentItems.slice(scrollIndex, scrollIndex + VISIBLE_ITEMS).map((item, idx) => (
              <ExpCardSmall
                key={scrollIndex + idx}
                data={item}
                isSelected={selectedCard === scrollIndex + idx}
                onSelect={() => setSelectedCard(scrollIndex + idx)}
                scheme={scheme}
              />
            ))}
          </div>
        </div>

        {/* Flechas de paginación — deshabilitadas si no hay suficientes items */}
        <div className="exp-scroll-controls">
          <button
            className="exp-scroll-btn"
            onClick={() => setScrollIndex(Math.max(0, scrollIndex - 1))}
            disabled={!canScrollUp || currentItems.length <= VISIBLE_ITEMS}
            style={{ color: canScrollUp ? s.a : 'rgba(255,255,255,0.2)' }}
            title="Anterior"
          >
            ▲
          </button>
          <button
            className="exp-scroll-btn"
            onClick={() => setScrollIndex(Math.min(currentItems.length - VISIBLE_ITEMS, scrollIndex + 1))}
            disabled={!canScrollDown || currentItems.length <= VISIBLE_ITEMS}
            style={{ color: canScrollDown ? s.a : 'rgba(255,255,255,0.2)' }}
            title="Siguiente"
          >
            ▼
          </button>
        </div>

        {/* Detalle derecho — muestra la información completa del item seleccionado */}
        <div className="exp-detail">
          {currentItems[selectedCard] && (
            <ExpCardDetail data={currentItems[selectedCard]} scheme={scheme} />
          )}
        </div>

      </div>
    </section>
  );
}
