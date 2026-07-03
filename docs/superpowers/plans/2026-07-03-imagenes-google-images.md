# Páginas de imagen indexables en Google Imágenes — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publicar 2 fotos personales de Renzo en páginas HTML estáticas propias, con SEO completo, indexables por Google Imágenes vía sitemap, sin que el portfolio (SPA de React) las enlace ni las muestre.

**Architecture:** 2 archivos `.jpg` nuevos en `public/img/` + 2 páginas `.html` standalone en `public/` (fuera del árbol de React, no pasan por Vite/JSX ni por el prerender de `src/entry-server.tsx`). Vite copia todo lo que hay en `public/` tal cual a `dist/` en el build, así que estas páginas quedan servidas en `/renzo-ramos-linkedin.html` y `/renzo-ramos-desarrollador-de-software.html` sin tocar el router ni el bundle de la app. `public/sitemap.xml` gana 2 `<url>` con la extensión `<image:image>` para que Google las descubra sin enlace visible.

**Tech Stack:** HTML estático plano, JSON-LD, sitemap protocol con `image` namespace. Sin dependencias nuevas.

---

### Task 1: Copiar las imágenes al repo

**Files:**
- Create: `public/img/renzo-ramos-linkedin.jpg`
- Create: `public/img/renzo-ramos-desarrollador-de-software.jpg`

- [ ] **Step 1: Crear el directorio y copiar los archivos con nombres en kebab-case**

```bash
mkdir -p public/img
cp "/home/renzo-ramos/Imágenes/RENZO-LINKEDIN.jpg" public/img/renzo-ramos-linkedin.jpg
cp "/home/renzo-ramos/Imágenes/RENZO-RAMOS-DESARROLLADOR-DE-SOFTWARE.jpg" public/img/renzo-ramos-desarrollador-de-software.jpg
```

- [ ] **Step 2: Verificar que los archivos existen y pesan lo esperado**

Run: `ls -la public/img/`
Expected: dos archivos, `renzo-ramos-linkedin.jpg` (~120KB) y `renzo-ramos-desarrollador-de-software.jpg` (~150KB).

- [ ] **Step 3: Commit**

```bash
git add public/img/renzo-ramos-linkedin.jpg public/img/renzo-ramos-desarrollador-de-software.jpg
git commit -m "assets: añadir fotos de Renzo para páginas indexables en Google Imágenes"
```

---

### Task 2: Página standalone `renzo-ramos-linkedin.html`

**Files:**
- Create: `public/renzo-ramos-linkedin.html`

- [ ] **Step 1: Crear el archivo con este contenido exacto**

```html
<!doctype html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Renzo Ramos — LinkedIn</title>
  <meta name="description" content="Foto de perfil de Renzo Ramos, Técnico Superior en DAM y Junior AI Engineer.">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <link rel="canonical" href="https://portafolio-renzoramos.com/renzo-ramos-linkedin.html">

  <meta property="og:type" content="profile">
  <meta property="og:url" content="https://portafolio-renzoramos.com/renzo-ramos-linkedin.html">
  <meta property="og:title" content="Renzo Ramos — LinkedIn">
  <meta property="og:description" content="Foto de perfil de Renzo Ramos, Técnico Superior en DAM y Junior AI Engineer.">
  <meta property="og:image" content="https://portafolio-renzoramos.com/img/renzo-ramos-linkedin.jpg">
  <meta property="og:image:width" content="957">
  <meta property="og:image:height" content="1049">
  <meta property="og:image:alt" content="Renzo Ramos, Técnico Superior en DAM y Junior AI Engineer, trabajando en su escritorio">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Renzo Ramos — LinkedIn">
  <meta name="twitter:description" content="Foto de perfil de Renzo Ramos, Técnico Superior en DAM y Junior AI Engineer.">
  <meta name="twitter:image" content="https://portafolio-renzoramos.com/img/renzo-ramos-linkedin.jpg">
  <meta name="twitter:image:alt" content="Renzo Ramos, Técnico Superior en DAM y Junior AI Engineer, trabajando en su escritorio">

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "contentUrl": "https://portafolio-renzoramos.com/img/renzo-ramos-linkedin.jpg",
    "url": "https://portafolio-renzoramos.com/renzo-ramos-linkedin.html",
    "name": "Renzo Ramos — LinkedIn",
    "description": "Foto de perfil de Renzo Ramos, Técnico Superior en DAM y Junior AI Engineer.",
    "width": 957,
    "height": 1049,
    "author": { "@id": "https://portafolio-renzoramos.com/#renzo" }
  }
  </script>
</head>
<body>
  <img src="/img/renzo-ramos-linkedin.jpg" alt="Renzo Ramos, Técnico Superior en DAM y Junior AI Engineer, trabajando en su escritorio" width="957" height="1049">
  <p><a href="https://portafolio-renzoramos.com/">Ver el portfolio de Renzo Ramos</a></p>
</body>
</html>
```

- [ ] **Step 2: Verificar que ningún archivo de `src/portfolio` enlaza a esta página**

Run: `grep -rn "renzo-ramos-linkedin" src/`
Expected: sin resultados (0 coincidencias).

- [ ] **Step 3: Commit**

```bash
git add public/renzo-ramos-linkedin.html
git commit -m "feat(seo): página standalone indexable para foto renzo-ramos-linkedin"
```

---

### Task 3: Página standalone `renzo-ramos-desarrollador-de-software.html`

**Files:**
- Create: `public/renzo-ramos-desarrollador-de-software.html`

- [ ] **Step 1: Crear el archivo con este contenido exacto**

```html
<!doctype html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Renzo Ramos — Desarrollador de Software</title>
  <meta name="description" content="Foto de Renzo Ramos, desarrollador de software, Técnico Superior en DAM y Junior AI Engineer.">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <link rel="canonical" href="https://portafolio-renzoramos.com/renzo-ramos-desarrollador-de-software.html">

  <meta property="og:type" content="profile">
  <meta property="og:url" content="https://portafolio-renzoramos.com/renzo-ramos-desarrollador-de-software.html">
  <meta property="og:title" content="Renzo Ramos — Desarrollador de Software">
  <meta property="og:description" content="Foto de Renzo Ramos, desarrollador de software, Técnico Superior en DAM y Junior AI Engineer.">
  <meta property="og:image" content="https://portafolio-renzoramos.com/img/renzo-ramos-desarrollador-de-software.jpg">
  <meta property="og:image:width" content="1055">
  <meta property="og:image:height" content="1055">
  <meta property="og:image:alt" content="Renzo Ramos, desarrollador de software, al aire libre">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Renzo Ramos — Desarrollador de Software">
  <meta name="twitter:description" content="Foto de Renzo Ramos, desarrollador de software, Técnico Superior en DAM y Junior AI Engineer.">
  <meta name="twitter:image" content="https://portafolio-renzoramos.com/img/renzo-ramos-desarrollador-de-software.jpg">
  <meta name="twitter:image:alt" content="Renzo Ramos, desarrollador de software, al aire libre">

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "contentUrl": "https://portafolio-renzoramos.com/img/renzo-ramos-desarrollador-de-software.jpg",
    "url": "https://portafolio-renzoramos.com/renzo-ramos-desarrollador-de-software.html",
    "name": "Renzo Ramos — Desarrollador de Software",
    "description": "Foto de Renzo Ramos, desarrollador de software, Técnico Superior en DAM y Junior AI Engineer.",
    "width": 1055,
    "height": 1055,
    "author": { "@id": "https://portafolio-renzoramos.com/#renzo" }
  }
  </script>
</head>
<body>
  <img src="/img/renzo-ramos-desarrollador-de-software.jpg" alt="Renzo Ramos, desarrollador de software, al aire libre" width="1055" height="1055">
  <p><a href="https://portafolio-renzoramos.com/">Ver el portfolio de Renzo Ramos</a></p>
</body>
</html>
```

- [ ] **Step 2: Verificar que ningún archivo de `src/portfolio` enlaza a esta página**

Run: `grep -rn "renzo-ramos-desarrollador-de-software" src/`
Expected: sin resultados (0 coincidencias).

- [ ] **Step 3: Commit**

```bash
git add public/renzo-ramos-desarrollador-de-software.html
git commit -m "feat(seo): página standalone indexable para foto renzo-ramos-desarrollador-de-software"
```

---

### Task 4: Añadir las 2 páginas al sitemap con extensión de imagen

**Files:**
- Modify: `public/sitemap.xml`

- [ ] **Step 1: Reemplazar el contenido completo de `public/sitemap.xml`**

Contenido actual (referencia, para ubicar el reemplazo):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://portafolio-renzoramos.com/</loc>
    <lastmod>2026-06-29</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

Nuevo contenido:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>https://portafolio-renzoramos.com/</loc>
    <lastmod>2026-06-29</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://portafolio-renzoramos.com/renzo-ramos-linkedin.html</loc>
    <lastmod>2026-07-03</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
    <image:image>
      <image:loc>https://portafolio-renzoramos.com/img/renzo-ramos-linkedin.jpg</image:loc>
      <image:title>Renzo Ramos — LinkedIn</image:title>
    </image:image>
  </url>
  <url>
    <loc>https://portafolio-renzoramos.com/renzo-ramos-desarrollador-de-software.html</loc>
    <lastmod>2026-07-03</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
    <image:image>
      <image:loc>https://portafolio-renzoramos.com/img/renzo-ramos-desarrollador-de-software.jpg</image:loc>
      <image:title>Renzo Ramos — Desarrollador de Software</image:title>
    </image:image>
  </url>
</urlset>
```

- [ ] **Step 2: Verificar que el XML es válido**

Run: `python3 -c "import xml.dom.minidom as m; m.parse('public/sitemap.xml')" && echo OK`
Expected: `OK`

- [ ] **Step 3: Commit**

```bash
git add public/sitemap.xml
git commit -m "feat(seo): añadir páginas de imagen al sitemap con extensión image"
```

---

### Task 5: Verificación final de build

**Files:** ninguno nuevo — solo verificación.

- [ ] **Step 1: Confirmar que Vite copia `public/` a `dist/` tal cual (build completo)**

Run: `npm run build`
Expected: build sin errores; termina con el log `✓ SSG: dist/index.html pre-renderizado (...)` de `prerender.js`.

- [ ] **Step 2: Confirmar que las páginas y las imágenes quedaron en `dist/`**

Run: `ls dist/renzo-ramos-linkedin.html dist/renzo-ramos-desarrollador-de-software.html dist/img/renzo-ramos-linkedin.jpg dist/img/renzo-ramos-desarrollador-de-software.jpg`
Expected: los 4 archivos existen, sin error "No such file".

- [ ] **Step 3: Confirmar que `dist/index.html` (la SPA) no referencia estas páginas**

Run: `grep -c "renzo-ramos-linkedin\|renzo-ramos-desarrollador-de-software" dist/index.html`
Expected: `0`

- [ ] **Step 4: Confirmar que el sitemap generado en `dist/` es el actualizado**

Run: `grep -c "image:image" dist/sitemap.xml`
Expected: `2`

No se requiere commit en esta tarea (solo valida el trabajo de las tareas 1-4; `dist/` no está versionado).
