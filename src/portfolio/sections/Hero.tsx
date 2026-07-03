import type { CSSProperties, ReactNode } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { scrollToSection } from '../utils/scroll'
import cvPdf from '../../assets/cv/cv-renzo-ramos.pdf'
import githubIcon from '../../assets/ICON CONSTACTO/github_3291695.png'
import linkedinIcon from '../../assets/ICON CONSTACTO/linkedin_2582545.png'
import cvIcon from '../../assets/ICON CONSTACTO/file_15483541.png'

const linkStyle: CSSProperties = { textDecoration: 'none', color: '#0066cc', display: 'inline-flex', alignItems: 'center', gap: 8 }
const iconStyle: CSSProperties = { width: 18, height: 18, objectFit: 'contain', flex: '0 0 auto' }

const ICON_PROPS = {
  width: 34,
  height: 34,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: '#1d1d1f',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

function QuickLink({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return (
    <a
      href={href}
      onClick={href.startsWith('#') ? (e) => { e.preventDefault(); scrollToSection(href.replace('#', '')) } : undefined}
      style={{ textDecoration: 'none', color: '#1d1d1f', flex: '0 0 auto', width: 96, textAlign: 'center' }}
    >
      <div
        style={{
          width: 84,
          height: 84,
          margin: '0 auto',
          borderRadius: '50%',
          background: '#fff',
          boxShadow: '0 4px 14px rgba(0,0,0,.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg {...ICON_PROPS}>{children}</svg>
      </div>
      <div style={{ fontSize: 12, marginTop: 11 }}>{label}</div>
    </a>
  )
}

export function Hero() {
  const { t } = useLanguage()

  return (
    <section id="top" style={{ maxWidth: 1024, margin: '0 auto', padding: '80px 22px 56px' }}>
      <div className="hero-grid">
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', color: '#bf4800', marginBottom: 16 }}>
            {t('hero_eyebrow')}
          </div>
          <h1 style={{ margin: 0, fontSize: 'clamp(40px,6.5vw,72px)', lineHeight: 1.04, fontWeight: 600, letterSpacing: '-.03em' }}>
            {t('hero_h')}
          </h1>
          <p style={{ margin: '18px 0 0', fontSize: 21, lineHeight: 1.4, color: '#6e6e73', fontWeight: 400 }}>
            {t('hero_role')}
          </p>
        </div>
        <div style={{ paddingTop: 10 }}>
          <p style={{ margin: '0 0 18px', fontSize: 19, lineHeight: 1.45, color: '#1d1d1f', fontWeight: 600, letterSpacing: '-.01em' }}>
            {t('hero_tag')}
          </p>
          <div className="hero-links" style={{ fontSize: 17 }}>
            <a className="blue" href="https://github.com/RenzoRamosDEV" target="_blank" rel="noreferrer" style={linkStyle}>
              <img src={githubIcon} alt="" style={iconStyle} />GitHub ↗
            </a>
            <a className="blue" href="https://www.linkedin.com/in/renzoinv04/" target="_blank" rel="noreferrer" style={linkStyle}>
              <img src={linkedinIcon} alt="" style={iconStyle} />LinkedIn ↗
            </a>
            <a className="blue" href={cvPdf} target="_blank" rel="noreferrer" style={linkStyle}>
              <img src={cvIcon} alt="" style={iconStyle} />{t('hero_link_cv')} ↗
            </a>
          </div>
        </div>
      </div>

      <div className="qscroll" style={{ marginTop: 64, overflowX: 'auto', paddingBottom: 8 }}>
        <div style={{ display: 'flex', gap: 30, width: 'max-content', margin: '0 auto' }}>
          <QuickLink href="/renzo-ramos-desarrollador-de-software.html" label={t('ql_personal')}>
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" />
          </QuickLink>
          <QuickLink href="#proyectos" label={t('ql_projects')}>
            <path d="M3 7a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          </QuickLink>
          <QuickLink href="#stack" label="Stack">
            <polygon points="12 3 21 8 12 13 3 8" />
            <polyline points="3 13 12 18 21 13" />
          </QuickLink>
          <QuickLink href="#experiencia" label={t('ql_exp')}>
            <rect x="3" y="7" width="18" height="13" rx="2" />
            <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </QuickLink>
          <QuickLink href="#educacion" label={t('ql_edu')}>
            <path d="M2 9 12 4l10 5-10 5z" />
            <path d="M6 11v5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5" />
          </QuickLink>
          <QuickLink href="#certificados" label={t('ql_cert')}>
            <circle cx="12" cy="9" r="6" />
            <path d="M9 14l-1.5 7L12 19l4.5 2L15 14" />
          </QuickLink>
          <QuickLink href="#contacto" label={t('ql_contact')}>
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 7 9 6 9-6" />
          </QuickLink>
        </div>
      </div>
    </section>
  )
}
