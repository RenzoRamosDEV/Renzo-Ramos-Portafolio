import { getPublicPath } from '../utils/paths.js';

// Stack tecnológico — iconos desde /icons/ (public/icons/)
export const STACK = [
  { cat: 'back', name: 'Kotlin', icon: getPublicPath('/icons/KOTLIN.png'), desc: 'Desarrollo backend y mobile con enfoque en arquitectura limpia, servicios escalables.' },
  { cat: 'back', name: 'Java', icon: getPublicPath('/icons/JAVA.png'), desc: 'Desarrollo backend con Java, arquitectura limpia y servicios escalables.' },
  { cat: 'back', name: 'Spring Boot', icon: getPublicPath('/icons/SPRING.png'), desc: 'Desarrollo de APIs REST con Spring Boot y arquitectura escalable.' },
  { cat: 'back', name: 'JUnit', icon: getPublicPath('/icons/JUNIT.png'), desc: 'Pruebas unitarias y de integración con JUnit.' },
  { cat: 'back', name: 'Maven', icon: getPublicPath('/icons/MAVEN.png'), desc: 'Gestión de dependencias y construcción de proyectos con Maven.' },
  { cat: 'back', name: 'Gradle', icon: getPublicPath('/icons/GRADLE.png'), desc: 'Gestión de dependencias y construcción de proyectos con Gradle.' },
  { cat: 'back', name: 'MySQL', icon: getPublicPath('/icons/MYSQL.png'), desc: 'Bases de datos relacionales, queries complejas y optimización.' },
  { cat: 'back', name: 'Docker', icon: getPublicPath('/icons/DOCKER.png'), desc: 'Contenedores para entornos reproducibles y deploys limpios.' },
  { cat: 'back', name: 'Git', icon: getPublicPath('/icons/GIT.png'), desc: 'Control de versiones y flujo de trabajo colaborativo.' },

  { cat: 'front', name: 'HTML', icon: getPublicPath('/icons/HTML.png'), desc: 'Maquetación web con HTML semántico y accesible.' },
  { cat: 'front', name: 'CSS', icon: getPublicPath('/icons/CSS.png'), desc: 'Diseño responsivo, animaciones y estilos modernos.' },
  { cat: 'front', name: 'JavaScript', icon: getPublicPath('/icons/JAVASCRIPT-LOGO.png'), desc: 'Lenguaje de programación para interactividad y lógica en el navegador.' },
  { cat: 'front', name: 'React', icon: getPublicPath('/icons/REACT-LOGO.png'), desc: 'Librería para construir interfaces de usuario con componentes reutilizables.' },

  { cat: 'ia', name: 'Copilot CLI', icon: getPublicPath('/icons/GITHUB-COPILOT-CLI-LOGO.png'), desc: 'Asistente de IA de GitHub para sugerencias de código en tiempo real.' },
  { cat: 'ia', name: 'Claude Code', icon: getPublicPath('/icons/CLAUDE.png'), desc: 'Agente IA para desarrollo y optimización de código.' },
  { cat: 'ia', name: 'Claude Design', icon: getPublicPath('/icons/CLAUDEDISEÑO-LOGO.png'), desc: 'Agente IA para diseño y maquetación de interfaces.' },
  { cat: 'ia', name: 'OpenCode', icon: getPublicPath('/icons/OPENCODE.png'), desc: 'Agente IA para acelerar desarrollo y debugging.' },
  { cat: 'ia', name: 'OpenSpec', icon: getPublicPath('/icons/OPENSPEC.png'), desc: 'Agente IA para especificación y diseño de software.' },

  { cat: 'tools', name: 'Antigravity', icon: getPublicPath('/icons/ANTIGRAVITY.png'), desc: 'IDE para desarrollo Frontend potenciado con IA.' },
  { cat: 'tools', name: 'IntelliJ', icon: getPublicPath('/icons/INTELLIJ.png'), desc: 'IDE para desarrollo Backend con máxima productividad.' },
  { cat: 'tools', name: 'Linux', icon: getPublicPath('/icons/LINUX.png'), desc: 'Sistema operativo entorno Linux Ubuntu.' },
  { cat: 'tools', name: 'Windows', icon: getPublicPath('/icons/WINDOWS.png'), desc: 'Sistema operativo entorno Windows.' },
];
