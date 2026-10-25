// Prerender: sustituye cada <div data-mount="…"></div> del HTML por el markup de su sección, generado
// en Node con las mismas funciones render…() que usa el navegador. Así el contenido llega en el HTML
// (lo leen Google y los rastreadores de IA que no ejecutan JavaScript) y el JS solo añade el comportamiento.
import { readFileSync } from 'node:fs';
import { basename, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

// Página → módulo que devuelve { marcador: markup }
const PAGES = {
  'index.html': ['src/pages/home-page.js', 'homeSlots'],
  'personal.html': ['src/pages/personal-page.js', 'personalSlots'],
};

// Variables CSS de :root (colores) para cssVar() fuera del navegador
function readCssVars(root) {
  const css = readFileSync(resolve(root, 'src/styles/base/variables.css'), 'utf8');
  return Object.fromEntries([...css.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map(([, k, v]) => [k, v.trim()]));
}

export function prerender() {
  let root, server;
  return {
    name: 'prerender-sections',
    configResolved(config) { root = config.root; },
    configureServer(s) { server = s; },
    transformIndexHtml: {
      order: 'pre',
      async handler(html, ctx) {
        const page = PAGES[basename(ctx.filename)];
        if (!page) return html;
        const [file, exportName] = page;
        globalThis.__CSS_VARS__ = readCssVars(root);
        const mod = server
          ? await server.ssrLoadModule('/' + file)
          : await import(`${pathToFileURL(resolve(root, file)).href}?t=${Date.now()}`);
        const slots = mod[exportName]();
        return html.replace(/<div data-mount="([\w-]+)"><\/div>/g, (tag, name) => {
          if (!(name in slots)) throw new Error(`prerender: falta el markup de "${name}" en ${file}`);
          return slots[name];
        });
      },
    },
  };
}
