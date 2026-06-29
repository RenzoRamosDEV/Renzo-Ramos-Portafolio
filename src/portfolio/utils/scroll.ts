const NAV_OFFSET = 56 // alto aproximado de la barra fija + margen

/**
 * Desplaza suavemente hasta la sección `id`. Si la sección cabe en el
 * viewport, la deja centrada verticalmente; si es más alta, la alinea
 * justo debajo de la barra de navegación.
 */
export function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const rect = el.getBoundingClientRect()
  const elTop = window.scrollY + rect.top
  const elHeight = rect.height
  const viewport = window.innerHeight

  const target =
    elHeight + NAV_OFFSET < viewport
      ? elTop - (viewport - elHeight) / 2
      : elTop - NAV_OFFSET

  window.scrollTo({ top: Math.max(0, target), behavior: 'smooth' })
}
