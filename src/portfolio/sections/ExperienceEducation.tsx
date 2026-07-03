import type { CSSProperties } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { getExperience } from '../data/experience'
import { getEducation } from '../data/education'

const cardStyle: CSSProperties = { background: '#fff', borderRadius: 24, padding: '40px 36px' }
const titleStyle: CSSProperties = { margin: '0 0 24px', fontSize: 24, fontWeight: 600, letterSpacing: '-.02em' }
const rowStyle: CSSProperties = { padding: '18px 0', borderTop: '1px solid rgba(0,0,0,.08)' }
const headRow: CSSProperties = { display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'baseline' }
const periodStyle: CSSProperties = { fontFamily: "ui-monospace,'SF Mono',Menlo,monospace", fontSize: 11.5, color: '#86868b', whiteSpace: 'nowrap' }

/** Separa el desc en intro (primer párrafo) y viñetas ("- ..."). */
function parseDesc(desc: string): { intro: string; bullets: string[] } {
  const [first, ...rest] = desc.split('\n\n')
  const block = rest.join('\n\n')
  const bullets = block
    .split('\n')
    .map((l) => l.replace(/^[-•]\s*/, '').trim())
    .filter(Boolean)
  return { intro: first.trim(), bullets }
}

export function ExperienceEducation() {
  const { t, lang } = useLanguage()
  const experience = getExperience(lang)
  const education = getEducation(lang)

  return (
    <section id="experiencia" style={{ maxWidth: 1024, margin: '0 auto', padding: '48px 22px 20px' }}>
      <div className="exp-grid">
        <div style={cardStyle}>
          <h2 style={titleStyle}>{t('exp_title')}</h2>
          {experience.map((e) => {
            const { intro, bullets } = parseDesc(e.desc)
            return (
              <div key={`${e.company}-${e.title}`} style={rowStyle}>
                <div style={headRow}>
                  <div style={{ fontSize: 17, fontWeight: 600 }}>{e.title}</div>
                  <div style={periodStyle}>{e.period}</div>
                </div>
                <div style={{ fontSize: 14.5, color: '#0066cc', marginTop: 3 }}>{e.company} · {e.location}</div>
                {intro && <div style={{ fontSize: 14, lineHeight: 1.5, color: '#6e6e73', marginTop: 8 }}>{intro}</div>}
                {bullets.length > 0 && (
                  <ul style={{ margin: '10px 0 0', paddingLeft: 20, listStyleType: 'disc', listStylePosition: 'outside', display: 'flex', flexDirection: 'column', gap: 5 }}>
                    {bullets.map((b, i) => (
                      <li key={i} style={{ fontSize: 13.5, lineHeight: 1.5, color: '#6e6e73', display: 'list-item' }}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            )
          })}
        </div>

        <div id="educacion" style={cardStyle}>
          <h2 style={titleStyle}>{t('edu_title')}</h2>
          {education.map((e) => (
            <div key={`${e.company}-${e.title}`} style={rowStyle}>
              <div style={headRow}>
                <div style={{ fontSize: 17, fontWeight: 600 }}>{e.title}</div>
                <div style={periodStyle}>{e.period}</div>
              </div>
              <div style={{ fontSize: 14.5, color: '#0066cc', marginTop: 3 }}>{e.company} · {e.location}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
