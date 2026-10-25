// Perfil resumido de Renzo Ramos. Lo usan el bloque visible "Sobre mí en 30 segundos" (src/sections/summary.js)
// y los archivos para asistentes de IA (llms.txt y llms-full.txt, vite/llms.js): así nunca se contradicen.
// Experiencia, estudios, certificados y proyectos se leen de sus propios archivos de datos.
export const profile = {
  name: 'Renzo Ramos',
  fullName: 'Renzo Iván Ramos de los Ríos',
  role: 'Junior AI Engineer',
  degree: 'Técnico Superior en Desarrollo de Aplicaciones Multiplataforma (DAM)',
  location: 'Madrid, España',
  // Respuesta directa: quién es, en una frase
  summary: 'Renzo Ramos es Junior AI Engineer y Técnico Superior en DAM en Madrid: desarrolla agentes y soluciones de inteligencia artificial con Python, LangChain y LangGraph, y APIs y aplicaciones full stack con Java y Spring Boot.',
  experienceSince: '2025-09', // primer puesto como desarrollador (SEIDOR)
  mainStack: 'Python, LangChain, LangGraph, MCP, Java, Spring Boot, React y TypeScript',
  languages: 'Español (nativo) e inglés',
  availability: 'Abierto a nuevos proyectos y ofertas',
  email: 'renzoramosivan@gmail.com',
  phone: '+34 623 971 177',
  // Stack completo (llms-full.txt)
  stack: [
    ['Lenguajes', 'Java, Python, Scala, TypeScript, JavaScript, Kotlin, Rust'],
    ['Inteligencia artificial', 'LangChain, LangGraph, LiteLLM, Temporal.io, OpenAI SDK, Model Context Protocol (MCP), agentes ReAct, IA generativa, Machine Learning, Prompt Engineering. Herramientas: Claude Code, OpenCode, GitHub Copilot CLI, OpenSpec, Claude Design'],
    ['Backend', 'Spring Boot, Spring Modulith, Play Framework, FastAPI, Node.js/Express, API REST, MySQL, SQLite, Docker'],
    ['Frontend y escritorio', 'React, Vite, TailwindCSS, HTML, CSS, i18next, Tauri'],
    ['Testing', 'JUnit 5, Mockito, Testcontainers, tests de integración, Pitest y Stryker (mutation testing), Playwright, TDD'],
    ['Metodologías', 'SOLID, Clean Architecture, Spec-Driven Development, flujos agénticos, Agile (Scrum/Kanban), Git Flow / Trunk-Based'],
  ],
};

// Meses desde experienceSince hasta la fecha dada → "1 año", "1 año y 3 meses"…
export function experienceLength(sinceYm, until = new Date()) {
  const [y, m] = sinceYm.split('-').map(Number);
  const months = (until.getFullYear() - y) * 12 + (until.getMonth() + 1 - m);
  const years = Math.floor(months / 12), rest = months % 12;
  const yy = years ? `${years} ${years === 1 ? 'año' : 'años'}` : '';
  const mm = rest ? `${rest} ${rest === 1 ? 'mes' : 'meses'}` : '';
  return [yy, mm].filter(Boolean).join(' y ') || 'menos de un mes';
}
