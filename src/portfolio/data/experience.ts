import type { Lang } from '../i18n/translations'

export type ExperienceItem = {
  title: string
  company: string
  period: string
  location: string
  desc: string
}

type ExperienceItemRaw = {
  title: Record<Lang, string>
  company: string
  period: Record<Lang, string>
  location: string
  desc: Record<Lang, string>
}

const EXPERIENCE_RAW: ExperienceItemRaw[] = [
  {
    title: {
      es: 'Junior AI Engineer · AI & Data',
      en: 'Junior AI Engineer · AI & Data',
    },
    company: 'Tuio',
    period: {
      es: 'jun. 2026 - Actualidad',
      en: 'Jun. 2026 - Present',
    },
    location: 'Madrid, España',
    desc: {
      es: 'Junior AI Engineer en el equipo de IA & Data. Desarrollo de soluciones con Python, LiteLLM, LangChain, LangGraph, Temporal.io, Claude Code/OpenCode y Spec-Driven Development.\n\n- Diseñar e implementar soluciones basadas en modelos de Machine Learning e IA generativa para optimizar procesos clave del negocio\n- Colaborar estrechamente con los equipos de producto, growth, IA y Data Science para entender necesidades y aportar soluciones técnicas\n- Diseñar, desarrollar y mantener APIs, MCPs y herramientas (tools) consumibles por agentes inteligentes y otros sistemas\n- Automatizar procesos internos mediante modelos predictivos y generación de contenido basada en IA\n- Documentar y testear el código para garantizar calidad, trazabilidad y mantenibilidad\n- Explorar nuevas herramientas y tecnologías emergentes, aplicando la innovación de forma pragmática',
      en: 'Junior AI Engineer on the AI & Data team. Building solutions with Python, LiteLLM, LangChain, LangGraph, Temporal.io, Claude Code/OpenCode and Spec-Driven Development.\n\n- Design and implement solutions based on Machine Learning and generative AI models to optimize key business processes\n- Work closely with the product, growth, AI and Data Science teams to understand needs and deliver technical solutions\n- Design, develop and maintain APIs, MCPs and tools consumable by intelligent agents and other systems\n- Automate internal processes through predictive models and AI-based content generation\n- Document and test code to ensure quality, traceability and maintainability\n- Explore new emerging tools and technologies, applying innovation pragmatically',
    },
  },
  {
    title: {
      es: 'Desarrollador Fullstack',
      en: 'Fullstack Developer',
    },
    company: 'SEIDOR',
    period: {
      es: 'sept. 2025 - jun. 2026',
      en: 'Sep. 2025 - Jun. 2026',
    },
    location: 'Madrid, España',
    desc: {
      es: 'Desarrollador Full Stack en Adobe Experience Manager (AEM).\n\n- Desarrollo de componentes reutilizables y configurables en AEM\n- Creación de modales para componentes utilizando Java\n- Gestión y publicación de contenido multimedia mediante AEM Assets (DAM)\n- Resolución de incidencias backend y optimización de funcionalidades existentes\n- Elaboración de documentación técnica para soporte y mantenimiento de proyectos',
      en: 'Full Stack Developer on Adobe Experience Manager (AEM).\n\n- Development of reusable and configurable components in AEM\n- Creation of modals for components using Java\n- Management and publication of multimedia content via AEM Assets (DAM)\n- Resolution of backend incidents and optimization of existing functionalities\n- Preparation of technical documentation for project support and maintenance',
    },
  },
]

export function getExperience(lang: Lang): ExperienceItem[] {
  return EXPERIENCE_RAW.map(item => ({
    title: item.title[lang],
    company: item.company,
    period: item.period[lang],
    location: item.location,
    desc: item.desc[lang],
  }))
}
