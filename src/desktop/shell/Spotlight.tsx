import { useEffect, useMemo, useRef, useState } from 'react'
import { APPS, DOCK_IDS } from '../apps/manifest'
import type { Theme } from './desktop-context'

type SpotItem = { t: string; k: string; app: string; ico: string; c: string }

const EXTRA: SpotItem[] = [
  { t: 'Booqi', k: 'Proyecto · Microservicios', app: 'proj-booqi', ico: 'B', c: 'd-proj' },
  { t: 'Sistema de Inventario', k: 'Proyecto · Full-stack', app: 'proj-inv', ico: 'I', c: 'd-stack' },
  { t: 'Cambiar tema', k: 'Claro / Oscuro', app: 'theme', ico: '☾', c: 'd-spot' },
]

const INDEX: SpotItem[] = [
  ...DOCK_IDS.map(id => ({ t: APPS[id].title, k: 'App', app: id, ico: APPS[id].icon, c: APPS[id].dockClass })),
  ...EXTRA,
]

type Props = {
  open: boolean
  onClose: () => void
  onLaunch: (id: string) => void
  theme: Theme
  setTheme: (t: Theme) => void
}

export function Spotlight({ open, onClose, onLaunch, theme, setTheme }: Props) {
  const [query, setQuery] = useState('')
  const [sel, setSel] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return INDEX.filter(i => i.t.toLowerCase().includes(q) || i.k.toLowerCase().includes(q))
  }, [query])

  useEffect(() => {
    if (open) {
      setQuery('')
      setSel(0)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  useEffect(() => setSel(0), [query])

  function run(item: SpotItem | undefined) {
    if (!item) return
    onClose()
    if (item.app === 'theme') setTheme(theme === 'dark' ? 'light' : 'dark')
    else onLaunch(item.app)
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') onClose()
    else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSel(s => Math.min(filtered.length - 1, s + 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSel(s => Math.max(0, s - 1))
    } else if (e.key === 'Enter') {
      run(filtered[sel])
    }
  }

  return (
    <div
      className={`spot-overlay ${open ? 'on' : ''}`}
      onClick={e => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="spot">
        <input
          ref={inputRef}
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Buscar en el portafolio…"
          autoComplete="off"
        />
        <div className="results">
          {filtered.length === 0 ? (
            <div className="res">
              <div className="rt" style={{ color: 'var(--text2)' }}>
                Sin resultados
              </div>
            </div>
          ) : (
            filtered.map((r, i) => (
              <div
                key={r.app + r.t}
                className={`res ${i === sel ? 'sel' : ''}`}
                onMouseEnter={() => setSel(i)}
                onClick={() => run(r)}
              >
                <div className={`ico ${r.c}`}>{r.ico}</div>
                <div className="rt">{r.t}</div>
                <div className="rk">{r.k}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
