import { useLanguage } from '../i18n/LanguageContext'
import { getCertificates } from '../data/certificates'

export function Certificates() {
  const { t, lang } = useLanguage()
  const certs = getCertificates(lang)

  return (
    <section id="certificados" style={{ maxWidth: 1024, margin: '0 auto', padding: '48px 22px 20px' }}>
      <h2 style={{ margin: '0 0 20px', fontSize: 24, fontWeight: 600, letterSpacing: '-.02em' }}>{t('cert_title')}</h2>
      <div className="cert-grid">
        {certs.map((c) => (
          <a
            key={c.title}
            href={c.credential || c.pdf || '#'}
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: 'none', color: '#1d1d1f', background: '#fff', borderRadius: 18, padding: '26px 24px', display: 'block' }}
          >
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.04em', textTransform: 'uppercase', color: '#bf4800' }}>{c.company}</div>
            <div style={{ fontSize: 17, fontWeight: 600, lineHeight: 1.3, marginTop: 10 }}>{c.title}</div>
            <div style={{ fontSize: 13.5, color: '#6e6e73', lineHeight: 1.45, marginTop: 10 }}>{c.desc}</div>
            <div style={{ fontSize: 14, color: '#0066cc', marginTop: 16 }}>{t('cert_view')} ↗</div>
          </a>
        ))}
      </div>
    </section>
  )
}
