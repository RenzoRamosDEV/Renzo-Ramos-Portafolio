// Enlaces de navegación a las secciones
export const navLinks = (items, indent) => items.map(i => {
  const external = /^https?:\/\//.test(i.href);
  return `<a href="${i.href}"${external ? ' target="_blank" rel="noopener"' : ''}>${i.label}</a>`;
}).join(`\n${indent}`);
