# Portfolio Renzo - Documentación Claude

## 📋 Descripción General

Portfolio moderno y personalizable en HTML/CSS/JS vanilla. Completamente estático, responsivo, con modo oscuro y soporte multiidioma (ES/EN). Incluye panel flotante para edición en tiempo real.

## 🏗️ Arquitectura

**Frontend**: 100% HTML/CSS/JavaScript vanilla
- **HTML**: Semántico, con data attributes para i18n
- **CSS**: Modular, variables OKLCH, mobile-first
- **JS**: Módulos ES6, sin dependencias (React solo en panel)

**Estructura**:
```
index.html (punto de entrada)
├── src/styles/*.css (8 archivos modulares)
├── src/js/main.js (renderizado)
├── src/data/*.js (stack, proyectos)
├── src/i18n/translations.js (ES/EN)
├── src/utils/*.js (scroll, trail, tema)
└── src/components/tweaks-panel.jsx (React - edición)
```

## 🔧 Tecnologías

- **Estilos**: CSS puro, sin preprocessador
- **Colores**: OKLCH (mejor que Hex/RGB)
- **Animaciones**: CSS transitions + requestAnimationFrame
- **Tipografía**: Google Fonts (Caveat, Lora, JetBrains Mono)
- **Interactividad**: JS vanilla (localStorage, ResizeObserver, IntersectionObserver)
- **Panel**: React CDN + Babel (opcional, no bloqueante)

## 📁 Archivos Críticos

| Archivo                    | Responsabilidad            | Nota                        |
| -------------------------- | -------------------------- | --------------------------- |
| `index.html`               | Estructura, meta tags      | Cambiar nombre/email aquí   |
| `src/data/stack.js`        | Tecnologías                | Array de 8 items            |
| `src/data/projects.js`     | Proyectos                  | Array de 3-N proyectos      |
| `src/styles/variables.css` | Tema (colores, tipografía) | Editar para cambiar colores |
| `src/js/main.js`           | Renderizado y setup        | Punto de entrada JS         |
| `src/i18n/translations.js` | Textos ES/EN               | Objeto con 2 claves         |

## 🎯 Flujo Principal

1. **Carga**: browser → `index.html` → carga CSS + JS
2. **Renderizado**:
   - `main.js` → importa data/*.js
   - Renderiza grid de stack (marquee infinito)
   - Renderiza cards de proyectos
3. **Interactividad**:
   - `utils/i18n-dark-mode.js` → botones lang/dark
   - `utils/scroll-reveal.js` → IntersectionObserver
   - `utils/drawing-trail.js` → canvas trail
   - `tweaks-panel.jsx` → panel flotante (React)

## 💾 Estado Persistente

localStorage keys:
- `pf-lang`: 'es' | 'en'
- `pf-dark`: 'true' | 'false'

## 🔴 Puntos Críticos

1. **Colores**: Usar OKLCH, no Hex. Sintaxis: `oklch(L% C H)`
   - L: 0-100 (lightness)
   - C: 0-0.4 (chroma)
   - H: 0-360 (hue)

2. **Responsiveness**: Mobile-first, breakpoint principal: 720px

3. **Traducciones**: Si editas textos en `translations.js`, actualiza también `index.html` (data-i18n)

4. **Grid Background**: CSS puro, no imagen. Cambiar en `body {}` para ajustar patrón.

5. **Avatar**: Placeholder actual. Reemplazar con `<img>` en `.avatar-placeholder`

## 🎨 Customización Frecuente

### Cambiar Color Principal
```css
/* src/styles/variables.css */
--accent: oklch(44% 0.18 250);  /* Cambia H para nuevo color */
```

### Agregar Proyecto
```javascript
// src/data/projects.js
{
  num: "04",
  title: "Nuevo Proyecto",
  desc: "...",
  badges: ["Tech1", "Tech2"],
  repo: "...",
  demo: "..."
}
```

### Agregar Tecnología
```javascript
// src/data/stack.js
{
  name: "Nueva Tech",
  color: "#hexcolor",
  bg: "#hexbg",
  desc: "Descripción"
}
```

### Cambiar Textos
```javascript
// src/i18n/translations.js
es: { myKey: "Nuevo texto" }
en: { myKey: "New text" }
```
Y en `index.html`: `<p data-i18n="myKey">`

## 🚀 Deploy

- **Recomendado**: Vercel (automático desde GitHub)
- **Alternativas**: Netlify, GitHub Pages, Cloudflare Pages
- **Dominio**: Personalizado ($12/año, apunta DNS)
- **SSL**: Incluido automáticamente en todos

Ver: `docs/DEPLOYMENT.md`

## 📖 Documentación

- `README.md` → Overview general
- `STRUCTURE.md` → Árbol y flujo
- `docs/CUSTOMIZATION.md` → Guía detallada de cambios
- `docs/DEPLOYMENT.md` → Cómo subir a producción
- Este archivo → Referencia para Claude

## 🔍 Testing

- **Local**: Abre `index.html` directo (no necesita servidor)
- **Build**: No hay build step (archivo estático)
- **Browser**: Chrome, Firefox, Safari, Edge (soporte amplio)
- **Mobile**: Responsivo hasta 320px

## 📊 Análiticas Tipícas

- **Tamaño total**: ~200KB (CSS + JS + HTML sin imágenes)
- **First Paint**: <1s en conexión normal
- **Animaciones**: 60fps suave
- **Score Lighthouse**: 90-95 (si sin imagen heavy)

## 🐛 Debugging

Si no funciona:

1. **Consola**: F12 → Console (hay `useTweaks` disponible)
2. **LocalStorage**: `localStorage.clear()` reinicia todo
3. **Caché**: Ctrl+Shift+R fuerza recarga
4. **Red**: Verificar que Google Fonts cargue

## ⚠️ Restricciones/Consideraciones

1. **Sin API backend**: Solo datos estáticos (no contacto form, sin dinámico)
2. **Sin CMS**: Editar archivos .js/.html directamente
3. **Sin versioning automático**: Cambios manuales en Git
4. **Grid background**: CPU leve en scroll (canvas trail), OK en modern browsers
5. **React**: Solo para panel, no bloqueante, carga async

## 🆕 Agregar Funcionalidad

Si quieres:
- **Formulario de contacto**: Agregar servicio (Formspree, Netlify Forms)
- **Blog**: Agregar carpeta /blog con archivos estáticos o Markdown
- **Comentarios**: Integrar Disqus o similar
- **Búsqueda**: No necesaria para 3-5 proyectos

## 👤 Autor Info

- Nombre: Renzo Ramos
- Email: renzoramosivan@gmail.com
- Portfolio: (en portafololio-renzo/)
- Versión: 2.0 (reorganizado)

## 📝 Historial

- **v1.0**: Portfolio original (2 archivos monolíticos)
- **v2.0**: Reorganizado en estructura modular (este)

---

**Nota para Claude**: Este proyecto es mantenible, escalable y está listo para producción. Cambios simples (textos, datos) en `src/data/` y `src/i18n/`. Cambios visuales en `src/styles/`. No requiere tooling complejo.
