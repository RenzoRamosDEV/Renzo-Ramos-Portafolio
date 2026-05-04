import { useScrollFusion } from '../../hooks/useScrollFusion'

const NAV_ITEMS = [
  { label: 'Sobre mí', targetId: 'sobre-mi' },
  { label: 'Trayectoria', targetId: 'proyectos' },
  { label: 'Experiencia', targetId: 'experiencia' },
  { label: 'Stack', targetId: 'stack' },
  { label: 'Metodologías', targetId: 'metodologias' },
]

const FUSED_SECTIONS = ['proyectos', 'experiencia', 'experiencia-formacion', 'stack', 'metodologias']

const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
  e.preventDefault()
  document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' })
}

export function Navbar() {
  const { scrolled, fused } = useScrollFusion(FUSED_SECTIONS)
  const borderColor = scrolled && !fused ? 'rgba(255,255,255,0.1)' : 'transparent'

  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 z-50 transition-all duration-300">
      <nav
        style={{ backgroundColor: '#000000', borderColor }}
        className={`transition-all duration-300 shadow-lg border ${scrolled && !fused
            ? 'rounded-full px-6 py-2 mt-4 backdrop-blur-md'
            : 'rounded-b-xl md:rounded-b-2xl px-3 py-2 md:px-10 md:py-2.5 lg:px-14 lg:py-3'
          }`}
      >
        <ul className="flex items-center gap-3 sm:gap-5 md:gap-8 lg:gap-10 list-none m-0 p-0 flex-nowrap">
          {NAV_ITEMS.map(({ label, targetId }) => (
            <li key={targetId}>
              <a
                href={`#${targetId}`}
                onClick={(e) => handleNavClick(e, targetId)}
                className="nav-link text-[13px] sm:text-sm md:text-sm lg:text-base font-medium no-underline whitespace-nowrap"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
