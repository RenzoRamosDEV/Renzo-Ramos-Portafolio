# Portfolio Renzo — Documentación Claude

## 📋 Descripción General

Portfolio personal de Renzo Ramos con una **interfaz tipo escritorio macOS**: menubar, ventanas
arrastrables/redimensionables, dock, iconos de escritorio, Spotlight y panel de Preferencias.
SPA estática construida con **React + TypeScript + Vite**, desplegable en GitHub Pages.

> **v3.0** — migrado de HTML/CSS/JS vanilla a React. La versión vanilla anterior y el proyecto
> React original (`v1/`) quedan como archivo histórico.

## 🏗️ Arquitectura

**Stack**: React 19 + TypeScript + Vite. Sin Tailwind — usa el CSS modular del escritorio
(`src/styles/*.css`). Sin backend, todo estático.

```
index.html                  → punto de entrada Vite (monta #root)
src/
├── main.tsx                → render + imports de CSS
├── App.tsx                 → orquestador: providers, window manager, layout inicial, Ctrl+Space
├── styles/*.css            → 9 hojas modulares (tema, ventanas, dock, etc.)
├── desktop/                → shell del escritorio
│   ├── Window.tsx          → ventana: drag, resize 8-dir, minimizar, fullscreen
│   ├── useWindowManager.ts → estado de ventanas (abrir/cerrar/focus/z-index)
│   ├── Dock.tsx, DesktopIcons.tsx, MenuBar.tsx, Spotlight.tsx
│   ├── desktop-context.ts  → DesktopContext (launch, theme, setTheme)
│   └── types.ts            → Rect, WinState
├── apps/                   → contenido de cada ventana
│   ├── manifest.ts         → metadata de apps (id, título, icono, tamaño, dock)
│   ├── registry.tsx        → mapea id → componente React
│   └── About/Projects/ProjectDetail/Stack/Timeline/Certificates/Contact/Config .tsx
├── hooks/                  → useTheme, useClock, useConfig (+ config-context.ts)
├── data/                   → stack.ts, projects.ts, timeline.ts, certificates.ts (ES)
└── assets/                 → stack/ proyectos/ certs/ cv/ (imágenes y PDFs)
```

## 🎯 Flujo

1. `main.tsx` importa todo el CSS y monta `<App/>`.
2. `App.tsx` provee `DesktopContext` + `ConfigContext`, crea el window manager y abre el layout
   inicial (Sobre mí / Proyectos / Trayectoria) escalonado.
3. Dock / iconos de escritorio / Spotlight llaman a `launch(id)`.
4. `useWindowManager` mantiene el array de ventanas; `Window.tsx` renderiza cada una con sus
   interacciones (drag, resize, minimizar, fullscreen).

## 🔧 Cómo añadir / editar

| Quiero…                  | Toco…                                                            |
| ------------------------ | ---------------------------------------------------------------- |
| Editar textos del perfil | `src/apps/About.tsx`                                             |
| Añadir un proyecto       | `src/data/projects.ts` (+ imágenes en `src/assets/projects/`)    |
| Añadir tecnología        | `src/data/stack.ts` (+ icono PNG en `src/assets/stack/`)         |
| Editar experiencia       | `src/data/timeline.ts`                                           |
| Añadir certificado       | `src/data/certificates.ts` (+ preview/PDF en `src/assets/certs/`)|
| Nueva app/ventana        | crear componente en `src/apps/`, añadir a `manifest.ts` + `registry.tsx` |
| Cambiar colores/tema     | `src/styles/variables.css` (`:root` y `[data-theme="dark"]`)     |

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
