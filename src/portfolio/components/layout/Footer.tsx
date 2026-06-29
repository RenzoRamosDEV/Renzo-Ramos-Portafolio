import { useLanguage } from '../../i18n/LanguageContext'

export function Footer() {
  const { t } = useLanguage()
  return (
    <footer style={{ borderTop: '1px solid rgba(0,0,0,.09)' }}>
      <div
        style={{
          maxWidth: 1024,
          margin: '0 auto',
          padding: '24px 22px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 10,
          justifyContent: 'space-between',
          fontSize: 12,
          color: '#86868b',
        }}
      >
        <span>Copyright © 2026 Renzo Ramos. {t('footer_note')}</span>
        <div style={{ display: 'flex', gap: 20 }}>
          <a href="https://github.com/RenzoRamosDEV" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: '#86868b' }}>GitHub</a>
          <a href="https://www.linkedin.com/in/renzoinv04/" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: '#86868b' }}>LinkedIn</a>
        </div>
      </div>
    </footer>
  )
}
