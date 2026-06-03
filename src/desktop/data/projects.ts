import booqui01 from '../../assets/projects/booqui/booqui-01.png'
import booqui02 from '../../assets/projects/booqui/booqui-02.png'
import booqui03 from '../../assets/projects/booqui/booqui-03.png'
import booqui04 from '../../assets/projects/booqui/booqui-04.png'
import booqui05 from '../../assets/projects/booqui/booqui-05.png'
import booqui06 from '../../assets/projects/booqui/booqui-06.png'
import redactorIA01 from '../../assets/projects/redactor-ia/image.png'
import pokedex01 from '../../assets/projects/pokedex/image.png'
import pokedex02 from '../../assets/projects/pokedex/image copy.png'
import pokedex03 from '../../assets/projects/pokedex/image copy 2.png'
import pokedex04 from '../../assets/projects/pokedex/image copy 3.png'
import pokedex05 from '../../assets/projects/pokedex/image copy 4.png'
import pokedex06 from '../../assets/projects/pokedex/image copy 5.png'

export type ProjectPoint = { title: string; body: string }

export type Project = {
  id: string
  num: string
  title: string
  role: string
  icon: string
  iconClass: string
  images: string[]
  summary: string
  points: ProjectPoint[]
  pointsLabel?: string
  badges: string[]
  repo: string
  preview?: string
}

export const PROJECTS: Project[] = [
  {
    id: 'booqi',
    num: '01',
    title: 'Booqi - Gestión de Reservas de Eventos',
    role: 'Proyecto en equipo · TFG · Backend Developer',
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
    badges: ['Java', 'Spring Boot', 'Spring Data JPA', 'Spring Web', 'Spring Validation', 'MySQL', 'Lombok', 'MapStruct', 'SpringDoc OpenAPI', 'Maven', 'Docker', 'Docker Compose', 'React', 'Bootstrap'],
    repo: 'https://github.com/RenzoRamosDEV/Booqui-Sistema-Gestion-Reservas-Eventos',
    preview: 'https://renzoramosdev.github.io/Booqui-Sistema-Gestion-Reservas-Eventos/',
  },
  {
    id: 'redactor-ia',
    num: '02',
    title: 'Redactor IA - Reformulador de Textos',
    role: 'Desarrollador único · Full Stack Developer',
    icon: 'R',
    iconClass: 'pi1',
    images: [redactorIA01],
    summary:
      'Herramienta web para reformular y mejorar textos usando inteligencia artificial. El usuario pega su texto, elige el tono deseado y recibe una versión reescrita por un modelo LLM en segundos. Construida con Node.js en el backend integrando el SDK de Groq con el modelo LLaMA, y un frontend en React con TailwindCSS. Incluye soporte multilenguaje con i18n y un diseño asistido por IA.',
    points: [
      { title: 'Mejora de redacción instantánea', body: 'Reformula textos escritos rápido o con errores de estilo, entregando una versión pulida en segundos.' },
      { title: 'Control del tono', body: 'Cambia el registro del mensaje: más formal, casual, profesional, directo, persuasivo, divertido o creativo.' },
      { title: 'Intensidad ajustable', body: 'El usuario elige desde un leve retoque hasta una reescritura total según cuánto quiere transformar el texto.' },
      { title: 'Control de longitud', body: 'Mantiene o libera la extensión del texto original según la necesidad del usuario.' },
      { title: 'Instrucciones personalizadas', body: 'Campo de texto extra para añadir indicaciones específicas y personalizar aún más el resultado generado.' },
    ],
    badges: ['Node.js', 'Groq SDK', 'Llama', 'React', 'TailwindCSS', 'i18n', 'TypeScript'],
    repo: 'https://github.com/RenzoRamosDEV/Redactor-IA',
  },
  {
    id: 'pokedex',
    num: '03',
    title: 'Pokédex Retro - API Pokémon en Scala',
    role: 'Desarrollador único · Full Stack Developer',
    icon: 'P',
    iconClass: 'pi2',
    images: [pokedex01, pokedex02, pokedex03, pokedex04, pokedex05, pokedex06],
    summary:
      'Pokédex interactiva con estética retro inspirada en la Game Boy original (DMG-01) y los videojuegos de Pokémon de primera generación. Construida con Scala y Play Framework, consumiendo datos en tiempo real desde PokéAPI.',
    pointsLabel: 'Características',
    points: [
      { title: '7 secciones completas', body: 'Pokédex, Movimientos, Tipos, Habilidades, Naturalezas, Objetos y Bayas — cada una con su propio listado y buscador.' },
      { title: 'Buscador con filtrado server-side', body: 'Cada sección tiene su propio buscador que filtra los resultados directamente en el servidor.' },
      { title: '3 temas visuales', body: 'Normal (rojo retro), DMG (Game Boy verde LCD) y MONO (gris monocromático), cambiables al instante.' },
      { title: 'Paginación configurable', body: 'El usuario ajusta cuántos elementos ver por página en cada sección según su preferencia.' },
      { title: 'Modal de detalle por Pokémon', body: 'Stats, tipos, habilidades y barras de progreso animadas en un modal de detalle por cada Pokémon.' },
    ],
    badges: ['Scala', 'Play Framework', 'PokéAPI', 'CSS'],
    repo: 'https://github.com/RenzoRamosDEV/Api-Pokemon-Scala-Web',
  },
]

export const getProject = (id: string) => PROJECTS.find(p => p.id === id)
