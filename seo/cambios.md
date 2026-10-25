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

## Fase 4 — SEO técnico

**Resultado (Lighthouse, build local; los datos de producción serán algo mejores porque Cloudflare comprime con brotli):**

| Página | Rendimiento | Accesibilidad | LCP | CLS | FCP |
|---|---|---|---|---|---|
| `/` móvil: inicio → fin de fase | 62 → **86** | 96 → **100** | 5,5 s → 2,9 s (2,6 s con brotli) | 0,173 → **0** | 2,6 s → **1,5 s** |
| `/personal.html` móvil | 51 → **98** | 100 → 100 | 5,7 s → **2,3 s** | 0,827 → **0** | 2,5 s → **1,2 s** |
| `/` escritorio | 80 → **90** | 96 → **100** | 1,1 s → **0,6 s** | 0,165 → **0** | 0,7 s → **0,3 s** |

El TBT medido en local varía entre ejecuciones (0,3–8 s) porque depende de la carga del equipo y de que el
humo se dibuja por software en Chrome sin GPU; en navegadores reales se dibuja por GPU.

| Archivo | Cambio | Por qué |
|---|---|---|
| `public/fonts/*.woff2` (6), `src/styles/base/fonts.css` (nuevos), `src/styles/main.css` | Anton, Bebas Neue y Oswald 500/600 autoalojadas (latin + latin-ext, `font-display: swap`, mismos `unicode-range` que Google). | Fuera la petición bloqueante a Google Fonts y el CLS de 0,84 que causaba en "Sobre mí". |
| `index.html`, `personal.html` | Quitados `preconnect` y CSS de Google Fonts; `preload` de los 3 WOFF2 latin; `<main id="contenido">` y enlace "Saltar al contenido". | Render y accesibilidad. |
| `vite/inline-css.js` (nuevo) | En el build, el CSS (≈6 KB con brotli) va en un `<style>` dentro de cada HTML. | Sin hojas de estilo bloqueantes. |
| `src/canvas/smoke.js`, `public/media/humo/*.png` (4, nuevas), `scripts/smoke-textures.mjs` (nuevo) | Las 4 texturas del humo se cargan como imágenes (WebP, generadas una vez con el mismo algoritmo) en vez de calcularse en cada visita; el humo deja de dibujarse mientras la portada no se ve. | Calcularlas costaba ≈1,8 s de CPU en móvil. Mismo aspecto. |
| `public/404.html` (nueva) | 404 con el estilo de la web, `noindex` y enlaces a inicio, proyectos, experiencia, Sobre mí y contacto. | GitHub Pages la sirve para cualquier URL que no exista. |
| `src/sections/hero.js`, `personal-hero.js`, `footer.js` | `aria-label` en los `<nav>` ("Principal", "Secciones del portafolio"). | Landmarks con nombre. |
| `src/components/modal.js`, `src/sections/certificates.js` | El visor tiene nombre ("Visor de certificado") aunque su título esté vacío. | Fallo `aria-dialog-name` de Lighthouse. |
| `src/components/seal.js` | Sin `aria-label`: el nombre del sello es su texto visible, con "Ver certificado" delante solo para lectores de pantalla. | Fallo `label-content-name-mismatch`. |
| `src/styles/base/utilities.css` | Estilos del enlace "Saltar al contenido" (solo aparece con el teclado) y foco visible naranja con teclado (`:focus-visible`). | Teclado. |
| `vite/security-meta.js` (nuevo), `public/*.html` | CSP (todo desde el propio dominio) y `Referrer-Policy: strict-origin-when-cross-origin` como `<meta>`, justo tras el `charset`. Solo en el build. | GitHub Pages no permite cabeceras HTTP propias. Sin violaciones en la prueba. |
| `public/robots.txt` | `Disallow: /assets/*.map`. | |

**Queda como está, a propósito:** el botón "Volver arriba" se llama "Volver arriba" aunque el aro dice
"VOLVER ARRIBA · VOLVER ARRIBA ·". Lighthouse lo avisa, pero no baja la puntuación (100) y repetir el texto
sería peor para los lectores de pantalla.

### Redirecciones y dominio (comprobado en el dominio real)
- `http://` → `https://` y `www` → sin `www`: ya responden **301** a `https://portafolio-renzoramos.com/`.
- Configuración: `public/CNAME` con `portafolio-renzoramos.com`; en GitHub → Settings → Pages: dominio propio
  y **Enforce HTTPS** activado; en DNS (Cloudflare), registros A/AAAA del dominio raíz a GitHub Pages y
  `www` como CNAME a `renzoramosdev.github.io`. Pasos en `seo/checklist-post-deploy.md`.

### Propuesta: rutas propias por sección (no implementada)
Hoy hay una página principal con anclas (`/#proyectos`, `/#experiencia`…). Con el prerender, todo su contenido
ya es HTML indexable, así que dividirla **no es necesario** para que se lea. Solo compensaría para posicionar
cada proyecto por su propia búsqueda (p. ej. "AgentBoard coste agentes IA"). Plan si se quiere:
1. Una página por proyecto: `/proyectos/agentboard/`, `/proyectos/brainy/`, `/proyectos/pokedex-retro/`,
   `/proyectos/booqi/`, generadas por el mismo prerender a partir de `src/data/projects.js` (texto, todas las
   capturas con alt, enlaces, `SoftwareSourceCode` propio).
2. El carrusel de la portada no cambia; cada proyecto añade un enlace "Ver ficha del proyecto".
3. Los anclas actuales (`/#proyectos`, etc.) siguen funcionando: no hace falta ninguna redirección.
4. Añadir las rutas al sitemap (`vite/sitemap.js`) y a `llms.txt`.

### Corrección de un fallo de la fase 3 (detectado en la fase 5)
Con `picture { display: contents }`, el `<source>` invisible de cada `<picture>` contaba como un hijo más en
contenedores flex/grid: el **logo del pie** aparecía en el centro, encima del menú, y el **emblema de la insignia**
de la portada bajaba un poco. En la fase 3 atribuí esas diferencias de píxeles a la compresión WebP sin revisar
cada zona. Arreglo: `picture > source { display: none; }` en `reset.css` (no afecta a qué imagen se elige).
Desde entonces la comparación revisa una a una todas las zonas distintas.

## Fase 5 — Datos estructurados

**Antes:** JSON-LD escrito a mano en `index.html` (Person, WebSite, Organization, 4 proyectos con una imagen,
BreadcrumbList, ProfilePage sin `@id`), sin FAQ y con riesgo de desincronizarse de los datos de la web.
**Ahora:** se genera en cada build desde `src/data/` (el mismo contenido que se ve) y se valida contra el
vocabulario oficial de schema.org: todos los tipos y propiedades existen y se usan en su tipo.

| Archivo | Cambio |
|---|---|
| `vite/structured-data.js` (nuevo) | Grafo `@graph` con `@id` enlazados: **Person** (nombre, apellidos, alias, cargo, descripción, email, teléfono, Madrid, lugar de nacimiento, empresa actual y ocupación desde la experiencia, centros de estudio, título DAM y certificados con fecha y credencial, idiomas, `knowsAbout`, `sameAs` GitHub/LinkedIn, 4 fotos con licencia) → **WebSite** → **ProfilePage** (con `dateModified` = fecha del último commit, imagen principal, breadcrumb y partes) → **BreadcrumbList** → **ItemList** de proyectos → **SoftwareSourceCode** (AgentBoard, Pokédex Retro, Booqi) / **WebApplication** gratuita (Brainy), cada uno con descripción, web, repositorio, lenguajes, `dateCreated`, tecnologías y **todas** sus capturas como `ImageObject` con licencia → **FAQPage**. Se quita el nodo `Organization` (no hay marca aparte de la persona). No llega al navegador. |
| `vite/prerender.js` | Rellena `<!-- prerender:jsonld -->` con ese grafo. |
| `index.html` | El JSON-LD a mano se sustituye por el marcador. |
| `src/data/projects.js` | Por proyecto: `title` (nombre con mayúsculas normales), `created` (fecha de creación del repositorio en GitHub) y `languages`. |
| `src/data/faq.js`, `src/components/faq-item.js`, `src/sections/faq.js`, `src/styles/sections/faq.css` (nuevos); `src/pages/home-page.js`, `src/styles/main.css`, `src/styles/layout/background.css` | Sección visible **"Preguntas frecuentes"** entre certificados y contacto (`#preguntas`): 7 preguntas de reclutador con respuestas sacadas solo de datos de la web (quién es, dónde trabaja, tecnologías, estudios, proyectos, disponibilidad, contacto). Acordeón con `<details>`: funciona sin JavaScript y el texto está en el HTML. Mismo estilo que certificados. Es lo que exige Google para marcar `FAQPage`. |

Notas: las fechas `dateCreated` son las de creación de cada repositorio (Brainy-Site y Pokedex-Retro son repos
nuevos de proyectos anteriores). Google ya solo muestra el resultado enriquecido de FAQ a webs de gobierno y
salud, pero el marcado sigue sirviendo a buscadores y asistentes de IA para entender las respuestas.
`personal.html` y las páginas de fotos mantienen su JSON-LD propio (AboutPage/WebPage, ImageObject, BreadcrumbList).

## Fase 6 — GEO / AEO (que los asistentes de IA lean y citen la web)

| Archivo | Cambio | Por qué |
|---|---|---|
| `src/data/profile.js` (nuevo) | Perfil resumido único: frase de quién es, rol, formación, ciudad, inicio de la experiencia, stack principal y completo, idiomas, disponibilidad y contacto (datos del `llms.txt` que ya existía y de la web). | Una sola fuente: el bloque visible y los archivos para IA no pueden contradecirse. |
| `src/components/summary.js` (nuevo), `src/sections/faq.js`, `src/styles/sections/faq.css` | Bloque visible **"Sobre mí en 30 segundos"** (`#resumen`) al inicio de la sección de preguntas: frase-respuesta directa y 9 datos en texto plano (nombre, rol, ciudad, experiencia calculada —"1 año y 1 mes desde septiembre de 2025"—, formación, stack, idiomas, disponibilidad, email) y **fecha visible de actualización** (`<time>`, último commit). | Contenido citable en texto real, con fecha (E-E-A-T). |
| `vite/prerender.js` | Pasa la fecha del último commit a las secciones (`__LAST_UPDATED__`). | |
| `vite/llms.js` (nuevo), `public/llms.txt` (eliminado) | `llms.txt` (llmstxt.org: título, resumen, páginas clave, proyectos, perfiles y "Optional") y **`llms-full.txt`** (todo el contenido en Markdown: resumen, contacto, stack, experiencia completa, formación, certificados con credenciales, proyectos con descripción larga, historia personal y FAQ) generados en cada build desde `src/data/`. En dev se sirven en `/llms.txt` y `/llms-full.txt`. | El `llms.txt` anterior estaba escrito a mano y desactualizado (decía que la web era una SPA en React con asistente IA). |
| `vite/text.js` (nuevo), `vite/structured-data.js` | Ayudante para pasar a mayúsculas normales los textos que la web muestra en MAYÚSCULAS respetando siglas (AI, IA, DAM, MCP, LinkedIn…). Corrige en el JSON-LD nombres como "Profesional De Inteligencia Artificial" o "Linkedin Learning". | Nombres de entidades limpios y consistentes. |
| `src/data/projects.js` | `details`: descripción larga de cada proyecto (del `llms.txt` anterior), solo para `llms-full.txt`. | |
| `public/robots.txt` | Añadidos `Claude-SearchBot` y `Claude-User` (ya estaban GPTBot, ClaudeBot, Claude-Web, anthropic-ai, PerplexityBot, Google-Extended, OAI-SearchBot, Bingbot, CCBot, Applebot-Extended y otros); referencia a `llms-full.txt`. | |
| `public/humans.txt` | Actualizado (decía React/TypeScript y asistente IA). | |
| `index.html`, `personal.html` | `<link rel="alternate" type="text/markdown">` a `llms-full.txt` (además del `rel="llms"` a `llms.txt`). `meta author`, `rel="author"` y `rel="me"` ya se añadieron en la fase 2. | |

**Ya cumplido en fases anteriores:** todo el contenido importante está en el HTML inicial (prerender, fase 2);
los canvas no contienen texto; `sameAs` a GitHub y LinkedIn en el JSON-LD.

**No hecho:**
- Feed RSS/Atom: la web no tiene blog ni registro de cambios; no tendría contenido real.
- Frase-resumen al principio de cada sección (proyectos, experiencia…): cambiaría el diseño de todas; las respuestas
  directas están en "Sobre mí en 30 segundos" y en las preguntas frecuentes.

**Inconsistencia a revisar (texto del usuario):** en "Sobre mí", el capítulo "Formación" dice "Formación Profesional
en Informática… administración de sistemas, redes, soporte técnico" y las prácticas hablan de soporte informático,
mientras el resto de la web dice Técnico Superior en DAM y Junior Full Stack Developer en SEIDOR. Para buscadores y
asistentes de IA conviene que todo cuente lo mismo. No lo he cambiado porque es texto personal: TODO decidirlo.

## Fase 7 — SEA (Google Ads) y medición: descartada

Decisión del 25/10/2026: **no se hace**. Es un portafolio para conseguir trabajo; a los reclutadores se les llega
por LinkedIn, por búsquedas del nombre y por enlaces directos, no por anuncios. Google Analytics/Ads obligaría a
un banner de cookies (RGPD/LSSI) y a cargar JavaScript de Google, a costa del diseño y de la velocidad.
Alternativas gratuitas, sin cookies y sin código en la web: **Google Search Console** (búsquedas, impresiones,
clics e imágenes; la web ya está verificada) y **Cloudflare Web Analytics** (el dominio ya pasa por Cloudflare).
No se crean `seo/sea-plan.md` ni etiquetas de medición; la CSP sigue permitiendo solo el propio dominio.

### Cambio posterior: preguntas frecuentes retiradas (25/10/2026)
A petición de Renzo se quita la sección visible de preguntas frecuentes (`src/data/faq.js`, `faq-item.js`,
`sections/faq.js`) y, con ella, el `FAQPage` del JSON-LD y la FAQ de `llms-full.txt` (no se marca ni se describe
contenido que la web no muestra). "Sobre mí en 30 segundos" se queda como sección propia
(`src/sections/summary.js`, `src/styles/sections/summary.css`) entre certificados y contacto.
