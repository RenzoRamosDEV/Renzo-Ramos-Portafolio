import { ACCENTS, WALLS } from '../hooks/useConfig'
import { useConfigContext } from '../hooks/config-context'
import { useDesktop } from '../shell/desktop-context'
import type { Theme } from '../shell/desktop-context'

const ACCENT_TITLES: Record<string, string> = {
  '0071e3': 'Azul Apple',
  a855f7: 'Violeta',
  '22c1c3': 'Teal',
  f0a500: 'Dorado',
  ef4444: 'Rojo',
  '34c759': 'Verde',
}

const WALL_NAMES = Object.keys(WALLS)

const THEME_OPTS: { val: Theme | 'auto'; label: string }[] = [
  { val: 'light', label: '☀ Claro' },
  { val: 'dark', label: '☾ Oscuro' },
  { val: 'auto', label: '⬤ Auto' },
]

export function Config() {
  const { theme, setTheme } = useDesktop()
  const { accent, wall, speed, setAccent, setWall, setSpeed } = useConfigContext()

  function pickTheme(val: Theme | 'auto') {
    if (val === 'auto') setTheme(matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    else setTheme(val)
  }

  return (
    <div className="cfg">
      <div className="cfg-section">
        <div className="cfg-title">Apariencia</div>
        <div className="cfg-row">
          <div className="cfg-label">
            <span className="cfg-ico">☾</span>Tema
          </div>
          <div className="cfg-segmented">
            {THEME_OPTS.map(o => (
              <button key={o.val} className={theme === o.val ? 'active' : ''} onClick={() => pickTheme(o.val)}>
                {o.label}
              </button>
            ))}
          </div>
        </div>
        <div className="cfg-row">
          <div className="cfg-label">
            <span className="cfg-ico">◉</span>Color de acento
          </div>
          <div className="cfg-colors">
            {ACCENTS.map(hex => (
              <span
                key={hex}
                className={`cfg-dot ${accent === hex ? 'active' : ''}`}
                style={{ background: '#' + hex }}
                title={ACCENT_TITLES[hex]}
                onClick={() => setAccent(hex)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="cfg-section">
        <div className="cfg-title">Fondo de escritorio</div>
        <div className="cfg-wallpapers">
          {WALL_NAMES.map(name => (
            <div
              key={name}
              className={`cfg-wall-opt ${wall === name ? 'active' : ''}`}
              style={{ background: WALLS[name] }}
              onClick={() => setWall(name)}
            />
          ))}
        </div>
      </div>

      <div className="cfg-section">
        <div className="cfg-title">Animaciones</div>
        <div className="cfg-row">
          <div className="cfg-label">
            <span className="cfg-ico">◈</span>Velocidad de ventanas
          </div>
          <input
            className="cfg-range"
            type="range"
            min={50}
            max={500}
            step={50}
            value={speed}
            onChange={e => setSpeed(e.target.value)}
          />
          <span className="cfg-range-val">{speed}ms</span>
        </div>
      </div>

      <div className="cfg-section">
        <div className="cfg-title">Sobre este portafolio</div>
        <div className="cfg-info">
          <div className="cfg-info-row">
            <span>Versión</span>
            <span>3.0 · React</span>
          </div>
          <div className="cfg-info-row">
            <span>Stack</span>
            <span>React · TypeScript · Vite</span>
          </div>
          <div className="cfg-info-row">
            <span>Hosting</span>
            <span>GitHub Pages</span>
          </div>
          <div className="cfg-info-row">
            <span>Autor</span>
            <span>Renzo Ramos</span>
          </div>
        </div>
      </div>
    </div>
  )
}
