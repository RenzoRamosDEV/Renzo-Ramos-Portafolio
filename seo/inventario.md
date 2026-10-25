# Inventario SEO — estado ANTES de optimizar

> Auditoría hecha el 25/10/2026 sobre el build de producción de la rama `feat/nuevo-front`
> (servido con `vite preview`), comparando el HTML que se descarga **sin JavaScript** (lo que leen
> muchos bots y LLMs) con el DOM **renderizado** en Chrome. El dominio real se comprobó por separado.
> Lighthouse 12.8.2 → `seo/lighthouse-antes.json` (inicio, móvil), `lighthouse-antes-index-desktop.json`
> y `lighthouse-antes-personal-mobile.json`.

## 1. Páginas y rutas

| URL | Tipo | En sitemap | Enlazada desde la web | Palabras sin JS | Palabras con JS |
|---|---|---|---|---|---|
| `/` (`index.html`) | Página principal (una sola página con anclas) | sí | — | **0** | 813 |
| `/personal.html` | Mi historia | sí | sí (menú) | **0** | 580 |
| `/renzo-ramos-ingeniero-inteligencia-artificial-madrid.html` | Página oculta de foto | sí | no (a propósito) | 19 | 19 |
| `/renzo-ramos-ingeniero-de-software.html` | Página oculta de foto | sí | no (a propósito) | 18 | 18 |
| `/renzo-ramos-junior-ai-engineer-madrid.html` | Página oculta de foto | sí | no (a propósito) | 18 | 18 |
| `/google238dbe3bf08d982d.html` | Verificación de Search Console | no | no | — | — |
| `/404.html` | **No existe** (GitHub Pages sirve su 404 genérico) | — | — | — | — |

Archivos de texto: `robots.txt`, `sitemap.xml`, `llms.txt`, `humans.txt`, `site.webmanifest`, `CNAME`.
No existe `llms-full.txt`.

**Anclas de la página principal:** portada (sin `id`), `#proyectos`, `#experiencia`, `#educacion`,
`#certificados`, `#contacto`. No hay ancla para la portada ni para "sobre mí".

### Metadatos por página

| Página | `<title>` (car.) | description (car.) | canonical | H1 | OG / Twitter | JSON-LD |
|---|---|---|---|---|---|---|
| `/` | "Renzo Ramos — Técnico Superior DAM & Junior AI Engineer" (55) | 165 (>160) | sí | **"RENZO"** (solo el nombre, renderizado por JS) | completo, `og:image` 1200×630 | `@graph`: Person, WebSite, Organization, 4 proyectos, BreadcrumbList (solo "Inicio"), ProfilePage |
| `/personal.html` | "Renzo Ramos — Personal" (**22**, sin keyword) | 176 (>160) | sí | "RENZO RAMOS DE LOS RÍOS" (por JS) | sin `og:image:width/height/alt`, sin `twitter:description` | **ninguno** |
| páginas de foto (×3) | 58 / 60 / **70** | 192 / 172 / 177 (>160) | sí | sí, en HTML | completo, `og:image` cuadrada/vertical (no 1200×630) | ImageObject |

Comunes: `lang="es"` en todas; `robots: index, follow, max-image-preview:large` (falta `max-snippet:-1,
max-video-preview:-1`); `author` sí; **no hay `link rel="me"` ni `rel="author"`**; las páginas de foto no
tienen favicon ni `theme-color`. No hay más idiomas (no aplica `hreflang`).

## 2. Imágenes

39 archivos de imagen en `dist/`. "Alt" y "width/height" se miden en el DOM renderizado;
las capturas de proyectos que no son la primera solo existen tras cambiar de proyecto (JS).

| Archivo | Formato | Peso | Dimensiones | Alt | width/height | Dónde se usa | Sitemap |
|---|---|---|---|---|---|---|---|
| `apple-touch-icon.png` | png | 31 KB | 180x180 | — (no es `<img>`) | — | `<head>`/manifest | no |
| `favicon-16.png` | png | 1 KB | 16x16 | — (no es `<img>`) | — | `<head>`/manifest | no |
| `favicon-32.png` | png | 2 KB | 32x32 | — (no es `<img>`) | — | `<head>`/manifest | no |
| `icon-192.png` | png | 33 KB | 192x192 | — (no es `<img>`) | — | — | no |
| `icon-512.png` | png | 147 KB | 512x512 | — (no es `<img>`) | — | `<head>`/manifest | no |
| `img/projects/agentboard/01.jpg` | jpg | 98 KB | 1536x800 | "AGENTBOARD" | no | index | sí |
| `img/projects/agentboard/02.jpg` | jpg | 88 KB | 1536x800 | "" | no | index | no |
| `img/projects/agentboard/03.jpg` | jpg | 104 KB | 1536x800 | "" | no | index | no |
| `img/projects/agentboard/04.jpg` | jpg | 108 KB | 1536x800 | "" | no | index | no |
| `img/projects/agentboard/05.jpg` | jpg | 85 KB | 1536x800 | "" | no | index | no |
| `img/projects/agentboard/06.jpg` | jpg | 107 KB | 1536x800 | "" | no | index | no |
| `img/projects/agentboard/07.jpg` | jpg | 111 KB | 1536x800 | "" | no | index | no |
| `img/projects/booqi/01.jpg` | jpg | 58 KB | 1536x800 | — (no es `<img>`) | — | JS (carrusel, se carga al pasar) | no |
| `img/projects/booqi/02.jpg` | jpg | 58 KB | 1536x800 | — (no es `<img>`) | — | JS (carrusel, se carga al pasar) | sí |
| `img/projects/booqi/03.jpg` | jpg | 49 KB | 1536x800 | — (no es `<img>`) | — | JS (carrusel, se carga al pasar) | no |
| `img/projects/booqi/04.jpg` | jpg | 62 KB | 1536x800 | — (no es `<img>`) | — | JS (carrusel, se carga al pasar) | no |
| `img/projects/booqi/05.jpg` | jpg | 46 KB | 1536x800 | — (no es `<img>`) | — | JS (carrusel, se carga al pasar) | no |
| `img/projects/booqi/06.jpg` | jpg | 47 KB | 1536x800 | — (no es `<img>`) | — | JS (carrusel, se carga al pasar) | no |
| `img/projects/booqi/07.jpg` | jpg | 57 KB | 1536x800 | — (no es `<img>`) | — | JS (carrusel, se carga al pasar) | no |
| `img/projects/booqi/08.jpg` | jpg | 55 KB | 1536x800 | — (no es `<img>`) | — | JS (carrusel, se carga al pasar) | no |
| `img/projects/booqi/09.jpg` | jpg | 69 KB | 1536x800 | — (no es `<img>`) | — | JS (carrusel, se carga al pasar) | no |
| `img/projects/brainy/01.jpg` | jpg | 45 KB | 1536x800 | — (no es `<img>`) | — | JS (carrusel, se carga al pasar) | no |
| `img/projects/brainy/02.jpg` | jpg | 91 KB | 1536x800 | — (no es `<img>`) | — | JS (carrusel, se carga al pasar) | sí |
| `img/projects/brainy/03.jpg` | jpg | 90 KB | 1536x800 | — (no es `<img>`) | — | JS (carrusel, se carga al pasar) | no |
| `img/projects/brainy/04.jpg` | jpg | 78 KB | 1536x800 | — (no es `<img>`) | — | JS (carrusel, se carga al pasar) | no |
| `img/projects/pokedex/01.jpg` | jpg | 137 KB | 1536x800 | — (no es `<img>`) | — | JS (carrusel, se carga al pasar) | sí |
| `img/projects/pokedex/02.jpg` | jpg | 75 KB | 1536x800 | — (no es `<img>`) | — | JS (carrusel, se carga al pasar) | no |
| `img/projects/pokedex/03.jpg` | jpg | 94 KB | 1536x800 | — (no es `<img>`) | — | JS (carrusel, se carga al pasar) | no |
| `img/projects/pokedex/04.jpg` | jpg | 106 KB | 1536x800 | — (no es `<img>`) | — | JS (carrusel, se carga al pasar) | no |
| `img/renzo-ramos-ingeniero-de-software.jpg` | jpg | 190 KB | 1068x1200 | "Renzo Ramos, ingeniero de software y Técnico Superior en DAM, con gafas redondas y pelo n | sí | renzo-ramos-ingeniero-de-software | sí |
| `img/renzo-ramos-ingeniero-inteligencia-artificial-madrid.jpg` | jpg | 261 KB | 1200x1200 | "Renzo Ramos, ingeniero de inteligencia artificial (Junior AI Engineer) en Madrid, con gaf | sí | renzo-ramos-ingeniero-inteligencia-artificial-madrid | sí |
| `img/renzo-ramos-junior-ai-engineer-madrid.jpg` | jpg | 139 KB | 957x1049 | "Renzo Ramos, Junior AI Engineer y desarrollador de software, trabajando en su escritorio  | sí | renzo-ramos-junior-ai-engineer-madrid | sí |
| `media/emblem.png` | png | 36 KB | 160x160 | "" | no | index | no |
| `media/icons/github.png` | png | 1 KB | 48x48 | "" | no | index | no |
| `media/icons/linkedin.png` | png | 0 KB | 48x48 | "" | no | index | no |
| `media/logo.png` | png | 200 KB | 1144x266 | "CJJ Renzo Ramos" | no | index, personal | no |
| `media/renzo-personal.png` | png | 505 KB | 1040x966 | "Renzo Ramos" | no | personal | no |
| `media/renzo.png` | png | 679 KB | 931x1302 | "Renzo" | no | index | no |
| `og-image.jpg` | jpg | 41 KB | 1200x630 | — (no es `<img>`) | — | `<head>`/manifest | sí |

Observaciones:
- **Ninguna imagen tiene `width`/`height`** en la web principal ni en `personal` (sí en las páginas de foto).
- Ninguna es WebP/AVIF, no hay `srcset`/`sizes` ni `<picture>`.
- Pesadas: `media/renzo.png` **679 KB** (es la imagen LCP de la portada), `media/renzo-personal.png` **505 KB**,
  `media/logo.png` **200 KB** para mostrarse a ~250 px de ancho, `icon-512.png` 147 KB.
- Nombres sin keywords: `renzo.png`, `renzo-personal.png`, `logo.png`, `emblem.png`, `img/projects/*/0N.jpg`.
- Las capturas 2.ª en adelante de cada proyecto tienen `alt=""` + `aria-hidden` (decorativas) y las de
  Booqi, Brainy y Pokédex **no están en el DOM inicial**: Google solo puede ver la primera de AgentBoard.
- Sitemap: solo 4 capturas de proyecto (una por proyecto) + og-image + 3 fotos. Faltan la foto de portada,
  la de `personal` y el resto de capturas.
- `og-image.jpg` es el logo "RR" de la marca anterior (no coincide con el diseño nuevo).
- Hay 3 `<canvas>` (humo ×2 y trama de puntos): solo decoración, sin texto dentro.
- SVG: los aros de la portada y los mini mapas no tienen `<title>`/`role="img"` (7 SVG sin `aria-hidden`
  ni título en la portada, 1 en `personal`). Son decorativos → deberían llevar `aria-hidden`.

## 3. Enlaces

**Internos** (DOM renderizado): `#proyectos`, `#experiencia`, `#educacion`, `#certificados`, `#contacto`,
`personal.html`, `./` y `#` (botón de volver arriba). Ninguno roto. Las 3 páginas de foto no enlazan a
ninguna otra página (a propósito) y ninguna página enlaza a ellas.

**Externos** (de los datos, comprobados con `curl`): todos responden **200**.
- Proyectos: AgentBoard (web + repo), Brainy (web), Pokédex Retro (web + repo), Booqi (web + repo).
- Credenciales: LinkedIn Learning y Coursera (200). PDFs locales de los 3 certificados: existen.
- Perfiles: GitHub 200; LinkedIn **999** (bloqueo anti-bots de LinkedIn, el enlace funciona en navegador).
- `mailto:renzoramosivan@gmail.com`.

**Rotos:** ninguno.

## 4. Recursos que bloquean el renderizado

| Recurso | Página | Efecto |
|---|---|---|
| Google Fonts CSS (`Anton`, `Bebas Neue`, `Oswald`) | `/`, `personal` | Bloqueante; Lighthouse estima −1,7 s en móvil |
| `assets/footer-*.css` (28 KB, todo el CSS) | `/`, `personal` | Bloqueante |
| `assets/personal-*.css` | `personal` | Bloqueante |
| `assets/main-*.js` (28 KB) | `/` | `type="module"` (diferido, OK) |

Hay `preconnect` a `fonts.googleapis.com` y `fonts.gstatic.com`. No hay `preload` de la imagen LCP ni de fuentes.
Fuentes no autoalojadas.

## 5. Servidor (dominio real)

- `http://`, `http://www.` y `https://www.` → **301** a `https://portafolio-renzoramos.com/` ✔
- Servido por GitHub Pages detrás de **Cloudflare**, con **brotli** ✔
- `Cache-Control`: HTML `max-age=600`, imágenes `max-age=14400` (4 h) → corto para imágenes.
- URL inexistente → 404 real, pero con la página genérica de GitHub (no hay `404.html`).
- `robots.txt`: permite todo y ya declara GPTBot, ClaudeBot, Claude-Web, anthropic-ai, PerplexityBot,
  Google-Extended, OAI-SearchBot, Bingbot, CCBot, Applebot-Extended y más; declara el sitemap ✔.

## 6. Lighthouse (antes)

| Página | Perf | Accesib. | Buenas prác. | SEO | LCP | CLS | TBT | FCP |
|---|---|---|---|---|---|---|---|---|
| `/` móvil | **62** | 96 | 100 | 100 | **5,5 s** | **0,173** | 280 ms | 2,6 s |
| `/` escritorio | 80 | 96 | 100 | 100 | 1,1 s | **0,165** | 10 ms | 0,7 s |
| `/personal.html` móvil | **51** | 100 | 100 | 100 | **5,7 s** | **0,827** | 0 ms | 2,5 s |

Elemento LCP de la portada: `img.person` (`media/renzo.png`, 679 KB). Lighthouse marca: imágenes sin tamaño,
formatos modernos (−1,1 MB), imágenes mal dimensionadas (−0,95 MB), recursos bloqueantes, `role="dialog"`
sin nombre accesible y botones cuyo texto visible no coincide con su `aria-label`.
El 100 en SEO de Lighthouse se mide **con JavaScript ejecutado**; no refleja el problema de contenido de §7.

## 7. Problemas priorizados

### Crítico
1. **Todo el contenido de `/` y `/personal.html` se genera con JavaScript.** El HTML descargado tiene
   0 palabras, 0 encabezados y 0 imágenes. Googlebot renderiza JS (con retraso), pero ChatGPT, Claude,
   Perplexity y otros rastreadores de LLM **no ejecutan JS**: hoy no ven proyectos, experiencia, educación
   ni contacto. Es el bloqueo n.º 1 para GEO/AEO. Solución sin cambio visual: **prerenderizar** el HTML en
   el build (los `render…()` ya son funciones puras que devuelven markup).
2. **H1 de la portada = "RENZO"**: no contiene cargo, especialidad ni ciudad.
3. **Imagen LCP de 679 KB en PNG** sin `width/height` ni `preload` → LCP 5,5 s en móvil (objetivo < 2,5 s).

### Alto
4. CLS 0,17 (portada) y **0,83 (personal)**: imágenes sin `width/height`.
5. Fuentes de Google bloqueantes (≈1,7 s en móvil); no autoalojadas.
6. `personal.html`: title de 22 caracteres sin keyword, sin JSON-LD, OG incompleto.
7. Capturas de proyectos fuera del DOM inicial y casi fuera del sitemap; no enlazadas a su proyecto.
8. No hay `404.html` propio.
9. Descripciones > 160 caracteres en todas las páginas (Google las corta).

### Medio
10. Sin WebP/AVIF, `srcset` ni `<picture>` (≈1,5 MB de ahorro posible).
11. `og-image.jpg` con la marca antigua; páginas de foto con `og:image` no 1200×630.
12. JSON-LD: sin `FAQPage`; `BreadcrumbList` con un solo elemento; proyectos sin `dateCreated`/`image` como
    `ImageObject` con licencia; `Person.knowsAbout` incluye Scala/Play (del proyecto viejo, ya no está en la web).
13. Sin `link rel="me"`/`rel="author"`; sin `llms-full.txt`; `llms.txt` aún menciona Scala.
14. Accesibilidad: diálogo sin nombre, botones con `aria-label` distinto del texto, SVG decorativos sin
    `aria-hidden`, sin `<main>` ni skip-link.
15. Caché de imágenes corta (4 h) — se ajusta en Cloudflare, no en el repo.

### Bajo
16. Páginas de foto sin favicon ni `theme-color`.
17. `robots` sin `max-snippet:-1, max-video-preview:-1`.
18. Sin favicon `.ico` ni icono SVG (hay PNG 16/32, apple-touch y manifest).
19. Nombres de imagen sin keywords (`renzo.png`, `logo.png`, `0N.jpg`).
