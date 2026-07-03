import booqui02 from '../../assets/projects/booqui/booqui-02.png'
import booqui03 from '../../assets/projects/booqui/booqui-03.png'
import booqui04 from '../../assets/projects/booqui/booqui-04.png'
import booqui05 from '../../assets/projects/booqui/booqui-05.png'
import booqui06 from '../../assets/projects/booqui/booqui-06.png'
import pokedex02 from '../../assets/projects/pokedex/pokedex-02.png'
import pokedex03 from '../../assets/projects/pokedex/pokedex-03.png'
import pokedex04 from '../../assets/projects/pokedex/pokedex-04.png'
import pokedex05 from '../../assets/projects/pokedex/pokedex-05.png'
import pokedex06 from '../../assets/projects/pokedex/pokedex-06.png'
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
      es: 'Booqi — Sistema de Gestión de Reservas de Eventos',
      en: 'Booqi — Event Booking Management System',
    },
    images: ['/img/projects/booqui.jpg', booqui02, booqui03, booqui04, booqui05, booqui06],
    summary: {
      es: 'Plataforma web para descubrir eventos, comprar entradas y gestionar reservas, con arquitectura de microservicios y panel de administración.',
      en: 'Web platform to discover events, buy tickets and manage bookings, built with a microservices architecture and an admin panel.',
    },
    desc: {
      es: 'Booqi es una plataforma web que permite a las personas descubrir eventos (conciertos, conferencias, etc.), comprar entradas y gestionar sus reservas, todo desde el navegador.\n\nDesde el lado del usuario el flujo es simple: exploras el catálogo de eventos, seleccionas tus entradas, pagas y recibes automáticamente tu ticket en formato PDF. También puedes ver el historial de tus reservas en cualquier momento. Desde el lado del administrador existe un panel de gestión donde se pueden crear y administrar eventos, ver estadísticas y controlar la capacidad disponible.\n\nEl sistema fue desarrollado por dos personas —Renzo Iván Ramos de los Ríos y Melanie Gabriela Cárdenas Hidalgo— y está construido como una aplicación profesional lista para producción: cada funcionalidad (usuarios, eventos, reservas y pagos) corre de forma independiente en su propio servicio, lo que permite que el sistema escale y se mantenga sin que una parte afecte a las demás.',
      en: 'Booqi is a web platform that lets people discover events (concerts, conferences, etc.), buy tickets and manage their bookings, all from the browser.\n\nFrom the user side the flow is simple: you browse the event catalog, select your tickets, pay, and automatically receive your ticket as a PDF. You can also view your booking history at any time. From the admin side there is a management panel to create and administer events, view statistics and control available capacity.\n\nThe system was built by two people —Renzo Iván Ramos de los Ríos and Melanie Gabriela Cárdenas Hidalgo— as a professional, production-ready application: each capability (users, events, bookings and payments) runs independently in its own service, so the system can scale and be maintained without one part affecting the others.',
    },
    points: [
      {
        title: { es: 'Compra de entradas de principio a fin', en: 'End-to-end ticket purchase' },
        body: {
          es: 'Explorar el catálogo, seleccionar entradas, pagar y recibir el ticket en PDF, todo dentro del mismo sistema.',
          en: 'Browse the catalog, select tickets, pay and receive the PDF ticket, all within the same system.',
        },
      },
      {
        title: { es: 'Historial de reservas', en: 'Booking history' },
        body: {
          es: 'El usuario puede consultar el historial de sus reservas en cualquier momento.',
          en: 'Users can review their booking history at any time.',
        },
      },
      {
        title: { es: 'Panel de administración', en: 'Admin panel' },
        body: {
          es: 'Crear y administrar eventos, ver estadísticas y controlar el aforo disponible.',
          en: 'Create and manage events, view statistics and control available capacity.',
        },
      },
      {
        title: { es: 'Arquitectura de microservicios', en: 'Microservices architecture' },
        body: {
          es: 'Usuarios, eventos, reservas y pagos corren de forma independiente en su propio servicio.',
          en: 'Users, events, bookings and payments run independently in their own service.',
        },
      },
      {
        title: { es: 'Listo para producción', en: 'Production-ready' },
        body: {
          es: 'Diseñado para escalar y mantenerse sin que una parte afecte a las demás, con tests y mutation testing.',
          en: 'Designed to scale and be maintained without one part affecting the others, with tests and mutation testing.',
        },
      },
    ],
    badges: ['Java', 'Spring Boot', 'Spring Data JPA', 'Maven', 'Lombok', 'MapStruct', 'OpenAPI / Swagger', 'JUnit 5', 'Pitest', 'MySQL', 'React', 'Vite', 'Bootstrap', 'Axios', 'Docker', 'Docker Compose'],
    demo: 'https://renzoramosdev.github.io/Booqui-Sistema-Gestion-Reservas-Eventos/',
    repo: 'https://github.com/RenzoRamosDEV/Booqui-Sistema-Gestion-Reservas-Eventos',
  },
  {
    num: '02',
    title: {
      es: 'Redactor IA — Reformulación de Textos con IA',
      en: 'Redactor IA — AI Text Rewriting Tool',
    },
    images: ['/img/projects/redactor-ia.jpg'],
    summary: {
      es: 'Herramienta web para mejorar o reformular textos con IA: eliges el tono, ajustas la intensidad y recibes una versión mejorada en segundos.',
      en: 'Web tool to improve or rewrite text with AI: choose the tone, adjust the intensity and get an improved version in seconds.',
    },
    desc: {
      es: 'Redactor IA es una herramienta web que permite a cualquier persona mejorar o reformular textos usando inteligencia artificial, sin necesidad de conocimientos técnicos.\n\nEl usuario escribe o pega su texto, elige el tono que quiere darle (formal, casual, profesional, persuasivo, etc.) y en segundos recibe una versión mejorada generada por un modelo de IA. También puede controlar qué tan drástico es el cambio y agregar instrucciones adicionales para personalizar el resultado.\n\nLa aplicación está disponible en español e inglés, y cuenta con medidas de seguridad para evitar el abuso del servicio. Fue desarrollada con tecnologías web modernas tanto en el frontend (interfaz visual) como en el backend (servidor y conexión con la IA).',
      en: 'Redactor IA is a web tool that lets anyone improve or rewrite text using artificial intelligence, with no technical knowledge required.\n\nThe user writes or pastes their text, chooses the tone they want (formal, casual, professional, persuasive, etc.) and in seconds receives an improved version generated by an AI model. They can also control how drastic the change is and add extra instructions to customize the result.\n\nThe app is available in Spanish and English and includes security measures to prevent service abuse. It was built with modern web technologies on both the frontend (visual interface) and the backend (server and AI connection).',
    },
    points: [
      {
        title: { es: 'Reformulación instantánea con IA', en: 'Instant AI rewriting' },
        body: {
          es: 'Mejora cualquier texto en segundos sin necesidad de conocimientos técnicos.',
          en: 'Improves any text in seconds with no technical knowledge required.',
        },
      },
      {
        title: { es: 'Control del tono', en: 'Tone control' },
        body: {
          es: 'Formal, casual, profesional, persuasivo y más, según lo que necesites.',
          en: 'Formal, casual, professional, persuasive and more, depending on your needs.',
        },
      },
      {
        title: { es: 'Intensidad e instrucciones', en: 'Intensity and instructions' },
        body: {
          es: 'Ajusta cuán drástico es el cambio y añade indicaciones extra para personalizar el resultado.',
          en: 'Adjust how drastic the change is and add extra instructions to customize the result.',
        },
      },
      {
        title: { es: 'Bilingüe (ES/EN)', en: 'Bilingual (ES/EN)' },
        body: {
          es: 'Interfaz disponible en español e inglés con i18next.',
          en: 'Interface available in Spanish and English with i18next.',
        },
      },
      {
        title: { es: 'Seguridad', en: 'Security' },
        body: {
          es: 'Medidas contra el abuso del servicio: rate limiting, helmet y CORS.',
          en: 'Measures against service abuse: rate limiting, helmet and CORS.',
        },
      },
    ],
    badges: ['React', 'Vite', 'Tailwind CSS', 'i18next', 'TypeScript', 'Node.js', 'Express', 'Gemini', 'Groq SDK', 'helmet', 'express-rate-limit'],
    demo: '#',
    repo: 'https://github.com/RenzoRamosDEV/Redactor-IA',
  },
  {
    num: '03',
    title: {
      es: 'Pokédex Retro + Chatbot ReAct (MCP)',
      en: 'Retro Pokédex + ReAct Chatbot (MCP)',
    },
    images: ['/img/projects/pokedex.jpg', pokedex02, pokedex03, pokedex04, pokedex05, pokedex06],
    summary: {
      es: 'Aplicación web completa que combina una Pokédex retro con un chatbot de IA que razona paso a paso (ReAct) y consulta los datos en tiempo real vía MCP.',
      en: 'Full web application that combines a retro Pokédex with an AI chatbot that reasons step by step (ReAct) and queries data in real time via MCP.',
    },
    desc: {
      es: 'Es una aplicación web completa construida de cero que combina desarrollo de software tradicional con inteligencia artificial. El proyecto tiene dos partes principales.\n\n1) Pokédex Web: una enciclopedia interactiva de Pokémon con estética retro de los años 90. El usuario puede buscar y explorar Pokémon, movimientos, tipos, habilidades, objetos y más, con un diseño visual cuidado y 3 temas de color diferentes.\n\n2) Chatbot con IA: un asistente conversacional que permite hacer preguntas en lenguaje natural como "¿Cuáles son las debilidades de Charizard?" o "¿Qué Pokémon aprende Rayo?". La IA razona paso a paso (ReAct) para dar la respuesta correcta consultando los datos en tiempo real.\n\nEl backend (API REST) está hecho en Scala con Play Framework; un servidor MCP en Python expone los datos como herramientas, y un agente ReAct (OpenAI SDK + FastAPI) las consume. Demuestra construir un sistema de principio a fin integrando un protocolo de IA emergente (MCP) y diseñando la interfaz solo con CSS puro, sin librerías externas.',
      en: 'A complete web application built from scratch that combines traditional software development with artificial intelligence. The project has two main parts.\n\n1) Pokédex Web: an interactive Pokémon encyclopedia with a 90s retro aesthetic. Users can search and explore Pokémon, moves, types, abilities, items and more, with careful visual design and 3 different color themes.\n\n2) AI Chatbot: a conversational assistant that lets you ask natural-language questions like "What are Charizard\'s weaknesses?" or "Which Pokémon learns Thunderbolt?". The AI reasons step by step (ReAct) to give the correct answer, querying the data in real time.\n\nThe backend (REST API) is built in Scala with Play Framework; a Python MCP server exposes the data as tools, and a ReAct agent (OpenAI SDK + FastAPI) consumes them. It demonstrates building an end-to-end system integrating an emerging AI protocol (MCP) and designing the interface with pure CSS only, no external libraries.',
    },
    points: [
      {
        title: { es: 'Sistema completo de principio a fin', en: 'Complete end-to-end system' },
        body: {
          es: 'Frontend, backend, API e IA, todo construido de cero e integrado.',
          en: 'Frontend, backend, API and AI, all built from scratch and integrated.',
        },
      },
      {
        title: { es: 'Chatbot que razona (ReAct)', en: 'Reasoning chatbot (ReAct)' },
        body: {
          es: 'Responde preguntas en lenguaje natural razonando paso a paso y consultando datos en tiempo real.',
          en: 'Answers natural-language questions reasoning step by step and querying data in real time.',
        },
      },
      {
        title: { es: 'Integración de MCP', en: 'MCP integration' },
        body: {
          es: 'Usa el Model Context Protocol para conectar el modelo de lenguaje con herramientas externas.',
          en: 'Uses the Model Context Protocol to connect the language model with external tools.',
        },
      },
      {
        title: { es: 'Backend en Scala', en: 'Scala backend' },
        body: {
          es: 'API REST con Scala y Play Framework como fuente de datos de la Pokédex.',
          en: 'REST API with Scala and Play Framework as the Pokédex data source.',
        },
      },
      {
        title: { es: 'Interfaz solo con CSS puro', en: 'Pure-CSS interface' },
        body: {
          es: 'Estética retro de los 90 con 3 temas de color, sin librerías de UI externas.',
          en: '90s retro aesthetic with 3 color themes, with no external UI libraries.',
        },
      },
    ],
    badges: ['Scala', 'Play Framework', 'Spray JSON', 'Guice', 'SBT', 'Python', 'MCP', 'OpenAI SDK', 'FastAPI', 'Uvicorn', 'Requests'],
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
