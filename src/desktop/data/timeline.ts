export type TimelineItem = {
  title: string
  where: string
  when: string
  desc: string
}

export const EXPERIENCE: TimelineItem[] = [
  {
    title: 'Fullstack Developer',
    where: 'SEIDOR',
    when: 'Septiembre 2025 – Actualidad · Madrid',
    desc: 'Desarrollo de componentes reutilizables y configurables en Adobe Experience Manager (AEM), lógica de backend modal en Java y gestión de contenido multimedia vía AEM Assets (DAM). Resolución de incidencias, optimización de funcionalidades y documentación técnica para soporte y mantenimiento.',
  },
]

export const EDUCATION: TimelineItem[] = [
  {
    title: 'FP Superior — Desarrollo de Aplicaciones Multiplataforma',
    where: 'CESUR',
    when: 'Septiembre 2024 – Junio 2026 · Madrid',
    desc: 'Java, Spring Boot, Kotlin, Python, HTML, CSS, Maven y Gradle. Desarrollo backend y frontend, APIs REST, gestión de dependencias y buenas prácticas de programación.',
  },
  {
    title: 'Bootcamp — Fundación Telefónica',
    where: '42 Madrid',
    when: 'Julio 2025 – Agosto 2025 · Madrid',
    desc: 'Bootcamp intensivo en C, Linux y shell scripting. Metodología de aprendizaje peer-to-peer con revisión entre estudiantes y validación colaborativa.',
  },
  {
    title: 'Formación en Diseño Gráfico',
    where: 'Instituto San Ignacio de Loyola',
    when: '2021 – 2022 · Lima, Perú',
    desc: 'Comunicación visual y herramientas de diseño: Adobe Illustrator, Photoshop e InDesign. Aporta una sensibilidad de diseño que informa mis decisiones de UI en frontend.',
  },
]
