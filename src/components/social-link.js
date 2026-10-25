// Enlace en forma de pastilla (GitHub, LinkedIn, CV), con icono opcional
export const socialLink = ({ href, label, icon }) =>
  `<a href="${href}" target="_blank" rel="noopener">${icon ? `<img src="${icon}" alt="" role="presentation" width="48" height="48">` : ''}${label}</a>`;
