# Portfolio Renzo — Documentación Claude

## 📋 Descripción General

Portfolio personal de Renzo Ramos. Tiene **dos experiencias** que se eligen según el ancho de
pantalla (ver `App.tsx`, breakpoint 768px):

- **Escritorio** → una **interfaz tipo macOS**: menubar, ventanas arrastrables/redimensionables,
  dock, iconos de escritorio, Spotlight y panel de Preferencias. El portafolio v1 se abre como una
  ventana destacada centrada al cargar.
- **Móvil** → el **portafolio v1** a pantalla completa: un sitio scrollable, bilingüe (ES/EN), con
  secciones Hero / Proyectos / Experiencia / Stack / Metodologías y animaciones (framer-motion).

SPA estática construida con **React + TypeScript + Vite**, desplegable en GitHub Pages.

## 🏗️ Arquitectura

**Stack**: React 19 + TypeScript + Vite + Tailwind (usado por el portafolio). El shell de
escritorio usa CSS modular propio en `src/desktop/styles/*.css`. Sin backend, todo estático.

El código está organizado **por experiencia**: todo lo del escritorio macOS vive bajo `desktop/`
y todo el sitio scrollable bajo `portfolio/`. Los assets son un árbol único compartido.

```
index.html                       → punto de entrada Vite (monta #root)
src/
├── main.tsx                     → render + imports del CSS del escritorio
├── App.tsx                      → decide móvil (PortfolioSite) vs escritorio (componente Desktop)
├── assets/                      → árbol único de imágenes y PDFs (stack/ projects/ certs/ cv/)
│
├── desktop/                     → EXPERIENCIA ESCRITORIO (macOS); solo en pantallas ≥768px
│   ├── shell/                   → chrome del escritorio
│   │   ├── Window.tsx           → ventana: drag, resize 8-dir, minimizar, fullscreen
│   │   ├── useWindowManager.ts  → estado de ventanas (abrir/cerrar/focus/z-index)
│   │   ├── Dock.tsx, DesktopIcons.tsx, MenuBar.tsx, Spotlight.tsx
│   │   ├── desktop-context.ts   → DesktopContext (launch, theme, setTheme)
│   │   └── types.ts             → Rect, WinState
│   ├── apps/                    → contenido de cada ventana
│   │   ├── manifest.ts          → metadata de apps (id, título, icono, tamaño, dock)
│   │   ├── registry.tsx         → mapea id → componente React
│   │   └── About/Projects/ProjectDetail/Stack/Timeline/Certificates/Contact/Config .tsx
│   ├── data/                    → datos del escritorio (ES): stack, projects, timeline, certificates
│   ├── hooks/                   → useTheme, useClock, useConfig (+ config-context.ts)
│   └── styles/                  → hojas modulares del escritorio (tema, ventanas, dock, etc.)
│
└── portfolio/                   → EXPERIENCIA SITIO (vista móvil + ventana destacada en escritorio)
    ├── PortfolioSite.tsx        → punto de entrada del sitio scrollable
    ├── sections/                → hero, projects, experience, stack, methodologies
    ├── components/              → layout/ (Navbar, Footer), ui/, motion/
    ├── shared/                  → componentes compartidos del sitio
    ├── data/                    → datos bilingües (ES/EN)
    ├── i18n/                    → LanguageContext + translations
    ├── hooks/                   → useInView
    └── styles/                  → globals.css (incluye Tailwind)
```

## 🎯 Flujo

1. `main.tsx` importa el CSS del escritorio y monta `<App/>`.
2. `App.tsx`: si es móvil renderiza `<PortfolioSite/>`; si no, renderiza `<Desktop/>` (que provee
   `DesktopContext` + `ConfigContext`, crea el window manager y abre la ventana `portfolio` centrada).
3. Dock / iconos de escritorio / Spotlight llaman a `launch(id)`.
4. `useWindowManager` mantiene el array de ventanas; `Window.tsx` renderiza cada una con sus
   interacciones (drag, resize, minimizar, fullscreen).

> **Nota sobre datos duplicados**: el escritorio (`desktop/data/*`, solo ES) y el portafolio
> (`portfolio/data/*`, bilingüe) mantienen sus propios datos porque tienen formas distintas, pero
> comparten un único árbol de assets en `src/assets/`.

## 🔧 Cómo añadir / editar

> Las imágenes y PDFs viven siempre en `src/assets/` (árbol único). Edita los datos del
> escritorio y los del portafolio en paralelo si quieres mantener ambas vistas sincronizadas.

| Quiero…                            | Toco…                                                              |
| ---------------------------------- | ------------------------------------------------------------------ |
| Editar textos del perfil (escritorio)| `src/desktop/apps/About.tsx`                                     |
| Añadir un proyecto (escritorio)    | `src/desktop/data/projects.ts` (imágenes en `src/assets/projects/`)|
| Añadir tecnología (escritorio)     | `src/desktop/data/stack.ts` (icono PNG en `src/assets/stack/`)     |
| Editar experiencia (escritorio)    | `src/desktop/data/timeline.ts`                                     |
| Añadir certificado (escritorio)    | `src/desktop/data/certificates.ts` (preview/PDF en `src/assets/certs/`)|
| Editar el portafolio / móvil       | `src/portfolio/data/*` (bilingüe) y `src/portfolio/sections/*`     |
| Nueva app/ventana (escritorio)     | crear componente en `src/desktop/apps/`, añadir a `manifest.ts` + `registry.tsx` |
| Cambiar colores/tema (escritorio)  | `src/desktop/styles/variables.css` (`:root` y `[data-theme="dark"]`)|

## 💾 Estado persistente (localStorage)

- `pf-theme`: `'light' | 'dark'`
- `pf-cfg-accent`, `pf-cfg-wall`, `pf-cfg-speed`: preferencias del panel Config

## 🚀 Comandos

```bash
npm install      # instalar dependencias
npm run dev      # servidor de desarrollo (Vite, http://localhost:5173)
npm run build    # build de producción a dist/ (tsc -b && vite build)
npm run preview  # previsualizar el build
```

## 🚢 Deploy

GitHub Pages sirviendo `dist/`. `vite.config.ts` usa `base: './'` (rutas relativas, funciona
bajo cualquier subpath sin reconfigurar).

## 👤 Autor

- Renzo Ramos · renzoramosivan@gmail.com
- GitHub: RenzoRamosDEV · LinkedIn: renzoinv04
