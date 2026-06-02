import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import type { ReactNode } from 'react'

type Props = {
  onClose: () => void
  children: ReactNode
}

export function Modal({ onClose, children }: Props) {
  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="relative max-w-4xl w-full mx-6" onClick={e => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white/60 hover:text-white transition-colors border-0 bg-transparent cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>
        {children}
      </div>
    </div>,
    document.body
  )
}
