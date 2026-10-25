# Cambios SEO por archivo

Rama `seo/optimizacion` (sale de `feat/nuevo-front`). Cada fase se guarda en commits pequeños.
Verificación de cada fase: build de producción comparado con el anterior (capturas de página completa a
1600, 1050, 900 y 600 px, DOM final tras ejecutar el JS y prueba de interacciones con Chrome).

## Fase 2 — SEO on-page

### Prerender del contenido (arreglo crítico)
**Por qué:** el HTML descargado tenía 0 palabras; todo lo pintaba JavaScript. Los rastreadores de IA
(ChatGPT, Claude, Perplexity…) no ejecutan JS y Google lo hace con retraso.
**Resultado:** sin JS, la portada pasa de 0 a 1019 palabras y `personal.html` de 0 a 580. La web es idéntica
píxel a píxel (0 px de diferencia en las 8 capturas) y las interacciones dan el mismo resultado.

| Archivo | Cambio |
|---|---|
| `vite/prerender.js` (nuevo) | Plugin de Vite: en build y en `npm run dev` sustituye cada `<div data-mount>` por el markup de su sección, generado en Node con las mismas funciones `render…()`. |
| `vite.config.ts` | Registra el plugin `prerender()`. |
| `src/pages/home-page.js`, `src/pages/personal-page.js` (nuevos) | Qué sección va en cada marcador (antes estaba dentro de `main.js` / `personal.js`). |
| `src/main.js`, `src/personal.js` | Ya no montan el markup (llega en el HTML); solo arrancan el comportamiento. `mountSlots()` lo monta si faltara. |
| `src/utils/dom.js` | `mount()` → `mountSlots()`, que no hace nada si no quedan marcadores. |
| `src/utils/theme.js` | `cssVar()` funciona fuera del navegador (lee los colores de `variables.css` vía el plugin). |
| `src/sections/projects.js` | El primer proyecto (nombre, etiqueta, descripción, tecnologías, capturas y enlaces) va en el markup. |
| `src/components/exp-card.js`, `exp-detail.js`, `src/sections/experience.js` | Las tarjetas de experiencia y su detalle ("VER MÁS") llevan el texto del puesto en el markup. El detalle pasa de `h4/h5` a `h3/h4` para no saltar niveles después del `h2`. |
| `src/styles/sections/experience.css` | Selectores del detalle a `h3/h4` (mismo estilo). |
| `src/sections/education.js`, `certificates.js`, `contact.js`, `footer.js` | Estudios, certificados, email y año van en el markup (antes los insertaba el JS). |
| `README.md` | Explica el prerender y la carpeta `src/pages/`. |

### Metadatos y estructura
| Archivo | Cambio | Por qué |
|---|---|---|
| `index.html` | Title "Junior AI Engineer y Desarrollador en Madrid \| Renzo Ramos" (58) y description de 158 car. | Keyword principal al inicio, marca al final, sin cortes en Google. |
| `index.html` | `robots` con `max-snippet:-1, max-video-preview:-1`; `geo.region`/`geo.placename` Madrid. | Fragmentos e imágenes grandes en resultados; refuerzo local. |
| `index.html` | Quitado `hreflang="en"` (apuntaba a la misma página en español) y `og:locale:alternate en_US`. | Solo hay español; un hreflang a la misma URL es una señal errónea. |
| `index.html` | `og:type=profile`, nueva `og:image` 1200×630 (captura de la portada actual), `twitter:*` alineado. | La imagen anterior era el logo "RR" antiguo. |
| `index.html` | `link rel="me"` a GitHub y LinkedIn, `rel="author"` a la página Sobre mí, `favicon.ico`. | Identidad del autor (E-E-A-T) y favicon completo. |
| `src/sections/hero.js` + `src/styles/base/utilities.css` | El H1 sigue mostrando "RENZO"; dentro del mismo H1 se añade, solo para lectores de pantalla y buscadores, "Ramos, Junior AI Engineer y desarrollador de software en Madrid" (clase `.sr-only`). | El H1 era solo "RENZO". Completa el texto visible, no lo sustituye ni añade keywords ajenas al contenido. |
| `personal.html` | Title "Sobre mí: desarrollador de IA en Madrid \| Renzo Ramos" (53), description de 153 car., robots completo, OG completo con imagen 1200×630 propia, Twitter con descripción, `rel=me/author`, favicon. | Antes: title de 22 car. sin keyword y OG incompleto. |
| `personal.html` | JSON-LD nuevo: `AboutPage` + `BreadcrumbList` (Inicio › Sobre mí). | No tenía datos estructurados. |
| `src/sections/personal-hero.js` + `src/styles/pages/personal.css` | La etiqueta "PERSONAL · SOBRE MÍ" pasa a ser migas de pan visibles: "INICIO · SOBRE MÍ", con INICIO enlazado a la portada (mismo estilo). Alt de la foto descriptivo. | Breadcrumb visible que coincide con el schema. Único cambio visible de la fase. |
| `public/renzo-ramos-*.html` (×3) | Titles 58–60 car. con "\| Renzo Ramos", descriptions 154–157 car., robots completo, `theme-color`, favicon, `rel=me/author`, OG/Twitter con imagen 1200×630, JSON-LD `WebPage` + `ImageObject` + `BreadcrumbList`, migas de pan visibles y enlaces a la portada y a Sobre mí. | Siguen sin estar enlazadas desde la web; ahora sí enlazan hacia ella. |
| `public/img/og/*.jpg` (nuevos, 5) | Imágenes 1200×630 para redes: portada, Sobre mí y una por foto. | |
| `public/og-image.jpg` | Eliminada (logo antiguo; ya no la usaba nada). | |
| `public/favicon.ico` (nuevo) | 16 + 32 px, generado de los PNG existentes. | |
| `public/sitemap.xml` | Imagen de la portada actualizada y `lastmod` al 25/10/2026. | |
| `seo/keywords.md` (nuevo) | 28 keywords por intención y mapa página → keyword → title → H1 → description. | |

**Pendiente con TODO:** icono SVG (no hay logo vectorial en el repo); competidores de referencia (sección 0).

## Fase 3 — Imágenes y Google Imágenes

**Resultado (Lighthouse móvil, build local):**

| Página | LCP | CLS | Peso total |
|---|---|---|---|
| `/` antes → después | 5,5 s → **2,8 s** | 0,173 → **0,003** | 1722 KB → **441 KB** |
| `/personal.html` antes → después | 5,7 s → **1,8 s** | 0,827 → 0,844 (lo causan las fuentes; fase 4) | 798 KB → **197 KB** |

La web se ve igual: mismas posiciones y tamaños en todas las capturas; las únicas diferencias de píxeles son la
compresión WebP dentro de las fotos.

| Archivo | Cambio | Por qué |
|---|---|---|
| `public/media/*`, `public/img/projects/*/*` | Renombradas con keywords: `renzo-ramos-desarrollador-ia-madrid-portada.png`, `renzo-ramos-de-los-rios-sobre-mi.png`, `renzo-ramos-logo.png`, `renzo-ramos-emblema.png`, `agentboard-servidores-mcp.jpg`, `booqi-carrito.jpg`, `pokedex-retro-ficha-bulbasaur.jpg`… (28 archivos). Ninguna estaba publicada aún, no hacen falta redirecciones. | Nombre descriptivo = señal para Google Imágenes. |
| `src/data/projects.js` | `images` pasa a `[{ src, alt }]`: cada captura con su alt (8-15 palabras). | Antes solo la primera tenía alt (el nombre del proyecto). |
| `src/data/site.js` | Logo renombrado, alt "Renzo Ramos" (antes "CJJ Renzo Ramos") y dimensiones. | |
| `src/utils/responsive.js`, `src/components/picture.js` (nuevos) | `<picture>` con WebP 480/960/1600 (`srcset` + `sizes`), original de respaldo, `width`/`height`, `loading="lazy"` salvo la imagen principal (`fetchpriority="high"`). Decorativas: `alt=""` + `role="presentation"`. | Peso, CLS y LCP. |
| `scripts/images.mjs` (nuevo), `package.json` | Genera los WebP con `sharp` (devDependency nueva) en `public/opt/` antes de `dev` y `build` (`predev`/`prebuild`); solo rehace los que cambian. `public/opt/` está en `.gitignore`. | Optimización dentro del build, también en GitHub Actions. |
| `src/components/project-shot.js` | Capturas con `picture()`; el conjunto va dentro de un enlace al proyecto (`aria-label="Abrir X (pestaña nueva)"`). | Asociar imagen ↔ proyecto. Al pulsar la pantalla del portátil se abre el proyecto. |
| `src/sections/hero.js`, `personal-hero.js`, `footer.js`, `src/components/social-link.js` | Logo, foto de portada (alt descriptivo, prioridad alta), emblema e iconos con `picture()`/dimensiones. | |
| `src/styles/base/reset.css` | `picture { display: contents; }` | `<picture>` no crea caja: el diseño no cambia. |
| `src/styles/sections/hero.css`, `pages/personal.css`, `sections/footer.css` | `width: auto` donde solo se fijaba la altura. | Que el atributo `width` no estire la imagen. |
| `index.html`, `personal.html` | `<link rel="preload" as="image">` de la imagen principal con `imagesrcset`. | LCP. |
| `src/svg/icons.js`, `src/sections/hero.js` | Todos los SVG son decorativos: `aria-hidden="true"` (y `focusable="false"` en los iconos). | No se leen como contenido. |
| `vite/sitemap.js` (nuevo), `vite.config.ts`, `public/sitemap.xml` (eliminado) | El sitemap se genera en cada build: 6 páginas y 34 imágenes con `<image:title>` y `<image:caption>`; `lastmod` = último commit que tocó la página. | Antes solo tenía 1 captura por proyecto. |
| `index.html` (JSON-LD) | La foto de portada se añade a `Person.image`; cada proyecto tiene `ImageObject` con su captura (las referencias antiguas `…/02.jpg` estaban rotas tras el renombrado). Todas con `creator`, `creditText`, `copyrightNotice`, `license` y `acquireLicensePage`. | Datos de licencia para Google Imágenes. |
| `public/licencia-imagenes.html` (nueva) | Página visible con las condiciones de uso (© Renzo Ramos, todos los derechos reservados; cómo pedir permiso). | La exigen `license`/`acquireLicensePage`. |
| `public/renzo-ramos-*.html` | Foto con `<picture>` WebP y `fetchpriority="high"`; licencia en su `ImageObject`; enlace "Licencia de la imagen". | |

**Fuera del repo (ver checklist post-deploy):** la caché de imágenes la marca Cloudflare/GitHub Pages
(`max-age=14400`, 4 h); se puede alargar con una regla de caché en Cloudflare.
