import type { Lang } from '../i18n/translations'

export type EducationItem = {
  title: string
  company: string
  period: string
  location: string
  desc: string
}

type EducationItemRaw = {
  title: Record<Lang, string>
  company: string
  period: Record<Lang, string>
  location: string
  desc: Record<Lang, string>
}

const EDUCATION_RAW: EducationItemRaw[] = [
  {
    title: {
      es: 'Formación Profesional de Grado Superior',
      en: 'Higher Vocational Training',
    },
    company: 'CESUR',
    period: {
      es: 'sept. 2024 - jun. 2026',
      en: 'Sep. 2024 - Jun. 2026',
    },
    location: 'Madrid, España',
    desc: {
      es: 'Formación orientada al desarrollo de software utilizando tecnologías como Java, Spring Boot, Kotlin, Python, HTML, CSS, Maven y Gradle.\n\n- Desarrollo de aplicaciones backend y frontend\n- Implementación de APIs y servicios con Spring Boot\n- Gestión de dependencias y construcción de proyectos con Maven\n- Creación de interfaces web y aplicaciones multiplataforma\n- Aplicación de buenas prácticas de programación y estructura de proyectos',
      en: 'Training focused on software development using technologies such as Java, Spring Boot, Kotlin, Python, HTML, CSS, Maven, and Gradle.\n\n- Development of backend and frontend applications\n- Implementation of APIs and services with Spring Boot\n- Dependency management and project building with Maven\n- Creation of web interfaces and cross-platform applications\n- Application of good programming practices and project structure',
    },
  },
  {
    title: {
      es: 'Bootcamp 42 Madrid Fundacion Telefonica',
      en: 'Bootcamp 42 Madrid Fundacion Telefonica',
    },
    company: '42 MADRID',
    period: {
      es: 'jul. 2025 - ago. 2025',
      en: 'Jul. 2025 - Aug. 2025',
    },
    location: 'Madrid, España',
    desc: {
      es: 'Formación intensiva basada en aprendizaje autónomo y colaborativo, centrada en C, Linux y scripting en Shell.\n\n- Desarrollo de programas en C, enfocados en eficiencia y control de memoria\n- Trabajo en entorno Linux, uso de terminal y automatización con Shell scripting\n- Resolución de problemas algorítmicos y optimización de soluciones\n- Metodología de aprendizaje peer-to-peer, con revisión y validación entre estudiantes\n- Fortalecimiento de habilidades de lógica, debugging y trabajo colaborativo',
      en: 'Intensive training based on autonomous and collaborative learning, focused on C, Linux, and Shell scripting.\n\n- Development of C programs focused on efficiency and memory management\n- Work in a Linux environment, terminal usage, and Shell scripting automation\n- Resolution of algorithmic problems and solution optimization\n- Peer-to-peer learning methodology with review and validation among students\n- Strengthening of logic, debugging, and collaborative work skills',
    },
  },
  {
    title: {
      es: 'Formación en Diseño Gráfico',
      en: 'Graphic Design Training',
    },
    company: 'INSTITUTO SAN IGNACIO DE LOYOLA',
    period: {
      es: '2021 - 2022',
      en: '2021 - 2022',
    },
    location: 'Lima, Perú',
    desc: {
      es: 'Formación enfocada en herramientas de diseño y fundamentos visuales aplicados a entornos digitales, utilizando Adobe Illustrator, Photoshop e InDesign.\n\n- Diseño de recursos gráficos con Illustrator\n- Edición y optimización de imágenes con Photoshop\n- Maquetación de documentos y piezas visuales con InDesign\n- Creación de elementos gráficos reutilizables\n- Aplicación de principios básicos de composición, tipografía y color',
      en: 'Training focused on design tools and visual fundamentals applied to digital environments, using Adobe Illustrator, Photoshop, and InDesign.\n\n- Graphic resource design with Illustrator\n- Image editing and optimization with Photoshop\n- Document layout and visual pieces with InDesign\n- Creation of reusable graphic elements\n- Application of basic principles of composition, typography, and color',
    },
  },
]

export function getEducation(lang: Lang): EducationItem[] {
  return EDUCATION_RAW.map(item => ({
    title: item.title[lang],
    company: item.company,
    period: item.period[lang],
    location: item.location,
    desc: item.desc[lang],
  }))
}
