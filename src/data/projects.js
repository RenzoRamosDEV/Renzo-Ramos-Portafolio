// Proyectos del carrusel. "images" son las capturas que se van pasando en la pantalla del portátil:
// cada una con su "src" (1536×800, en public/img/projects/) y su "alt". Sin capturas, se dibuja una de relleno.
// "title" (nombre con mayúsculas normales), "created" (fecha de creación del repositorio) y "languages"
// solo se usan en los datos estructurados (JSON-LD, vite/structured-data.js); "details" (descripción larga) solo
// en llms-full.txt (vite/llms.js)
export const projects = [
  {
    "name": "AGENTBOARD",
    "title": "AgentBoard",
    "created": "2026-09-25",
    "languages": ["Rust", "TypeScript"],
    "sub": "PANEL DE COSTE Y ACTIVIDAD DE AGENTES DE IA",
    "images": [
      { "src": "img/projects/agentboard/agentboard-resumen-coste-agentes-ia.jpg", "alt": "Resumen de AgentBoard con el coste, las sesiones y el gasto diario por agente" },
      { "src": "img/projects/agentboard/agentboard-coste-por-agente.jpg", "alt": "AgentBoard con el coste y las llamadas de cada agente: Claude Code, Codex y OpenCode" },
      { "src": "img/projects/agentboard/agentboard-coste-por-proyecto.jpg", "alt": "Tabla de AgentBoard con el coste y las sesiones de cada proyecto de código" },
      { "src": "img/projects/agentboard/agentboard-proyectos-y-sesiones.jpg", "alt": "Lista de proyectos en AgentBoard con sus agentes, ramas, tiempo activo y coste" },
      { "src": "img/projects/agentboard/agentboard-servidores-mcp.jpg", "alt": "AgentBoard mostrando las llamadas y los errores de cada servidor MCP" },
      { "src": "img/projects/agentboard/agentboard-tipos-de-agente.jpg", "alt": "Coste y uso por tipo de agente y subagente en el panel de AgentBoard" },
      { "src": "img/projects/agentboard/agentboard-precios-y-presupuestos.jpg", "alt": "Precios por modelo y presupuestos mensuales configurables en AgentBoard" }
    ],
    "desc": "App de escritorio que reúne qué hacen Claude Code, Codex, Copilot, Cursor, Gemini y OpenCode, y cuánto cuestan, leyendo sus logs en local. Nada sale del ordenador.",
    "details": "Aplicación de escritorio que reúne qué hacen Claude Code, Codex, Copilot, Cursor, Gemini y OpenCode, y cuánto cuestan, leyendo los logs que ya tienen en el ordenador (local, privado y de solo lectura). Muestra coste, tokens, sesiones, actividad, herramientas, modelos y proyectos, con presupuestos y avisos. Tauri 2 + Rust, caché SQLite, interfaz React + TypeScript + Vite y servidor MCP con 20 herramientas.",
    "stack": [
      "Tauri 2",
      "Rust",
      "React",
      "TypeScript",
      "Vite",
      "SQLite",
      "MCP",
      "OpenSpec"
    ],
    "live": "https://renzoramosdev.github.io/Documentacion-Proyectos-Renzo-Ramos/agentboard/",
    "code": "https://github.com/RenzoRamosDEV/AgentBoard"
  },
  {
    "name": "BRAINY",
    "title": "Brainy",
    "created": "2026-10-12",
    "languages": ["TypeScript"],
    "sub": "PLATAFORMA EDUCATIVA INTERACTIVA",
    "tag": "ACTUALIZACIONES CONSTANTES",
    "images": [
      { "src": "img/projects/brainy/brainy-iniciar-sesion.jpg", "alt": "Pantalla de entrada de Brainy, la web educativa en español para aprender jugando" },
      { "src": "img/projects/brainy/brainy-inicio-alumno.jpg", "alt": "Inicio de Brainy con puntos, niveles, ranking y los mundos de Matemáticas y Lengua" },
      { "src": "img/projects/brainy/brainy-mis-lecciones.jpg", "alt": "Mis lecciones en Brainy con el progreso de cada lección por asignatura" },
      { "src": "img/projects/brainy/brainy-leccion-division-animada.jpg", "alt": "Lección animada de Brainy que explica una división de tres cifras paso a paso" }
    ],
    "desc": "Web en español para aprender jugando: lecciones animadas paso a paso, quizzes y taller de ortografía de Matemáticas, Lengua, Ciencias, Sociales e Inglés, con puntos, niveles y ranking.",
    "details": "Web en español para aprender jugando, con lecciones animadas paso a paso, quizzes y un taller de ortografía de Matemáticas, Lengua, Ciencias, Sociales e Inglés, con puntos, niveles y ranking. React 19 + TypeScript + Vite + Tailwind CSS, Framer Motion, Supabase y Vitest. Se actualiza constantemente. Código privado.",
    "stack": [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Framer Motion",
      "Supabase",
      "Vitest",
      "GitHub Pages"
    ],
    "live": "https://renzoramosdev.github.io/Brainy-Site/",
    "code": ""
  },
  {
    "name": "POKÉDEX RETRO",
    "title": "Pokédex Retro",
    "created": "2026-10-23",
    "languages": ["JavaScript", "HTML", "CSS"],
    "sub": "POKÉDEX GAME BOY CON CHAT DE IA Y SERVIDOR MCP",
    "images": [
      { "src": "img/projects/pokedex/pokedex-retro-listado-pokemon.jpg", "alt": "Pokédex Retro con estética Game Boy mostrando el listado de Pokémon de PokéAPI" },
      { "src": "img/projects/pokedex/pokedex-retro-ficha-bulbasaur.jpg", "alt": "Ficha de Bulbasaur en Pokédex Retro con sus tipos, habilidades y estadísticas base" },
      { "src": "img/projects/pokedex/pokedex-retro-habilidades.jpg", "alt": "Sección de habilidades de Pokédex Retro con la descripción de cada habilidad" },
      { "src": "img/projects/pokedex/pokedex-retro-objetos.jpg", "alt": "Listado de objetos de Pokédex Retro con su categoría, precio y efecto" }
    ],
    "desc": "Pokédex estilo Game Boy sobre PokéAPI, sin frameworks ni build, con un chat de IA (Claude u OpenAI) que responde con datos reales y un servidor MCP.",
    "details": "Pokédex estática con estética Game Boy sobre PokéAPI v2, sin frameworks ni build (JavaScript con módulos ES, HTML y CSS), publicada en GitHub Pages. Tres temas, CSP estricta y WCAG 2.1 AA. Incluye un chat con Claude u OpenAI que usa la clave del visitante desde el navegador (agente principal, subagentes y skills) y un servidor MCP en Node.js con 12 herramientas para consultarla desde Claude. Tests e2e con Playwright y mutation testing con Stryker.",
    "stack": [
      "JavaScript",
      "HTML",
      "CSS",
      "Node.js",
      "PokéAPI",
      "MCP",
      "Claude API",
      "OpenAI API",
      "Playwright",
      "Stryker",
      "axe",
      "GitHub Actions",
      "GitHub Pages"
    ],
    "live": "https://renzoramosdev.github.io/Pokedex-Retro/index.html",
    "code": "https://github.com/RenzoRamosDEV/Pokedex-Retro"
  },
  {
    "name": "BOOQI",
    "title": "Booqi",
    "created": "2026-05-13",
    "languages": ["Java", "TypeScript"],
    "sub": "SISTEMA DE GESTIÓN DE RESERVAS DE EVENTOS",
    "images": [
      { "src": "img/projects/booqi/booqi-iniciar-sesion.jpg", "alt": "Pantalla de inicio de sesión de Booqi, la plataforma de reservas de eventos" },
      { "src": "img/projects/booqi/booqi-inicio-eventos.jpg", "alt": "Página de inicio de Booqi con el buscador de eventos y las categorías destacadas" },
      { "src": "img/projects/booqi/booqi-contacto.jpg", "alt": "Formulario de contacto de Booqi para dudas sobre entradas y eventos" },
      { "src": "img/projects/booqi/booqi-detalle-evento.jpg", "alt": "Detalle de un evento en Booqi con fecha, lugar y compra de entradas" },
      { "src": "img/projects/booqi/booqi-carrito.jpg", "alt": "Carrito de Booqi con entradas para dos eventos y el resumen del pedido" },
      { "src": "img/projects/booqi/booqi-pago.jpg", "alt": "Pantalla de pago de Booqi con tarjeta de crédito, débito o PayPal" },
      { "src": "img/projects/booqi/booqi-pago-completado-entradas-qr.jpg", "alt": "Pago completado en Booqi con las entradas compradas y sus códigos QR" },
      { "src": "img/projects/booqi/booqi-mis-reservas.jpg", "alt": "Mis reservas en Booqi con las entradas confirmadas de cada evento" },
      { "src": "img/projects/booqi/booqi-panel-administracion.jpg", "alt": "Panel de administración de Booqi con usuarios, eventos y ventas" }
    ],
    "desc": "Plataforma web para descubrir eventos, comprar entradas y gestionar reservas, con arquitectura de microservicios y panel de administración.",
    "details": "Plataforma web para descubrir eventos, comprar entradas (con ticket en PDF) y gestionar reservas, más un panel de administración. Arquitectura de microservicios en Java/Spring Boot (usuarios, eventos, reservas, pagos), MySQL, OpenAPI/Swagger, JUnit 5 y Pitest, frontend React + Vite + Bootstrap, orquestado con Docker Compose. Proyecto en equipo (con Melanie Gabriela Cárdenas Hidalgo).",
    "stack": [
      "Java",
      "Spring Boot",
      "Spring Data JPA",
      "Maven",
      "Lombok",
      "MapStruct",
      "OpenAPI / Swagger",
      "JUnit 5",
      "Pitest",
      "MySQL",
      "React",
      "Vite",
      "Bootstrap",
      "Axios",
      "Docker",
      "Docker Compose"
    ],
    "live": "https://renzoramosdev.github.io/Documentacion-Proyectos-Renzo-Ramos/booqi/",
    "code": "https://github.com/RenzoRamosDEV/Booqui-TFG"
  }
];
