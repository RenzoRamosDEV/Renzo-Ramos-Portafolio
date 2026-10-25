# Lighthouse: antes y después

**Condiciones (iguales para los dos):** Lighthouse 12.8.2, build de producción servido en local con compresión
brotli (como hace Cloudflare en producción), móvil simulado (4G lenta + CPU ×4) y escritorio. En móvil se hicieron
3 pasadas por página y se toma la de rendimiento mediano; en escritorio, 1. Medido el 25/10/2026.

- **Antes:** rama `feat/nuevo-front` en el commit `dcaed0b` (inicio de la auditoría).
- **Después:** rama `seo/optimizacion` en el commit `5a83f38`. El título de la sección de proyectos (`9dc3190`)
  se añadió después de medir: es una línea de texto y no cambia estos resultados de forma apreciable.

Informes: `lighthouse-antes.json` / `lighthouse-despues.json` (portada, móvil) y
`lighthouse-{antes,despues}-personal-mobile.json`, `lighthouse-{antes,despues}-index-desktop.json`.

## Portada (`/`), móvil

| Métrica | Antes | Después |
|---|---|---|
| Rendimiento | 52 (pasadas: 43, 52, 54) | **68** (pasadas: 59, 68, 74) |
| Accesibilidad | 96 | **100** |
| Buenas prácticas | 100 | 100 |
| SEO | 100 | 100 |
| LCP (imagen principal) | 5,7 s | **2,6 s** |
| FCP (primera pintura) | 2,6 s | **1,1 s** |
| CLS | 0 en esta tanda (0,17 en la auditoría inicial) | **0** |
| TBT | 950 ms | 1830 ms ⚠ |
| Peso total | 1717 KB | **572 KB** |

## Sobre mí (`/personal.html`), móvil

| Métrica | Antes | Después |
|---|---|---|
| Rendimiento | 69 (pasadas: 61, 69, 69) | **99** (pasadas: 99, 99, 100) |
| Accesibilidad | 100 | 100 |
| LCP | 2,6 s | **2,0 s** |
| FCP | 2,5 s | **0,9 s** |
| CLS | 0,83 | **0** |
| Peso total | 795 KB | **167 KB** |

## Portada (`/`), escritorio

| Métrica | Antes | Después |
|---|---|---|
| Rendimiento | 88 | **90** |
| Accesibilidad | 96 | **100** |
| LCP | 1,1 s | **0,5 s** |
| FCP | 0,7 s | **0,3 s** |
| CLS | 0,02 | **0** |

## Lectura

- **Mejora clara:** carga de la imagen principal (de 5,7 s a 2,6 s en móvil, ya casi en el objetivo de 2,5 s),
  primera pintura, estabilidad (CLS 0 en todas) y peso (≈ −70 %). "Sobre mí" pasa a 99.
- **⚠ TBT de la portada en móvil:** es el tiempo de CPU del humo animado y de la trama de puntos, que en esta
  medición se dibujan **por software** (Chrome sin GPU, CPU ×4) mientras el equipo de pruebas tenía otro Chrome
  abierto con la web. Antes el humo tardaba en arrancar porque calculaba sus texturas; ahora arranca enseguida
  y anima durante toda la medición, así que suma más. En navegadores reales el canvas va por GPU. Si se quiere
  bajar aún más, la opción es arrancar el humo con un pequeño retraso o con menos nubes en móvil (cambio visual).
- El Speed Index de escritorio (≈6 s en ambos) también lo marcan las animaciones continuas de la portada.
