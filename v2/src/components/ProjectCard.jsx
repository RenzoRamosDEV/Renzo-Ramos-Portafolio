import { useState, useEffect } from 'react';
import { SCHEMES } from '../constants/schemes';
import { ProjectModal } from './ProjectModal';

export function ProjectCard({ proj, scheme }) {
  const s = SCHEMES[scheme] || SCHEMES['purple-pink'];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Auto-avanzar el carrusel cada 3 segundos
  useEffect(() => {
    if (proj.images && proj.images.length > 1 && !isModalOpen) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => 
          (prevIndex + 1) % proj.images.length
        );
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [proj.images, isModalOpen]);

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? proj.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % proj.images.length
    );
  };

  const handleDotClick = (e, index) => {
    e.stopPropagation();
    setCurrentImageIndex(index);
  };

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="project-card" onClick={handleCardClick}>
      <div className="project-img">
        {proj.images && proj.images.length > 0 ? (
          <div className="project-carousel">
            <img 
              src={proj.images[currentImageIndex]} 
              alt={`${proj.title} - imagen ${currentImageIndex + 1}`} 
              className="carousel-image"
            />
            
            {proj.images.length > 1 && (
              <>
                <button 
                  className="carousel-btn carousel-btn-prev" 
                  onClick={handlePrevImage}
                  aria-label="Imagen anterior"
                >
                  ‹
                </button>
                <button 
                  className="carousel-btn carousel-btn-next" 
                  onClick={handleNextImage}
                  aria-label="Siguiente imagen"
                >
                  ›
                </button>
                
                <div className="carousel-dots">
                  {proj.images.map((_, index) => (
                    <button
                      key={index}
                      className={`carousel-dot ${index === currentImageIndex ? 'active' : ''}`}
                      onClick={(e) => handleDotClick(e, index)}
                      aria-label={`Ir a imagen ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <div
            className="project-img-placeholder"
            style={{ background: `linear-gradient(135deg, rgba(${s.aRgb},0.08) 0%, rgba(${s.bRgb},0.05) 100%)` }}
          >
            <span className="project-img-label">Vista previa próximamente</span>
            <div className="project-img-placeholder-num">{proj.num}</div>
          </div>
        )}
      </div>

      <div className="project-body">
        <div className="project-num-tag">{proj.num}</div>
        <div className="project-title">{proj.title}</div>
        <p className="project-desc">{proj.desc}</p>

        <div className="project-footer">
          <div className="project-badges">
            {proj.badges && proj.badges.map((badge) => (
              <span key={badge} className="project-badge">{badge}</span>
            ))}
          </div>

          <a
            className="project-link"
            href={proj.repo || '#'}
            onClick={(e) => e.stopPropagation()}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
            Repo
          </a>
        </div>
      </div>
      </div>

      <ProjectModal 
        proj={proj}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        scheme={scheme}
      />
    </>
  );
}
