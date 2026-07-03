export type Lang = 'es' | 'en'

export const translations = {
  es: {
    // Nav
    nav_projects: 'Proyectos',
    nav_stack: 'Stack',
    nav_exp: 'Experiencia',
    nav_edu: 'Educación',
    nav_contact: 'Contacto',
    lang_label: 'ES / en',

    // Quick links
    ql_projects: 'Proyectos',
    ql_exp: 'Experiencia',
    ql_edu: 'Educación',
    ql_cert: 'Certificados',
    ql_contact: 'Contacto',

    // Intro
    intro_kicker: 'Portfolio',
    intro_role: 'Técnico Superior de Desarrollo de Aplicaciones Multiplataforma',
    intro_skip: 'Saltar intro',

    // Hero
    hero_eyebrow: 'IA · Backend',
    hero_h: 'Hola, soy Renzo.',
    hero_role: 'Técnico Superior DAM · Junior AI Engineer',
    hero_tag: 'Con las mejores bases para que tu producto crezca sin romperse.',
    hero_link_cv: 'Currículum',

    // Proyectos
    proj_title: 'Lo último.',
    proj_sub: 'Echa un vistazo a mi trabajo.',
    p1_eyebrow: 'Microservicios',
    p1_blurb: 'Reservas de eventos con 4 microservicios orquestados con Docker Compose.',
    p2_eyebrow: 'Inteligencia Artificial',
    p2_blurb: 'Reformula textos con IA: control de tono, intensidad y longitud en segundos.',
    p3_eyebrow: 'Retro · IA · MCP',
    p3_blurb: 'Pokédex retro + chatbot que razona (ReAct) sobre los datos en tiempo real vía MCP.',

    // Detalle de proyecto
    detail_back: 'Volver',
    detail_features: 'Características',
    detail_repo: 'Ver repositorio',
    detail_demo: 'Ver demo',
    detail_more: 'Ver detalles',

    // Stack
    stack_title: 'Stack.',
    stack_sub: 'Las herramientas con las que construyo.',
    stack_group_back: 'Backend',
    stack_group_front: 'Frontend',
    stack_group_ia: 'Inteligencia Artificial',
    stack_group_tools: 'Herramientas',

    // Experiencia / Educación
    exp_title: 'Experiencia',
    edu_title: 'Educación',

    // Certificados
    cert_title: 'Certificados',
    cert_view: 'Ver credencial',

    // Contacto
    contact_eyebrow: 'hablemos',
    contact_h: '¿Construimos algo que escale?',
    contact_cta: 'Escríbeme',

    // Footer
    footer_note: 'Hecho en Madrid.',
  },
  en: {
    // Nav
    nav_projects: 'Projects',
    nav_stack: 'Stack',
    nav_exp: 'Experience',
    nav_edu: 'Education',
    nav_contact: 'Contact',
    lang_label: 'es / EN',

    // Quick links
    ql_projects: 'Projects',
    ql_exp: 'Experience',
    ql_edu: 'Education',
    ql_cert: 'Certificates',
    ql_contact: 'Contact',

    // Intro
    intro_kicker: 'Portfolio',
    intro_role: 'Higher Technician in Multiplatform Application Development',
    intro_skip: 'Skip intro',

    // Hero
    hero_eyebrow: 'AI · Backend',
    hero_h: "Hi, I'm Renzo.",
    hero_role: 'DAM Higher Technician · Junior AI Engineer',
    hero_tag: 'With the best foundations for your product to grow without breaking.',
    hero_link_cv: 'Resume',

    // Projects
    proj_title: 'Latest.',
    proj_sub: 'Take a look at my work.',
    p1_eyebrow: 'Microservices',
    p1_blurb: 'Event booking with 4 microservices orchestrated via Docker Compose.',
    p2_eyebrow: 'Artificial Intelligence',
    p2_blurb: 'Rewrites text with AI: tone, intensity and length control in seconds.',
    p3_eyebrow: 'Retro · AI · MCP',
    p3_blurb: 'Retro Pokédex + a chatbot that reasons (ReAct) over real-time data via MCP.',

    // Project detail
    detail_back: 'Back',
    detail_features: 'Features',
    detail_repo: 'View repository',
    detail_demo: 'View demo',
    detail_more: 'View details',

    // Stack
    stack_title: 'Stack.',
    stack_sub: 'The tools I build with.',
    stack_group_back: 'Backend',
    stack_group_front: 'Frontend',
    stack_group_ia: 'Artificial Intelligence',
    stack_group_tools: 'Tools',

    // Experience / Education
    exp_title: 'Experience',
    edu_title: 'Education',

    // Certificates
    cert_title: 'Certificates',
    cert_view: 'View credential',

    // Contact
    contact_eyebrow: "let's talk",
    contact_h: 'Shall we build something that scales?',
    contact_cta: 'Email me',

    // Footer
    footer_note: 'Made in Madrid.',
  },
} as const

export type TranslationKey = keyof typeof translations['es']
