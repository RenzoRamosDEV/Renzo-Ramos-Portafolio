// Menú hamburguesa: abre y cierra el menú principal en pantallas estrechas
export function initMenu() {
  const header = document.querySelector('header');
  const btn = header?.querySelector('.menu-toggle');
  if (!btn) return;
  const set = open => {
    header.classList.toggle('menu-open', open);
    document.body.classList.toggle('menu-lock', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  };
  btn.addEventListener('click', () => set(!header.classList.contains('menu-open')));
  // Al elegir una sección, el menú se cierra (el desplazamiento lo hace utils/anchors.js)
  header.querySelector('nav.main').addEventListener('click', e => { if (e.target.closest('a')) set(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && header.classList.contains('menu-open')) { set(false); btn.focus(); } });
  matchMedia('(min-width: 1101px)').addEventListener('change', e => { if (e.matches) set(false); });
}
