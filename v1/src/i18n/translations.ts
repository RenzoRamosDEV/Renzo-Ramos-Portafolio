export type Lang = 'es' | 'en'

export const translations = {
  es: {
    // Navbar
    nav_about: 'Sobre mí',
    nav_projects: 'Proyectos',
    nav_experience: 'Trayectoria',
    nav_stack: 'Stack',
    nav_methodologies: 'Metodologías',

    // Hero
    hero_subtitle: 'Diseño y construyo backends que escalan sin romperse cuando tu producto crece',
    hero_body1: 'Trabajo con <strong>Java y Spring Boot</strong> para construir APIs mantenibles, pensadas para evitar problemas antes de que aparezcan.',
    hero_body2: 'No solo desarrollo funcionalidades: construyo la base sólida sobre la que tu producto puede crecer sin problemas.',
    hero_body3: 'Además, domino el <strong>Frontend</strong> para cerrar la brecha entre la lógica y la interfaz, asegurando que el producto sea coherente de principio a fin.',
    hero_btn_curriculum: 'Curriculum',

    // Features
    features_title1: 'Proyectos',
    features_title2: 'Destacados',
    features_learn_more: 'Saber más',
    features_repo: 'Repo',
    modal_what_solves: 'Qué resuelve',
    modal_repository: 'Repositorio',

    // Experience
    exp_title1: 'Trayectoria Laboral',
    exp_title2: '& Certificados',
    exp_edu_title1: 'Trayectoria',
    exp_edu_title2: 'en Formación',
    exp_label_job: 'Laboral',
    exp_label_cert: 'Certificados',
    exp_label_edu: 'Formación',
    exp_type_job: 'Laboral',
    exp_type_edu: 'Formación',
    exp_type_cert: 'Certificado',
    exp_see_cert: 'Ver certificado',
    exp_see_credential: 'Ver credencial',

    // Stack
    stack_title1: 'Herramientas',
    stack_title2: 'en mi Stack',
    stack_group_back: 'Backend',
    stack_group_tools: 'Tools',
    stack_group_front: 'Frontend',
    stack_group_ia: 'IA',

    // Methodologies
    method_title1: 'Metodologías',
    method_title2: 'que aplico',
    method_group_arch: 'Arquitectura',
    method_group_testing: 'Testing',
    method_group_process: 'Proceso',
    method_group_ui: 'UI',

    // Footer
    footer_description: 'Desarrollador Junior de Aplicaciones Multiplataforma',
    footer_about: 'Sobre mí',
    footer_projects: 'Proyectos',
    footer_experience: 'Experiencia',
    footer_stack: 'Stack',
    footer_methodologies: 'Metodologías',
    footer_curriculum: 'Curriculum',

    // Language toggle
    lang_toggle: 'EN',
  },
  en: {
    // Navbar
    nav_about: 'About me',
    nav_projects: 'Projects',
    nav_experience: 'Experience',
    nav_stack: 'Stack',
    nav_methodologies: 'Methodologies',

    // Hero
    hero_subtitle: 'I design and build backends that scale without breaking when your product grows',
    hero_body1: 'I work with <strong>Java and Spring Boot</strong> to build maintainable APIs, designed to prevent problems before they appear.',
    hero_body2: 'I don\'t just develop features: I build the solid foundation your product needs to grow without issues.',
    hero_body3: 'I also master the <strong>Frontend</strong> to bridge the gap between logic and interface, ensuring the product is coherent from start to finish.',
    hero_btn_curriculum: 'Resume',

    // Features
    features_title1: 'Featured',
    features_title2: 'Projects',
    features_learn_more: 'Learn more',
    features_repo: 'Repo',
    modal_what_solves: 'What it solves',
    modal_repository: 'Repository',

    // Experience
    exp_title1: 'Work Experience',
    exp_title2: '& Certificates',
    exp_edu_title1: 'Education',
    exp_edu_title2: '& Training',
    exp_label_job: 'Work',
    exp_label_cert: 'Certificates',
    exp_label_edu: 'Education',
    exp_type_job: 'Work',
    exp_type_edu: 'Education',
    exp_type_cert: 'Certificate',
    exp_see_cert: 'View certificate',
    exp_see_credential: 'View credential',

    // Stack
    stack_title1: 'Tools',
    stack_title2: 'in my Stack',
    stack_group_back: 'Backend',
    stack_group_tools: 'Tools',
    stack_group_front: 'Frontend',
    stack_group_ia: 'AI',

    // Methodologies
    method_title1: 'Methodologies',
    method_title2: 'I apply',
    method_group_arch: 'Architecture',
    method_group_testing: 'Testing',
    method_group_process: 'Process',
    method_group_ui: 'UI',

    // Footer
    footer_description: 'Junior Cross-Platform Application Developer',
    footer_about: 'About me',
    footer_projects: 'Projects',
    footer_experience: 'Experience',
    footer_stack: 'Stack',
    footer_methodologies: 'Methodologies',
    footer_curriculum: 'Resume',

    // Language toggle
    lang_toggle: 'ES',
  },
} satisfies Record<Lang, Record<string, string>>

export type TranslationKey = keyof (typeof translations)['es']
