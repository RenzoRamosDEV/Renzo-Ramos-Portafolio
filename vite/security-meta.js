// Cabeceras de seguridad posibles en GitHub Pages (no deja configurar cabeceras HTTP): CSP y Referrer-Policy
// como <meta>. Solo en el build: en dev, Vite inyecta scripts propios que la CSP bloquearía.
// Todo se sirve desde el propio dominio; 'unsafe-inline' en estilos por el CSS en línea y los style="" del markup.
export const CSP = [
  "default-src 'self'", "script-src 'self'", "style-src 'self' 'unsafe-inline'", "img-src 'self' data:",
  "font-src 'self'", "connect-src 'self'", "frame-src 'self'", "media-src 'self'", "object-src 'none'",
  "base-uri 'self'", "form-action 'self'", 'upgrade-insecure-requests',
].join('; ');

// Van justo después de <meta charset>: la CSP solo se aplica a lo que viene detrás de ella
export function securityMeta() {
  return {
    name: 'security-meta',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler: html => html.replace(/<meta charset="utf-8">/i, m => `${m}
<meta http-equiv="Content-Security-Policy" content="${CSP}">
<meta name="referrer" content="strict-origin-when-cross-origin">`),
    },
  };
}
