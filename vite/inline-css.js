// CSS en línea: en el build mete cada hoja de estilos del bundle dentro de un <style> en su HTML.
// Todo el CSS ocupa ~28 KB (≈6 KB comprimido), así que la primera pintura no espera a otra petición.
// Las rutas relativas (../fonts/…) se ajustan porque el HTML está en la raíz y no en assets/.
export function inlineCss() {
  return {
    name: 'inline-css',
    apply: 'build',
    enforce: 'post',
    generateBundle(_, bundle) {
      const inlined = new Set();
      for (const html of Object.values(bundle).filter(f => f.fileName.endsWith('.html'))) {
        html.source = String(html.source).replace(/<link rel="stylesheet"(?: crossorigin)? href="\.\/(assets\/[^"]+\.css)">/g, (tag, file) => {
          const css = bundle[file];
          if (!css) return tag;
          inlined.add(file);
          return `<style>${String(css.source).replace(/url\(\.\.\//g, 'url(./')}</style>`;
        });
      }
      for (const file of inlined) delete bundle[file];
    },
  };
}
