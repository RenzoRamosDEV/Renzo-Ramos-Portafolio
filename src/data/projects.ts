import booqui01 from '../assets/projects/booqui/booqui-01.png'
import booqui02 from '../assets/projects/booqui/booqui-02.png'
import booqui03 from '../assets/projects/booqui/booqui-03.png'
import booqui04 from '../assets/projects/booqui/booqui-04.png'
import booqui05 from '../assets/projects/booqui/booqui-05.png'
import booqui06 from '../assets/projects/booqui/booqui-06.png'
import inventario01 from '../assets/projects/inventario/inventario-01.png'
import inventario02 from '../assets/projects/inventario/inventario-02.png'
import inventario03 from '../assets/projects/inventario/inventario-03.png'

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

export const PROJECTS: Project[] = [
  {
    num: '01',
    title: 'Booqi - Sistema de Gestión de Reservas de Eventos',
    images: [booqui01, booqui02, booqui03, booqui04, booqui05, booqui06],
    summary: 'Booqi es un proyecto que desarrollé en equipo, participando de forma integral desde el diseño de la arquitectura hasta el despliegue. Colaboré en la definición de los distintos módulos del sistema, la comunicación entre ellos y la validación de datos en tiempo real para asegurar un flujo coherente de usuarios, eventos, reservas y pagos.',
    desc: 'Booqi es un proyecto que desarrollé en equipo, participando de forma integral, desde el diseño de la base de datos hasta el despliegue con Docker. Implementé cuatro microservicios independientes en Java con Spring Boot —usuarios, eventos, reservas y pagos— cada uno con su propia base de datos MySQL y API REST documentada con Swagger/OpenAPI. Diseñé la comunicación entre servicios para validar usuarios, eventos y reservas en tiempo real, y orquesté todo con Docker Compose, usando una red interna común, variables de entorno y healthchecks.',
    points: [
      { title: 'Compra centralizada de entradas', body: 'Elimina la necesidad de ir físicamente a taquillas. Todo el catálogo de eventos está en una sola plataforma donde el usuario puede explorar, filtrar y comprar desde cualquier lugar.' },
      { title: 'Gestión del proceso de reserva de principio a fin', body: 'Selección de evento, carrito, pago y confirmación ocurren dentro del mismo sistema sin redirigir al usuario a servicios externos desconectados.' },
      { title: 'Entrega inmediata y digital de tickets', body: 'El sistema genera automáticamente un ticket en PDF con los datos de la reserva, listo para descargar al instante.' },
      { title: 'Control de disponibilidad en tiempo real', body: 'Valida la disponibilidad antes de confirmar cada reserva, garantizando que no se vendan más entradas de las que el evento soporta.' },
      { title: 'Panel de administración para organizadores', body: 'Los organizadores pueden crear, gestionar y monitorear sus eventos con visibilidad de reservas, pagos y estadísticas desde un panel dedicado.' },
    ],
    badges: ['Java', 'Spring Boot', 'SpringDoc', 'Maven', 'MySQL', 'React', 'Boostrap', 'TypeScript', 'Docker', 'Otros...'],
    demo: '#',
    repo: 'https://github.com/RenzoRamosDEV/Booqui'
  },
  {
    num: '02',
    title: 'Sistema de Gestión de Inventario de Productos',
    images: [inventario01, inventario02, inventario03],
    summary: 'Inventario es una aplicación full-stack que desarrollé de forma integral, desde el diseño de la base de datos hasta el frontend. Construí la lógica de negocio, el sistema de validaciones, la gestión de errores, los filtros de búsqueda y la visualización en tiempo real, poniendo el foco en una estructura mantenible, una experiencia fluida y una integración consistente entre todas las partes del sistema.',
    desc: 'Inventario es una aplicación full-stack que desarrollé de forma integral, desde el diseño de la base de datos hasta el frontend. Construí el backend en Java 17 con Spring Boot, con una arquitectura en capas, mapeo de DTOs con MapStruct y una API REST documentada con Swagger/OpenAPI. Implementé validaciones de negocio, manejo centralizado de excepciones, paginación, filtros de búsqueda y monitoreo con Spring Boot Actuator. Para el frontend con Claude Design desarrollé una SPA en React + TypeScript con dashboard en tiempo real y componentes reutilizables, manteniendo tipado estricto en toda la comunicación con la API.',
    points: [
      { title: 'Gestión centralizada del inventario', body: 'Elimina el uso de hojas de cálculo o sistemas dispersos. Todos los productos están en una sola plataforma accesible desde cualquier dispositivo.' },
      { title: 'Control total del ciclo de vida de un producto', body: 'Crear, editar, eliminar y restaurar productos ocurren dentro del mismo sistema, con eliminación lógica que permite recuperar registros sin pérdida permanente.' },
      { title: 'Gestión de stock en tiempo real', body: 'El usuario puede aumentar o reducir el stock de cualquier producto de forma inmediata desde la misma tabla, sin entrar a formularios separados.' },
      { title: 'Visibilidad instantánea del estado del inventario', body: 'El dashboard muestra en tiempo real el valor total del stock, productos con stock bajo, agotados y los más costosos, todo en un solo vistazo.' },
      { title: 'Filtrado y búsqueda para cualquier escala', body: 'Filtra por nombre, estado de stock y productos activos o eliminados, con paginación automática que mantiene la interfaz ágil sin importar la cantidad de registros.' },
    ],
    badges: ['Java', 'Spring Boot', 'SpringDoc', 'Maven', 'MySQL', 'React', 'TypeScript', 'TailwindCSS', 'Claude Design', 'Otros...'],
    demo: '#',
    repo: 'https://github.com/RenzoRamosDEV/Gestion-De-Inventario'
  }
]
