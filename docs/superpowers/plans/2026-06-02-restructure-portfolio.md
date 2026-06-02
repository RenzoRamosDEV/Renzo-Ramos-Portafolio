# Portfolio Restructure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convertir `Renzo Ramos - Portafolio.html` (archivo monolítico de 410 líneas) en un proyecto modular con CSS/JS separados, listo para GitHub Pages sin build step.

**Architecture:** El index.html queda solo con el markup HTML y los `<link>`/`<script>` tags. CSS se divide en 7 archivos temáticos bajo `src/styles/`. JS se divide en 4 módulos ES6 bajo `src/js/` más un módulo de datos en `src/js/data/`. Las dependencias cross-módulo (openApp, setTheme) se pasan por importación explícita para evitar globals.

**Tech Stack:** HTML5, CSS3 (variables CSS, backdrop-filter), ES Modules (import/export nativo), sin bundler, GitHub Pages (hosting estático).

---

## File Map

| Archivo | Responsabilidad |
|---|---|
| `index.html` | Markup HTML puro + `<link>` CSS + `<script type="module">` |
| `src/styles/variables.css` | `:root` y `[data-theme="dark"]` custom properties |
| `src/styles/base.css` | Reset `*`, `html,body`, `a` |
| `src/styles/menubar.css` | `.menubar`, `.deskhint`, `.tbtn` |
| `src/styles/windows.css` | `.win`, `.titlebar`, `.wbody`, scrollbar custom |
| `src/styles/components.css` | `.about`, `.pill`, `.sect`, `.proj`, `.pd`, `.timeline`, `.certs`, `.contact`, `.lnk`, `.chip2`, `.grouptitle`, `.grid`, `.pillrow`, `.ainote`, `@media` |
| `src/styles/dock.css` | `.dock`, `.dapp`, `.tip`, `.dot`, colores `.d-*` |
| `src/styles/spotlight.css` | `.spot-overlay`, `.spot`, `@keyframes spotin`, `.results`, `.res` |
| `src/js/data/apps.js` | `export const apps = {...}` con HTML de cada ventana |
| `src/js/theme.js` | `export function initTheme()`, `export function setTheme(t)` |
| `src/js/windows.js` | `export function initWindows(appsData, setThemeFn)` — openApp, closeWin, focusWin, dragify, markRunning |
| `src/js/spotlight.js` | `export function initSpotlight(openAppFn, setThemeFn)` — índice, toggleSpot, renderSpot, keybindings |
| `src/js/main.js` | Import todo, init en orden, `openApp('about')` on load |

---

### Task 1: Crear estructura de directorios y archivos CSS

**Files:**
- Create: `src/styles/variables.css`
- Create: `src/styles/base.css`
- Create: `src/styles/menubar.css`
- Create: `src/styles/windows.css`
- Create: `src/styles/components.css`
- Create: `src/styles/dock.css`
- Create: `src/styles/spotlight.css`

- [ ] **Step 1: Crear directorios**

```bash
mkdir -p src/styles src/js/data
```

- [ ] **Step 2: Crear `src/styles/variables.css`**

```css
:root{
  --text:#1d1d1f; --text2:#6e6e73; --win:rgba(252,252,254,.80); --win-solid:#fcfcfe;
  --line:rgba(0,0,0,.10); --accent:#0071e3; --bar:rgba(255,255,255,.5);
  --wall:linear-gradient(150deg,#d7e3ff 0%,#e9f0ff 38%,#eef7ff 70%,#f4fbff 100%);
  --side:rgba(245,245,250,.72); --shadow:0 30px 80px rgba(40,60,120,.20);
  --chip:rgba(0,0,0,.04);
}
[data-theme="dark"]{
  --text:#f5f5f7; --text2:#9b9ba1; --win:rgba(28,28,32,.74); --win-solid:#1c1c20;
  --line:rgba(255,255,255,.12); --accent:#2997ff; --bar:rgba(18,18,22,.5);
  --wall:linear-gradient(150deg,#06122e 0%,#0a1838 42%,#0c1430 72%,#06101f 100%);
  --side:rgba(34,34,40,.72); --shadow:0 30px 80px rgba(0,0,0,.6);
  --chip:rgba(255,255,255,.06);
}
```

- [ ] **Step 3: Crear `src/styles/base.css`**

```css
*{margin:0;padding:0;box-sizing:border-box}
html,body{height:100%}
body{
  font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;color:var(--text);overflow:hidden;
  background:var(--wall);background-attachment:fixed;-webkit-font-smoothing:antialiased;transition:background .6s;
}
a{color:inherit}
```

- [ ] **Step 4: Crear `src/styles/menubar.css`**

```css
.menubar{position:fixed;top:0;left:0;right:0;height:30px;z-index:9000;display:flex;align-items:center;justify-content:space-between;padding:0 16px;font-size:13px;backdrop-filter:blur(18px) saturate(180%);-webkit-backdrop-filter:blur(18px) saturate(180%);background:var(--bar);border-bottom:1px solid var(--line)}
.menubar .ml{display:flex;gap:20px;align-items:center}
.menubar .ml b{font-weight:600}
.menubar .ml span{opacity:.8}
.menubar .mr{display:flex;gap:16px;align-items:center}
.menubar .mr a{color:var(--text);text-decoration:none;opacity:.8}
.menubar .mr a:hover{opacity:1}
.tbtn{cursor:pointer;opacity:.85}.tbtn:hover{opacity:1}
.deskhint{position:fixed;top:54px;right:20px;text-align:right;font-size:12px;color:var(--text);opacity:.6;z-index:10}
.deskhint kbd{background:var(--win);padding:2px 7px;border-radius:6px;border:1px solid var(--line);font-family:inherit}
```

- [ ] **Step 5: Crear `src/styles/windows.css`**

```css
.win{position:absolute;border-radius:14px;background:var(--win);box-shadow:var(--shadow);backdrop-filter:blur(30px) saturate(180%);-webkit-backdrop-filter:blur(30px) saturate(180%);border:1px solid var(--line);overflow:hidden;display:flex;flex-direction:column;min-width:280px;opacity:0;transform:scale(.96);transition:opacity .28s,transform .28s cubic-bezier(.16,1,.3,1)}
.win.open{opacity:1;transform:scale(1)}
.titlebar{height:42px;display:flex;align-items:center;gap:8px;padding:0 14px;cursor:grab;flex:none;border-bottom:1px solid var(--line)}
.titlebar:active{cursor:grabbing}
.lights{display:flex;gap:8px}
.light{width:12px;height:12px;border-radius:50%}
.l-r{background:#ff5f57}.l-y{background:#febc2e}.l-g{background:#28c840}
.titlebar .wtitle{font-size:13px;font-weight:600;margin:0 auto;opacity:.85;padding-right:48px}
.wbody{overflow:auto;flex:1}
.wbody::-webkit-scrollbar{width:9px}.wbody::-webkit-scrollbar-thumb{background:color-mix(in oklab,var(--text) 18%,transparent);border-radius:9px;border:2px solid transparent;background-clip:padding-box}
```

- [ ] **Step 6: Crear `src/styles/components.css`**

```css
/* ABOUT */
.about{display:grid;grid-template-columns:210px 1fr;min-height:100%}
.about .side{background:var(--side);padding:24px 18px;border-right:1px solid var(--line)}
.avatar{width:88px;height:88px;border-radius:24px;margin:0 auto 14px;background:linear-gradient(135deg,#0071e3,#22c1c3);display:grid;place-items:center;color:#fff;font-size:32px;font-weight:600;letter-spacing:-.02em;box-shadow:0 10px 28px rgba(0,113,227,.35)}
.about .side h3{text-align:center;font-size:18px;font-weight:600;letter-spacing:-.01em}
.about .side .r{text-align:center;font-size:12.5px;color:var(--text2);margin-top:3px;line-height:1.4}
.about .side ul{list-style:none;margin-top:18px;display:flex;flex-direction:column;gap:3px}
.about .side li{font-size:13px;padding:7px 10px;border-radius:8px;color:var(--text2);display:flex;align-items:center;gap:9px}
.about .side li .i{width:16px;text-align:center;opacity:.7}
.about .main{padding:26px 28px}
.about .main h2{font-size:23px;font-weight:600;letter-spacing:-.02em;margin-bottom:12px}
.about .main p{font-size:14px;color:var(--text2);line-height:1.62;margin-bottom:13px}
.about .main p b{color:var(--text);font-weight:600}
.pillrow{margin-top:6px}
.pill{display:inline-block;font-size:12px;padding:6px 12px;border-radius:980px;background:var(--chip);border:1px solid var(--line);margin:0 6px 6px 0;color:var(--text)}

/* GENERIC SECTION HEAD */
.sect{padding:24px 26px}
.sect h2{font-size:20px;font-weight:600;letter-spacing:-.02em;margin-bottom:4px}
.sect .lead{font-size:13px;color:var(--text2);margin-bottom:20px}
.grouptitle{font-size:11.5px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--accent);margin:22px 0 12px;display:flex;align-items:center;gap:8px}
.grouptitle:first-of-type{margin-top:4px}
.grouptitle .ln{flex:1;height:1px;background:var(--line)}
.chips{display:flex;flex-wrap:wrap;gap:8px}
.chip2{font-size:12.5px;padding:7px 13px;border-radius:10px;background:var(--chip);border:1px solid var(--line)}
.chip2.key{background:color-mix(in oklab,var(--accent) 13%,transparent);border-color:color-mix(in oklab,var(--accent) 30%,transparent);color:var(--accent);font-weight:500}
.ainote{font-size:13px;color:var(--text2);line-height:1.6;margin-top:10px;background:var(--chip);padding:12px 14px;border-radius:10px;border:1px solid var(--line)}

/* PROJECTS GRID */
.grid{display:grid;grid-template-columns:1fr;gap:14px;padding:22px 24px}
.proj{border-radius:14px;border:1px solid var(--line);background:var(--win-solid);cursor:pointer;transition:transform .3s,box-shadow .3s;overflow:hidden}
.proj:hover{transform:translateY(-3px);box-shadow:0 14px 36px rgba(0,0,0,.14)}
.proj .ptop{display:flex;gap:14px;padding:16px 18px}
.proj .pico{width:46px;height:46px;border-radius:12px;flex:none;display:grid;place-items:center;color:#fff;font-size:20px;font-weight:600}
.pi0{background:linear-gradient(135deg,#0071e3,#22c1c3)}
.pi1{background:linear-gradient(135deg,#5b2d8e,#9b5de5)}
.proj .pmeta{flex:1;min-width:0}
.proj .pmeta .pk{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--text2)}
.proj .pmeta h4{font-size:16px;font-weight:600;letter-spacing:-.01em;margin:2px 0 4px}
.proj .pmeta p{font-size:13px;color:var(--text2);line-height:1.45}
.proj .ptags{display:flex;flex-wrap:wrap;gap:6px;padding:0 18px 16px}
.ptag{font-size:11px;padding:4px 9px;border-radius:7px;background:var(--chip);border:1px solid var(--line);color:var(--text2)}
.proj .open{display:flex;align-items:center;justify-content:space-between;padding:10px 18px;border-top:1px solid var(--line);font-size:13px;color:var(--accent)}

/* PROJECT DETAIL */
.pd{padding:0}
.pd .hero{padding:22px 26px;display:flex;gap:16px;align-items:center;border-bottom:1px solid var(--line)}
.pd .hero .pico{width:54px;height:54px;border-radius:14px;flex:none;display:grid;place-items:center;color:#fff;font-size:24px;font-weight:600}
.pd .hero h2{font-size:21px;font-weight:600;letter-spacing:-.02em}
.pd .hero .sub{font-size:13px;color:var(--text2);margin-top:2px}
.pd .body{padding:22px 26px 26px}
.pd .blk{margin-bottom:18px}
.pd .blk .h{font-size:11.5px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--accent);margin-bottom:7px}
.pd .blk p{font-size:13.5px;color:var(--text2);line-height:1.6}
.pd ul.feat{list-style:none;display:flex;flex-direction:column;gap:7px}
.pd ul.feat li{font-size:13.5px;color:var(--text2);line-height:1.5;display:flex;gap:9px}
.pd ul.feat li::before{content:"›";color:var(--accent);font-weight:700;flex:none}
.repo-btn{display:inline-flex;align-items:center;gap:8px;background:var(--accent);color:#fff;text-decoration:none;padding:10px 18px;border-radius:980px;font-size:13.5px;font-weight:500;transition:transform .25s}
.repo-btn:hover{transform:scale(1.04)}

/* TIMELINE */
.timeline{padding:24px 26px}
.tl-group{font-size:11.5px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--accent);margin:6px 0 14px}
.tl-group:not(:first-child){margin-top:8px}
.titem{position:relative;padding:0 0 22px 26px;border-left:2px solid var(--line)}
.titem:last-child{border-left-color:transparent;padding-bottom:4px}
.titem .dot{position:absolute;left:-7px;top:3px;width:12px;height:12px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 4px color-mix(in oklab,var(--accent) 18%,transparent)}
.titem .when{font-size:11.5px;color:var(--text2);font-variant-numeric:tabular-nums}
.titem h4{font-size:15px;font-weight:600;margin:2px 0 2px;letter-spacing:-.01em}
.titem .where{font-size:12.5px;color:var(--accent);margin-bottom:6px}
.titem p{font-size:13px;color:var(--text2);line-height:1.55}

/* CERTS */
.certs{padding:22px 24px;display:flex;flex-direction:column;gap:12px}
.cert{border:1px solid var(--line);border-radius:13px;background:var(--win-solid);padding:15px 17px;display:flex;gap:14px;align-items:flex-start}
.cert .cb{width:42px;height:42px;border-radius:11px;flex:none;display:grid;place-items:center;font-size:18px;color:#fff;background:linear-gradient(135deg,#0071e3,#22c1c3)}
.cert .ci{flex:1}
.cert h4{font-size:14.5px;font-weight:600;letter-spacing:-.01em}
.cert .issuer{font-size:12.5px;color:var(--text2);margin:2px 0 5px}
.cert .cd{font-size:12.5px;color:var(--text2);line-height:1.5}
.cert a{font-size:12.5px;color:var(--accent);text-decoration:none}
.cert a:hover{text-decoration:underline}

/* CONTACT */
.contact{padding:24px 26px}
.contact .intro{font-size:14px;color:var(--text2);line-height:1.6;margin-bottom:18px}
.links{display:flex;flex-direction:column;gap:10px}
.lnk{display:flex;align-items:center;gap:14px;padding:13px 15px;border:1px solid var(--line);border-radius:12px;background:var(--win-solid);text-decoration:none;color:var(--text);transition:transform .25s,border-color .25s}
.lnk:hover{transform:translateX(4px);border-color:color-mix(in oklab,var(--accent) 45%,transparent)}
.lnk .li{width:40px;height:40px;border-radius:11px;flex:none;display:grid;place-items:center;font-size:18px;color:#fff;background:linear-gradient(135deg,#0071e3,#22c1c3)}
.lnk .lt{font-size:14px;font-weight:600}
.lnk .ls{font-size:12.5px;color:var(--text2)}
.lnk .arrow{margin-left:auto;color:var(--text2)}

@media(max-width:600px){.about{grid-template-columns:1fr}.about .side{border-right:none;border-bottom:1px solid var(--line)}}
```

- [ ] **Step 7: Crear `src/styles/dock.css`**

```css
.dock{position:fixed;bottom:12px;left:50%;transform:translateX(-50%);z-index:9000;display:flex;gap:8px;align-items:flex-end;padding:8px 12px;border-radius:22px;background:var(--bar);border:1px solid var(--line);backdrop-filter:blur(30px) saturate(180%);-webkit-backdrop-filter:blur(30px) saturate(180%);box-shadow:0 12px 40px rgba(0,0,0,.2)}
.dapp{width:50px;height:50px;border-radius:14px;display:grid;place-items:center;cursor:pointer;font-size:22px;color:#fff;transition:transform .2s cubic-bezier(.16,1,.3,1);position:relative}
.dapp:hover{transform:translateY(-12px) scale(1.18)}
.dapp .tip{position:absolute;top:-34px;left:50%;transform:translateX(-50%);background:var(--win-solid);color:var(--text);font-size:12px;padding:4px 9px;border-radius:7px;white-space:nowrap;opacity:0;pointer-events:none;transition:opacity .2s;border:1px solid var(--line)}
.dapp:hover .tip{opacity:1}
.dapp .dot{position:absolute;bottom:-5px;width:4px;height:4px;border-radius:50%;background:var(--text);opacity:0}
.dapp.running .dot{opacity:.6}
.d-about{background:linear-gradient(135deg,#0071e3,#54a8ff)}
.d-proj{background:linear-gradient(135deg,#22c1c3,#5fe6c0)}
.d-stack{background:linear-gradient(135deg,#a855f7,#d8a8ff)}
.d-path{background:linear-gradient(135deg,#ff7a59,#ffb199)}
.d-cert{background:linear-gradient(135deg,#f0a500,#ffd35e)}
.d-mail{background:linear-gradient(135deg,#34c759,#8ce8a3)}
.d-spot{background:linear-gradient(135deg,#3a3a42,#6e6e7a)}
```

- [ ] **Step 8: Crear `src/styles/spotlight.css`**

```css
.spot-overlay{position:fixed;inset:0;z-index:9500;display:none;align-items:flex-start;justify-content:center;padding-top:18vh;background:rgba(0,0,0,.18);backdrop-filter:blur(4px)}
.spot-overlay.on{display:flex}
.spot{width:min(560px,90vw);background:var(--win);border:1px solid var(--line);border-radius:16px;box-shadow:var(--shadow);backdrop-filter:blur(30px) saturate(180%);-webkit-backdrop-filter:blur(30px) saturate(180%);overflow:hidden;animation:spotin .25s cubic-bezier(.16,1,.3,1)}
@keyframes spotin{from{opacity:0;transform:translateY(-12px) scale(.98)}to{opacity:1;transform:none}}
.spot input{width:100%;border:none;background:transparent;color:var(--text);font-family:inherit;font-size:22px;padding:18px 22px;outline:none}
.spot .results{border-top:1px solid var(--line);max-height:50vh;overflow:auto}
.spot .res{display:flex;align-items:center;gap:14px;padding:13px 20px;cursor:pointer}
.spot .res.sel,.spot .res:hover{background:color-mix(in oklab,var(--accent) 16%,transparent)}
.spot .res .ico{width:30px;height:30px;border-radius:8px;display:grid;place-items:center;color:#fff;font-size:15px;flex:none}
.spot .res .rt{font-size:15px}.spot .res .rk{font-size:12px;color:var(--text2);margin-left:auto}
```

- [ ] **Step 9: Commit CSS**

```bash
git add src/styles/
git commit -m "feat: extract CSS into 7 modular stylesheets"
```

---

### Task 2: Crear módulo de datos

**Files:**
- Create: `src/js/data/apps.js`

- [ ] **Step 1: Crear `src/js/data/apps.js`**

Este archivo exporta el objeto `apps` con el HTML de cada ventana. Los template literals con `.map()` se preservan exactamente como en el original.

```js
export const apps = {
  about: {
    title: 'Sobre mí', w: 660, h: 440, x: 130, y: 80,
    html: `
      <div class="about">
        <div class="side">
          <div class="avatar">RR</div>
          <h3>Renzo Ramos</h3>
          <div class="r">Backend-Oriented<br>Full Stack Developer</div>
          <ul>
            <li><span class="i">📍</span> Madrid, España</li>
            <li><span class="i">💼</span> SEIDOR</li>
            <li><span class="i">☕</span> Java · Spring Boot</li>
            <li><span class="i">🗣</span> Español · English</li>
          </ul>
        </div>
        <div class="main">
          <h2>Hola, soy Renzo 👋</h2>
          <p>Desarrollador <b>Full Stack con orientación backend</b> afincado en Madrid. Me especializo en <b>Java y Spring Boot</b>, construyendo APIs REST escalables y mantenibles aplicando arquitectura limpia, principios SOLID y diseño orientado al dominio.</p>
          <p>Conecto la lógica de backend con la interfaz usando <b>React y TypeScript</b>, e integro herramientas de IA de forma deliberada en mi flujo de trabajo — no como muleta, sino como multiplicador de fuerza.</p>
          <div class="pillrow">
            <span class="pill">Java</span><span class="pill">Spring Boot</span><span class="pill">REST API Design</span><span class="pill">Microservicios</span><span class="pill">Docker</span><span class="pill">Clean Architecture</span><span class="pill">SOLID</span><span class="pill">DDD</span>
          </div>
        </div>
      </div>`
  },

  proj: {
    title: 'Proyectos', w: 560, h: 520, x: 420, y: 110,
    html: `
      <div class="grid">
        <div class="proj" data-open="proj-booqi">
          <div class="ptop"><div class="pico pi0">B</div><div class="pmeta"><div class="pk">Proyecto en equipo · Backend lead</div><h4>Booqi — Gestión de Reservas de Eventos</h4><p>4 microservicios Spring Boot independientes con orquestación Docker Compose, comunicación inter-servicio y compra centralizada de tickets.</p></div></div>
          <div class="ptags"><span class="ptag">Java</span><span class="ptag">Spring Boot</span><span class="ptag">Microservicios</span><span class="ptag">MySQL</span><span class="ptag">Docker</span><span class="ptag">React</span></div>
          <div class="open"><span>Ver caso completo</span><span>→</span></div>
        </div>
        <div class="proj" data-open="proj-inv">
          <div class="ptop"><div class="pico pi1">I</div><div class="pmeta"><div class="pk">Desarrollador único · Full Stack</div><h4>Sistema de Gestión de Inventario</h4><p>SPA full-stack de la base de datos al frontend: dashboard en tiempo real, soft-delete con recuperación y tipado end-to-end con TypeScript.</p></div></div>
          <div class="ptags"><span class="ptag">Java 17</span><span class="ptag">Spring Boot</span><span class="ptag">MapStruct</span><span class="ptag">React</span><span class="ptag">TypeScript</span><span class="ptag">TailwindCSS</span></div>
          <div class="open"><span>Ver caso completo</span><span>→</span></div>
        </div>
      </div>`
  },

  'proj-booqi': {
    title: 'Booqi', w: 620, h: 560, x: 300, y: 70,
    html: `
      <div class="pd">
        <div class="hero"><div class="pico pi0">B</div><div><h2>Booqi — Gestión de Reservas de Eventos</h2><div class="sub">Proyecto en equipo · Ownership de todo el backend</div></div></div>
        <div class="body">
          <div class="blk"><div class="h">Mi rol</div><p>Responsable del backend en los 4 microservicios (usuarios, eventos, reservas, pagos) y único encargado de la orquestación con Docker Compose: red compartida, healthchecks y configuración de entornos. El frontend lo desarrollaron compañeros de equipo.</p></div>
          <div class="blk"><div class="h">Arquitectura</div><p>4 microservicios Spring Boot independientes, cada uno con su propia base de datos MySQL y su API REST documentada con Swagger / OpenAPI. Comunicación inter-servicio para validar en tiempo real la identidad del usuario, la existencia del evento y la disponibilidad de asientos.</p></div>
          <div class="blk"><div class="h">Características clave</div><ul class="feat">
            <li>Compra centralizada de tickets</li>
            <li>Generación de ticket en PDF al confirmar la reserva</li>
            <li>Panel de administración para organizadores: creación de eventos y monitorización de reservas y pagos</li>
            <li>Control de disponibilidad en tiempo real</li>
          </ul></div>
          <div class="blk"><div class="h">Tecnologías</div><div class="chips">${['Java','Spring Boot','SpringDoc','Maven','MySQL','React','Bootstrap','TypeScript','Docker'].map(t=>`<span class="chip2">${t}</span>`).join('')}</div></div>
          <a class="repo-btn" href="https://github.com/RenzoRamosDEV/Booqui-Sistema-Gestion-Reservas-Eventos" target="_blank" rel="noopener">⎇ Ver repositorio en GitHub</a>
        </div>
      </div>`
  },

  'proj-inv': {
    title: 'Inventario', w: 620, h: 560, x: 330, y: 80,
    html: `
      <div class="pd">
        <div class="hero"><div class="pico pi1">I</div><div><h2>Sistema de Gestión de Inventario</h2><div class="sub">Desarrollador único · Full-stack end-to-end</div></div></div>
        <div class="body">
          <div class="blk"><div class="h">Backend</div><p>Java 17 + Spring Boot con arquitectura por capas, mapeo DTO con MapStruct, manejo centralizado de excepciones, paginación, filtros de búsqueda multi-criterio, Spring Boot Actuator para monitorización y documentación Swagger / OpenAPI.</p></div>
          <div class="blk"><div class="h">Frontend</div><p>SPA en React + TypeScript con dashboard en tiempo real (valor total del stock, alertas de bajo stock, productos agotados, más caros) y tipado estricto end-to-end en toda la comunicación con la API.</p></div>
          <div class="blk"><div class="h">Características clave</div><ul class="feat">
            <li>Borrado lógico (soft delete) con recuperación de registros</li>
            <li>Ajuste de stock en tiempo real desde la tabla principal</li>
            <li>Filtrado multi-criterio por nombre, estado de stock y estado eliminado</li>
          </ul></div>
          <div class="blk"><div class="h">Tecnologías</div><div class="chips">${['Java 17','Spring Boot','SpringDoc','Maven','MySQL','React','TypeScript','TailwindCSS'].map(t=>`<span class="chip2">${t}</span>`).join('')}</div></div>
          <a class="repo-btn" href="https://github.com/RenzoRamosDEV/Gestion-De-Inventario" target="_blank" rel="noopener">⎇ Ver repositorio en GitHub</a>
        </div>
      </div>`
  },

  stack: {
    title: 'Tech Stack', w: 600, h: 540, x: 380, y: 90,
    html: `
      <div class="sect">
        <h2>Tech Stack & Metodologías</h2>
        <div class="lead">Herramientas y prácticas que uso en el día a día.</div>

        <div class="grouptitle">Backend <span class="ln"></span></div>
        <div class="chips">${['Java','Kotlin','Spring Boot','Spring Modulith','MySQL','Docker','Docker Compose','Maven','Gradle','JUnit','Mockito','Testcontainers','Swagger / OpenAPI'].map(t=>`<span class="chip2 key">${t}</span>`).join('')}</div>

        <div class="grouptitle">Frontend <span class="ln"></span></div>
        <div class="chips">${['HTML','CSS','JavaScript','TypeScript','React','TailwindCSS','CSS Modules'].map(t=>`<span class="chip2">${t}</span>`).join('')}</div>

        <div class="grouptitle">Control de versiones <span class="ln"></span></div>
        <div class="chips">${['Git','Git Flow','Trunk-Based','Commits estructurados'].map(t=>`<span class="chip2">${t}</span>`).join('')}</div>

        <div class="grouptitle">Herramientas de IA <span class="ln"></span></div>
        <div class="chips">${['Claude Code','Copilot CLI','OpenSpec'].map(t=>`<span class="chip2">${t}</span>`).join('')}</div>
        <div class="ainote">Uso la IA de forma deliberada: <b>Claude Code</b> en refactors y decisiones de arquitectura, <b>Copilot CLI</b> para sugerencias en terminal y <b>OpenSpec</b> para redactar specs técnicas antes de implementar. No como muleta — como multiplicador de fuerza.</div>

        <div class="grouptitle">Metodologías <span class="ln"></span></div>
        <div class="chips">${['SOLID','Clean Architecture','TDD','Integration Testing','Agile (Scrum/Kanban)','Spec-Driven Development','Agentic Workflows','Prompt Engineering','Component-Based UI','Responsive Design','DDD'].map(t=>`<span class="chip2">${t}</span>`).join('')}</div>
      </div>`
  },

  path: {
    title: 'Trayectoria', w: 580, h: 500, x: 360, y: 90,
    html: `
      <div class="timeline">
        <div class="tl-group">Experiencia</div>
        <div class="titem"><div class="dot"></div><div class="when">Septiembre 2025 – Actualidad · Madrid</div><h4>Fullstack Developer</h4><div class="where">SEIDOR</div><p>Desarrollo de componentes reutilizables y configurables en Adobe Experience Manager (AEM), lógica de backend modal en Java y gestión de contenido multimedia vía AEM Assets (DAM). Resolución de incidencias, optimización de funcionalidades y documentación técnica para soporte y mantenimiento.</p></div>

        <div class="tl-group">Formación</div>
        <div class="titem"><div class="dot"></div><div class="when">Septiembre 2024 – Junio 2026 · Madrid</div><h4>FP Superior — Desarrollo de Aplicaciones Multiplataforma</h4><div class="where">CESUR</div><p>Java, Spring Boot, Kotlin, Python, HTML, CSS, Maven y Gradle. Desarrollo backend y frontend, APIs REST, gestión de dependencias y buenas prácticas de programación.</p></div>
        <div class="titem"><div class="dot"></div><div class="when">Julio 2025 – Agosto 2025 · Madrid</div><h4>Bootcamp — Fundación Telefónica</h4><div class="where">42 Madrid</div><p>Bootcamp intensivo en C, Linux y shell scripting. Metodología de aprendizaje peer-to-peer con revisión entre estudiantes y validación colaborativa.</p></div>
        <div class="titem"><div class="dot"></div><div class="when">2021 – 2022 · Lima, Perú</div><h4>Diseño Gráfico</h4><div class="where">Instituto San Ignacio de Loyola</div><p>Comunicación visual y herramientas de diseño: Adobe Illustrator, Photoshop e InDesign. Aporta una sensibilidad de diseño que informa mis decisiones de UI en frontend.</p></div>
      </div>`
  },

  cert: {
    title: 'Certificados', w: 560, h: 440, x: 400, y: 120,
    html: `
      <div class="certs">
        <div class="cert"><div class="cb">☕</div><div class="ci"><h4>Essential Spring Boot Certificate</h4><div class="issuer">LinkedIn Learning · Mayo 2026</div><a href="https://www.linkedin.com/learning/certificates/7b7c86e65a375f5a2e3f6dd941c68683bfbda364592dacc893275a5e0a80eef6" target="_blank" rel="noopener">Ver credencial →</a></div></div>
        <div class="cert"><div class="cb">✦</div><div class="ci"><h4>Professional Artificial Intelligence Certificate</h4><div class="issuer">Google / Coursera · Abril 2026</div><a href="https://www.coursera.org/account/accomplishments/professional-cert/certificate/XKQE5SSM3EDZ" target="_blank" rel="noopener">Ver credencial →</a></div></div>
        <div class="cert"><div class="cb">⚡</div><div class="ci"><h4>AI-Assisted Development Certificate</h4><div class="issuer">Big School · Marzo 2026</div><div class="cd">Formación de 6 horas sobre el flujo zero-to-production integrando modelos de IA en proyectos reales.</div></div></div>
      </div>`
  },

  mail: {
    title: 'Contacto', w: 520, h: 430, x: 430, y: 130,
    html: `
      <div class="contact">
        <div class="intro">¿Tienes un proyecto o una oportunidad? Estoy abierto a conversar. Encuéntrame aquí:</div>
        <div class="links">
          <a class="lnk" href="mailto:renzoramosivan@gmail.com"><div class="li">✉</div><div><div class="lt">Email</div><div class="ls">renzoramosivan@gmail.com</div></div><span class="arrow">→</span></a>
          <a class="lnk" href="https://github.com/RenzoRamosDEV" target="_blank" rel="noopener"><div class="li">⎇</div><div><div class="lt">GitHub</div><div class="ls">github.com/RenzoRamosDEV</div></div><span class="arrow">→</span></a>
          <a class="lnk" href="https://www.linkedin.com/in/renzoinv04/" target="_blank" rel="noopener"><div class="li">in</div><div><div class="lt">LinkedIn</div><div class="ls">linkedin.com/in/renzoinv04</div></div><span class="arrow">→</span></a>
          <a class="lnk" href="https://renzoramosdev.github.io/Renzo-Ramos-Portafolio/" target="_blank" rel="noopener"><div class="li">◈</div><div><div class="lt">Portafolio web</div><div class="ls">renzoramosdev.github.io</div></div><span class="arrow">→</span></a>
        </div>
      </div>`
  }
};
```

- [ ] **Step 2: Commit datos**

```bash
git add src/js/data/apps.js
git commit -m "feat: extract apps data into ES module"
```

---

### Task 3: Crear módulos JS (theme, windows, spotlight)

**Files:**
- Create: `src/js/theme.js`
- Create: `src/js/windows.js`
- Create: `src/js/spotlight.js`

- [ ] **Step 1: Crear `src/js/theme.js`**

```js
const root = document.documentElement;
const tb = document.getElementById('themeBtn');
const clk = document.getElementById('clock');

export function setTheme(t) {
  root.setAttribute('data-theme', t);
  tb.textContent = t === 'dark' ? '☀' : '☾';
  localStorage.setItem('pf-theme', t);
}

export function initTheme() {
  const saved = localStorage.getItem('pf-theme');
  const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(saved || (prefersDark ? 'dark' : 'light'));
  tb.onclick = () => setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
}

export function initClock() {
  function tick() {
    clk.textContent = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  }
  tick();
  setInterval(tick, 1000);
}
```

- [ ] **Step 2: Crear `src/js/windows.js`**

```js
const desktop = document.getElementById('desktop');
let z = 10;
const openWins = {};

export function focusWin(win) {
  win.style.zIndex = ++z;
}

function markRunning() {
  document.querySelectorAll('.dapp[data-app]').forEach(d => {
    const id = d.dataset.app;
    d.classList.toggle('running', !!openWins[id]);
  });
}

function closeWin(id) {
  const w = openWins[id];
  if (!w) return;
  w.classList.remove('open');
  setTimeout(() => w.remove(), 260);
  delete openWins[id];
  markRunning();
}

function dragify(win, handle) {
  let sx, sy, ox, oy, drag = false;
  handle.addEventListener('mousedown', e => {
    drag = true; sx = e.clientX; sy = e.clientY;
    ox = win.offsetLeft; oy = win.offsetTop;
    focusWin(win); e.preventDefault();
  });
  addEventListener('mousemove', e => {
    if (!drag) return;
    win.style.left = Math.max(0, ox + e.clientX - sx) + 'px';
    win.style.top = Math.max(32, oy + e.clientY - sy) + 'px';
  });
  addEventListener('mouseup', () => drag = false);
}

export function openApp(apps, id) {
  if (openWins[id]) { focusWin(openWins[id]); return; }
  const a = apps[id]; if (!a) return;
  const win = document.createElement('div');
  win.className = 'win';
  win.style.width = a.w + 'px'; win.style.height = a.h + 'px';
  const maxX = Math.max(20, innerWidth - a.w - 20);
  const maxY = Math.max(40, innerHeight - a.h - 90);
  win.style.left = Math.min(a.x, maxX) + 'px';
  win.style.top = Math.min(a.y, maxY) + 'px';
  win.style.zIndex = ++z;
  win.innerHTML = `<div class="titlebar"><div class="lights"><span class="light l-r"></span><span class="light l-y"></span><span class="light l-g"></span></div><div class="wtitle">${a.title}</div></div><div class="wbody">${a.html}</div>`;
  desktop.appendChild(win);
  openWins[id] = win;
  requestAnimationFrame(() => win.classList.add('open'));
  win.querySelector('.l-r').onclick = e => { e.stopPropagation(); closeWin(id); };
  win.addEventListener('mousedown', () => focusWin(win));
  dragify(win, win.querySelector('.titlebar'));
  win.querySelectorAll('[data-open]').forEach(p => p.onclick = () => openApp(apps, p.dataset.open));
  markRunning();
}
```

- [ ] **Step 3: Crear `src/js/spotlight.js`**

```js
const overlay = document.getElementById('spotOverlay');
const input = document.getElementById('spotInput');
const resultsEl = document.getElementById('spotResults');

const index = [
  { t: 'Sobre mí',            k: 'Perfil',                    app: 'about',     ico: '☻', c: 'd-about' },
  { t: 'Proyectos',           k: 'Trabajo',                   app: 'proj',      ico: '▦', c: 'd-proj'  },
  { t: 'Booqi',               k: 'Proyecto · Microservicios', app: 'proj-booqi',ico: 'B', c: 'd-proj'  },
  { t: 'Sistema de Inventario',k:'Proyecto · Full-stack',     app: 'proj-inv',  ico: 'I', c: 'd-stack' },
  { t: 'Tech Stack',          k: 'Habilidades',               app: 'stack',     ico: '{}',c: 'd-stack' },
  { t: 'Trayectoria',         k: 'Experiencia y formación',   app: 'path',      ico: '◷', c: 'd-path'  },
  { t: 'Certificados',        k: 'Credenciales',              app: 'cert',      ico: '✦', c: 'd-cert'  },
  { t: 'Contacto',            k: 'Email · GitHub · LinkedIn', app: 'mail',      ico: '✉', c: 'd-mail'  },
  { t: 'Cambiar tema',        k: 'Claro / Oscuro',            app: 'theme',     ico: '☾', c: 'd-spot'  },
];

let sel = 0, filtered = index.slice();

function toggleSpot(on) {
  overlay.classList.toggle('on', on);
  if (on) { input.value = ''; renderSpot(''); input.focus(); }
}

function renderSpot(q, openAppFn) {
  filtered = index.filter(i =>
    i.t.toLowerCase().includes(q.toLowerCase()) ||
    i.k.toLowerCase().includes(q.toLowerCase())
  );
  sel = 0;
  resultsEl.innerHTML = filtered.map((r, i) =>
    `<div class="res ${i === 0 ? 'sel' : ''}" data-i="${i}"><div class="ico ${r.c}">${r.ico}</div><div class="rt">${r.t}</div><div class="rk">${r.k}</div></div>`
  ).join('') || `<div class="res"><div class="rt" style="color:var(--text2)">Sin resultados</div></div>`;
  resultsEl.querySelectorAll('.res').forEach(el => el.onclick = () => runSpot(+el.dataset.i, openAppFn));
}

function runSpot(i, openAppFn, setThemeFn) {
  const r = filtered[i]; if (!r) return;
  toggleSpot(false);
  if (r.app === 'theme') {
    const root = document.documentElement;
    setThemeFn(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  } else {
    openAppFn(r.app);
  }
}

function upd() {
  resultsEl.querySelectorAll('.res').forEach((el, i) => el.classList.toggle('sel', i === sel));
}

export function initSpotlight(openAppFn, setThemeFn) {
  input.addEventListener('input', e => renderSpot(e.target.value, openAppFn));

  addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.code === 'Space') {
      e.preventDefault();
      toggleSpot(!overlay.classList.contains('on'));
      return;
    }
    if (!overlay.classList.contains('on')) return;
    if (e.key === 'Escape') toggleSpot(false);
    if (e.key === 'ArrowDown') { e.preventDefault(); sel = Math.min(filtered.length - 1, sel + 1); upd(); }
    if (e.key === 'ArrowUp') { e.preventDefault(); sel = Math.max(0, sel - 1); upd(); }
    if (e.key === 'Enter') runSpot(sel, openAppFn, setThemeFn);
  });

  overlay.addEventListener('click', e => { if (e.target === overlay) toggleSpot(false); });

  // initial render for spotlight results
  renderSpot('', openAppFn);
}

export { toggleSpot };
```

- [ ] **Step 4: Commit módulos JS**

```bash
git add src/js/theme.js src/js/windows.js src/js/spotlight.js
git commit -m "feat: create ES modules for theme, windows, and spotlight"
```

---

### Task 4: Crear main.js y index.html

**Files:**
- Create: `src/js/main.js`
- Create: `index.html`

- [ ] **Step 1: Crear `src/js/main.js`**

```js
import { apps } from './data/apps.js';
import { initTheme, initClock, setTheme } from './theme.js';
import { openApp } from './windows.js';
import { initSpotlight, toggleSpot } from './spotlight.js';

initTheme();
initClock();

// Bind dock icons
document.querySelectorAll('.dapp').forEach(d => {
  d.onclick = () => {
    const id = d.dataset.app;
    if (id === 'spot') { toggleSpot(true); return; }
    openApp(apps, id);
  };
});

initSpotlight(
  (id) => openApp(apps, id),
  setTheme
);

setTimeout(() => openApp(apps, 'about'), 300);
```

- [ ] **Step 2: Crear `index.html`**

```html
<!DOCTYPE html>
<html lang="es" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Renzo Ramos — Portafolio</title>
  <link rel="stylesheet" href="src/styles/variables.css">
  <link rel="stylesheet" href="src/styles/base.css">
  <link rel="stylesheet" href="src/styles/menubar.css">
  <link rel="stylesheet" href="src/styles/windows.css">
  <link rel="stylesheet" href="src/styles/components.css">
  <link rel="stylesheet" href="src/styles/dock.css">
  <link rel="stylesheet" href="src/styles/spotlight.css">
</head>
<body>
  <div class="menubar">
    <div class="ml"><b>Renzo Ramos</b><span>Portafolio</span><span>Proyectos</span><span>Contacto</span></div>
    <div class="mr"><span class="tbtn" id="themeBtn">☾</span><span id="clock">--:--</span></div>
  </div>
  <div class="deskhint">Pulsa <kbd>⌘ Espacio</kbd> para Spotlight · o usa el Dock ↓</div>

  <div id="desktop"></div>

  <div class="dock">
    <div class="dapp d-about" data-app="about"><span class="tip">Sobre mí</span>☻<span class="dot"></span></div>
    <div class="dapp d-proj"  data-app="proj" ><span class="tip">Proyectos</span>▦<span class="dot"></span></div>
    <div class="dapp d-stack" data-app="stack"><span class="tip">Tech Stack</span>{ }<span class="dot"></span></div>
    <div class="dapp d-path"  data-app="path" ><span class="tip">Trayectoria</span>◷<span class="dot"></span></div>
    <div class="dapp d-cert"  data-app="cert" ><span class="tip">Certificados</span>✦<span class="dot"></span></div>
    <div class="dapp d-mail"  data-app="mail" ><span class="tip">Contacto</span>✉<span class="dot"></span></div>
    <div class="dapp d-spot"  data-app="spot" ><span class="tip">Spotlight</span>⌕</div>
  </div>

  <div class="spot-overlay" id="spotOverlay">
    <div class="spot">
      <input id="spotInput" placeholder="Buscar en el portafolio…" autocomplete="off">
      <div class="results" id="spotResults"></div>
    </div>
  </div>

  <script type="module" src="src/js/main.js"></script>
</body>
</html>
```

- [ ] **Step 3: Commit index.html y main.js**

```bash
git add index.html src/js/main.js
git commit -m "feat: create index.html and main.js entry point"
```

---

### Task 5: Verificar y limpiar

**Files:**
- Delete: `Renzo Ramos - Portafolio.html` (tras confirmar que index.html funciona)

- [ ] **Step 1: Abrir en browser y verificar**

Abrir `index.html` directamente en el navegador (file:// funciona con ES modules en Chrome/Firefox/Safari modernos). Verificar:
- [ ] Tema claro/oscuro funciona con el botón ☾/☀
- [ ] El reloj actualiza
- [ ] La ventana "Sobre mí" abre al cargar
- [ ] Cada dock icon abre su ventana
- [ ] Las ventanas son arrastrables
- [ ] Spotlight (Ctrl+Space) busca y navega
- [ ] Las cards de proyectos abren la ventana de detalle
- [ ] Los botones "Ver repositorio" llevan a GitHub
- [ ] Responsive: a 600px el sidebar de "Sobre mí" se apila

- [ ] **Step 2: Eliminar el archivo monolítico original**

```bash
git rm "Renzo Ramos - Portafolio.html"
git commit -m "chore: remove monolithic HTML file, now replaced by modular structure"
```

- [ ] **Step 3: Commit final con tag de versión**

```bash
git tag v2.0-modular
```

---

## Para GitHub Pages

Una vez verificado localmente:

1. En GitHub → Settings → Pages → Source: `main` branch, carpeta `/` (root)
2. GitHub Pages servirá `index.html` automáticamente
3. Los ES modules funcionan con GitHub Pages (HTTPS, MIME types correctos)
4. URL final: `https://<usuario>.github.io/<repo>/`

> **Nota importante:** ES modules con `type="module"` NO funcionan con `file://` protocol en todos los browsers por restricciones CORS. Para prueba local usa un servidor simple:
> ```bash
> python3 -m http.server 8080
> # Luego abre http://localhost:8080
> ```
> GitHub Pages usa HTTPS, así que en producción funciona perfectamente.
