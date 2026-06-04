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
      es: 'Desarrollador Fullstack',
      en: 'Fullstack Developer',
    },
    company: 'SEIDOR',
    period: {
      es: 'sept. 2025 - Actualidad',
      en: 'Sep. 2025 - Present',
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
