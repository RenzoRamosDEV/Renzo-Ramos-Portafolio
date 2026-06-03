import { useCallback, useEffect, useState } from 'react'
import type { Theme } from '../shell/desktop-context'

function initialTheme(): Theme {
  const saved = localStorage.getItem('pf-theme') as Theme | null
  if (saved) return saved
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function useTheme(): [Theme, (t: Theme) => void] {
  const [theme, setThemeState] = useState<Theme>(initialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('pf-theme', theme)
  }, [theme])

  const setTheme = useCallback((t: Theme) => setThemeState(t), [])
  return [theme, setTheme]
}

export function useClock(): string {
  const [time, setTime] = useState(() =>
    new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
  )
  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }))
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return time
}
