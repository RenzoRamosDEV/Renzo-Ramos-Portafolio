import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useScrollFusion } from '../../hooks/useScrollFusion'
import { useLanguage } from '../../i18n/LanguageContext'

const NAV_SECTION_IDS = ['sobre-mi', 'proyectos', 'experiencia', 'stack', 'metodologias']
const FUSED_SECTIONS = ['proyectos', 'experiencia', 'experiencia-formacion', 'stack', 'metodologias']

const scrollTo = (e: React.MouseEvent, targetId: string, onDone?: () => void) => {
  e.preventDefault()
  document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' })
  onDone?.()
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    const observers = ids.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [ids])

  return active
}

function LangButton() {
  const { lang, setLang } = useLanguage()
  return (
    <button
      onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
      className="nav-link text-sm lg:text-base font-medium whitespace-nowrap transition-colors duration-300 bg-transparent border-0 cursor-pointer px-0 flex items-center gap-1.5"
      style={{ color: 'rgba(167,180,188,0.7)' }}
    >
      🌐 {lang === 'es' ? 'ES' : 'EN'}
    </button>
  )
}

export function Navbar() {
  const { scrolled, fused } = useScrollFusion(FUSED_SECTIONS)
  const activeSection = useActiveSection(NAV_SECTION_IDS)
  const isFloating = scrolled && !fused
  const borderColor = isFloating ? 'rgba(255,255,255,0.1)' : 'transparent'
  const { t } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const navItems = [
    { label: t('nav_about'),         targetId: 'sobre-mi'     },
    { label: t('nav_projects'),      targetId: 'proyectos'    },
    { label: t('nav_experience'),    targetId: 'experiencia'  },
    { label: t('nav_stack'),         targetId: 'stack'        },
    { label: t('nav_methodologies'), targetId: 'metodologias' },
  ]

  useEffect(() => {
    if (!menuOpen) return
    const handler = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [menuOpen])

  return (
    <>
      {/* ── Desktop nav + pill idioma — centrados juntos ── */}
      <div className="hidden md:flex items-start gap-2 fixed top-0 left-1/2 -translate-x-1/2 z-50">
        <nav
          style={{ backgroundColor: '#000000', borderColor }}
          className={`transition-all duration-300 shadow-lg border ${
            !scrolled
              ? 'rounded-b-xl md:rounded-b-2xl px-10 py-2.5 lg:px-14 lg:py-3'
              : 'rounded-full px-6 py-2 mt-4 backdrop-blur-md'
          }`}
        >
          <ul className="flex items-center gap-8 lg:gap-10 list-none m-0 p-0 flex-nowrap">
            {navItems.map(({ label, targetId }) => (
              <li key={targetId}>
                <a
                  href={`#${targetId}`}
                  onClick={e => scrollTo(e, targetId)}
                  className="nav-link text-sm lg:text-base font-medium no-underline whitespace-nowrap transition-colors duration-300"
                  style={{ color: activeSection === targetId ? '#ffffff' : undefined }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div
          style={{ backgroundColor: '#000000', borderColor }}
          className={`transition-all duration-300 shadow-lg border ${
            !scrolled
              ? 'rounded-b-xl px-5 py-2.5 lg:py-3'
              : 'rounded-full px-5 py-2 mt-4 backdrop-blur-md'
          }`}
        >
          <LangButton />
        </div>
      </div>

      {/* ── Mobile nav ── */}
      <div ref={menuRef} className="md:hidden fixed top-0 left-1/2 -translate-x-1/2 z-50">
        <div
          style={{ backgroundColor: '#000000', borderColor }}
          className={`flex items-center justify-between gap-3 transition-all duration-300 shadow-lg border ${
            !scrolled
              ? 'rounded-b-xl px-4 py-2'
              : 'rounded-full px-4 py-2 mt-3 backdrop-blur-md'
          }`}
        >
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="flex items-center gap-1.5 bg-transparent border-0 cursor-pointer text-[#A7B4BC]/70 hover:text-white transition-colors duration-200 p-1"
            aria-label="Menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            <span className="text-[13px] font-medium">Menu</span>
          </button>

          <LangButton />
        </div>

        {menuOpen && (
          <div
            style={{ backgroundColor: '#0a0a0a', borderColor: 'rgba(255,255,255,0.08)' }}
            className="absolute top-full left-0 mt-1.5 min-w-[160px] rounded-2xl border shadow-2xl overflow-hidden"
          >
            {navItems.map(({ label, targetId }, i) => (
              <a
                key={targetId}
                href={`#${targetId}`}
                onClick={e => scrollTo(e, targetId, () => setMenuOpen(false))}
                className="flex items-center gap-2 px-4 py-3 text-[13px] font-medium no-underline transition-colors duration-150 hover:bg-white/5"
                style={{
                  color: activeSection === targetId ? '#ffffff' : 'rgba(167,180,188,0.65)',
                  borderTop: i > 0 ? '1px solid rgba(255,255,255,0.05)' : undefined,
                }}
              >
                {activeSection === targetId && (
                  <span className="w-1 h-1 rounded-full bg-white flex-shrink-0" />
                )}
                {label}
              </a>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
