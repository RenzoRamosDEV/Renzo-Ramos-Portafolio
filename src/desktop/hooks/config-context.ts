import { createContext, useContext } from 'react'
import type { ConfigState } from './useConfig'

export const ConfigContext = createContext<ConfigState | null>(null)

export function useConfigContext(): ConfigState {
  const ctx = useContext(ConfigContext)
  if (!ctx) throw new Error('useConfigContext must be used within <ConfigContext.Provider>')
  return ctx
}
