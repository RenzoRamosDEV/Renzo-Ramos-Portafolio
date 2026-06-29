import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import type { Project } from '../data/projects'
import type { TranslationKey } from '../i18n/translations'

const EYEBROW_BY_NUM: Record<string, TranslationKey> = {
  '01': 'p1_eyebrow',
  '02': 'p2_eyebrow',
  '03': 'p3_eyebrow',
}

function arrowStyle(side: 'left' | 'right'): CSSProperties {
  const base: CSSProperties = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: 44,
    height: 44,
    borderRadius: '50%',
    background: 'rgba(255,255,255,.92)',
    backdropFilter: 'blur(4px)',
    WebkitBackdropFilter: 'blur(4px)',
    border: '1px solid rgba(0,0,0,.08)',
    boxShadow: '0 4px 16px rgba(0,0,0,.18)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: '#1d1d1f',
    zIndex: 2,
  }
  return side === 'left' ? { ...base, left: 10 } : { ...base, right: 10 }
}

export function ProjectDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  const { t } = useLanguage()
  const eyebrowKey = EYEBROW_BY_NUM[project.num]
  const galleryRef = useRef<HTMLDivElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const updateArrows = () => {
    const el = galleryRef.current
    if (!el) return
    setAtStart(el.scrollLeft <= 1)
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1)
  }

  useEffect(() => { updateArrows() }, [])

  const scrollByDir = (dir: 1 | -1) => {
    const el = galleryRef.current
    if (!el) return
    const first = el.querySelector('img')
    const step = first ? first.clientWidth + 16 : el.clientWidth * 0.9
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  const hasArrows = !(atStart && atEnd)

  // Bloquea el scroll de fondo, sube arriba y cierra con Escape.
  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.scrollTo(0, 0)
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  const hasDemo = project.demo && project.demo !== '#'

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: '#f5f5f7',
        color: '#1d1d1f',
        overflowY: 'auto',
      }}
    >
      {/* Barra superior con volver */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          background: 'rgba(245,245,247,.78)',
          backdropFilter: 'saturate(180%) blur(20px)',
          WebkitBackdropFilter: 'saturate(180%) blur(20px)',
          borderBottom: '1px solid rgba(0,0,0,.09)',
        }}
      >
        <div style={{ maxWidth: 980, margin: '0 auto', height: 48, padding: '0 22px', display: 'flex', alignItems: 'center' }}>
          <button
            onClick={onClose}
            style={{ cursor: 'pointer', background: 'none', border: 'none', color: '#0066cc', fontSize: 15, fontWeight: 500, padding: 0, display: 'flex', alignItems: 'center', gap: 4 }}
          >
            ‹ {t('detail_back')}
          </button>
        </div>
      </header>

      <article style={{ maxWidth: 980, margin: '0 auto', padding: '48px 22px 80px' }}>
        {eyebrowKey && (
          <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', color: '#bf4800', marginBottom: 14 }}>
            {t(eyebrowKey)}
          </div>
        )}
        <h1 style={{ margin: 0, fontSize: 'clamp(32px,5vw,56px)', lineHeight: 1.05, fontWeight: 600, letterSpacing: '-.03em' }}>
          {project.title}
        </h1>
        <p style={{ margin: '20px 0 0', fontSize: 'clamp(17px,2.2vw,21px)', lineHeight: 1.5, color: '#6e6e73', maxWidth: '60ch' }}>
          {project.summary}
        </p>

        {/* Botones */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 28 }}>
          {project.repo && (
            <a href={project.repo} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', fontSize: 15, background: '#1d1d1f', color: '#fff', padding: '11px 22px', borderRadius: 999 }}>
              {t('detail_repo')} ↗
            </a>
          )}
          {hasDemo && (
            <a href={project.demo} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', fontSize: 15, background: '#0071e3', color: '#fff', padding: '11px 22px', borderRadius: 999 }}>
              {t('detail_demo')} ↗
            </a>
          )}
        </div>

        {/* Galería horizontal con flechas de navegación */}
        {project.images.length > 0 && (
          <div style={{ position: 'relative', margin: '40px 0 0' }}>
            <div
              ref={galleryRef}
              className="qscroll"
              onScroll={updateArrows}
              style={{ display: 'flex', gap: 16, overflowX: 'auto', padding: '4px 0' }}
            >
              {project.images.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`${project.title} ${i + 1}`}
                  loading="lazy"
                  onLoad={updateArrows}
                  style={{ flex: '0 0 auto', height: 'clamp(240px,40vw,440px)', width: 'auto', maxWidth: '92vw', objectFit: 'contain', borderRadius: 16, display: 'block', background: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,.06)' }}
                />
              ))}
            </div>

            {hasArrows && !atStart && (
              <button onClick={() => scrollByDir(-1)} aria-label="Anterior" style={arrowStyle('left')}>
                <ChevronLeft size={22} strokeWidth={2.2} />
              </button>
            )}
            {hasArrows && !atEnd && (
              <button onClick={() => scrollByDir(1)} aria-label="Siguiente" style={arrowStyle('right')}>
                <ChevronRight size={22} strokeWidth={2.2} />
              </button>
            )}
          </div>
        )}

        {/* Descripción */}
        <div style={{ background: '#fff', borderRadius: 24, padding: 'clamp(28px,4vw,44px)', marginTop: 40 }}>
          <p style={{ margin: 0, fontSize: 'clamp(15px,1.8vw,17px)', lineHeight: 1.65, color: '#1d1d1f', whiteSpace: 'pre-line' }}>
            {project.desc}
          </p>
        </div>

        {/* Características */}
        {project.points.length > 0 && (
          <>
            <h2 style={{ margin: '48px 0 0', fontSize: 'clamp(22px,3vw,30px)', fontWeight: 600, letterSpacing: '-.02em' }}>
              {t('detail_features')}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16, marginTop: 22 }}>
              {project.points.map((pt, i) => (
                <div key={i} style={{ background: '#fff', borderRadius: 18, padding: '24px 24px' }}>
                  <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: '-.01em' }}>{pt.title}</div>
                  <div style={{ fontSize: 14, lineHeight: 1.55, color: '#6e6e73', marginTop: 8 }}>{pt.body}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Tecnologías */}
        {project.badges.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 36 }}>
            {project.badges.map((b) => (
              <span
                key={b}
                style={{
                  fontFamily: "ui-monospace,'SF Mono',Menlo,monospace",
                  fontSize: 12,
                  color: '#1d1d1f',
                  background: '#fff',
                  border: '1px solid rgba(0,0,0,.07)',
                  borderRadius: 999,
                  padding: '6px 13px',
                }}
              >
                {b}
              </span>
            ))}
          </div>
        )}
      </article>
    </div>
  )
}
