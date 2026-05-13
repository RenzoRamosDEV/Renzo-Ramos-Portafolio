import booqui01 from '../assets/projects/booqui/booqui-01.png'
import booqui02 from '../assets/projects/booqui/booqui-02.png'
import booqui03 from '../assets/projects/booqui/booqui-03.png'
import booqui04 from '../assets/projects/booqui/booqui-04.png'
import booqui05 from '../assets/projects/booqui/booqui-05.png'
import booqui06 from '../assets/projects/booqui/booqui-06.png'
import inventario01 from '../assets/projects/inventario/inventario-01.png'
import inventario02 from '../assets/projects/inventario/inventario-02.png'
import inventario03 from '../assets/projects/inventario/inventario-03.png'
import type { Lang } from '../i18n/translations'

type I18nText = Record<Lang, string>

type ProjectRaw = {
  num: string
  title: I18nText
  images: string[]
  summary: I18nText
  desc: I18nText
  points: { title: I18nText; body: I18nText }[]
  badges: string[]
  demo: string
  repo: string
}

export type Project = {
  num: string
  title: string
  images: string[]
  summary: string
  desc: string
  points: { title: string; body: string }[]
  badges: string[]
  demo: string
  repo: string
}

const PROJECTS_RAW: ProjectRaw[] = [
  {
    num: '01',
    title: {
      es: 'Booqi - Sistema de Gestión de Reservas de Eventos',
      en: 'Booqi - Event Booking Management System',
    },
    images: [booqui01, booqui02, booqui03, booqui04, booqui05, booqui06],
    summary: {
      es: 'Booqi es un proyecto que desarrollé en equipo, participando de forma integral desde el diseño de la arquitectura hasta el despliegue. Colaboré en la definición de los distintos módulos del sistema, la comunicación entre ellos y la validación de datos en tiempo real para asegurar un flujo coherente de usuarios, eventos, reservas y pagos.',
      en: 'Booqi is a team project I developed end-to-end, from architecture design to deployment. I collaborated on defining system modules, inter-service communication, and real-time data validation to ensure a consistent flow across users, events, bookings, and payments.',
    },
    desc: {
      es: 'Booqi es un proyecto que desarrollé en equipo, participando de forma integral, desde el diseño de la base de datos hasta el despliegue con Docker. Implementé cuatro microservicios independientes en Java con Spring Boot —usuarios, eventos, reservas y pagos— cada uno con su propia base de datos MySQL y API REST documentada con Swagger/OpenAPI. Diseñé la comunicación entre servicios para validar usuarios, eventos y reservas en tiempo real, y orquesté todo con Docker Compose, usando una red interna común, variables de entorno y healthchecks.',
      en: 'Booqi is a team project I developed end-to-end, from database design to Docker deployment. I implemented four independent microservices in Java with Spring Boot —users, events, bookings, and payments— each with its own MySQL database and REST API documented with Swagger/OpenAPI. I designed inter-service communication to validate users, events, and bookings in real time, and orchestrated everything with Docker Compose using a shared internal network, environment variables, and healthchecks.',
    },
    points: [
      {
        title: { es: 'Compra centralizada de entradas', en: 'Centralized ticket purchasing' },
        body: {
          es: 'Elimina la necesidad de ir físicamente a taquillas. Todo el catálogo de eventos está en una sola plataforma donde el usuario puede explorar, filtrar y comprar desde cualquier lugar.',
          en: 'Eliminates the need to go to physical ticket offices. The entire event catalog is on a single platform where users can browse, filter, and purchase from anywhere.',
        },
      },
      {
        title: { es: 'Gestión del proceso de reserva de principio a fin', en: 'End-to-end booking process management' },
        body: {
          es: 'Selección de evento, carrito, pago y confirmación ocurren dentro del mismo sistema sin redirigir al usuario a servicios externos desconectados.',
          en: 'Event selection, cart, payment, and confirmation all happen within the same system without redirecting users to disconnected external services.',
        },
      },
      {
        title: { es: 'Entrega inmediata y digital de tickets', en: 'Instant digital ticket delivery' },
        body: {
          es: 'El sistema genera automáticamente un ticket en PDF con los datos de la reserva, listo para descargar al instante.',
          en: 'The system automatically generates a PDF ticket with booking details, ready for instant download.',
        },
      },
      {
        title: { es: 'Control de disponibilidad en tiempo real', en: 'Real-time availability control' },
        body: {
          es: 'Valida la disponibilidad antes de confirmar cada reserva, garantizando que no se vendan más entradas de las que el evento soporta.',
          en: 'Validates availability before confirming each booking, ensuring no more tickets are sold than the event supports.',
        },
      },
      {
        title: { es: 'Panel de administración para organizadores', en: 'Admin panel for organizers' },
        body: {
          es: 'Los organizadores pueden crear, gestionar y monitorear sus eventos con visibilidad de reservas, pagos y estadísticas desde un panel dedicado.',
          en: 'Organizers can create, manage, and monitor their events with visibility of bookings, payments, and statistics from a dedicated panel.',
        },
      },
    ],
    badges: ['Java', 'Spring Boot', 'SpringDoc', 'Maven', 'MySQL', 'React', 'Boostrap', 'TypeScript', 'Docker', 'Otros...'],
    demo: '#',
    repo: 'https://github.com/RenzoRamosDEV/Booqui-Sistema-Gestion-Reservas-Eventos',
  },
  {
    num: '02',
    title: {
      es: 'Sistema de Gestión de Inventario de Productos',
      en: 'Product Inventory Management System',
    },
    images: [inventario01, inventario02, inventario03],
    summary: {
      es: 'Inventario es una aplicación full-stack que desarrollé de forma integral, desde el diseño de la base de datos hasta el frontend. Construí la lógica de negocio, el sistema de validaciones, la gestión de errores, los filtros de búsqueda y la visualización en tiempo real, poniendo el foco en una estructura mantenible, una experiencia fluida y una integración consistente entre todas las partes del sistema.',
      en: 'Inventory is a full-stack application I developed end-to-end, from database design to the frontend. I built the business logic, validation system, error handling, search filters, and real-time visualization, focusing on a maintainable structure, fluid experience, and consistent integration across all system parts.',
    },
    desc: {
      es: 'Inventario es una aplicación full-stack que desarrollé de forma integral, desde el diseño de la base de datos hasta el frontend. Construí el backend en Java 17 con Spring Boot, con una arquitectura en capas, mapeo de DTOs con MapStruct y una API REST documentada con Swagger/OpenAPI. Implementé validaciones de negocio, manejo centralizado de excepciones, paginación, filtros de búsqueda y monitoreo con Spring Boot Actuator. Para el frontend con Claude Design desarrollé una SPA en React + TypeScript con dashboard en tiempo real y componentes reutilizables, manteniendo tipado estricto en toda la comunicación con la API.',
      en: 'Inventory is a full-stack application I developed end-to-end, from database design to the frontend. I built the backend in Java 17 with Spring Boot, with a layered architecture, DTO mapping with MapStruct, and a REST API documented with Swagger/OpenAPI. I implemented business validations, centralized exception handling, pagination, search filters, and monitoring with Spring Boot Actuator. For the frontend with Claude Design, I developed a React + TypeScript SPA with real-time dashboard and reusable components, maintaining strict typing throughout all API communication.',
    },
    points: [
      {
        title: { es: 'Gestión centralizada del inventario', en: 'Centralized inventory management' },
        body: {
          es: 'Elimina el uso de hojas de cálculo o sistemas dispersos. Todos los productos están en una sola plataforma accesible desde cualquier dispositivo.',
          en: 'Eliminates the use of spreadsheets or scattered systems. All products are on a single platform accessible from any device.',
        },
      },
      {
        title: { es: 'Control total del ciclo de vida de un producto', en: 'Full product lifecycle control' },
        body: {
          es: 'Crear, editar, eliminar y restaurar productos ocurren dentro del mismo sistema, con eliminación lógica que permite recuperar registros sin pérdida permanente.',
          en: 'Creating, editing, deleting, and restoring products all happen within the same system, with soft deletion that allows record recovery without permanent loss.',
        },
      },
      {
        title: { es: 'Gestión de stock en tiempo real', en: 'Real-time stock management' },
        body: {
          es: 'El usuario puede aumentar o reducir el stock de cualquier producto de forma inmediata desde la misma tabla, sin entrar a formularios separados.',
          en: 'Users can increase or reduce stock for any product immediately from the same table, without navigating to separate forms.',
        },
      },
      {
        title: { es: 'Visibilidad instantánea del estado del inventario', en: 'Instant inventory status visibility' },
        body: {
          es: 'El dashboard muestra en tiempo real el valor total del stock, productos con stock bajo, agotados y los más costosos, todo en un solo vistazo.',
          en: 'The dashboard shows in real time the total stock value, low-stock products, out-of-stock items, and most expensive products, all at a glance.',
        },
      },
      {
        title: { es: 'Filtrado y búsqueda para cualquier escala', en: 'Filtering and search for any scale' },
        body: {
          es: 'Filtra por nombre, estado de stock y productos activos o eliminados, con paginación automática que mantiene la interfaz ágil sin importar la cantidad de registros.',
          en: 'Filter by name, stock status, and active or deleted products, with automatic pagination that keeps the interface responsive regardless of the number of records.',
        },
      },
    ],
    badges: ['Java', 'Spring Boot', 'SpringDoc', 'Maven', 'MySQL', 'React', 'TypeScript', 'TailwindCSS', 'Claude Design', 'Otros...'],
    demo: '#',
    repo: 'https://github.com/RenzoRamosDEV/Gestion-De-Inventario',
  },
]

export function getProjects(lang: Lang): Project[] {
  return PROJECTS_RAW.map(p => ({
    num: p.num,
    title: p.title[lang],
    images: p.images,
    summary: p.summary[lang],
    desc: p.desc[lang],
    points: p.points.map(pt => ({ title: pt.title[lang], body: pt.body[lang] })),
    badges: p.badges,
    demo: p.demo,
    repo: p.repo,
  }))
}
