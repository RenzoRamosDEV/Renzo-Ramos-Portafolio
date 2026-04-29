import { useState, useEffect } from 'react';

export function ProjectModal({ proj, isOpen, onClose, scheme }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Cerrar modal con la tecla Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevenir scroll del body
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Reiniciar índice cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? proj.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % proj.images.length
    );
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose} aria-label="Cerrar modal">
          ✕
        </button>

        <div className="modal-header">
          <div className="modal-num">{proj.num}</div>
          <h3 className="modal-title">{proj.title}</h3>
        </div>

        {proj.images && proj.images.length > 0 ? (
          <div className="modal-carousel">
            <img 
              src={proj.images[currentImageIndex]} 
              alt={`${proj.title} - imagen ${currentImageIndex + 1}`}
              className="modal-image"
            />
            
            {proj.images.length > 1 && (
              <>
                <button 
                  className="modal-carousel-btn modal-carousel-btn-prev" 
                  onClick={handlePrevImage}
                  aria-label="Imagen anterior"
                >
                  ‹
                </button>
                <button 
                  className="modal-carousel-btn modal-carousel-btn-next" 
                  onClick={handleNextImage}
                  aria-label="Siguiente imagen"
                >
                  ›
                </button>
                
                <div className="modal-carousel-counter">
                  {currentImageIndex + 1} / {proj.images.length}
                </div>

                <div className="modal-carousel-dots">
                  {proj.images.map((_, index) => (
                    <button
                      key={index}
                      className={`modal-carousel-dot ${index === currentImageIndex ? 'active' : ''}`}
                      onClick={() => setCurrentImageIndex(index)}
                      aria-label={`Ir a imagen ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="modal-no-images">
            <span>No hay imágenes disponibles</span>
          </div>
        )}

        <div className="modal-footer">
          <p className="modal-desc">{proj.desc}</p>
          
          <div className="modal-badges">
            {proj.badges && proj.badges.map((badge) => (
              <span key={badge} className="modal-badge">{badge}</span>
            ))}
          </div>

          <div className="modal-links">
            {proj.repo && proj.repo !== '#' && (
              <a className="modal-link" href={proj.repo} target="_blank" rel="noopener noreferrer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77" />
                </svg>
                Ver Repositorio
              </a>
            )}
            {proj.demo && proj.demo !== '#' && (
              <a className="modal-link" href={proj.demo} target="_blank" rel="noopener noreferrer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Ver Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
