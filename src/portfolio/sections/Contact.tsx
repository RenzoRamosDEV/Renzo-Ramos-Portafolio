import { useLanguage } from '../i18n/LanguageContext'

export function Contact() {
  const { t } = useLanguage()

  return (
    <section id="contacto" style={{ maxWidth: 1024, margin: '0 auto', padding: '48px 22px 60px' }}>
      <div style={{ background: '#1d1d1f', color: '#f5f5f7', borderRadius: 28, padding: '72px 44px', textAlign: 'center' }}>
        <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', color: '#e0926f', marginBottom: 18 }}>
          {t('contact_eyebrow')}
        </div>
        <h2 style={{ margin: '0 auto', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 600, letterSpacing: '-.02em', lineHeight: 1.08, maxWidth: '18ch' }}>
          {t('contact_h')}
        </h2>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginTop: 34 }}>
          <a href="mailto:renzoramosivan@gmail.com" style={{ textDecoration: 'none', fontSize: 16, background: '#0071e3', color: '#fff', padding: '13px 28px', borderRadius: 999 }}>
            {t('contact_cta')}
          </a>
          <a href="https://www.linkedin.com/in/renzoinv04/" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', fontSize: 16, border: '1px solid rgba(245,245,247,.3)', color: '#f5f5f7', padding: '13px 28px', borderRadius: 999 }}>
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}
