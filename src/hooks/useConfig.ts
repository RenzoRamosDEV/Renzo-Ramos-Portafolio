import { useCallback, useEffect, useState } from 'react'

export const WALLS: Record<string, string> = {
  blue: 'linear-gradient(150deg,#d7e3ff 0%,#e9f0ff 38%,#eef7ff 70%,#f4fbff 100%)',
  night: 'linear-gradient(150deg,#06122e 0%,#0a1838 42%,#0c1430 72%,#06101f 100%)',
  aurora: 'linear-gradient(150deg,#0d1b2a 0%,#1b4332 50%,#081c15 100%)',
  sunset: 'linear-gradient(150deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%)',
  rose: 'linear-gradient(150deg,#fce4ec 0%,#f8bbd9 50%,#fdf2f8 100%)',
  slate: 'linear-gradient(150deg,#1e293b 0%,#334155 50%,#0f172a 100%)',
}

export const ACCENTS = ['0071e3', 'a855f7', '22c1c3', 'f0a500', 'ef4444', '34c759']

const get = (k: string, fallback: string) => localStorage.getItem('pf-cfg-' + k) ?? fallback
const set = (k: string, v: string) => localStorage.setItem('pf-cfg-' + k, v)

export type ConfigState = {
  accent: string
  wall: string
  speed: string
  setAccent: (hex: string) => void
  setWall: (name: string) => void
  setSpeed: (ms: string) => void
}

export function useConfig(): ConfigState {
  const [accent, setAccentState] = useState(() => get('accent', '0071e3'))
  const [wall, setWallState] = useState(() => get('wall', 'blue'))
  const [speed, setSpeedState] = useState(() => get('speed', '280'))

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', '#' + accent)
    set('accent', accent)
  }, [accent])

  useEffect(() => {
    if (WALLS[wall]) document.body.style.background = WALLS[wall]
    set('wall', wall)
  }, [wall])

  useEffect(() => {
    document.documentElement.style.setProperty('--win-speed', speed + 'ms')
    set('speed', speed)
  }, [speed])

  const setAccent = useCallback((hex: string) => setAccentState(hex), [])
  const setWall = useCallback((name: string) => setWallState(name), [])
  const setSpeed = useCallback((ms: string) => setSpeedState(ms), [])

  return { accent, wall, speed, setAccent, setWall, setSpeed }
}
