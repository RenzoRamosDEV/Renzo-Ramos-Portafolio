// Enlaces de navegación a las secciones
export const navLinks = (items, indent) => items.map(i => `<a href="${i.href}">${i.label}</a>`).join(`\n${indent}`);
