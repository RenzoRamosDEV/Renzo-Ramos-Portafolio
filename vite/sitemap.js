// Sitemap: genera dist/sitemap.xml en cada build con todas las páginas y TODAS sus imágenes
// (<image:image> con título y descripción), para que salgan en Google Imágenes.
// lastmod = fecha del último commit que tocó los archivos de la página. En dev se sirve en /sitemap.xml.
import { execSync } from 'node:child_process';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const SITE = 'https://portafolio-renzoramos.com';
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function lastmod(root, files) {
  const git = args => { try { return execSync(`git log -1 --format=%cs ${args}`, { cwd: root, stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim(); } catch { return ''; } };
  return git(`-- ${files.join(' ')}`) || git('') || new Date().toISOString().slice(0, 10);
}

async function pages(root) {
  const { projects } = await import(`${pathToFileURL(resolve(root, 'src/data/projects.js')).href}?t=${Date.now()}`);
  const photo = (slug, title, caption) => ({
    loc: `/${slug}.html`, files: [`public/${slug}.html`, `public/img/${slug}.jpg`], priority: '0.4', changefreq: 'yearly',
    images: [
      { loc: `/img/${slug}.jpg`, title, caption },
      { loc: `/img/og/${slug}.jpg`, title, caption },
    ],
  });
  return [
    {
      loc: '/', files: ['index.html', 'src'], priority: '1.0', changefreq: 'monthly',
      images: [
        { loc: '/media/renzo-ramos-desarrollador-ia-madrid-portada.png', title: 'Renzo Ramos, Junior AI Engineer y desarrollador de software en Madrid', caption: 'Renzo Ramos, Junior AI Engineer en Madrid, con máscara blanca y sudadera negra' },
        { loc: '/img/og/renzo-ramos-junior-ai-engineer-madrid-portafolio.jpg', title: 'Portafolio de Renzo Ramos', caption: 'Portada del portafolio de Renzo Ramos, Junior AI Engineer y desarrollador de software en Madrid' },
        ...projects.flatMap(p => (p.images || []).map(img => ({ loc: `/${img.src}`, title: `${p.name} — proyecto de Renzo Ramos`, caption: img.alt }))),
      ],
    },
    {
      loc: '/personal.html', files: ['personal.html', 'src/sections/personal-hero.js', 'src/sections/personal-story.js', 'src/data/personal.js'], priority: '0.6', changefreq: 'yearly',
      images: [
        { loc: '/media/renzo-ramos-de-los-rios-sobre-mi.png', title: 'Renzo Ramos de los Ríos, sobre mí', caption: 'Renzo Ramos de los Ríos, desarrollador de software e IA en Madrid, saludando con las manos' },
        { loc: '/img/og/renzo-ramos-sobre-mi.jpg', title: 'Sobre mí — Renzo Ramos', caption: 'Renzo Ramos de los Ríos, desarrollador de software e IA en Madrid' },
      ],
    },
    photo('renzo-ramos-ingeniero-inteligencia-artificial-madrid', 'Renzo Ramos, ingeniero de inteligencia artificial en Madrid', 'Renzo Ramos, ingeniero de inteligencia artificial (Junior AI Engineer) en Madrid, con gafas y camisa de cuadros'),
    photo('renzo-ramos-ingeniero-de-software', 'Renzo Ramos, ingeniero de software y Técnico Superior DAM', 'Renzo Ramos, ingeniero de software y Técnico Superior en DAM, con gafas redondas y pelo naranja'),
    photo('renzo-ramos-junior-ai-engineer-madrid', 'Renzo Ramos, Junior AI Engineer en Madrid', 'Renzo Ramos, Junior AI Engineer y desarrollador de software, trabajando en su escritorio con un portátil en Madrid'),
    { loc: '/licencia-imagenes.html', files: ['public/licencia-imagenes.html'], priority: '0.2', changefreq: 'yearly', images: [] },
  ];
}

export async function buildSitemap(root) {
  const urls = (await pages(root)).map(p => `  <url>
    <loc>${SITE}${p.loc}</loc>
    <lastmod>${lastmod(root, p.files)}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
${p.images.map(i => `    <image:image>
      <image:loc>${SITE}${encodeURI(i.loc)}</image:loc>
      <image:title>${esc(i.title)}</image:title>
      <image:caption>${esc(i.caption)}</image:caption>
    </image:image>`).join('\n')}
  </url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`;
}

export function sitemap() {
  let root;
  return {
    name: 'sitemap',
    configResolved(config) { root = config.root; },
    configureServer(server) {
      server.middlewares.use('/sitemap.xml', async (req, res) => {
        res.setHeader('Content-Type', 'application/xml; charset=utf-8');
        res.end(await buildSitemap(root));
      });
    },
    async generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: await buildSitemap(root) });
    },
  };
}
