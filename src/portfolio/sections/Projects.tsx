import { useLanguage } from '../i18n/LanguageContext'
import { getProjects } from '../data/projects'
import type { Project } from '../data/projects'
import type { TranslationKey } from '../i18n/translations'

type CardMeta = {
  name: string
  eyebrowKey: TranslationKey
  blurbKey: TranslationKey
  tech: string
  dark: boolean
  eyebrowColor: string
}

const CARDS: CardMeta[] = [
  { name: 'Booqi', eyebrowKey: 'p1_eyebrow', blurbKey: 'p1_blurb', tech: 'Java · Spring Boot · MySQL · Docker · React', dark: true, eyebrowColor: '#ff7a4d' },
  { name: 'Redactor IA', eyebrowKey: 'p2_eyebrow', blurbKey: 'p2_blurb', tech: 'React · Node.js · Gemini · Groq', dark: false, eyebrowColor: '#bf4800' },
  { name: 'Pokédex', eyebrowKey: 'p3_eyebrow', blurbKey: 'p3_blurb', tech: 'Scala · Play · Python · MCP · OpenAI', dark: true, eyebrowColor: '#ff7a4d' },
]

export function Projects({ onOpen }: { onOpen: (project: Project) => void }) {
  const { t, lang } = useLanguage()
  const projects = getProjects(lang)

  return (
    <section id="proyectos" style={{ maxWidth: 1024, margin: '0 auto', padding: '40px 22px 20px' }}>
      <h2 style={{ margin: '0 0 4px', fontSize: 'clamp(28px,4vw,40px)', fontWeight: 600, letterSpacing: '-.02em' }}>
        {t('proj_title')} <span style={{ color: '#86868b' }}>{t('proj_sub')}</span>
      </h2>
      <div className="proj-grid" style={{ padding: '28px 0 12px' }}>
        {CARDS.map((card, i) => {
          const project = projects[i]
          const textColor = card.dark ? '#f5f5f7' : '#1d1d1f'
          const blurbColor = card.dark ? 'rgba(245,245,247,.78)' : '#6e6e73'
          const techColor = card.dark ? 'rgba(245,245,247,.55)' : '#86868b'
          const moreColor = card.dark ? '#ff7a4d' : '#0066cc'
          return (
            <div
              key={card.name}
              role="button"
              tabIndex={0}
              onClick={() => project && onOpen(project)}
              onKeyDown={(e) => { if (project && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); onOpen(project) } }}
              style={{
                cursor: 'pointer',
                background: card.dark ? '#1d1d1f' : '#ffffff',
                color: textColor,
                borderRadius: 20,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ padding: '26px 26px 18px' }}>
                <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.04em', textTransform: 'uppercase', color: card.eyebrowColor }}>
                  {t(card.eyebrowKey)}
                </div>
                <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: '-.02em', marginTop: 8 }}>{card.name}</div>
                <div style={{ fontSize: 15, lineHeight: 1.4, marginTop: 8, color: blurbColor }}>{t(card.blurbKey)}</div>
                <div style={{ fontSize: 11.5, marginTop: 14, color: techColor }}>{card.tech}</div>
                <div style={{ fontSize: 13, fontWeight: 500, marginTop: 14, color: moreColor }}>{t('detail_more')} ›</div>
              </div>
              {project?.images?.[0] && (
                <div style={{ marginTop: 'auto', padding: '0 18px 18px' }}>
                  <img
                    src={project.images[0]}
                    alt={card.name}
                    style={{ width: '100%', aspectRatio: '16 / 10', objectFit: 'cover', objectPosition: 'top', borderRadius: 12, display: 'block' }}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
