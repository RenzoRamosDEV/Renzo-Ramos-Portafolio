import booqui01 from '../assets/projects/booqui/booqui-01.png'
import booqui02 from '../assets/projects/booqui/booqui-02.png'
import booqui03 from '../assets/projects/booqui/booqui-03.png'
import booqui04 from '../assets/projects/booqui/booqui-04.png'
import booqui05 from '../assets/projects/booqui/booqui-05.png'
import booqui06 from '../assets/projects/booqui/booqui-06.png'
import redactorIA01 from '../../../assets/projects/redactor-ia/image.png'
import pokedex01 from '../../../assets/projects/pokedex/image.png'
import pokedex02 from '../../../assets/projects/pokedex/image copy.png'
import pokedex03 from '../../../assets/projects/pokedex/image copy 2.png'
import pokedex04 from '../../../assets/projects/pokedex/image copy 3.png'
import pokedex05 from '../../../assets/projects/pokedex/image copy 4.png'
import pokedex06 from '../../../assets/projects/pokedex/image copy 5.png'
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
      es: 'Booqi - Gestión de Reservas de Eventos',
      en: 'Booqi - Event Booking Management System',
    },
    images: [booqui01, booqui02, booqui03, booqui04, booqui05, booqui06],
    summary: {
      es: 'Booqi es un proyecto que desarrollé en equipo, participando de forma integral desde el diseño de la base de datos hasta el despliegue con Docker. Implementé cuatro microservicios independientes en Java con Spring Boot, cada uno con su propia base de datos MySQL y API REST documentada con Swagger/OpenAPI.',
      en: 'Booqi is a team project I developed end-to-end, from database design to Docker deployment. I implemented four independent microservices in Java with Spring Boot, each with its own MySQL database and REST API documented with Swagger/OpenAPI.',
    },
    desc: {
      es: 'Booqi es un proyecto que desarrollé en equipo, participando de forma integral desde el diseño de la base de datos hasta el despliegue con Docker. Implementé cuatro microservicios independientes en Java con Spring Boot —usuarios, eventos, reservas y pagos— cada uno con su propia base de datos MySQL y API REST documentada con Swagger/OpenAPI. Diseñé la comunicación entre servicios para validar usuarios, eventos y reservas en tiempo real, y orquesté todo con Docker Compose usando una red interna común, variables de entorno y healthchecks.',
      en: 'Booqi is a team project I developed end-to-end, from database design to Docker deployment. I implemented four independent microservices in Java with Spring Boot —users, events, bookings, and payments— each with its own MySQL database and REST API documented with Swagger/OpenAPI. I designed inter-service communication to validate users, events, and bookings in real time, and orchestrated everything with Docker Compose using a shared internal network, environment variables, and healthchecks.',
    },
    points: [
      {
        title: { es: 'Compra centralizada de entradas', en: 'Centralized ticket purchasing' },
        body: {
          es: 'Todo el catálogo de eventos está en una sola plataforma donde el usuario puede explorar, filtrar y comprar desde cualquier lugar, sin ir físicamente a taquillas.',
          en: 'The entire event catalog is on a single platform where users can browse, filter, and purchase from anywhere, without going to physical ticket offices.',
        },
      },
      {
        title: { es: 'Gestión del proceso de reserva de principio a fin', en: 'End-to-end booking process' },
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
          es: 'Los organizadores crean, gestionan y monitorean sus eventos con visibilidad de reservas, pagos y estadísticas desde un panel dedicado.',
          en: 'Organizers can create, manage, and monitor their events with visibility of bookings, payments, and statistics from a dedicated panel.',
        },
      },
    ],
    badges: ['Java', 'Spring Boot', 'Spring Data JPA', 'MySQL', 'Maven', 'Docker', 'React', 'Bootstrap', 'Otros...'],
    demo: 'https://renzoramosdev.github.io/Booqui-Sistema-Gestion-Reservas-Eventos/',
    repo: 'https://github.com/RenzoRamosDEV/Booqui-Sistema-Gestion-Reservas-Eventos',
  },
  {
    num: '02',
    title: {
      es: 'Redactor IA - Reformulador de Textos',
      en: 'Redactor IA - AI Text Rewriter',
    },
    images: [redactorIA01],
    summary: {
      es: 'Herramienta web para reformular y mejorar textos usando inteligencia artificial. El usuario pega su texto, elige el tono deseado y recibe una versión reescrita por un modelo LLM en segundos.',
      en: 'Web tool to rephrase and improve texts using artificial intelligence. The user pastes their text, chooses the desired tone, and receives a rewritten version by an LLM model in seconds.',
    },
    desc: {
      es: 'Herramienta web para reformular y mejorar textos usando inteligencia artificial. El usuario pega su texto, elige el tono deseado y recibe una versión reescrita por un modelo LLM en segundos. Construida con Node.js en el backend integrando el SDK de Groq con el modelo LLaMA, y un frontend en React con TailwindCSS. Incluye soporte multilenguaje con i18n y un diseño asistido por IA.',
      en: 'Web tool to rephrase and improve texts using artificial intelligence. The user pastes their text, chooses the desired tone, and receives a rewritten version by an LLM model in seconds. Built with Node.js on the backend integrating the Groq SDK with the LLaMA model, and a React frontend with TailwindCSS. Includes multilingual support with i18n and an AI-assisted design.',
    },
    points: [
      {
        title: { es: 'Mejora de redacción instantánea', en: 'Instant text improvement' },
        body: {
          es: 'Reformula textos escritos rápido o con errores de estilo, entregando una versión pulida en segundos.',
          en: 'Rephrases quickly written or stylistically inconsistent texts, delivering a polished version in seconds.',
        },
      },
      {
        title: { es: 'Control del tono', en: 'Tone control' },
        body: {
          es: 'Cambia el registro del mensaje: más formal, casual, profesional, directo, persuasivo, divertido o creativo.',
          en: 'Changes the message register: more formal, casual, professional, direct, persuasive, fun, or creative.',
        },
      },
      {
        title: { es: 'Intensidad ajustable', en: 'Adjustable intensity' },
        body: {
          es: 'El usuario elige desde un leve retoque hasta una reescritura total según cuánto quiere transformar el texto.',
          en: 'The user chooses from a light touch-up to a complete rewrite depending on how much they want to transform the text.',
        },
      },
      {
        title: { es: 'Control de longitud', en: 'Length control' },
        body: {
          es: 'Mantiene o libera la extensión del texto original según la necesidad del usuario.',
          en: 'Maintains or releases the original text length according to the user\'s needs.',
        },
      },
      {
        title: { es: 'Instrucciones personalizadas', en: 'Custom instructions' },
        body: {
          es: 'Campo de texto extra para añadir indicaciones específicas y personalizar aún más el resultado generado.',
          en: 'Extra text field to add specific instructions and further customize the generated result.',
        },
      },
    ],
    badges: ['Node.js', 'Groq SDK', 'LLaMA', 'React', 'TailwindCSS', 'i18n', 'TypeScript'],
    demo: '#',
    repo: 'https://github.com/RenzoRamosDEV/Redactor-IA',
  },
  {
    num: '03',
    title: {
      es: 'Pokédex Retro - API Pokémon en Scala',
      en: 'Retro Pokédex - Pokémon API in Scala',
    },
    images: [pokedex01, pokedex02, pokedex03, pokedex04, pokedex05, pokedex06],
    summary: {
      es: 'Pokédex interactiva con estética retro inspirada en la Game Boy original (DMG-01) y los videojuegos de Pokémon de primera generación. Construida con Scala y Play Framework, consumiendo datos en tiempo real desde PokéAPI.',
      en: 'Interactive Pokédex with retro aesthetics inspired by the original Game Boy (DMG-01) and first-generation Pokémon games. Built with Scala and Play Framework, consuming real-time data from PokéAPI.',
    },
    desc: {
      es: 'Pokédex interactiva con estética retro inspirada en la Game Boy original (DMG-01) y los videojuegos de Pokémon de primera generación. Construida con Scala y Play Framework en el backend, consumiendo datos en tiempo real desde PokéAPI. Incluye 7 secciones completas, buscador server-side en cada una, 3 temas visuales intercambiables y paginación configurable.',
      en: 'Interactive Pokédex with retro aesthetics inspired by the original Game Boy (DMG-01) and first-generation Pokémon games. Built with Scala and Play Framework on the backend, consuming real-time data from PokéAPI. Includes 7 complete sections, server-side search in each, 3 interchangeable visual themes, and configurable pagination.',
    },
    points: [
      {
        title: { es: '7 secciones completas', en: '7 complete sections' },
        body: {
          es: 'Pokédex, Movimientos, Tipos, Habilidades, Naturalezas, Objetos y Bayas — cada una con su propio listado y buscador.',
          en: 'Pokédex, Moves, Types, Abilities, Natures, Items, and Berries — each with its own listing and search.',
        },
      },
      {
        title: { es: 'Buscador con filtrado server-side', en: 'Server-side search filtering' },
        body: {
          es: 'Cada sección tiene su propio buscador que filtra los resultados directamente en el servidor.',
          en: 'Each section has its own search bar that filters results directly on the server.',
        },
      },
      {
        title: { es: '3 temas visuales', en: '3 visual themes' },
        body: {
          es: 'Normal (rojo retro), DMG (Game Boy verde LCD) y MONO (gris monocromático), cambiables al instante.',
          en: 'Normal (retro red), DMG (Game Boy green LCD), and MONO (monochromatic grey), switchable instantly.',
        },
      },
      {
        title: { es: 'Paginación configurable', en: 'Configurable pagination' },
        body: {
          es: 'El usuario ajusta cuántos elementos ver por página en cada sección según su preferencia.',
          en: 'The user adjusts how many items to display per page in each section according to their preference.',
        },
      },
      {
        title: { es: 'Modal de detalle por Pokémon', en: 'Pokémon detail modal' },
        body: {
          es: 'Stats, tipos, habilidades y barras de progreso animadas en un modal de detalle por cada Pokémon.',
          en: 'Stats, types, abilities, and animated progress bars in a detail modal for each Pokémon.',
        },
      },
    ],
    badges: ['Scala', 'Play Framework', 'PokéAPI', 'CSS'],
    demo: '#',
    repo: 'https://github.com/RenzoRamosDEV/Api-Pokemon-Scala-Web',
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
