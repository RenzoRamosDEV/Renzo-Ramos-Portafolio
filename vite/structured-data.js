// Datos estructurados (JSON-LD) de la página principal, generados en el build a partir de los mismos datos
// que pinta la web (src/data/): así nunca se desincronizan. Un único @graph con @id enlazados:
// Person ← WebSite ← ProfilePage → BreadcrumbList, ItemList de proyectos → cada proyecto, FAQPage.
// Solo corre en Node (lo llama vite/prerender.js); no llega al navegador.
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL } from '../src/data/site.js';
import { projects } from '../src/data/projects.js';
import { jobs } from '../src/data/experience.js';
import { certs } from '../src/data/certificates.js';
import { faq } from '../src/data/faq.js';

const SITE = 'https://portafolio-renzoramos.com';
const ID = {
  person: `${SITE}/#renzo`, website: `${SITE}/#website`, page: `${SITE}/#webpage`,
  breadcrumb: `${SITE}/#breadcrumb`, projects: `${SITE}/#proyectos`, faq: `${SITE}/#preguntas`, photo: `${SITE}/#foto-portada`,
};
const slug = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// Todas las fotos y capturas son de Renzo Ramos, con todos los derechos reservados
const LICENSE = {
  creator: { '@id': ID.person }, creditText: 'Renzo Ramos', copyrightNotice: '© Renzo Ramos. Todos los derechos reservados.',
  license: `${SITE}/licencia-imagenes.html`, acquireLicensePage: `${SITE}/licencia-imagenes.html`,
};
const image = (path, w, h, caption, extra = {}) => ({
  '@type': 'ImageObject', contentUrl: `${SITE}/${path}`, url: `${SITE}/${path}`, width: w, height: h, caption, ...extra, ...LICENSE,
});

// "MAY. 2026" → "2026-05"
const MONTHS = { ENE: '01', FEB: '02', MAR: '03', ABR: '04', MAY: '05', JUN: '06', JUL: '07', AGO: '08', SEPT: '09', SEP: '09', OCT: '10', NOV: '11', DIC: '12' };
const isoMonth = s => { const [m, y] = s.replace('.', '').split(/\s+/); return MONTHS[m] ? `${y}-${MONTHS[m]}` : undefined; };
const titleCase = s => s.toLowerCase().replace(/(^|\s)(\p{L})/gu, (m, sp, c) => sp + c.toUpperCase());

const current = jobs.find(j => j.to === 'ACTUALIDAD');

function person() {
  return {
    '@type': 'Person', '@id': ID.person,
    name: 'Renzo Ramos', givenName: 'Renzo', familyName: 'Ramos de los Ríos',
    alternateName: ['Renzo Iván Ramos de los Ríos', 'Renzo Ramos de los Ríos', 'Renzo Iván Ramos', 'Renzo Iván'],
    url: `${SITE}/`, mainEntityOfPage: { '@id': ID.page },
    jobTitle: ['Junior AI Engineer', 'Técnico Superior en DAM'],
    description: 'Junior AI Engineer y Técnico Superior en Desarrollo de Aplicaciones Multiplataforma (DAM) en Madrid. Desarrolla agentes y soluciones de inteligencia artificial con Python, LangChain y LangGraph, y APIs con Java y Spring Boot.',
    email: CONTACT_EMAIL, telephone: '+34623971177',
    address: { '@type': 'PostalAddress', addressLocality: 'Madrid', addressRegion: 'Comunidad de Madrid', addressCountry: 'ES' },
    homeLocation: { '@type': 'Place', name: 'Madrid, España' },
    birthPlace: { '@type': 'Country', name: 'Perú' },
    worksFor: current && { '@type': 'Organization', name: current.company },
    hasOccupation: current && {
      '@type': 'Occupation', name: 'Junior AI Engineer',
      occupationLocation: { '@type': 'City', name: 'Madrid' },
      skills: 'Python, LangChain, LangGraph, LiteLLM, Temporal.io, Model Context Protocol (MCP), agentes de IA',
    },
    alumniOf: [
      { '@type': 'EducationalOrganization', name: 'CESUR Madrid' },
      { '@type': 'EducationalOrganization', name: '42 Madrid · Fundación Telefónica' },
      { '@type': 'EducationalOrganization', name: 'Instituto San Ignacio de Loyola (ISIL)' },
    ],
    hasCredential: [
      { '@type': 'EducationalOccupationalCredential', name: 'Técnico Superior en Desarrollo de Aplicaciones Multiplataforma (DAM)', credentialCategory: 'degree', recognizedBy: { '@type': 'EducationalOrganization', name: 'CESUR Madrid' } },
      ...certs.map(c => ({
        '@type': 'EducationalOccupationalCredential', name: titleCase(c.title), credentialCategory: 'certificate',
        recognizedBy: { '@type': 'Organization', name: titleCase(c.org) }, dateCreated: isoMonth(c.year), url: c.credential || undefined,
      })),
    ],
    knowsLanguage: ['es', 'en'],
    knowsAbout: [
      'Inteligencia artificial', 'IA generativa', 'Agentes de IA', 'Model Context Protocol (MCP)', 'Python', 'LangChain', 'LangGraph',
      'LiteLLM', 'Temporal.io', 'OpenAI', 'Agentes ReAct', 'Prompt Engineering', 'Spec-Driven Development', 'Machine Learning',
      'Java', 'Spring Boot', 'Spring Modulith', 'Kotlin', 'Scala', 'Play Framework', 'FastAPI', 'Node.js', 'Express',
      'TypeScript', 'JavaScript', 'React', 'Vite', 'TailwindCSS', 'HTML', 'CSS', 'Rust', 'Tauri', 'SQLite', 'MySQL', 'Docker',
      'API REST', 'Microservicios', 'Clean Architecture', 'SOLID', 'TDD', 'Mockito', 'Testcontainers', 'Git', 'Adobe Experience Manager (AEM)',
    ],
    sameAs: [GITHUB_URL, LINKEDIN_URL],
    image: [
      image('media/renzo-ramos-desarrollador-ia-madrid-portada.png', 931, 1302, 'Renzo Ramos, Junior AI Engineer en Madrid, con máscara blanca y sudadera negra', { '@id': ID.photo, name: 'Renzo Ramos, Junior AI Engineer y desarrollador de software en Madrid' }),
      image('img/renzo-ramos-ingeniero-inteligencia-artificial-madrid.jpg', 1200, 1200, 'Renzo Ramos, ingeniero de inteligencia artificial en Madrid', { url: `${SITE}/renzo-ramos-ingeniero-inteligencia-artificial-madrid.html` }),
      image('img/renzo-ramos-ingeniero-de-software.jpg', 1068, 1200, 'Renzo Ramos, ingeniero de software y Técnico Superior DAM', { url: `${SITE}/renzo-ramos-ingeniero-de-software.html` }),
      image('img/renzo-ramos-junior-ai-engineer-madrid.jpg', 957, 1049, 'Renzo Ramos, Junior AI Engineer en su escritorio de Madrid', { url: `${SITE}/renzo-ramos-junior-ai-engineer-madrid.html` }),
    ],
  };
}

function project(p) {
  const base = {
    '@id': `${SITE}/#proyecto-${slug(p.title)}`, name: p.title, alternateName: `${p.title} — ${titleCase(p.sub)}`,
    description: p.desc, url: p.live || `${SITE}/#proyectos`, dateCreated: p.created, inLanguage: 'es',
    author: { '@id': ID.person }, creator: { '@id': ID.person }, keywords: p.stack.join(', '),
    image: (p.images || []).map(i => image(i.src, 1536, 800, i.alt, { name: `${p.title}: ${i.alt}` })),
  };
  return p.code
    ? { '@type': 'SoftwareSourceCode', ...base, codeRepository: p.code, programmingLanguage: p.languages }
    : { '@type': 'WebApplication', ...base, applicationCategory: 'EducationalApplication', operatingSystem: 'Web', isAccessibleForFree: true,
        offers: { '@type': 'Offer', price: 0, priceCurrency: 'EUR' } };
}

export function homeJsonLd({ lastModified }) {
  const graph = [
    person(),
    {
      '@type': 'WebSite', '@id': ID.website, url: `${SITE}/`, name: 'Renzo Ramos Portafolio', alternateName: 'Renzo Ramos',
      inLanguage: 'es-ES', author: { '@id': ID.person }, publisher: { '@id': ID.person },
    },
    {
      '@type': 'ProfilePage', '@id': ID.page, url: `${SITE}/`,
      name: 'Junior AI Engineer y Desarrollador en Madrid | Renzo Ramos',
      description: 'Portafolio de Renzo Ramos, Junior AI Engineer y desarrollador de software en Madrid: agentes de IA con Python y LangChain y APIs con Java.',
      inLanguage: 'es-ES', isPartOf: { '@id': ID.website }, about: { '@id': ID.person }, mainEntity: { '@id': ID.person },
      primaryImageOfPage: { '@id': ID.photo }, breadcrumb: { '@id': ID.breadcrumb }, dateModified: lastModified,
      hasPart: [{ '@id': ID.projects }, { '@id': ID.faq }],
    },
    {
      '@type': 'BreadcrumbList', '@id': ID.breadcrumb,
      itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE}/` }],
    },
    {
      '@type': 'ItemList', '@id': ID.projects, name: 'Proyectos de Renzo Ramos', numberOfItems: projects.length,
      itemListElement: projects.map((p, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@id': `${SITE}/#proyecto-${slug(p.title)}` } })),
    },
    ...projects.map(project),
    {
      '@type': 'FAQPage', '@id': ID.faq, url: `${SITE}/#preguntas`, inLanguage: 'es-ES', isPartOf: { '@id': ID.page },
      mainEntity: faq.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    },
  ];
  const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 2).replace(/</g, '\\u003c');
  return `<script type="application/ld+json">\n${json}\n  </script>`;
}
