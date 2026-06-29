import claude from '../../assets/stack/claude.png'
import claudeDesign from '../../assets/stack/claude-design.png'
import css from '../../assets/stack/css.png'
import docker from '../../assets/stack/docker.png'
import githubCopilot from '../../assets/stack/github-copilot.png'
import html from '../../assets/stack/html.png'
import java from '../../assets/stack/java.png'
import javascript from '../../assets/stack/javascript.png'
import mysql from '../../assets/stack/mysql.png'
import opencode from '../../assets/stack/opencode.png'
import openspec from '../../assets/stack/openspec.png'
import react from '../../assets/stack/react.png'
import spring from '../../assets/stack/spring.png'
import springModulith from '../../assets/stack/spring-modulith.png'
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

]

export function getStack(lang: Lang): StackItem[] {
  return STACK_RAW.map(item => ({ ...item, desc: item.desc[lang] }))
}
