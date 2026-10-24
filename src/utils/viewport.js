// Ejecuta el callback una sola vez, cuando el elemento entra en pantalla
export function onceInViewport(el, threshold, callback) {
  new IntersectionObserver((entries, obs) => {
    entries.forEach(e => { if (e.isIntersecting) { callback(e.target); obs.unobserve(e.target); } });
  }, { threshold }).observe(el);
}
