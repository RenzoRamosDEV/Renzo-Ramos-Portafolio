import { useEffect, useState } from 'react'

const NAVBAR_HEIGHT = 48

export function useScrollFusion(sectionIds: string[]) {
  const [scrolled, setScrolled] = useState(false)
  const [fused, setFused] = useState(false)

  useEffect(() => {
    // Find the actual scroll container
    const getScrollContainer = () => {
      const v1body = document.querySelector('.v1-scroll-body')
      if (v1body instanceof HTMLElement) return v1body
      const wbody = document.querySelector('.wbody')
      return wbody instanceof HTMLElement ? wbody : null
    }

    const onScroll = () => {
      const scrollContainer = getScrollContainer()
      const scrollY = scrollContainer ? scrollContainer.scrollTop : window.scrollY
      
      setScrolled(scrollY > 60)

      const isFused = sectionIds.some(id => {
        const el = document.getElementById(id)
        if (!el) return false
        const rect = el.getBoundingClientRect()
        // Adjust for container if needed
        const containerRect = scrollContainer?.getBoundingClientRect()
        const topOffset = containerRect ? containerRect.top : 0
        const adjustedTop = rect.top - topOffset
        return adjustedTop <= NAVBAR_HEIGHT && adjustedTop > -16
      })
      setFused(isFused)
    }

    // Try to attach to the correct scroll container
    let scrollContainer = getScrollContainer()
    let attachedTo: HTMLElement | Window = window
    
    // Wait a bit for the DOM to be ready
    const setupScroll = () => {
      scrollContainer = getScrollContainer()
      if (scrollContainer) {
        attachedTo = scrollContainer
      }
      attachedTo.addEventListener('scroll', onScroll, { passive: true } as any)
      onScroll()
    }

    // Use a small timeout to ensure DOM is ready
    const timer = setTimeout(setupScroll, 100)

    return () => {
      clearTimeout(timer)
      attachedTo.removeEventListener('scroll', onScroll)
    }
  }, [sectionIds])

  return { scrolled, fused }
}
