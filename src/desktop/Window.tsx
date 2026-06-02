import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import type { Rect, WinState } from './types'

type Props = {
  win: WinState
  title: string
  children: ReactNode
  onClose: () => void
  onMinimize: () => void
  onFullscreen: () => void
  onFocus: () => void
  onRectChange: (rect: Rect) => void
}

const MIN_W = 280
const MIN_H = 160

const RESIZE_HANDLES = [
  { cls: 'rc-nw', dx: -1, dy: -1 },
  { cls: 'rc-ne', dx: 1, dy: -1 },
  { cls: 'rc-sw', dx: -1, dy: 1 },
  { cls: 'rc-se', dx: 1, dy: 1 },
  { cls: 're-l', dx: -1, dy: 0 },
  { cls: 're-r', dx: 1, dy: 0 },
  { cls: 're-b', dx: 0, dy: 1 },
  { cls: 're-t', dx: 0, dy: -1 },
] as const

export function Window({
  win,
  title,
  children,
  onClose,
  onMinimize,
  onFullscreen,
  onFocus,
  onRectChange,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

  // Enter animation: add `.open` on the next frame after mount.
  useEffect(() => {
    const raf = requestAnimationFrame(() => setOpen(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  function startDrag(e: React.PointerEvent) {
    if (win.fullscreen) return
    onFocus()
    const el = ref.current!
    const sx = e.clientX
    const sy = e.clientY
    const { x, y, w, h } = win.rect

    const onMove = (ev: PointerEvent) => {
      const nx = Math.max(0, x + ev.clientX - sx)
      const ny = Math.max(32, y + ev.clientY - sy)
      el.style.left = nx + 'px'
      el.style.top = ny + 'px'
    }
    const onUp = (ev: PointerEvent) => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      onRectChange({ x: Math.max(0, x + ev.clientX - sx), y: Math.max(32, y + ev.clientY - sy), w, h })
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    e.preventDefault()
  }

  function startResize(e: React.PointerEvent, dx: number, dy: number) {
    if (win.fullscreen) return
    e.stopPropagation()
    onFocus()
    const el = ref.current!
    const sx = e.clientX
    const sy = e.clientY
    const { x, y, w, h } = win.rect
    let final: Rect = { x, y, w, h }

    const onMove = (ev: PointerEvent) => {
      const next: Rect = { x, y, w, h }
      if (dx !== 0) {
        const nw = Math.max(MIN_W, w + (ev.clientX - sx) * dx)
        next.w = nw
        if (dx === -1) next.x = x + w - nw
      }
      if (dy !== 0) {
        const nh = Math.max(MIN_H, h + (ev.clientY - sy) * dy)
        next.h = nh
        if (dy === -1) next.y = y + h - nh
      }
      final = next
      el.style.left = next.x + 'px'
      el.style.top = next.y + 'px'
      el.style.width = next.w + 'px'
      el.style.height = next.h + 'px'
    }
    const onUp = () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      onRectChange(final)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    e.preventDefault()
  }

  const { rect } = win
  const className = ['win', open ? 'open' : '', win.minimized ? 'min' : ''].filter(Boolean).join(' ')

  return (
    <div
      ref={ref}
      className={className}
      style={{
        left: rect.x,
        top: rect.y,
        width: rect.w,
        height: rect.h,
        zIndex: win.z,
        borderRadius: win.fullscreen ? 0 : undefined,
      }}
      onPointerDown={onFocus}
    >
      <div className="titlebar" onPointerDown={startDrag}>
        <div className="lights">
          <span
            className="light l-r"
            onClick={e => {
              e.stopPropagation()
              onClose()
            }}
          />
          <span
            className="light l-y"
            onClick={e => {
              e.stopPropagation()
              onMinimize()
            }}
          />
          <span
            className="light l-g"
            onClick={e => {
              e.stopPropagation()
              onFullscreen()
            }}
          />
        </div>
        <div className="wtitle">{title}</div>
      </div>
      <div className="wbody">{children}</div>
      {RESIZE_HANDLES.map(h => (
        <div
          key={h.cls}
          className={'resize-handle ' + h.cls}
          onPointerDown={e => startResize(e, h.dx, h.dy)}
        />
      ))}
    </div>
  )
}
