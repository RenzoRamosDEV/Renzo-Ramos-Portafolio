// llms.txt y llms-full.txt (estándar llmstxt.org): resumen y contenido completo en Markdown para asistentes de IA.
// Se generan en cada build desde src/data/ (lo mismo que se ve en la web); en dev se sirven en /llms.txt y /llms-full.txt.
import { execSync } from 'node:child_process';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { niceCase } from './text.js';

const SITE = 'https://portafolio-renzoramos.com';
const MONTHS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

const lower = s => s.toLowerCase();
// Centros de estudio con su nombre completo
const CENTERS = { ISIL: 'ISIL (Instituto San Ignacio de Loyola)', CESUR: 'CESUR Madrid', '42 MADRID': '42 Madrid · Fundación Telefónica' };

function updated(root) {
  try { return new Date(execSync('git log -1 --format=%cI', { cwd: root, stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim()); }
  catch { return new Date(); }
}

async function data(root) {
  const load = f => import(`${pathToFileURL(resolve(root, f)).href}?t=${Date.now()}`);
  const [{ profile, experienceLength }, { projects }, { jobs }, { studies }, { certs }, { personal }, site] = await Promise.all(
    ['profile', 'projects', 'experience', 'education', 'certificates', 'personal', 'site'].map(n => load(`src/data/${n}.js`)));
  return { profile, experienceLength, projects, jobs, studies, certs, personal, site };
}

const projectLine = p => `- [${p.title}](${p.live || p.code}): ${p.desc}${p.code && p.live ? ` Código: ${p.code}` : ''}`;

export async function buildLlms(root) {
  const d = await data(root), { profile } = d, date = updated(root);
  const updatedText = `${date.getDate()} de ${MONTHS[date.getMonth()]} de ${date.getFullYear()}`;
  const current = d.jobs.find(j => j.to === 'ACTUALIDAD');

  const short = `# ${profile.name} — ${profile.role} y desarrollador de software en Madrid

> ${profile.summary} ${current ? `Trabaja como ${profile.role} en el equipo de AI & Data de ${current.company}.` : ''} ${profile.availability}.

Portafolio personal en español. Todo el contenido de la web está también en Markdown en
[llms-full.txt](${SITE}/llms-full.txt). Última actualización: ${updatedText}.

## Páginas

- [Portafolio de ${profile.name}](${SITE}/): página principal con proyectos, experiencia, educación, certificados y contacto.
- [Sobre mí](${SITE}/personal.html): su historia, de Perú a Madrid, su formación y sus objetivos.
- [Contenido completo en Markdown](${SITE}/llms-full.txt): perfil, experiencia, formación, certificados, proyectos e historia personal.

## Proyectos

${d.projects.map(projectLine).join('\n')}

## Perfiles y contacto

- [GitHub](${d.site.GITHUB_URL}): código de sus proyectos.
- [LinkedIn](${d.site.LINKEDIN_URL}): perfil profesional.
- Email: ${profile.email}
- [Formulario de contacto](${SITE}/#contacto)

## Optional

- [Foto: ${profile.name}, ingeniero de inteligencia artificial en Madrid](${SITE}/renzo-ramos-ingeniero-inteligencia-artificial-madrid.html)
- [Foto: ${profile.name}, ingeniero de software](${SITE}/renzo-ramos-ingeniero-de-software.html)
- [Foto: ${profile.name}, Junior AI Engineer en su escritorio](${SITE}/renzo-ramos-junior-ai-engineer-madrid.html)
- [Licencia de las imágenes](${SITE}/licencia-imagenes.html): © ${profile.name}, todos los derechos reservados.
- [Sitemap](${SITE}/sitemap.xml)
`;

  const full = `# ${profile.name} — ${profile.role} y desarrollador de software en Madrid

> ${profile.summary}

Fuente: ${SITE}/ · Última actualización: ${updatedText} · Idioma: español

## Resumen

- **Nombre:** ${profile.name} (${profile.fullName})
- **Rol actual:** ${current ? `${profile.role} · AI & Data en ${current.company}` : profile.role}
- **Ciudad:** ${profile.location}
- **Experiencia:** ${d.experienceLength(profile.experienceSince, date)} como desarrollador (desde ${MONTHS[+profile.experienceSince.slice(5) - 1]} de ${profile.experienceSince.slice(0, 4)})
- **Formación:** ${profile.degree}
- **Stack principal:** ${profile.mainStack}
- **Idiomas:** ${profile.languages}
- **Disponibilidad:** ${profile.availability}

## Contacto

- **Email:** ${profile.email}
- **Teléfono:** ${profile.phone}
- **LinkedIn:** ${d.site.LINKEDIN_URL}
- **GitHub:** ${d.site.GITHUB_URL}
- **Web:** ${SITE}/

## Stack técnico

${profile.stack.map(([k, v]) => `- **${k}:** ${v}`).join('\n')}

## Experiencia

${[...d.jobs].reverse().map(j => `### ${niceCase(j.role)} — ${j.company} (${lower(j.from)} – ${lower(j.to)}, ${niceCase(j.place)})

${j.left[1]}

${j.list.map(x => `- ${x}`).join('\n')}`).join('\n\n')}

## Formación

${[...d.studies].reverse().map(s => `- **${niceCase(s.degree)}**${s.degree.includes(s.center) ? '' : ` — ${CENTERS[s.center] || s.center}`} (${lower(s.from)} – ${lower(s.to)}, ${niceCase(s.place)}): ${s.text}`).join('\n')}

## Certificados

${d.certs.map(c => `- **${niceCase(c.title)}** — ${niceCase(c.org)} (${lower(c.year)})${c.credential ? `. Credencial: ${c.credential}` : ''}`).join('\n')}

## Proyectos

${d.projects.map(p => `### ${p.title} — ${niceCase(p.sub)}

${p.details}

- **Tecnologías:** ${p.stack.join(', ')}
${p.live ? `- **Web:** ${p.live}\n` : ''}${p.code ? `- **Código:** ${p.code}` : '- **Código:** privado'}
- **Repositorio creado:** ${p.created}`).join('\n\n')}

## Mi historia

${d.personal.chapters.map(c => `### ${niceCase(c.title)}

${c.text}`).join('\n\n')}


## Sobre esta web

- Web estática hecha a mano con HTML, CSS y JavaScript (módulos ES) y Vite; el contenido se prerenderiza en el HTML.
- Publicada en GitHub Pages con dominio propio: ${SITE}/
- Fotos y capturas: © ${profile.name}, todos los derechos reservados (${SITE}/licencia-imagenes.html).
`;
  return { short, full };
}

export function llms() {
  let root;
  return {
    name: 'llms-txt',
    configResolved(config) { root = config.root; },
    configureServer(server) {
      for (const [path, key] of [['/llms.txt', 'short'], ['/llms-full.txt', 'full']]) {
        server.middlewares.use(path, async (req, res) => {
          res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
          res.end((await buildLlms(root))[key]);
        });
      }
    },
    async generateBundle() {
      const { short, full } = await buildLlms(root);
      this.emitFile({ type: 'asset', fileName: 'llms.txt', source: short });
      this.emitFile({ type: 'asset', fileName: 'llms-full.txt', source: full });
    },
  };
}
