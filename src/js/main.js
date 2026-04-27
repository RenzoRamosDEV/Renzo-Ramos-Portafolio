import { stackItems } from '../data/stack.js';
import { projects } from '../data/projects.js';
import { initI18nAndDarkMode } from '../utils/i18n-dark-mode.js';
import { initScrollReveal } from '../utils/scroll-reveal.js';
import { initDrawingTrail } from '../utils/drawing-trail.js';
import { initMobileMenu } from '../utils/mobile-menu.js';

/* Valores por defecto para el panel de tweaks */
const TWEAK_DEFAULTS = {
  devName: 'RenzoRamos',
  devRole: 'Full Stack Developer',
  accentColor: '#2b68ca',
  gridStyle: 'dots',
  darkMode: false,
};

/**
 * Renderiza el grid de tecnologías
 * @param {HTMLElement} container - Contenedor donde renderizar
 */
function renderStackGrid(container) {
  if (!container) return;

  const doubled = [...stackItems, ...stackItems];
  const html = doubled
    .map(
      (item, i) => `
    <div class="stack-card ${item.images ? 'dual-icon' : ''}" ${i >= stackItems.length ? 'aria-hidden="true"' : ''} role="listitem">
      <div class="stack-icon" style="background: ${item.bg}; color: ${item.color}">
        ${
          item.images
            ? item.images.map((img) => `<img src="${img}" alt="${item.name}" class="stack-icon-img">`).join('')
            : item.image
              ? `<img src="${item.image}" alt="${item.name}" class="stack-icon-img">`
              : item.name.slice(0, 3).toUpperCase()
        }
      </div>
      <div class="stack-name">${item.name}</div>
      <div class="stack-desc">${item.desc}</div>
    </div>
  `
    )
    .join('');

  container.innerHTML = html;
}

/**
 * Renderiza la lista de proyectos
 * @param {HTMLElement} container - Contenedor donde renderizar
 */
function renderProjects(container) {
  if (!container) return;

  const html = projects
    .map(
      (proj, i) => `
    <div class="project-card reveal ${i % 2 === 1 ? 'reverse' : ''}" role="listitem">
      <div class="project-info">
        <div class="project-num">${proj.num}</div>
        <h3 class="project-title">${escapeHtml(proj.title)}</h3>
        <p class="project-desc">${escapeHtml(proj.desc)}</p>
        <div class="badges">
          ${proj.badges.map((b) => `<span class="badge">${escapeHtml(b)}</span>`).join('')}
        </div>
        <div style="display: flex; gap: 1.5rem; flex-wrap: wrap;">
          <a href="${escapeHtml(proj.repo)}" class="project-link" target="_blank" rel="noopener noreferrer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
            </svg>
            <span>Ver repositorio</span>
          </a>
          <a href="${escapeHtml(proj.demo)}" class="project-link" target="_blank" rel="noopener noreferrer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            <span>Demo en vivo</span>
          </a>
        </div>
      </div>

      <div class="project-visual">
        <div class="project-visual-inner">
          <span class="project-visual-icon" aria-hidden="true">
            ${['🖥️', '⚙️', '🚀'][i]}
          </span>
          <div style="font-family: var(--mono); font-size: 0.68rem; color: var(--ink-light)">
            mockup / captura<br>del proyecto
          </div>
        </div>
      </div>
    </div>
  `
    )
    .join('');

  container.innerHTML = html;
}

/**
 * Escapa caracteres HTML para prevenir XSS
 * @param {string} text - Texto a escapar
 * @returns {string} Texto escapado
 */
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return String(text).replace(/[&<>"']/g, (char) => map[char]);
}

/**
 * Inicializa la aplicación cuando el DOM está listo
 */
function init() {
  const stackGrid = document.getElementById('stack-grid');
  const projectsList = document.getElementById('projects-list');

  /* Renderizar contenido dinámico */
  renderStackGrid(stackGrid);
  renderProjects(projectsList);

  /* Inicializar funcionalidades */
  initI18nAndDarkMode();
  initScrollReveal();
  initDrawingTrail();
  initMobileMenu();

  /* Log de desarrollo */
  if (process.env.NODE_ENV !== 'production') {
    console.log('🚀 Portfolio iniciado correctamente');
  }
}

/* Esperar a que el DOM esté completamente cargado */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
