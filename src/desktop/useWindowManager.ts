import { useCallback, useEffect, useRef, useState } from 'react'
import type { Rect, WinState } from './types'

export type WindowManager = {
  windows: WinState[]
  isOpen: (id: string) => boolean
  /** Open if closed; toggle minimize + focus if already open. */
  launch: (id: string, rectOverride?: Rect) => void
  close: (id: string) => void
  focus: (id: string) => void
  toggleMinimize: (id: string) => void
  toggleFullscreen: (id: string) => void
  setRect: (id: string, rect: Rect) => void
}

const TOP_BAR = 30 // menubar height, used by fullscreen

export function useWindowManager(resolveRect: (id: string) => Rect): WindowManager {
  const [windows, setWindows] = useState<WinState[]>([])
  const windowsRef = useRef<WinState[]>([])
  const zRef = useRef(10)
  const closingRef = useRef<Set<string>>(new Set())

  useEffect(() => {
    windowsRef.current = windows
  }, [windows])

  const nextZ = () => (zRef.current += 1)

  const focus = useCallback((id: string) => {
    const z = nextZ()
    setWindows(ws => ws.map(w => (w.id === id ? { ...w, z } : w)))
  }, [])

  const open = useCallback(
    (id: string, rect: Rect) => {
      const z = nextZ()
      setWindows(ws => [...ws, { id, rect, z, minimized: false, fullscreen: false }])
    },
    [],
  )

  const toggleMinimize = useCallback((id: string) => {
    const z = nextZ()
    setWindows(ws =>
      ws.map(w => (w.id === id ? { ...w, minimized: !w.minimized, z: w.minimized ? z : w.z } : w)),
    )
  }, [])

  const launch = useCallback(
    (id: string, rectOverride?: Rect) => {
      if (windowsRef.current.some(w => w.id === id)) {
        toggleMinimize(id)
        return
      }
      open(id, rectOverride ?? resolveRect(id))
    },
    [open, resolveRect, toggleMinimize],
  )

  const close = useCallback((id: string) => {
    // Mark closing so the Window can play its exit transition, then drop it.
    if (closingRef.current.has(id)) return
    closingRef.current.add(id)
    setWindows(ws => ws.map(w => (w.id === id ? { ...w, minimized: true } : w)))
    setTimeout(() => {
      closingRef.current.delete(id)
      setWindows(ws => ws.filter(w => w.id !== id))
    }, 260)
  }, [])

  const toggleFullscreen = useCallback((id: string) => {
    setWindows(ws =>
      ws.map(w => {
        if (w.id !== id) return w
        if (w.fullscreen && w.prevRect) {
          return { ...w, fullscreen: false, rect: w.prevRect, prevRect: undefined }
        }
        const full: Rect = {
          x: 0,
          y: TOP_BAR,
          w: window.innerWidth,
          h: window.innerHeight - TOP_BAR,
        }
        return { ...w, fullscreen: true, prevRect: w.rect, rect: full }
      }),
    )
  }, [])

  const setRect = useCallback((id: string, rect: Rect) => {
    setWindows(ws => ws.map(w => (w.id === id ? { ...w, rect } : w)))
  }, [])

  const isOpen = useCallback(
    (id: string) => windows.some(w => w.id === id && !closingRef.current.has(id)),
    [windows],
  )

  return { windows, isOpen, launch, close, focus, toggleMinimize, toggleFullscreen, setRect }
}
