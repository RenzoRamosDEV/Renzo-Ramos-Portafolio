# Páginas de imagen aisladas para indexación en Google Imágenes

## Contexto

Renzo quiere que dos fotos personales (`RENZO-LINKEDIN.jpg` y
`RENZO-RAMOS-DESARROLLADOR-DE-SOFTWARE.jpg`, hoy en `/home/renzo-ramos/Imágenes`) aparezcan en
resultados de Google Imágenes, sin que se muestren en el portfolio visible ni se enlacen desde su
navegación. Ocultar una imagen visualmente (`display:none`, fuera de pantalla) mientras se expone
al crawler cuenta como cloaking según las directrices de Google y arriesga la indexación de todo el
sitio, así que se descarta.

## Enfoque

Publicar cada imagen en su propia página HTML estática, real y visible para cualquiera que abra su
URL, pero sin ningún enlace desde el portfolio hacia ellas. Solo son alcanzables escribiendo la URL
exacta o a través del sitemap (que Google sí lee, aunque no sea un enlace "clicable" para personas).
Esto es indexación legítima: contenido idéntico para bots y usuarios, simplemente no promocionado en
la UI.

## Alcance

- 2 páginas HTML estáticas en `public/`, fuera del árbol de React (no usan el router/SPA ni afectan
  el prerender del sitio principal):
  - `public/renzo-ramos-linkedin.html`
  - `public/renzo-ramos-desarrollador-de-software.html`
- Las imágenes se copian a `public/img/renzo-ramos-linkedin.jpg` y
  `public/img/renzo-ramos-desarrollador-de-software.jpg` (nombres descriptivos, ya vienen así).
- Contenido visible de cada página (mínimo, sin texto adicional en el body):
  - La imagen en un `<img>` con `alt` descriptivo.
  - Un enlace de vuelta a `https://portafolio-renzoramos.com/`.
- SEO en el `<head>` de cada página (todo metadato, no cambia lo que ve el usuario):
  - `<title>` descriptivo (ej. "Renzo Ramos — Desarrollador de Software").
  - `<meta name="description">` breve.
  - `<link rel="canonical">` apuntando a sí misma.
  - `<meta name="robots" content="index, follow, max-image-preview:large">`.
  - Open Graph (`og:type=profile`, `og:title`, `og:description`, `og:image`, `og:image:width/height`,
    `og:image:alt`, `og:url`) y Twitter Card (`summary_large_image`) apuntando a la misma imagen.
  - JSON-LD `ImageObject` con `contentUrl`, `name`, `description`, `width`/`height` y `author`
    enlazado por `@id` al `Person` (`https://portafolio-renzoramos.com/#renzo`) que ya existe en el
    `index.html` del portfolio — refuerza la señal de que la foto es de Renzo sin duplicar el bloque
    completo de `Person`.
- Ningún componente/sección del portfolio (`src/portfolio/**`) enlaza a estas páginas.
- `public/sitemap.xml` gana 2 entradas `<url>` nuevas, cada una con la extensión
  `<image:image><image:loc>` (namespace `xmlns:image`) para que Google las descubra sin enlace
  visible.
- `public/robots.txt` no cambia (ya permite `Allow: /` a todos los bots relevantes).

## Fuera de alcance

- No se tocan las imágenes de proyectos existentes (`pokedex/image copy*.png`, etc.) ni su alt text.
- No se añade JSON-LD `ImageObject` adicional en `index.html` para estas fotos.
- No se modifica el Hero, Navbar, Footer ni ninguna sección visible del sitio.

## Riesgo conocido

El valor de indexación de una página "huérfana" (sin enlaces entrantes salvo el sitemap) es menor
que el de una página enlazada de verdad; Google puede tardar más en rastrearla o priorizarla menos.
Es una limitación aceptada del enfoque elegido, no un bug de la implementación.
