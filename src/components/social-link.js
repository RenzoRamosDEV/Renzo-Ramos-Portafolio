// Enlace en forma de pastilla (GitHub, LinkedIn, CV), con icono opcional
export const socialLink = ({ href, label, icon }) =>
  `<a href="${href}" target="_blank" rel="noopener">${icon ? `<img src="${icon}" alt="">` : ''}${label}</a>`;
