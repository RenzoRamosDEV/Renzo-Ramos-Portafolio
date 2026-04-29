import { useState } from 'react';
import { SCHEMES } from '../constants/schemes';

// Panel de detalle derecho — muestra toda la información del item seleccionado
export function ExpCardDetail({ data, scheme }) {
  const s = SCHEMES[scheme] || SCHEMES['purple-pink'];
  const [showPdfModal, setShowPdfModal] = useState(false);

  return (
    <>
      <div className="exp-card-detail">
        {/* Barra de acento con el color del esquema */}
        <div
          className="exp-detail-accent"
          style={{ background: `linear-gradient(to bottom, ${s.a}, ${s.b})` }}
        />

        <div className="exp-detail-header">
          <div>
            <h3 className="exp-detail-title">{data.title}</h3>
            <p className="exp-detail-company">
              {data.company}
              {data.location && <span className="exp-detail-location"> • {data.location}</span>}
            </p>
          </div>
          {data.period && (
            <span className="exp-detail-period">{data.period}</span>
          )}
        </div>

        {data.desc && (
          <p className="exp-detail-desc">{data.desc}</p>
        )}

        {/* Preview del PDF si existe */}
        {data.pdf && data.preview && (
          <div className="exp-detail-pdf-section">
            <h4 className="exp-detail-pdf-title">Vista previa del certificado</h4>
            <div 
              className="exp-detail-pdf-preview"
              onClick={() => setShowPdfModal(true)}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={data.preview}
                alt="Preview del certificado"
                className="exp-detail-pdf-preview-img"
              />
              <div className="exp-detail-pdf-overlay">
                <span>Click para ampliar</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal para ver el PDF completo */}
      {showPdfModal && data.pdf && (
        <div className="pdf-modal-overlay" onClick={() => setShowPdfModal(false)}>
          <div className="pdf-modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="pdf-modal-close"
              onClick={() => setShowPdfModal(false)}
              style={{ color: s.a }}
            >
              ✕
            </button>
            <iframe
              src={data.pdf}
              className="pdf-modal-iframe"
              title="PDF Viewer"
            />
          </div>
        </div>
      )}
    </>
  );
}
