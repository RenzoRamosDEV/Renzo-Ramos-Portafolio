import { useState, useEffect, type RefObject } from 'react'

export function useInView(ref: RefObject<HTMLElement | null>, threshold = 0.12) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return visible
}
