import type { Lang } from '../i18n/translations'

export type MethodologyItem = {
  kind: 'methodology'
  cat: 'arch' | 'testing' | 'process' | 'ui'
  name: string
  label: string
  desc: string
}

type MethodologyItemRaw = Omit<MethodologyItem, 'desc'> & { desc: Record<Lang, string> }

const METHODOLOGIES_RAW: MethodologyItemRaw[] = [
  { kind: 'methodology', cat: 'arch', name: 'SOLID Principles', label: 'SLD', desc: {
    es: 'Los aplico para escribir código mantenible, desacoplado y fácil de testear.',
    en: 'I apply them to write maintainable, decoupled, and easily testable code.',
  }},
  { kind: 'methodology', cat: 'arch', name: 'Clean Architecture', label: 'CA', desc: {
    es: 'La utilizo para separar la lógica de negocio de los detalles técnicos y frameworks.',
    en: 'I use it to separate business logic from technical details and frameworks.',
  }},
  { kind: 'methodology', cat: 'testing', name: 'Mockito', label: 'M', desc: {
    es: 'Lo uso para crear simulaciones precisas y aislar el comportamiento de mis unidades de código.',
    en: 'I use it to create precise mocks and isolate the behavior of my code units.',
  }},
  { kind: 'methodology', cat: 'testing', name: 'TDD', label: 'TDD', desc: {
    es: 'Mi enfoque para guiar el diseño del software mediante pruebas antes de escribir la solución.',
    en: 'My approach for guiding software design through tests before writing the solution.',
  }},
  { kind: 'methodology', cat: 'testing', name: 'Integration Testing', label: 'IT', desc: {
    es: 'Los realizo para validar que todos los módulos y servicios funcionen juntos sin errores.',
    en: 'I perform them to validate that all modules and services work together without errors.',
  }},
  { kind: 'methodology', cat: 'testing', name: 'Testcontainers', label: 'TC', desc: {
    es: 'Los empleo para ejecutar pruebas con bases de datos reales en entornos controlados y aislados.',
    en: 'I use them to run tests with real databases in controlled and isolated environments.',
  }},
  { kind: 'methodology', cat: 'process', name: 'Git Flow / Trunk-Based', label: 'GIT', desc: {
    es: 'Estrategias que domino para gestionar versiones y asegurar despliegues continuos sin fricción.',
    en: 'Strategies I master to manage versions and ensure frictionless continuous deployments.',
  }},
  { kind: 'methodology', cat: 'process', name: 'Agile (Scrum/Kanban)', label: 'AG', desc: {
    es: 'Mi metodología para entregar valor constante mediante iteraciones y mejora continua.',
    en: 'My methodology for delivering constant value through iterations and continuous improvement.',
  }},
  { kind: 'methodology', cat: 'process', name: 'Spec-Driven Development', label: 'SDD', desc: {
    es: 'Lo sigo para definir contratos técnicos claros antes de iniciar cualquier fase de desarrollo.',
    en: 'I follow it to define clear technical contracts before starting any development phase.',
  }},
  { kind: 'methodology', cat: 'process', name: 'Prompt Engineering', label: 'PE', desc: {
    es: 'Lo aplico para optimizar la interacción con IAs y maximizar la calidad de los resultados.',
    en: 'I apply it to optimize interaction with AIs and maximize the quality of results.',
  }},
  { kind: 'methodology', cat: 'process', name: 'Agentic Workflows', label: 'AW', desc: {
    es: 'Los implemento para automatizar flujos de desarrollo y debugging mediante agentes inteligentes.',
    en: 'I implement them to automate development and debugging flows through intelligent agents.',
  }},
  { kind: 'methodology', cat: 'ui', name: 'Component-Based UI', label: 'CUI', desc: {
    es: 'Mi enfoque para construir interfaces modulares, escalables y fáciles de reutilizar.',
    en: 'My approach for building modular, scalable, and easily reusable interfaces.',
  }},
  { kind: 'methodology', cat: 'ui', name: 'Responsive Design', label: 'RUI', desc: {
    es: 'Lo garantizo para que cada interfaz se adapte perfectamente a cualquier dispositivo o resolución.',
    en: 'I ensure it so every interface adapts perfectly to any device or resolution.',
  }},
  { kind: 'methodology', cat: 'ui', name: 'AI-Assisted', label: 'AA', desc: {
    es: 'Integro copilotos avanzados para acelerar mi flujo de trabajo y la calidad de mi código final.',
    en: 'I integrate advanced copilots to accelerate my workflow and the quality of my final code.',
  }},
]

export function getMethodologies(lang: Lang): MethodologyItem[] {
  return METHODOLOGIES_RAW.map(item => ({ ...item, desc: item.desc[lang] }))
}
