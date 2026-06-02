import { useClock } from '../hooks/useTheme'
import { useDesktop } from './desktop-context'

export function MenuBar() {
  const { theme, setTheme } = useDesktop()
  const clock = useClock()

  return (
    <div className="menubar">
      <div className="ml">
        <b>Renzo Ramos</b>
        <span>Portafolio</span>
        <span>Proyectos</span>
        <span>Contacto</span>
      </div>
      <div className="mr">
        <span
          className="tbtn"
          id="themeBtn"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? '☀' : '☾'}
        </span>
        <span id="clock">{clock}</span>
      </div>
    </div>
  )
}
