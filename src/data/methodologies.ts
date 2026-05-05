export type MethodologyItem = {
  kind: 'methodology'
  cat: 'arch' | 'testing' | 'process' | 'ui'
  name: string
  label: string
  desc: string
}

export const METHODOLOGIES: MethodologyItem[] = [
  { kind: 'methodology', cat: 'arch', name: 'SOLID Principles', label: 'SLD', desc: 'Los aplico para escribir código mantenible, desacoplado y fácil de testear.' },
  { kind: 'methodology', cat: 'arch', name: 'Clean Architecture', label: 'CA', desc: 'La utilizo para separar la lógica de negocio de los detalles técnicos y frameworks.' },
  { kind: 'methodology', cat: 'testing', name: 'Mockito', label: 'M', desc: 'Lo uso para crear simulaciones precisas y aislar el comportamiento de mis unidades de código.' },
  { kind: 'methodology', cat: 'testing', name: 'TDD', label: 'TDD', desc: 'Mi enfoque para guiar el diseño del software mediante pruebas antes de escribir la solución.' },
  { kind: 'methodology', cat: 'testing', name: 'Integration Testing', label: 'IT', desc: 'Los realizo para validar que todos los módulos y servicios funcionen juntos sin errores.' },
  { kind: 'methodology', cat: 'testing', name: 'Testcontainers', label: 'TC', desc: 'Los empleo para ejecutar pruebas con bases de datos reales en entornos controlados y aislados.' },
  { kind: 'methodology', cat: 'process', name: 'Git Flow / Trunk-Based', label: 'GIT', desc: 'Estrategias que domino para gestionar versiones y asegurar despliegues continuos sin fricción.' },
  { kind: 'methodology', cat: 'process', name: 'Agile (Scrum/Kanban)', label: 'AG', desc: 'Mi metodología para entregar valor constante mediante iteraciones y mejora continua.' },
  { kind: 'methodology', cat: 'process', name: 'Spec-Driven Development', label: 'SDD', desc: 'Lo sigo para definir contratos técnicos claros antes de iniciar cualquier fase de desarrollo.' },
  { kind: 'methodology', cat: 'process', name: 'Prompt Engineering', label: 'PE', desc: 'Lo aplico para optimizar la interacción con IAs y maximizar la calidad de los resultados.' },
  { kind: 'methodology', cat: 'process', name: 'Agentic Workflows', label: 'AW', desc: 'Los implemento para automatizar flujos de desarrollo y debugging mediante agentes inteligentes.' },
  { kind: 'methodology', cat: 'ui', name: 'Component-Based UI', label: 'CUI', desc: 'Mi enfoque para construir interfaces modulares, escalables y fáciles de reutilizar.' },
  { kind: 'methodology', cat: 'ui', name: 'Responsive Design', label: 'RUI', desc: 'Lo garantizo para que cada interfaz se adapte perfectamente a cualquier dispositivo o resolución.' },
  { kind: 'methodology', cat: 'ui', name: 'AI-Assisted', label: 'AA', desc: 'Integro copilotos avanzados para acelerar mi flujo de trabajo y la calidad de mi código final.' },
]
