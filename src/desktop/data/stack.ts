import claude from '../../assets/stack/claude.png'
import claudeDesign from '../../assets/stack/claude-design.png'
import css from '../../assets/stack/css.png'
import docker from '../../assets/stack/docker.png'
import git from '../../assets/stack/git.png'
import githubCopilot from '../../assets/stack/github-copilot.png'
import gradle from '../../assets/stack/gradle.png'
import html from '../../assets/stack/html.png'
import java from '../../assets/stack/java.png'
import javascript from '../../assets/stack/javascript.png'
import junit from '../../assets/stack/junit.png'
import kotlin from '../../assets/stack/kotlin.png'
import maven from '../../assets/stack/maven.png'
import mysql from '../../assets/stack/mysql.png'
import opencode from '../../assets/stack/opencode.png'
import openspec from '../../assets/stack/openspec.png'
import react from '../../assets/stack/react.png'
import spring from '../../assets/stack/spring.png'
import springModulith from '../../assets/stack/spring-modulith.png'

export type StackCat = 'back' | 'front' | 'ia' | 'tools'

export type StackItem = {
  cat: StackCat
  name: string
  icon: string
  desc: string
}

export const STACK_GROUPS: { cat: StackCat; label: string }[] = [
  { cat: 'back', label: 'Backend' },
  { cat: 'front', label: 'Frontend' },
  { cat: 'ia', label: 'Inteligencia Artificial' },
  { cat: 'tools', label: 'Build & Control de versiones' },
]

export const STACK: StackItem[] = [
  { cat: 'back', name: 'Java', icon: java, desc: 'Mi lenguaje base para construir aplicaciones empresariales robustas, aplicando principios SOLID y patrones de diseño para garantizar la escalabilidad.' },
  { cat: 'back', name: 'Kotlin', icon: kotlin, desc: 'Lo utilizo para el desarrollo de servicios modernos, aprovechando su sintaxis concisa para implementar arquitecturas limpias y código altamente legible.' },
  { cat: 'back', name: 'Spring Boot', icon: spring, desc: 'Lo empleo para la creación rápida de APIs REST seguras y servicios autocontenidos, gestionando de forma eficiente la inyección de dependencias.' },
  { cat: 'back', name: 'Spring Modulith', icon: springModulith, desc: 'Lo aplico para estructurar aplicaciones monolíticas mediante módulos lógicos bien definidos, facilitando una futura evolución hacia microservicios.' },
  { cat: 'back', name: 'MySQL', icon: mysql, desc: 'Lo he usado para el diseño de bases de datos relacionales, optimizando consultas complejas y asegurando la integridad referencial de los datos.' },
  { cat: 'back', name: 'Docker', icon: docker, desc: 'Lo integro en mi flujo de trabajo para crear entornos replicables, garantizando que el despliegue sea consistente en cualquier infraestructura.' },

  { cat: 'front', name: 'HTML', icon: html, desc: 'Lo aplico para construir la estructura semántica de la web, priorizando siempre la accesibilidad y el SEO desde la base.' },
  { cat: 'front', name: 'CSS', icon: css, desc: 'Lo utilizo para dar estilo y vida a las interfaces, creando diseños adaptables (responsive) y animaciones que mejoran la experiencia de usuario.' },
  { cat: 'front', name: 'JavaScript', icon: javascript, desc: 'Lo empleo para añadir interactividad compleja y lógica de negocio en el navegador, conectando de forma fluida el front con el back.' },
  { cat: 'front', name: 'React', icon: react, desc: 'Mi librería principal para desarrollar interfaces de usuario dinámicas, basadas en componentes reutilizables y una gestión de estado eficiente.' },

  { cat: 'ia', name: 'Claude Code', icon: claude, desc: 'Lo utilizo como compañero de programación para realizar refactorizaciones profundas y optimizar la lógica de algoritmos complejos.' },
  { cat: 'ia', name: 'Copilot CLI', icon: githubCopilot, desc: 'Lo integro en mi terminal para agilizar la escritura de comandos complejos y recibir sugerencias de código contextuales en tiempo real.' },
  { cat: 'ia', name: 'Claude Design', icon: claudeDesign, desc: 'Lo uso para conceptualizar y prototipar interfaces de usuario, ayudándome a definir layouts modernos de forma más rápida.' },
  { cat: 'ia', name: 'OpenCode', icon: opencode, desc: 'Lo aplico para acelerar los ciclos de desarrollo y facilitar las tareas de debugging mediante asistencia inteligente.' },
  { cat: 'ia', name: 'OpenSpec', icon: openspec, desc: 'Lo empleo para la definición y diseño de especificaciones de software, asegurando que los requisitos técnicos estén bien documentados desde el inicio.' },

  { cat: 'tools', name: 'JUnit', icon: junit, desc: 'Lo utilizo para blindar la calidad del código mediante pruebas automatizadas, asegurando que cada funcionalidad responda correctamente ante fallos.' },
  { cat: 'tools', name: 'Maven', icon: maven, desc: 'Lo uso para la gestión estructurada de dependencias y la automatización del ciclo de vida de construcción en proyectos Java/Kotlin.' },
  { cat: 'tools', name: 'Gradle', icon: gradle, desc: 'Lo prefiero en proyectos que requieren una configuración de build más flexible y rápida, optimizando los tiempos de compilación.' },
  { cat: 'tools', name: 'Git', icon: git, desc: 'Lo domino para el control de versiones detallado y la colaboración en equipo, manteniendo un flujo de trabajo organizado mediante ramas y commits claros.' },
]
