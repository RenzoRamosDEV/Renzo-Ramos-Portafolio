// Proyectos del carrusel. "images" (varias capturas) se van pasando en la pantalla del portátil;
// "image" es una sola captura; si no hay ninguna, se dibuja una captura de relleno
export const projects = [
  {
    "name": "BOOQI",
    "sub": "SISTEMA DE GESTIÓN DE RESERVAS DE EVENTOS",
    "images": [
      "img/projects/booqi/01.jpg",
      "img/projects/booqi/02.jpg",
      "img/projects/booqi/03.jpg",
      "img/projects/booqi/04.jpg",
      "img/projects/booqi/05.jpg",
      "img/projects/booqi/06.jpg",
      "img/projects/booqi/07.jpg",
      "img/projects/booqi/08.jpg",
      "img/projects/booqi/09.jpg"
    ],
    "desc": "Plataforma web para descubrir eventos, comprar entradas y gestionar reservas, con arquitectura de microservicios y panel de administración.",
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
    "live": "https://renzoramosdev.github.io/Booqui-TFG/",
    "code": "https://github.com/RenzoRamosDEV/Booqui-TFG"
  },
  {
    "name": "POKÉDEX RETRO",
    "sub": "+ CHATBOT REACT (MCP)",
    "images": [
      "img/projects/pokedex/01.jpg",
      "img/projects/pokedex/02.jpg",
      "img/projects/pokedex/03.jpg",
      "img/projects/pokedex/04.jpg"
    ],
    "desc": "Aplicación web completa que combina una Pokédex retro con un chatbot de IA que razona paso a paso (ReAct) y consulta los datos en tiempo real vía MCP.",
    "stack": [
      "Scala",
      "Play Framework",
      "Spray JSON",
      "Guice",
      "SBT",
      "Python",
      "MCP",
      "OpenAI SDK",
      "FastAPI",
      "Uvicorn",
      "Requests"
    ],
    "live": "https://renzoramosdev.github.io/Pokedex-Retro/index.html",
    "code": "https://github.com/RenzoRamosDEV/Pokedex-Retro"
  },
  {
    "name": "REDACTOR IA",
    "sub": "REFORMULACIÓN DE TEXTOS CON IA",
    "image": "img/projects/redactor-ia.jpg",
    "desc": "Herramienta web para mejorar o reformular textos con IA: eliges el tono, ajustas la intensidad y recibes una versión mejorada en segundos.",
    "stack": [
      "React",
      "Vite",
      "Tailwind CSS",
      "i18next",
      "TypeScript",
      "Node.js",
      "Express",
      "Gemini",
      "Groq SDK",
      "helmet",
      "express-rate-limit"
    ],
    "live": "",
    "code": "https://github.com/RenzoRamosDEV/Redactor-IA"
  }
];
