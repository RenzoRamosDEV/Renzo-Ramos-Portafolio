<div align="center">

# Portfolio de Renzo Ramos

**Sitio personal de una sola página con estética de portada de película: humo, aros que giran y animaciones en blanco, negro y naranja.**

[**portafolio-renzoramos.com →**](https://portafolio-renzoramos.com)

[![Deploy to GitHub Pages](https://github.com/RenzoRamosDEV/Renzo-Ramos-Portafolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/RenzoRamosDEV/Renzo-Ramos-Portafolio/actions/workflows/deploy.yml)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-vanilla-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

</div>

---

## Tecnología

- **HTML, CSS y JavaScript sin frameworks.** El JavaScript son módulos ES nativos.
- **Vite** como servidor de desarrollo y para el build.
- **Canvas 2D** para el humo de la portada y la trama de puntos entre educación y certificados.
- **SVG** (con animaciones SMIL) para los aros, el mini mapa, los sellos y las insignias.
- **Google Fonts:** Anton, Bebas Neue y Oswald. **Icons8** para los iconos de GitHub y LinkedIn.

## Puesta en marcha

```bash
npm install
npm run dev       # servidor de desarrollo en http://localhost:5173
npm run build     # genera dist/
npm run preview   # sirve dist/ para comprobar el build
```

## Estructura

```
index.html                 Página principal: <head> (SEO, fuentes) y un marcador <div data-mount="…"> por sección
personal.html              Página personal (mi historia); misma estructura, entrada en src/personal.js
public/                    Archivos estáticos que Vite copia tal cual a dist/
├── media/                 Logo, fotos, emblema, iconos, certificados (PDF) y CV (ahora sin enlazar)
├── img/                   Capturas de proyectos e imágenes de las páginas SEO
└── *.html, robots.txt…    Páginas de aterrizaje SEO, sitemap, manifest, CNAME
src/
├── main.js                Punto de entrada de la página principal: importa los estilos, monta las secciones y arranca su comportamiento
├── personal.js            Punto de entrada de la página personal
├── data/                  Contenido de la web (lo que se edita para actualizarla)
│   ├── projects.js        Proyectos del carrusel
│   ├── experience.js      Puestos de experiencia
│   ├── education.js       Estudios de la línea de tiempo
│   ├── certificates.js    Certificados
│   ├── personal.js        Texto de la página personal (frase, datos y capítulos)
│   └── site.js            Email, enlaces (GitHub, LinkedIn), logo, iconos y navegación
├── sections/              Una por sección: render…() devuelve su markup e init…() le da comportamiento
├── components/            Piezas reutilizables: reciben datos y devuelven markup
├── svg/                   Generadores de SVG: aros, mini mapa, texto circular, iconos
├── canvas/                Animaciones en canvas: humo y trama de puntos
├── utils/                 Helpers: DOM, formato, variables CSS, movimiento reducido, viewport
└── styles/
    ├── main.css           Importa todo lo demás en el orden de la cascada
    ├── base/              Variables (colores), reset y utilidades
    ├── animations/        Keyframes compartidos
    ├── layout/            Cabecera y fondo animado de las secciones
    ├── components/        Un archivo por componente
    ├── sections/          Un archivo por sección
    └── pages/             Estilos propios de páginas extra (personal.css, que solo carga personal.html)
```

### Cómo arranca la página

`index.html` solo contiene marcadores como `<div data-mount="projects"></div>`. `src/main.js` hace dos pasos:

1. **Monta el markup** de cada sección en su marcador, en el orden de la página (`mount('projects', renderProjects())`).
2. **Arranca el comportamiento** (carruseles, ventanas, canvas, observadores) llamando a los `init…()` en un orden fijo.

No cambies ese orden sin motivo: de él dependen los listeners de teclado de las ventanas y el momento en que se miden los canvas.

## Editar el contenido

Todo el contenido está en `src/data/`. No hace falta tocar componentes ni estilos.

**Añadir un proyecto** (`projects.js`): añade un objeto al array. El carrusel y el contador se actualizan solos.

```js
{
  "name": "MI PROYECTO",
  "sub": "SUBTÍTULO EN NARANJA",
  "image": "img/projects/mi-proyecto.jpg",   // captura 16:10 en public/img/projects/
  // o, en vez de "image", varias capturas que se van pasando en el portátil:
  // "images": ["img/projects/mi-proyecto/01.jpg", "img/projects/mi-proyecto/02.jpg"],
  "desc": "Descripción corta.",
  "stack": ["React", "Node.js"],             // se muestran 8 y un "+N" con el resto
  "live": "https://…",                       // vacío ("") oculta el botón VER PROYECTO
  "code": "https://github.com/…"
}
```

**Añadir un puesto** (`experience.js`): las tarjetas se muestran de dos en dos. Con tres o más aparecen las flechas para pasar de página.

```js
{
  "kicker": "EXPERIENCIA 03", "role": "PUESTO", "place": "CIUDAD, PAÍS", "company": "EMPRESA",
  "from": "ENE. 2027", "to": "ACTUALIDAD",
  "left": ["QUÉ HAGO :", "Resumen que aparece en la card de detalle de VER MÁS."],
  "list": ["Tarea 1", "Tarea 2"]
}
```

**Añadir un estudio** (`education.js`): se añade un hito a la línea de tiempo. La rejilla está pensada para tres en escritorio.

```js
{ center: 'CENTRO', degree: 'TÍTULO', from: '2027', to: '2028', place: 'CIUDAD, PAÍS', text: 'Dos líneas de qué hiciste.' }
```

**Añadir un certificado** (`certificates.js`): guarda el PDF (o una imagen) en `public/media/certificados/` y añade:

```js
{ "title": "NOMBRE", "org": "PLATAFORMA", "year": "MES. AÑO", "file": "media/certificados/archivo.pdf", "credential": "https://…" }
```

Si `credential` está vacío, el visor oculta el botón **VER CREDENCIAL**.

**Email, enlaces y navegación** están en `site.js`. **El texto de la página personal** está en `personal.js`.

## Crear un componente

1. Crea `src/components/mi-componente.js` con una función que reciba datos y devuelva el markup:

   ```js
   // Qué es y dónde se usa
   export const miComponente = ({ titulo }) => `<div class="mi-componente">${titulo}</div>`;
   ```

2. Si necesita estilos, crea `src/styles/components/mi-componente.css` y añade su `@import` en `src/styles/main.css` dentro del bloque de componentes. El orden de los imports reproduce la cascada: no lo cambies sin comprobar que no se pisan reglas.
3. Úsalo desde la sección que corresponda (`src/sections/…`) dentro de su `render…()`. Si necesita comportamiento, añádelo en el `init…()` de la sección.

Las clases, ids y atributos existentes no se renombran: el CSS y el JavaScript dependen de ellos. Los archivos nuevos van en kebab-case.

## Estilos

- **Colores:** en `src/styles/base/variables.css`. Los SVG y canvas que usan el naranja o el fondo oscuro los leen de ahí con `cssVar()` (`src/utils/theme.js`).
- **Puntos de corte:** 1100px (se oculta el menú de la portada), 1000px (secciones a una columna) y 640px (portada en móvil). CSS no permite variables en las media queries, así que están escritos en cada archivo.
- **Movimiento reducido:** con `prefers-reduced-motion` se paran el humo, los aros, los pines del mapa, las barras de texto, los fondos animados, los sellos y las transiciones de la línea de tiempo.

## Despliegue

Se despliega solo a **GitHub Pages** con [`deploy.yml`](.github/workflows/deploy.yml) en cada push a `main`:

1. `npm ci` + `npm run build`, que genera las dos páginas (declaradas en `vite.config.ts`).
2. Se publica `dist/` bajo el dominio propio [portafolio-renzoramos.com](https://portafolio-renzoramos.com), configurado en `public/CNAME`.

## Asistente de IA (`chatbot/`)

El repo conserva el backend del asistente (FastAPI + LangChain + OpenAI) de la versión anterior de la web. Es un servicio aparte y **esta web no lo usa**.

---

## Licencia

El **código** está bajo licencia [MIT](LICENSE): úsalo, modifícalo y distribúyelo libremente manteniendo el aviso de copyright.

> [!IMPORTANT]
> **Excepción — contenido personal.** Los textos del portfolio, la base de conocimiento del asistente (`chatbot/knowledge/`), el CV, las imágenes, capturas, logotipos y certificados son contenido personal de Renzo Ramos y **no** están cubiertos por la licencia MIT. Si haces un fork para tu propio portfolio, sustituye todo ese contenido por el tuyo.

---

## Autor

**Renzo Ramos** — Técnico Superior DAM · Junior AI Engineer (Madrid, España)

[🌐 portafolio-renzoramos.com](https://portafolio-renzoramos.com) · [📧 renzoramosivan@gmail.com](mailto:renzoramosivan@gmail.com) · [💼 LinkedIn](https://linkedin.com/in/renzoinv04) · [🐙 GitHub](https://github.com/RenzoRamosDEV)

<div align="center">

⭐ Si te sirve como referencia, una estrella siempre se agradece.

</div>
