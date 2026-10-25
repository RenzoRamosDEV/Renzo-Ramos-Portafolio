// "Sobre mí en 30 segundos": respuesta directa + datos clave en texto plano (para reclutadores y asistentes de IA)
import { profile, experienceLength } from '../data/profile.js';
import { jobs } from '../data/experience.js';

const MONTHS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const longDate = d => `${d.getDate()} de ${MONTHS[d.getMonth()]} de ${d.getFullYear()}`;
const sinceText = ym => { const [y, m] = ym.split('-').map(Number); return `${MONTHS[m - 1]} de ${y}`; };

// updated: fecha de la última actualización (la pone el prerender con el último commit)
export function summary(updated = new Date()) {
  const current = jobs.find(j => j.to === 'ACTUALIDAD');
  const facts = [
    ['Nombre', `${profile.name} (${profile.fullName})`],
    ['Rol', current ? `${profile.role} · AI & Data en ${current.company}` : profile.role],
    ['Ciudad', profile.location],
    ['Experiencia', `${experienceLength(profile.experienceSince, updated)} como desarrollador (desde ${sinceText(profile.experienceSince)})`],
    ['Formación', profile.degree],
    ['Stack principal', profile.mainStack],
    ['Idiomas', profile.languages],
    ['Disponibilidad', profile.availability],
    ['Contacto', `<a href="mailto:${profile.email}">${profile.email}</a>`],
  ];
  return `<div class="summary" id="resumen">
    <h2 id="summary-title">SOBRE MÍ EN <em>30 SEGUNDOS</em></h2>
    <p class="summary-lead">${profile.summary}</p>
    <dl class="summary-facts">${facts.map(([k, v]) => `
      <div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}
    </dl>
    <p class="summary-updated">Actualizado el <time datetime="${updated.toISOString().slice(0, 10)}">${longDate(updated)}</time></p>
  </div>`;
}
