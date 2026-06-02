import claude from '../assets/icons-stack/claude.png'
import claudeDesign from '../assets/icons-stack/claude-design.png'
import css from '../assets/icons-stack/css.png'
import docker from '../assets/icons-stack/docker.png'
import git from '../assets/icons-stack/git.png'
import githubCopilot from '../assets/icons-stack/github-copilot.png'
import gradle from '../assets/icons-stack/gradle.png'
import html from '../assets/icons-stack/html.png'
import java from '../assets/icons-stack/java.png'
import javascript from '../assets/icons-stack/javascript.png'
import junit from '../assets/icons-stack/junit.png'
import kotlin from '../assets/icons-stack/kotlin.png'
import maven from '../assets/icons-stack/maven.png'
import mysql from '../assets/icons-stack/mysql.png'
import opencode from '../assets/icons-stack/opencode.png'
import openspec from '../assets/icons-stack/openspec.png'
import react from '../assets/icons-stack/react.png'
import spring from '../assets/icons-stack/spring.png'
import springModulith from '../assets/icons-stack/spring-modulith.png'
import type { Lang } from '../i18n/translations'

export type StackItem = {
  kind: 'stack'
  cat: 'back' | 'front' | 'ia' | 'stack-tools'
  name: string
  icon: string
  desc: string
}

type StackItemRaw = Omit<StackItem, 'desc'> & { desc: Record<Lang, string> }

const STACK_RAW: StackItemRaw[] = [
  { kind: 'stack', cat: 'back', name: 'Kotlin', icon: kotlin, desc: {
    es: 'Lo utilizo para el desarrollo de servicios modernos, aprovechando su sintaxis concisa para implementar arquitecturas limpias y código altamente legible.',
    en: 'I use it for modern service development, leveraging its concise syntax to implement clean architectures and highly readable code.',
  }},
  { kind: 'stack', cat: 'back', name: 'Java', icon: java, desc: {
    es: 'Mi lenguaje base para construir aplicaciones empresariales robustas, aplicando principios SOLID y patrones de diseño para garantizar la escalabilidad.',
    en: 'My primary language for building robust enterprise applications, applying SOLID principles and design patterns to ensure scalability.',
  }},
  { kind: 'stack', cat: 'back', name: 'Spring Boot', icon: spring, desc: {
    es: 'Lo empleo para la creación rápida de APIs REST seguras y servicios autocontenidos, gestionando de forma eficiente la inyección de dependencias.',
    en: 'I use it for rapidly creating secure REST APIs and self-contained services, efficiently managing dependency injection.',
  }},
  { kind: 'stack', cat: 'back', name: 'Spring Modulith', icon: springModulith, desc: {
    es: 'Lo aplico para estructurar aplicaciones monolíticas mediante módulos lógicos bien definidos, facilitando una futura evolución hacia microservicios.',
    en: 'I apply it to structure monolithic applications through well-defined logical modules, facilitating future evolution towards microservices.',
  }},
  { kind: 'stack', cat: 'back', name: 'MySQL', icon: mysql, desc: {
    es: 'Lo he usado para el diseño de bases de datos relacionales, optimizando consultas complejas y asegurando la integridad referencial de los datos.',
    en: 'I have used it for relational database design, optimizing complex queries and ensuring referential data integrity.',
  }},
  { kind: 'stack', cat: 'back', name: 'Docker', icon: docker, desc: {
    es: 'Lo integro en mi flujo de trabajo para crear entornos replicables, garantizando que el despliegue sea consistente en cualquier infraestructura.',
    en: 'I integrate it into my workflow to create replicable environments, ensuring deployment is consistent across any infrastructure.',
  }},

  { kind: 'stack', cat: 'front', name: 'HTML', icon: html, desc: {
    es: 'Lo aplico para construir la estructura semántica de la web, priorizando siempre la accesibilidad y el SEO desde la base.',
    en: 'I apply it to build the semantic structure of the web, always prioritizing accessibility and SEO from the ground up.',
  }},
  { kind: 'stack', cat: 'front', name: 'CSS', icon: css, desc: {
    es: 'Lo utilizo para dar estilo y vida a las interfaces, creando diseños adaptables (responsive) y animaciones que mejoran la experiencia de usuario.',
    en: 'I use it to style and bring interfaces to life, creating responsive designs and animations that improve the user experience.',
  }},
  { kind: 'stack', cat: 'front', name: 'JavaScript', icon: javascript, desc: {
    es: 'Lo empleo para añadir interactividad compleja y lógica de negocio en el navegador, conectando de forma fluida el front con el back.',
    en: 'I use it to add complex interactivity and business logic in the browser, seamlessly connecting the front end with the back end.',
  }},
  { kind: 'stack', cat: 'front', name: 'React', icon: react, desc: {
    es: 'Mi librería principal para desarrollar interfaces de usuario dinámicas, basadas en componentes reutilizables y una gestión de estado eficiente.',
    en: 'My main library for developing dynamic user interfaces, based on reusable components and efficient state management.',
  }},

  { kind: 'stack', cat: 'ia', name: 'Copilot CLI', icon: githubCopilot, desc: {
    es: 'Lo integro en mi terminal para agilizar la escritura de comandos complejos y recibir sugerencias de código contextuales en tiempo real.',
    en: 'I integrate it in my terminal to speed up writing complex commands and receive contextual code suggestions in real time.',
  }},
  { kind: 'stack', cat: 'ia', name: 'Claude Code', icon: claude, desc: {
    es: 'Lo utilizo como compañero de programación para realizar refactorizaciones profundas y optimizar la lógica de algoritmos complejos.',
    en: 'I use it as a programming companion to perform deep refactoring and optimize complex algorithm logic.',
  }},
  { kind: 'stack', cat: 'ia', name: 'Claude Design', icon: claudeDesign, desc: {
    es: 'Lo uso para conceptualizar y prototipar interfaces de usuario, ayudándome a definir layouts modernos de forma más rápida.',
    en: 'I use it to conceptualize and prototype user interfaces, helping me define modern layouts more quickly.',
  }},
  { kind: 'stack', cat: 'ia', name: 'OpenCode', icon: opencode, desc: {
    es: 'Lo aplico para acelerar los ciclos de desarrollo y facilitar las tareas de debugging mediante asistencia inteligente.',
    en: 'I apply it to accelerate development cycles and facilitate debugging tasks through intelligent assistance.',
  }},
  { kind: 'stack', cat: 'ia', name: 'OpenSpec', icon: openspec, desc: {
    es: 'Lo empleo para la definición y diseño de especificaciones de software, asegurando que los requisitos técnicos estén bien documentados desde el inicio.',
    en: 'I use it for software specification definition and design, ensuring technical requirements are well documented from the start.',
  }},

  { kind: 'stack', cat: 'stack-tools', name: 'JUnit', icon: junit, desc: {
    es: 'Lo utilizo para blindar la calidad del código mediante pruebas automatizadas, asegurando que cada funcionalidad responda correctamente ante fallos.',
    en: 'I use it to protect code quality through automated testing, ensuring every functionality responds correctly to failures.',
  }},
  { kind: 'stack', cat: 'stack-tools', name: 'Maven', icon: maven, desc: {
    es: 'Lo uso para la gestión estructurada de dependencias y la automatización del ciclo de vida de construcción en proyectos Java/Kotlin.',
    en: 'I use it for structured dependency management and build lifecycle automation in Java/Kotlin projects.',
  }},
  { kind: 'stack', cat: 'stack-tools', name: 'Gradle', icon: gradle, desc: {
    es: 'Lo prefiero en proyectos que requieren una configuración de build más flexible y rápida, optimizando los tiempos de compilación.',
    en: 'I prefer it in projects that require more flexible and fast build configuration, optimizing compilation times.',
  }},
  { kind: 'stack', cat: 'stack-tools', name: 'Git', icon: git, desc: {
    es: 'Lo domino para el control de versiones detallado y la colaboración en equipo, manteniendo un flujo de trabajo organizado mediante ramas y commits claros.',
    en: 'I master it for detailed version control and team collaboration, maintaining an organized workflow through clear branches and commits.',
  }},
]

export function getStack(lang: Lang): StackItem[] {
  return STACK_RAW.map(item => ({ ...item, desc: item.desc[lang] }))
}
