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
