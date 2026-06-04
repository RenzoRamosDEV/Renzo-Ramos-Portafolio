# Portfolio Renzo — Documentación Claude

## 📋 Descripción General

Portfolio personal de Renzo Ramos. Es un **sitio web de una sola página, scrollable y bilingüe
(ES/EN)**, con secciones Hero / Proyectos / Experiencia / Stack / Metodologías y animaciones
(framer-motion). Incluye un **asistente IA flotante** (burbuja abajo a la derecha) que responde
preguntas sobre Renzo mediante un backend independiente.

Dos piezas:

- **Frontend** (`src/`) → SPA estática con **React + TypeScript + Vite**, desplegable en GitHub Pages.
- **Chatbot** (`chatbot/`) → backend **FastAPI + LangChain + OpenAI** que sirve el endpoint `/chat`.
  Se ejecuta aparte; el frontend lo consume vía `fetch` (por defecto a `http://localhost:8000`).

## 🏗️ Arquitectura del frontend

**Stack**: React 19 + TypeScript + Vite + Tailwind. Sin backend propio en el frontend; todo estático.

```
index.html                       → punto de entrada Vite (monta #root)
src/
├── main.tsx                     → render de <App/>
├── App.tsx                      → renderiza <PortfolioSite/> a pantalla completa
├── assets/                      → árbol de imágenes y PDFs (stack/ projects/ certs/ cv/ + IARR.png)
│
└── portfolio/                   → EL SITIO
    ├── PortfolioSite.tsx        → entrada del sitio scrollable; monta secciones + ChatWidget
    ├── sections/                → hero, projects, experience, stack, methodologies
    ├── components/
    │   ├── layout/              → Navbar, Footer
    │   ├── ui/                  → Chip, PillButton, ScrollIndicator, SectionTitle
    │   ├── motion/              → WordsPullUp
    │   └── chat/                → asistente flotante: ChatWidget.tsx (UI) + useChat.ts (estado/fetch)
    │                              + chatMarkdown.tsx (render markdown) + chat-widget.css
    ├── shared/                  → ItemDetailCard (componente compartido)
    ├── data/                    → datos bilingües (ES/EN): projects, experience, stack, etc.
    ├── i18n/                    → LanguageContext + translations
    ├── hooks/                   → useInView
    └── styles/                  → globals.css (incluye Tailwind)
```

## 🤖 Arquitectura del chatbot

Backend independiente en `chatbot/` (Python). Ver `chatbot/server.py`.

```
chatbot/
├── server.py        → FastAPI con el endpoint POST /chat (knowledge en el prompt → OpenAI → responder)
├── knowledge/       → base de conocimiento en .md (about, experience, education, certifications,
│                      skills, methodologies, projects, contact). Se concatenan todos al arrancar.
├── requirements.txt → dependencias Python (langchain-openai, fastapi, uvicorn, python-dotenv)
└── .env             → OPENAI_API_KEY, OPENAI_MODEL, SYSTEM_PROMPT, ... (NO se sube a git)
```

**Flujo de `/chat`**: al arrancar, `server.py` concatena todos los `knowledge/*.md` y los inyecta en
el `SYSTEM_PROMPT` (que vive en `.env`, con reglas anti-inyección y los datos como contexto). Como ese
prefijo es fijo, OpenAI lo cachea y abarata las llamadas. En cada petición recibe `{message, thread_id}`,
añade el mensaje al historial de esa sesión y llama al modelo (`ask_llm`). Mantiene el historial por
sesión (`thread_id`) en RAM, acotado a `MAX_HISTORY` mensajes. Si el LLM falla (p.ej. cuota agotada),
devuelve un mensaje amable en 200 con CORS en vez de un 500.

**Frontend ↔ backend**: `useChat.ts` hace `fetch` a `${VITE_CHAT_API_URL ?? 'http://localhost:8000'}/chat`.
En producción (GitHub Pages) hay que desplegar el backend en un host externo y definir `VITE_CHAT_API_URL`.

## 🎯 Flujo de arranque

1. `main.tsx` monta `<App/>`.
2. `App.tsx` renderiza `<PortfolioSite/>` a pantalla completa.
3. `PortfolioSite` provee `LanguageProvider`, monta las secciones scrollables y la burbuja `ChatWidget`.

## 🔧 Cómo añadir / editar

| Quiero…                              | Toco…                                                             |
| ------------------------------------ | ----------------------------------------------------------------- |
| Editar textos del sitio / traducciones | `src/portfolio/data/*` (bilingüe) y `src/portfolio/i18n/translations.ts` |
| Añadir un proyecto                   | `src/portfolio/data/projects.ts` (imágenes en `src/assets/projects/`) |
| Añadir tecnología al stack           | `src/portfolio/data/stack.ts` (icono PNG en `src/assets/stack/`)  |
| Editar experiencia / formación       | `src/portfolio/data/experience.ts`, `education.ts`                |
| Añadir certificado                   | `src/portfolio/data/certificates.ts` (preview/PDF en `src/assets/certs/`) |
| Editar una sección visual            | `src/portfolio/sections/*`                                        |
| Editar el asistente IA (UI)          | `src/portfolio/components/chat/ChatWidget.tsx` + `useChat.ts` + `chat-widget.css` |
| Editar lo que SABE el asistente      | `chatbot/knowledge/*.md` (crear un nuevo `.md` lo añade al conocimiento) |
| Editar la lógica del asistente       | `chatbot/server.py`                                               |

## 💾 Estado persistente (localStorage)

- `pf-lang`: `'es' | 'en'` (idioma del sitio)
- `pf-chat-thread`: id de conversación del asistente (continuidad con el backend)
- `pf-chat-msgs`: mensajes visibles del chat (persisten al recargar)

## 🚀 Comandos

```bash
# Frontend
npm install      # instalar dependencias
npm run dev      # servidor de desarrollo (Vite, http://localhost:5173)
npm run build    # build de producción a dist/ (tsc -b && vite build)
npm run preview  # previsualizar el build

# Chatbot (desde chatbot/)
python3 -m venv .venv && .venv/bin/pip install -r requirements.txt   # instalar (una vez)
.venv/bin/uvicorn server:app --port 8000                            # arrancar el backend
```

## 🚢 Deploy

Frontend en GitHub Pages sirviendo `dist/` (`npm run build`). `vite.config.ts` usa `base: './'`
(rutas relativas). No hay workflow de CI/CD: el deploy es manual.
El chatbot requiere desplegar `chatbot/` en un host con Python (Render, Railway, Fly…) y apuntar
el frontend ahí definiendo `VITE_CHAT_API_URL` (lo consume `useChat.ts`).

## 👤 Autor

- Renzo Ramos · renzoramosivan@gmail.com
- GitHub: RenzoRamosDEV · LinkedIn: renzoinv04
