// Contenido del visor de certificados: PDF en un iframe o imagen
const isPdf = f => /\.pdf($|\?)/i.test(f);

export const certDocument = c => isPdf(c.file) ? `<iframe src="${c.file}" title="${c.title}"></iframe>` : `<img src="${c.file}" alt="${c.title}">`;
