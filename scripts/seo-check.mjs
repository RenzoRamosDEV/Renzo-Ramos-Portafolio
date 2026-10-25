// Comprobación SEO del build (dist/). Se ejecuta sola después de `npm run build` (postbuild) y con `npm run seo:check`.
// Si algo no cumple, termina con error y el build falla (también en GitHub Actions). Sin dependencias: el HTML lo
// genera la propia web, así que basta con leer sus etiquetas.
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;
const SITE = 'https://portafolio-renzoramos.com';
const KB = 1024, MAX_IMG = 150 * KB, MAX_HERO = 300 * KB;   // peso máximo: normales y principal (fetchpriority="high")
const TITLE = [50, 60], DESC = [140, 160];                 // longitudes recomendadas (caracteres)
const NOT_PAGES = /^google[0-9a-f]+\.html$/;               // archivo de verificación de Search Console

const errors = [], warnings = [];
const fail = (page, msg) => errors.push(`${page}: ${msg}`);

const attr = (tag, name) => tag.match(new RegExp(`\\s${name}="([^"]*)"`, 'i'))?.[1];
const tags = (html, name) => html.match(new RegExp(`<${name}\\b[^>]*>`, 'gi')) || [];
const text = s => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const file = url => join(DIST, decodeURI(url.replace(SITE, '').replace(/^\.?\//, '').split(/[?#]/)[0]));

const pages = readdirSync(DIST).filter(f => f.endsWith('.html') && !NOT_PAGES.test(f));
const sitemap = existsSync(join(DIST, 'sitemap.xml')) ? readFileSync(join(DIST, 'sitemap.xml'), 'utf8') : '';
const sitemapLocs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
const sitemapImages = [...sitemap.matchAll(/<image:loc>([^<]+)<\/image:loc>/g)].map(m => m[1]);
const seen = { title: {}, description: {}, canonical: {} };

for (const page of pages) {
  const html = readFileSync(join(DIST, page), 'utf8');
  const robots = attr(tags(html, 'meta').find(t => attr(t, 'name') === 'robots') || '', 'content') || '';
  const indexable = !/noindex/.test(robots);

  // Seguridad: CSP en todas las páginas
  if (!tags(html, 'meta').some(t => attr(t, 'http-equiv') === 'Content-Security-Policy')) fail(page, 'sin CSP (<meta http-equiv="Content-Security-Policy">)');
  if (!/<html lang="es">/.test(html)) fail(page, 'falta <html lang="es">');

  // Imágenes: alt, width/height, archivo existente y peso de lo que se descarga (WebP del srcset o la original)
  for (const img of tags(html, 'img')) {
    const src = attr(img, 'src');
    if (attr(img, 'alt') === undefined) fail(page, `<img src="${src}"> sin atributo alt`);
    if (!attr(img, 'width') || !attr(img, 'height')) fail(page, `<img src="${src}"> sin width/height`);
    if (!existsSync(file(src))) { fail(page, `imagen inexistente: ${src}`); continue; }
  }
  for (const pic of html.match(/<picture>.*?<\/picture>/gs) || []) {
    const img = tags(pic, 'img')[0], hero = attr(img, 'fetchpriority') === 'high';
    for (const cand of (attr(tags(pic, 'source')[0] || '', 'srcset') || '').split(',').map(s => s.trim().split(' ')[0]).filter(Boolean)) {
      if (!existsSync(file(cand))) { fail(page, `versión WebP inexistente: ${cand}`); continue; }
      const size = statSync(file(cand)).size, max = hero ? MAX_HERO : MAX_IMG;
      if (size > max) fail(page, `${cand} pesa ${Math.round(size / KB)} KB (máx. ${max / KB} KB)`);
    }
  }
  for (const img of tags(html.replace(/<picture>.*?<\/picture>/gs, ''), 'img')) {   // imágenes sin <picture>
    const src = attr(img, 'src'); if (!existsSync(file(src))) continue;
    const size = statSync(file(src)).size, max = attr(img, 'fetchpriority') === 'high' ? MAX_HERO : MAX_IMG;
    if (size > max) fail(page, `${src} pesa ${Math.round(size / KB)} KB (máx. ${max / KB} KB)`);
  }

  // JSON-LD: JSON válido con @context de schema.org
  for (const [, json] of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
    try { const d = JSON.parse(json); if (!/schema\.org/.test(d['@context'])) fail(page, 'JSON-LD sin @context de schema.org'); }
    catch (e) { fail(page, `JSON-LD inválido: ${e.message}`); }
  }

  if (!indexable) continue;

  // Páginas indexables: title, description y canonical únicos y con buena longitud; un solo H1; en el sitemap
  const title = text(html.match(/<title>(.*?)<\/title>/s)?.[1] || '');
  const description = attr(tags(html, 'meta').find(t => attr(t, 'name') === 'description') || '', 'content') || '';
  const canonical = attr(tags(html, 'link').find(t => attr(t, 'rel') === 'canonical') || '', 'href') || '';
  if (!title) fail(page, 'sin <title>');
  else if (title.length < TITLE[0] || title.length > TITLE[1]) fail(page, `title de ${title.length} caracteres (${TITLE.join('-')}): "${title}"`);
  if (!description) fail(page, 'sin meta description');
  else if (description.length < DESC[0] || description.length > DESC[1]) fail(page, `description de ${description.length} caracteres (${DESC.join('-')})`);
  if (!canonical.startsWith(SITE)) fail(page, `canonical ausente o no absoluto: "${canonical}"`);
  for (const [k, v] of Object.entries({ title, description, canonical })) {
    if (v && seen[k][v]) fail(page, `${k} repetido en ${seen[k][v]}`); else seen[k][v] = page;
  }
  const h1 = (html.match(/<h1\b/gi) || []).length;
  if (h1 !== 1) fail(page, `${h1} <h1> (debe haber exactamente 1)`);
  if (!sitemapLocs.includes(canonical)) fail(page, `no está en sitemap.xml (${canonical})`);

  // Las imágenes con contenido (alt no vacío) deben estar en el sitemap de imágenes
  for (const img of tags(html, 'img')) {
    if (!attr(img, 'alt')) continue;
    const abs = `${SITE}/${attr(img, 'src').replace(/^\.?\//, '')}`;
    if (!sitemapImages.includes(encodeURI(abs)) && !sitemapImages.includes(abs)) fail(page, `imagen con alt fuera del sitemap: ${attr(img, 'src')}`);
  }
}

// Sitemap: cada página e imagen que declara existe en dist/
if (!sitemap) fail('sitemap.xml', 'no existe');
for (const loc of sitemapLocs) if (!existsSync(loc.endsWith('/') ? join(file(loc), 'index.html') : file(loc))) fail('sitemap.xml', `página inexistente: ${loc}`);
for (const loc of sitemapImages) if (!existsSync(file(loc))) fail('sitemap.xml', `imagen inexistente: ${loc}`);

// robots.txt y archivos para asistentes de IA
const robots = existsSync(join(DIST, 'robots.txt')) ? readFileSync(join(DIST, 'robots.txt'), 'utf8') : '';
if (!robots.includes(`Sitemap: ${SITE}/sitemap.xml`)) fail('robots.txt', 'no declara el sitemap');
if (/^Disallow:\s*\/\s*$/m.test(robots)) fail('robots.txt', 'bloquea toda la web (Disallow: /)');
for (const f of ['llms.txt', 'llms-full.txt', '404.html']) if (!existsSync(join(DIST, f))) fail(f, 'no existe');

if (warnings.length) console.warn(warnings.map(w => `  aviso: ${w}`).join('\n'));
if (errors.length) {
  console.error(`\nseo:check — ${errors.length} problema(s):\n${errors.map(e => `  ✗ ${e}`).join('\n')}\n`);
  process.exit(1);
}
console.log(`seo:check — OK: ${pages.length} páginas, ${sitemapLocs.length} URLs y ${sitemapImages.length} imágenes en el sitemap`);
