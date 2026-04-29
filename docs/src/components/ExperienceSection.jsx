import { useState, useEffect } from 'react';
import { SCHEMES } from '../constants/schemes';
import { experienceItems } from '../data/experience';
import { educationItems } from '../data/education';
import { certificateItems } from '../data/certificates';
import { ExpCardSmall } from './ExpCardSmall';
import { ExpCardDetail } from './ExpCardDetail';

const VISIBLE_DESKTOP = 3;
const VISIBLE_MOBILE  = 2;

const TABS = [
  { id: 'experiencia',  label: 'Experiencia',  items: experienceItems },
  { id: 'formacion',    label: 'Formación',    items: educationItems },
  { id: 'certificados', label: 'Certificados', items: certificateItems },
];

export function ExperienceSection({ scheme }) {
  const s = SCHEMES[scheme] || SCHEMES['purple-pink'];

  const [activeTab, setActiveTab]       = useState('experiencia');
  const [selectedCard, setSelectedCard] = useState(0);
  const [scrollIndex, setScrollIndex]   = useState(0);
  const [isMobile, setIsMobile]         = useState(() => window.innerWidth <= 720);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 720);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const visibleCount  = isMobile ? VISIBLE_MOBILE : VISIBLE_DESKTOP;
  const currentItems  = TABS.find(t => t.id === activeTab)?.items ?? [];
  const canScrollUp   = scrollIndex > 0;
  const canScrollDown = scrollIndex < currentItems.length - visibleCount;

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

      <div className="exp-layout">

        <div className="exp-list-container">
          <div className="exp-list">
            {currentItems.slice(scrollIndex, scrollIndex + visibleCount).map((item, idx) => (
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

        <div className="exp-scroll-controls">
          <button
            className="exp-scroll-btn"
            onClick={() => setScrollIndex(Math.max(0, scrollIndex - 1))}
            disabled={!canScrollUp || currentItems.length <= visibleCount}
            style={{ color: canScrollUp ? s.a : 'rgba(255,255,255,0.2)' }}
            title="Anterior"
          >
            {isMobile ? '◀' : '▲'}
          </button>
          <button
            className="exp-scroll-btn"
            onClick={() => setScrollIndex(Math.min(currentItems.length - visibleCount, scrollIndex + 1))}
            disabled={!canScrollDown || currentItems.length <= visibleCount}
            style={{ color: canScrollDown ? s.a : 'rgba(255,255,255,0.2)' }}
            title="Siguiente"
          >
            {isMobile ? '▶' : '▼'}
          </button>
        </div>

        <div className="exp-detail">
          {currentItems[selectedCard] && (
            <ExpCardDetail data={currentItems[selectedCard]} scheme={scheme} />
          )}
        </div>

      </div>
    </section>
  );
}
