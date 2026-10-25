# Checklist después de publicar

Pasos manuales para Renzo cuando la rama `seo/optimizacion` (con `feat/nuevo-front`) llegue a `main` y
GitHub Actions despliegue la web. Marca cada casilla al hacerla.

## 1. Publicar y comprobar
- [ ] Abrir el PR hacia `main`, revisarlo y hacer merge.
- [ ] En GitHub → **Actions**, comprobar que el despliegue termina en verde. El build ejecuta `npm run seo:check`:
      si algo de SEO no cumple, el despliegue se para y el log dice qué.
- [ ] Abrir y revisar que cargan bien:
  - https://portafolio-renzoramos.com/ y https://portafolio-renzoramos.com/personal.html
  - https://portafolio-renzoramos.com/sitemap.xml, `/robots.txt`, `/llms.txt`, `/llms-full.txt`
  - una URL que no exista (p. ej. `/hola`) → debe salir la 404 nueva
  - las 3 páginas de fotos y `/licencia-imagenes.html`
- [ ] En GitHub → Settings → **Pages**: dominio `portafolio-renzoramos.com` y **Enforce HTTPS** activado.

## 2. Google Search Console (https://search.google.com/search-console)
La web ya está verificada con el archivo `google238dbe3bf08d982d.html` (no lo borres).
- [ ] **Sitemaps** → enviar `https://portafolio-renzoramos.com/sitemap.xml`.
- [ ] **Inspección de URLs** → pegar cada URL y pulsar **Solicitar indexación**:
  - [ ] https://portafolio-renzoramos.com/
  - [ ] https://portafolio-renzoramos.com/personal.html
  - [ ] https://portafolio-renzoramos.com/renzo-ramos-ingeniero-inteligencia-artificial-madrid.html
  - [ ] https://portafolio-renzoramos.com/renzo-ramos-ingeniero-de-software.html
  - [ ] https://portafolio-renzoramos.com/renzo-ramos-junior-ai-engineer-madrid.html
- [ ] En la inspección de la portada, **Probar URL publicada → Ver página probada → Captura**: el contenido
      (proyectos, experiencia…) debe verse en el HTML.
- [ ] **Retiradas** (opcional): las URLs antiguas que ya no existen (`/renzo-ramos-linkedin.html`,
      `/renzo-ramos-desarrollador-de-software.html`, sus versiones `-en`, `/og-image.jpg`) devolverán 404 y Google
      las quitará solo; si quieres acelerarlo, pide su retirada temporal.
- [ ] A las 1-3 semanas: **Rendimiento** → pestaña **Tipo de búsqueda: Imagen** para ver si las fotos y capturas
      aparecen en Google Imágenes y con qué búsquedas.

## 3. Comprobar los datos estructurados
- [ ] https://search.google.com/test/rich-results con la portada, `personal.html` y una página de foto:
      sin errores (puede haber avisos de campos opcionales).
- [ ] https://validator.schema.org/ con la portada: el grafo Person → WebSite → ProfilePage → proyectos.

## 4. Bing (también alimenta a ChatGPT y Copilot)
- [ ] https://www.bing.com/webmasters → **Importar desde Google Search Console** (verifica y trae el sitemap).
- [ ] Comprobar que el sitemap aparece como enviado.

## 5. Cloudflare (el dominio ya pasa por Cloudflare)
- [ ] **Web Analytics** → activar para `portafolio-renzoramos.com` (sin cookies ni código en la web).
- [ ] **Caching → Cache Rules** (opcional, mejora la carga en visitas repetidas). Hoy las imágenes se cachean 4 h:
  - `/assets/*` (nombres con hash): Browser TTL 1 año.
  - `/opt/*`, `/img/*`, `/media/*`, `/fonts/*`: Browser TTL 30 días (sus nombres no llevan hash; si cambias una
    imagen sin cambiar su nombre, tardará en actualizarse en quien ya la tenga en caché).
- [ ] Comprobar que **Always Use HTTPS** sigue activo y que `www` redirige a la versión sin `www` (hoy ya lo hace).

## 6. Redes y perfiles
- [ ] LinkedIn: poner `https://portafolio-renzoramos.com/` como web del perfil.
- [ ] https://www.linkedin.com/post-inspector/ con la portada, para que LinkedIn recoja la imagen nueva de
      vista previa (la anterior era el logo "RR").
- [ ] GitHub: añadir la web en el perfil y en la descripción de los repos de los proyectos.

## 7. Medir en producción
- [ ] https://pagespeed.web.dev/ con la portada y `personal.html` (móvil y escritorio) y compararlo con
      `seo/lighthouse-comparativa.md`. Los datos de usuarios reales (CrUX) tardan semanas en aparecer.

## Pendiente de decidir
- [ ] **Icono SVG del favicon:** hace falta el logo en vectorial.
- [ ] **Competidores / referencias** para comparar posicionamiento (sección 0 del encargo).
