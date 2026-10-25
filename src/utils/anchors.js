// Enlaces a secciones de la misma página (#proyectos, #contacto…): la página se desliza hasta la sección sin
// cambiar la URL. En el HTML siguen siendo enlaces normales (los entienden Google y los navegadores sin JavaScript).
import { prefersReducedMotion } from './motion.js';

const behavior = () => (prefersReducedMotion() ? 'auto' : 'smooth');

export function initAnchorLinks() {
  // Si se llega desde otra página con un ancla (p. ej. /#proyectos): se quita el ancla de la dirección y se baja
  // deslizándose a esa sección (sin el ancla, el navegador ya no lo haría)
  if (location.hash) {
    const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    history.replaceState(null, '', location.pathname + location.search);
    if (target) requestAnimationFrame(() => target.scrollIntoView({ behavior: behavior() }));
  }

  document.addEventListener('click', e => {
    const a = e.target.closest('a[href*="#"]');
    if (!a || a.target === '_blank' || a.hasAttribute('download') || a.classList.contains('skip-link')) return;
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || url.pathname !== location.pathname) return;
    const id = decodeURIComponent(url.hash.slice(1));
    const target = id ? document.getElementById(id) : null;
    if (id && !target) return;
    e.preventDefault();
    if (target) target.scrollIntoView({ behavior: behavior() });
    else scrollTo({ top: 0, behavior: behavior() });   // "#": el logo lleva arriba del todo
  });
}
