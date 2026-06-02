import { useEffect, useState } from 'react'

const NAVBAR_HEIGHT = 48

export function useScrollFusion(sectionIds: string[]) {
  const [scrolled, setScrolled] = useState(false)
  const [fused, setFused] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)

      const isFused = sectionIds.some(id => {
        const el = document.getElementById(id)
        if (!el) return false
        const rect = el.getBoundingClientRect()
        return rect.top <= NAVBAR_HEIGHT && rect.top > -16
      })
      setFused(isFused)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [sectionIds])

  return { scrolled, fused }
}
