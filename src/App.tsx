import { useCallback, useEffect, useRef, useState } from 'react'
import { MenuBar } from './desktop/MenuBar'
import { Dock } from './desktop/Dock'
import { DesktopIcons } from './desktop/DesktopIcons'
import { Window } from './desktop/Window'
import { Spotlight } from './desktop/Spotlight'
import { useWindowManager } from './desktop/useWindowManager'
import { DesktopContext } from './desktop/desktop-context'
import type { Rect } from './desktop/types'
import { APPS } from './apps/manifest'
import { APP_CONTENT } from './apps/registry'
import { useTheme } from './hooks/useTheme'
import { useConfig } from './hooks/useConfig'
import { ConfigContext } from './hooks/config-context'

export function App() {
  const [theme, setTheme] = useTheme()
  const config = useConfig()
  const [spotOpen, setSpotOpen] = useState(false)
  const cascade = useRef(0)

  const resolveRect = useCallback((id: string): Rect => {
    const { w, h } = APPS[id]?.size ?? { w: 560, h: 480 }
    const maxX = Math.max(20, window.innerWidth - w - 20)
    const maxY = Math.max(50, window.innerHeight - h - 90)
    const baseX = Math.round((window.innerWidth - w) / 2)
    const baseY = Math.round((window.innerHeight - h) / 2) - 10
    const off = (cascade.current++ % 5) * 28
    return {
      x: Math.min(Math.max(80, baseX + off), maxX),
      y: Math.min(Math.max(50, baseY + off), maxY),
      w,
      h,
    }
  }, [])

  const wm = useWindowManager(resolveRect)
  const { launch } = wm

  // Global Spotlight shortcut: ⌘/Ctrl + Space
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.code === 'Space') {
        e.preventDefault()
        setSpotOpen(v => !v)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Initial layout: Sobre mí (left) · Proyectos (top-right) · Trayectoria (bottom-right)
  useEffect(() => {
    const vw = window.innerWidth
    const vh = window.innerHeight
    const LEFT = 110
    const TOP = 130

    const aboutW = Math.round(vw * 0.46)
    const aboutH = Math.round(vh * 0.7)
    const projW = Math.round(vw * 0.26)
    const projH = Math.round(vh * 0.4)
    const pathW = Math.round(vw * 0.28)
    const pathH = Math.round(vh * 0.55)

    const t1 = setTimeout(() => launch('about', { x: LEFT, y: TOP, w: aboutW, h: aboutH }), 250)
    const t2 = setTimeout(() => launch('proj', { x: LEFT + aboutW + 14, y: TOP, w: projW, h: projH }), 450)
    const t3 = setTimeout(
      () => launch('path', { x: LEFT + aboutW + projW + 28, y: TOP + projH + 16, w: pathW, h: pathH }),
      650,
    )
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [launch])

  return (
    <DesktopContext.Provider value={{ launch, theme, setTheme }}>
      <ConfigContext.Provider value={config}>
        <MenuBar />
        <div className="deskhint">
          Pulsa <kbd>⌘ Espacio</kbd> para Spotlight · o usa el Dock ↓
        </div>

        <div id="desktop">
          <DesktopIcons onLaunch={launch} />
          {wm.windows.map(win => {
            const content = APP_CONTENT[win.id]
            if (!content) return null
            return (
              <Window
                key={win.id}
                win={win}
                title={APPS[win.id]?.title ?? ''}
                onClose={() => wm.close(win.id)}
                onMinimize={() => wm.toggleMinimize(win.id)}
                onFullscreen={() => wm.toggleFullscreen(win.id)}
                onFocus={() => wm.focus(win.id)}
                onRectChange={rect => wm.setRect(win.id, rect)}
              >
                {content()}
              </Window>
            )
          })}
        </div>

        <Dock isOpen={wm.isOpen} onLaunch={launch} onSpotlight={() => setSpotOpen(true)} />
        <Spotlight
          open={spotOpen}
          onClose={() => setSpotOpen(false)}
          onLaunch={launch}
          theme={theme}
          setTheme={setTheme}
        />
      </ConfigContext.Provider>
    </DesktopContext.Provider>
  )
}
