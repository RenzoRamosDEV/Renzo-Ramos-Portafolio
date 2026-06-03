export type Rect = { x: number; y: number; w: number; h: number }

export type WinState = {
  id: string
  rect: Rect
  z: number
  minimized: boolean
  fullscreen: boolean
  prevRect?: Rect
}
