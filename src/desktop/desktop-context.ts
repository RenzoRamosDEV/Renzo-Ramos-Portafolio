import { createContext, useContext } from 'react'

export type Theme = 'light' | 'dark'

export type DesktopContextValue = {
  /** Open an app (or toggle minimize if already open) by id. */
  launch: (id: string) => void
  /** Current theme. */
  theme: Theme
  /** Set the theme explicitly. */
  setTheme: (t: Theme) => void
}

export const DesktopContext = createContext<DesktopContextValue | null>(null)

export function useDesktop(): DesktopContextValue {
  const ctx = useContext(DesktopContext)
  if (!ctx) throw new Error('useDesktop must be used within <DesktopContext.Provider>')
  return ctx
}
