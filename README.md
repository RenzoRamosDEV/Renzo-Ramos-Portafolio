# Portfolio de Renzo Ramos

[![Deploy to GitHub Pages](https://github.com/RenzoRamosDEV/Renzo-Ramos-Portafolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/RenzoRamosDEV/Renzo-Ramos-Portafolio/actions/workflows/deploy.yml)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![FastAPI](https://img.shields.io/badge/FastAPI-chatbot-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Portfolio personal de **Renzo Ramos** — Full Stack Developer · IA Developer.

Sitio web de una sola página, scrollable y **bilingüe (ES/EN)**, con animaciones y un
**asistente de IA integrado** que responde preguntas sobre mi perfil profesional.

🌐 **Demo en vivo:** [portafolio-renzoramos.com](https://portafolio-renzoramos.com)

> ⚠️ **Nota:** el asistente de IA está **desactivado de momento** en la web publicada
> (el backend del chatbot no está desplegado). Todo lo demás funciona con normalidad,
> y el chatbot puede ejecutarse en local siguiendo las instrucciones de este README.

---

## ✨ Características

- **SPA scrollable** con secciones Hero, Proyectos, Experiencia, Stack y Metodologías.
- **Bilingüe (ES/EN)** con cambio de idioma instantáneo y persistente (`localStorage`).
- **Animaciones** con Framer Motion (reveals al hacer scroll, texto animado palabra a palabra).
- **Asistente IA flotante** (burbuja de chat) que responde preguntas sobre Renzo usando un
  backend propio con FastAPI + LangChain + OpenAI. *Desactivado de momento en producción;
  funciona en local.*
- **SEO cuidado**: prerender de HTML en build (SSR estático), `sitemap.xml`, `robots.txt`,
  Open Graph, JSON-LD para el Knowledge Graph, `llms.txt` y páginas de aterrizaje indexables.
- **Despliegue automático** a GitHub Pages con dominio propio en cada push a `main`.
- **Rate limiting** del chatbot por IP en el backend (la barrera real) + contador de cortesía
  en el frontend (UX).

## 🏗️ Arquitectura

El repositorio contiene **dos piezas independientes**:

| Pieza | Ruta | Tecnología | Función |
|---|---|---|---|
| **Frontend** | [`src/`](src/) | React 19 + TypeScript + Vite + Tailwind | SPA estática desplegada en GitHub Pages |
| **Chatbot** | [`chatbot/`](chatbot/) | Python + FastAPI + LangChain + OpenAI | API `POST /chat` que alimenta al asistente |

El frontend es 100 % estático (sin backend propio); el asistente consume el backend del
chatbot vía `fetch` (por defecto `http://localhost:8000/chat` en desarrollo).

### Estructura del proyecto

```
├── index.html                    # Punto de entrada de Vite
├── prerender.js                  # Prerender SSR del HTML en build (SEO)
├── public/                       # Estáticos: favicons, sitemap, robots, OG image, CNAME...
├── src/
│   ├── main.tsx                  # Render de <App/>
│   ├── App.tsx                   # Monta <PortfolioSite/>
│   ├── entry-server.tsx          # Entrada SSR para el prerender
│   ├── assets/                   # Imágenes y PDFs (stack/ projects/ certs/ cv/)
│   └── portfolio/
│       ├── PortfolioSite.tsx     # Sitio scrollable: secciones + ChatWidget
│       ├── sections/             # hero, projects, experience, stack, methodologies
│       ├── components/
│       │   ├── layout/           # Navbar, Footer
│       │   ├── ui/               # Chip, PillButton, ScrollIndicator, SectionTitle
│       │   ├── motion/           # WordsPullUp
│       │   └── chat/             # ChatWidget + useChat + render markdown + CSS
│       ├── data/                 # Datos bilingües: projects, experience, stack...
│       ├── i18n/                 # LanguageContext + translations
│       ├── hooks/                # useInView
│       └── styles/               # globals.css (Tailwind)
└── chatbot/
    ├── server.py                 # FastAPI: endpoint POST /chat
    ├── config.py                 # Modelo, límites, CORS
    ├── knowledge.py              # Carga knowledge/*.md → SYSTEM_PROMPT
    ├── llm.py                    # Llamada a OpenAI + mensajes de error
    ├── history.py                # Historial por sesión (RAM)
    ├── ratelimit.py              # Límite por IP (ventana deslizante)
    ├── schemas.py                # Modelos Pydantic
    └── knowledge/                # Base de conocimiento en Markdown
```

### Cómo funciona el asistente IA

1. Al arrancar, el backend concatena todos los `chatbot/knowledge/*.md` y los inyecta en el
   `SYSTEM_PROMPT` (definido en `.env`, con reglas anti-inyección). Al ser un prefijo fijo,
   OpenAI lo cachea y abarata las llamadas.
2. Cada petición `POST /chat` recibe `{message, thread_id}`; el historial se mantiene por
   sesión en RAM, acotado a `MAX_HISTORY` mensajes.
3. **Rate limit**: máximo `MAX_QUESTIONS` (6) preguntas por IP cada `RATE_WINDOW` (6 h).
   Si el LLM falla (p. ej. cuota agotada), se devuelve un mensaje amable con estado 200.

## 🚀 Puesta en marcha

### Requisitos

- **Node.js** ≥ 20 y npm
- **Python** ≥ 3.10 (solo para el chatbot)
- Una **API key de OpenAI** (solo para el chatbot)

### Frontend

```bash
npm install        # instalar dependencias
npm run dev        # desarrollo → http://localhost:5173
```

### Chatbot

```bash
cd chatbot
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
cp .env.example .env               # y rellena OPENAI_API_KEY y SYSTEM_PROMPT
.venv/bin/uvicorn server:app --port 8000
```

El frontend apunta a `http://localhost:8000/chat` (ver
[`useChat.ts`](src/portfolio/components/chat/useChat.ts)). Con ambos procesos corriendo,
el asistente funciona en local.

### Scripts disponibles

| Script | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo de Vite |
| `npm run build` | Build de producción: `tsc` + build cliente + build SSR + prerender a `dist/` |
| `npm run build:spa` | Build solo SPA (sin prerender) |
| `npm run preview` | Previsualizar el build de producción |

## 🔧 Guía rápida de edición

| Quiero… | Toco… |
|---|---|
| Editar textos / traducciones | `src/portfolio/data/*` y `src/portfolio/i18n/translations.ts` |
| Añadir un proyecto | `src/portfolio/data/projects.ts` (+ imágenes en `src/assets/projects/`) |
| Añadir tecnología al stack | `src/portfolio/data/stack.ts` (+ icono en `src/assets/stack/`) |
| Editar experiencia / formación | `src/portfolio/data/experience.ts`, `education.ts` |
| Añadir un certificado | `src/portfolio/data/certificates.ts` (+ PDF en `src/assets/certs/`) |
| Editar la UI del asistente | `src/portfolio/components/chat/` |
| Editar lo que **sabe** el asistente | `chatbot/knowledge/*.md` (un `.md` nuevo se añade solo) |
| Editar la lógica del asistente | `chatbot/server.py` y módulos vecinos |

## 🔐 Variables de entorno (chatbot)

Definidas en `chatbot/.env` (**nunca se sube a git**; hay plantilla en
[`chatbot/.env.example`](chatbot/.env.example)):

| Variable | Obligatoria | Descripción |
|---|---|---|
| `OPENAI_API_KEY` | ✅ | API key de OpenAI |
| `OPENAI_MODEL` | ❌ | Modelo a usar (por defecto `gpt-4o-mini`) |
| `SYSTEM_PROMPT` | ✅ | Prompt de sistema con reglas del asistente; el conocimiento se inyecta en él |

## 💾 Estado persistente (localStorage)

| Clave | Contenido |
|---|---|
| `pf-lang` | Idioma del sitio: `'es'` \| `'en'` |
| `pf-chat-thread` | ID de conversación del asistente (continuidad con el backend) |
| `pf-chat-msgs` | Mensajes visibles del chat (persisten al recargar) |
| `pf-chat-rate` | Contador de cortesía del rate limit (la barrera real es el backend) |

## 📦 Despliegue

El frontend se despliega automáticamente a **GitHub Pages** con el workflow
[`deploy.yml`](.github/workflows/deploy.yml) en cada push a `main`:

1. `npm ci` + `npm run build` (incluye el prerender SEO).
2. Se publica `dist/` en GitHub Pages bajo el dominio propio
   [portafolio-renzoramos.com](https://portafolio-renzoramos.com) (configurado en `public/CNAME`).

El chatbot es un servicio aparte y no forma parte de este despliegue.

## 📄 Licencia

El **código** de este proyecto está bajo la licencia [MIT](LICENSE): puedes usarlo,
modificarlo y distribuirlo libremente manteniendo el aviso de copyright.

⚠️ **Excepción — contenido personal**: los textos del portfolio, la base de conocimiento del
asistente (`chatbot/knowledge/`), el CV, las imágenes, capturas, logotipos y certificados son
contenido personal de Renzo Ramos y **no** están cubiertos por la licencia MIT. Si haces un
fork para tu propio portfolio, sustituye todo ese contenido por el tuyo.

## 👤 Autor

**Renzo Ramos** — Full Stack Developer · IA Developer (Madrid, España)

- 🌐 [portafolio-renzoramos.com](https://portafolio-renzoramos.com)
- 📧 [renzoramosivan@gmail.com](mailto:renzoramosivan@gmail.com)
- 💼 [LinkedIn — renzoinv04](https://linkedin.com/in/renzoinv04)
- 🐙 [GitHub — RenzoRamosDEV](https://github.com/RenzoRamosDEV)

---

⭐ Si este proyecto te resulta útil como referencia, ¡una estrella siempre se agradece!
