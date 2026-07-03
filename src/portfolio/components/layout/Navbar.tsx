import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, MouseEvent } from 'react'
import { Globe, Menu, X } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'
import type { Lang } from '../../i18n/translations'
import { scrollToSection } from '../../utils/scroll'

const LANGS: { code: Lang; label: string }[] = [
  { code: 'es', label: 'Español' },
  { code: 'en', label: 'English' },
]

export function Navbar() {
  const { t, lang, setLang } = useLanguage()
  const [open, setOpen] = useState(false) // desplegable de idioma
  const [navOpen, setNavOpen] = useState(false) // menú móvil
  const menuRef = useRef<HTMLDivElement>(null)

  const NAV_ITEMS: { id: string; label: string; href?: string }[] = [
    { id: 'personal', label: t('nav_personal'), href: '/renzo-ramos-desarrollador-de-software.html' },
    { id: 'proyectos', label: t('nav_projects') },
    { id: 'stack', label: t('nav_stack') },
    { id: 'experiencia', label: t('nav_exp') },
    { id: 'educacion', label: t('nav_edu') },
    { id: 'contacto', label: t('nav_contact') },
  ]

  const go = (e: MouseEvent, id: string) => {
    e.preventDefault()
    setNavOpen(false)
    scrollToSection(id)
  }

  // Cierra el desplegable de idioma al hacer clic fuera o con Escape.
  useEffect(() => {
    if (!open) return
    const onDown = (e: globalThis.MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const choose = (code: Lang) => {
    setLang(code)
    setOpen(false)
  }

  const linkStyle: CSSProperties = { textDecoration: 'none', color: 'inherit', opacity: 0.85, fontSize: 12.5 }

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(245,245,247,.78)',
        backdropFilter: 'saturate(180%) blur(20px)',
        WebkitBackdropFilter: 'saturate(180%) blur(20px)',
        borderBottom: '1px solid rgba(0,0,0,.09)',
      }}
    >
      <div style={{ maxWidth: 1024, margin: '0 auto', height: 48, padding: '0 22px', display: 'flex', alignItems: 'center', gap: 24 }}>
        <a href="#top" onClick={(e) => { e.preventDefault(); setNavOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }} style={{ textDecoration: 'none', color: '#1d1d1f', fontSize: 18, fontWeight: 600, letterSpacing: '-.02em', whiteSpace: 'nowrap' }}>
          Renzo Ramos
        </a>

        <nav className="nav-links" style={{ color: '#1d1d1f' }}>
          {NAV_ITEMS.map((item) =>
            item.href ? (
              <a key={item.id} href={item.href} style={linkStyle}>{item.label}</a>
            ) : (
              <a key={item.id} href={`#${item.id}`} onClick={(e) => go(e, item.id)} style={linkStyle}>{item.label}</a>
            )
          )}
        </nav>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Selector de idioma */}
          <div ref={menuRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-haspopup="listbox"
              aria-expanded={open}
              aria-label="Idioma / Language"
              style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: '1px solid rgba(0,0,0,.22)', borderRadius: 999, padding: '5px 10px', color: '#1d1d1f' }}
            >
              <Globe size={16} strokeWidth={1.8} />
              <span style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase' }}>{lang}</span>
            </button>
            {open && (
              <div role="listbox" style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, minWidth: 132, background: '#fff', border: '1px solid rgba(0,0,0,.08)', borderRadius: 12, boxShadow: '0 10px 30px rgba(0,0,0,.12)', padding: 6, zIndex: 60 }}>
                {LANGS.map((l) => {
                  const selected = l.code === lang
                  return (
                    <button
                      key={l.code}
                      role="option"
                      aria-selected={selected}
                      onClick={() => choose(l.code)}
                      style={{ width: '100%', textAlign: 'left', cursor: 'pointer', background: selected ? '#f5f5f7' : 'none', border: 'none', borderRadius: 8, padding: '9px 12px', fontSize: 14, fontWeight: selected ? 600 : 400, color: '#1d1d1f', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}
                    >
                      {l.label}
                      {selected && <span style={{ color: '#0066cc' }}>✓</span>}
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* Botón hamburguesa (solo móvil) */}
          <button
            className="nav-burger"
            onClick={() => setNavOpen((v) => !v)}
            aria-label="Menú"
            aria-expanded={navOpen}
            style={{ cursor: 'pointer', alignItems: 'center', justifyContent: 'center', background: 'none', border: '1px solid rgba(0,0,0,.22)', borderRadius: 999, width: 34, height: 30, color: '#1d1d1f', padding: 0 }}
          >
            {navOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Panel del menú móvil */}
      {navOpen && (
        <div style={{ borderTop: '1px solid rgba(0,0,0,.08)', background: 'rgba(245,245,247,.96)', padding: '8px 22px 14px' }}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={item.href ?? `#${item.id}`}
              onClick={item.href ? () => setNavOpen(false) : (e) => go(e, item.id)}
              style={{ display: 'block', textDecoration: 'none', color: '#1d1d1f', fontSize: 16, padding: '11px 2px', borderBottom: '1px solid rgba(0,0,0,.06)' }}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
