import booqui01 from '../assets/projects/booqui/booqui-01.png'
import booqui02 from '../assets/projects/booqui/booqui-02.png'
import booqui03 from '../assets/projects/booqui/booqui-03.png'
import booqui04 from '../assets/projects/booqui/booqui-04.png'
import booqui05 from '../assets/projects/booqui/booqui-05.png'
import booqui06 from '../assets/projects/booqui/booqui-06.png'
import inventario01 from '../assets/projects/inventario/inventario-01.png'
import inventario02 from '../assets/projects/inventario/inventario-02.png'
import inventario03 from '../assets/projects/inventario/inventario-03.png'

export type ProjectPoint = { title: string; body: string }

export type Project = {
  id: string
  num: string
  title: string
  role: string
  icon: string // single letter for the tile
  iconClass: string
  images: string[]
  summary: string
  points: ProjectPoint[]
  badges: string[]
  repo: string
}

export const PROJECTS: Project[] = [
  {
    id: 'booqi',
    num: '01',
    title: 'Booqi — Gestión de Reservas de Eventos',
    role: 'Proyecto en equipo · Ownership de todo el backend',
    icon: 'B',
    iconClass: 'pi0',
    images: [booqui01, booqui02, booqui03, booqui04, booqui05, booqui06],
    summary:
      'Booqi es un proyecto que desarrollé en equipo, participando de forma integral desde el diseño de la base de datos hasta el despliegue con Docker. Implementé cuatro microservicios independientes en Java con Spring Boot —usuarios, eventos, reservas y pagos— cada uno con su propia base de datos MySQL y API REST documentada con Swagger/OpenAPI. Diseñé la comunicación entre servicios para validar usuarios, eventos y reservas en tiempo real, y orquesté todo con Docker Compose usando una red interna común, variables de entorno y healthchecks.',
    points: [
      { title: 'Compra centralizada de entradas', body: 'Todo el catálogo de eventos está en una sola plataforma donde el usuario puede explorar, filtrar y comprar desde cualquier lugar, sin ir físicamente a taquillas.' },
      { title: 'Gestión del proceso de reserva de principio a fin', body: 'Selección de evento, carrito, pago y confirmación ocurren dentro del mismo sistema sin redirigir al usuario a servicios externos desconectados.' },
      { title: 'Entrega inmediata y digital de tickets', body: 'El sistema genera automáticamente un ticket en PDF con los datos de la reserva, listo para descargar al instante.' },
      { title: 'Control de disponibilidad en tiempo real', body: 'Valida la disponibilidad antes de confirmar cada reserva, garantizando que no se vendan más entradas de las que el evento soporta.' },
      { title: 'Panel de administración para organizadores', body: 'Los organizadores crean, gestionan y monitorean sus eventos con visibilidad de reservas, pagos y estadísticas desde un panel dedicado.' },
    ],
    badges: ['Java', 'Spring Boot', 'SpringDoc', 'Maven', 'MySQL', 'React', 'Bootstrap', 'TypeScript', 'Docker'],
    repo: 'https://github.com/RenzoRamosDEV/Booqui-Sistema-Gestion-Reservas-Eventos',
  },
  {
    id: 'inventario',
    num: '02',
    title: 'Sistema de Gestión de Inventario',
    role: 'Desarrollador único · Full-stack end-to-end',
    icon: 'I',
    iconClass: 'pi1',
    images: [inventario01, inventario02, inventario03],
    summary:
      'Inventario es una aplicación full-stack que desarrollé de forma integral, desde el diseño de la base de datos hasta el frontend. Construí el backend en Java 17 con Spring Boot, con arquitectura en capas, mapeo de DTOs con MapStruct y una API REST documentada con Swagger/OpenAPI. Implementé validaciones de negocio, manejo centralizado de excepciones, paginación, filtros de búsqueda y monitoreo con Spring Boot Actuator. El frontend es una SPA en React + TypeScript con dashboard en tiempo real y componentes reutilizables, manteniendo tipado estricto en toda la comunicación con la API.',
    points: [
      { title: 'Gestión centralizada del inventario', body: 'Elimina hojas de cálculo o sistemas dispersos. Todos los productos en una sola plataforma accesible desde cualquier dispositivo.' },
      { title: 'Control total del ciclo de vida de un producto', body: 'Crear, editar, eliminar y restaurar productos dentro del mismo sistema, con eliminación lógica que permite recuperar registros sin pérdida permanente.' },
      { title: 'Gestión de stock en tiempo real', body: 'Aumenta o reduce el stock de cualquier producto de forma inmediata desde la misma tabla, sin entrar a formularios separados.' },
      { title: 'Visibilidad instantánea del estado del inventario', body: 'El dashboard muestra en tiempo real el valor total del stock, productos con stock bajo, agotados y los más costosos.' },
      { title: 'Filtrado y búsqueda para cualquier escala', body: 'Filtra por nombre, estado de stock y productos activos o eliminados, con paginación automática que mantiene la interfaz ágil.' },
    ],
    badges: ['Java 17', 'Spring Boot', 'SpringDoc', 'MapStruct', 'Maven', 'MySQL', 'React', 'TypeScript', 'TailwindCSS'],
    repo: 'https://github.com/RenzoRamosDEV/Gestion-De-Inventario',
  },
]

export const getProject = (id: string) => PROJECTS.find(p => p.id === id)
