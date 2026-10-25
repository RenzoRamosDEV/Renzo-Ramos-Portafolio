// Prerender: sustituye cada <div data-mount="…"></div> del HTML por el markup de su sección, generado
// en Node con las mismas funciones render…() que usa el navegador. Así el contenido llega en el HTML
// (lo leen Google y los rastreadores de IA que no ejecutan JavaScript) y el JS solo añade el comportamiento.
// También rellena <!-- prerender:jsonld --> con los datos estructurados de la página (vite/structured-data.js).
import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { basename, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

// Página → módulo que devuelve { marcador: markup }, su JSON-LD (opcional) y sus hojas de estilo
const PAGES = {
  'index.html': { slots: ['src/pages/home-page.js', 'homeSlots'], jsonld: ['vite/structured-data.js', 'homeJsonLd'], css: ['src/styles/main.css'] },
  'personal.html': { slots: ['src/pages/personal-page.js', 'personalSlots'], css: ['src/styles/main.css', 'src/styles/pages/personal.css'] },
};

// Variables CSS de :root (colores) para cssVar() fuera del navegador
function readCssVars(root) {
  const css = readFileSync(resolve(root, 'src/styles/base/variables.css'), 'utf8');
  return Object.fromEntries([...css.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map(([, k, v]) => [k, v.trim()]));
}

// Fecha del último commit (dateModified); sin git, la de hoy
function lastModified(root) {
  try { return execSync('git log -1 --format=%cI', { cwd: root, stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim(); }
  catch { return new Date().toISOString(); }
}

export function prerender() {
  let root, server;
  const load = async file => server
    ? server.ssrLoadModule('/' + file)
    : import(`${pathToFileURL(resolve(root, file)).href}?t=${Date.now()}`);
  return {
    name: 'prerender-sections',
    configResolved(config) { root = config.root; },
    configureServer(s) { server = s; },
    transformIndexHtml: {
      order: 'pre',
      async handler(html, ctx) {
        const page = PAGES[basename(ctx.filename)];
        if (!page) return html;
        globalThis.__CSS_VARS__ = readCssVars(root);
        globalThis.__LAST_UPDATED__ = lastModified(root);
        const [file, exportName] = page.slots;
        const slots = (await load(file))[exportName]();
        html = html.replace(/<div data-mount="([\w-]+)"><\/div>/g, (tag, name) => {
          if (!(name in slots)) throw new Error(`prerender: falta el markup de "${name}" en ${file}`);
          return slots[name];
        });
        if (page.jsonld) {
          const [ldFile, ldExport] = page.jsonld;
          const jsonld = (await load(ldFile))[ldExport]({ lastModified: globalThis.__LAST_UPDATED__ });
          html = html.replace('<!-- prerender:jsonld -->', jsonld);
        }
        // Solo en dev: Vite aplica el CSS desde JavaScript, un instante después de pintar el HTML ya prerenderizado,
        // y se vería la página sin estilos al recargar. Se enlaza también en el <head> para que llegue antes.
        // (En el build el CSS va dentro del HTML: vite/inline-css.js.)
        if (server) html = html.replace('</head>', `${page.css.map(f => `<link rel="stylesheet" href="/${f}">`).join('\n')}\n</head>`);
        return html;
      },
    },
  };
}
