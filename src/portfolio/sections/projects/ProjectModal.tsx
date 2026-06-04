import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react'
import { PillButton } from '../../components/ui/PillButton'
import { useLanguage } from '../../i18n/LanguageContext'
import type { Project } from '../../data/projects'

type Props = {
  project: Project
  onClose: () => void
}

export function ProjectModal({ project, onClose }: Props) {
  const { t } = useLanguage()
  const [imgIndex, setImgIndex] = useState(0)
  const images = project.images ?? []

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setImgIndex(i => (i + 1) % images.length)
      if (e.key === 'ArrowLeft') setImgIndex(i => (i - 1 + images.length) % images.length)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [images.length, onClose])

  return (
    <div className="absolute inset-0 z-[100] overflow-y-auto wbody" style={{ background: '#0a0b0d' }}>

      {/* Back bar */}
      <div
        className="sticky top-0 z-10 flex items-center gap-2 px-6 py-3 border-b border-white/[0.06] w-full"
        style={{ background: 'rgba(10,11,13,0.95)', backdropFilter: 'blur(12px)' }}
      >
        <button
          onClick={onClose}
          className="flex items-center gap-2 cursor-pointer border-0 bg-transparent text-[#A7B4BC]/50 hover:text-white transition-colors"
          style={{ fontSize: 13 }}
        >
          <ArrowLeft className="w-4 h-4" />
          {t('features_title1')}
        </button>
      </div>

      {/* Hero: imagen + info lado a lado */}
      <div
        className="grid w-full"
        style={{
          gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,1fr)',
          minHeight: '55vh',
        }}
      >
        {/* Imagen */}
        <div className="relative bg-black overflow-hidden" style={{ minHeight: 300 }}>
          {images.length > 0 && (
            <>
              <img
                src={images[imgIndex]}
                alt={project.title}
                className="w-full h-full object-cover object-top transition-opacity duration-300"
                style={{ position: 'absolute', inset: 0 }}
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setImgIndex(i => (i - 1 + images.length) % images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 border-0 rounded-full w-9 h-9 flex items-center justify-center cursor-pointer transition-colors z-10"
                  >
                    <ChevronLeft className="w-5 h-5 text-white/70" />
                  </button>
                  <button
                    onClick={() => setImgIndex(i => (i + 1) % images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 border-0 rounded-full w-9 h-9 flex items-center justify-center cursor-pointer transition-colors z-10"
                  >
                    <ChevronRight className="w-5 h-5 text-white/70" />
                  </button>
                  <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setImgIndex(i)}
                        className="border-0 cursor-pointer rounded-full transition-all duration-200"
                        style={{
                          width: i === imgIndex ? 20 : 6,
                          height: 6,
                          background: i === imgIndex ? '#A7B4BC' : 'rgba(167,180,188,0.3)',
                          padding: 0,
                        }}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>

        {/* Info lateral */}
        <div
          className="flex flex-col justify-center gap-5 border-l border-white/[0.06]"
          style={{ padding: 'clamp(28px,4vw,56px)' }}
        >
          <div>
            <h2
              className="text-white font-semibold m-0 mb-3 leading-[1.1]"
              style={{ fontSize: 'clamp(20px,2.5vw,32px)', letterSpacing: '-0.04em' }}
            >
              {project.title}
            </h2>
            <p className="text-[#A7B4BC]/50 text-[14px] leading-relaxed m-0">{project.desc}</p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {project.badges.map(badge => (
              <span
                key={badge}
                className="px-3 py-1 rounded-[6px] bg-[#A7B4BC]/[0.07] border border-[#A7B4BC]/10 text-[#A7B4BC]/55 text-[12px]"
              >
                {badge}
              </span>
            ))}
          </div>

          <div className="flex gap-2 flex-wrap pt-1">
            {project.demo && project.demo !== '#' && (
              <PillButton label={t('features_learn_more')} href={project.demo} external />
            )}
            {project.repo && <PillButton label={t('modal_repository')} href={project.repo} external />}
          </div>
        </div>
      </div>

      {/* Grid de puntos */}
      {project.points?.length > 0 && (
        <div style={{ padding: 'clamp(28px,4vw,56px)' }}>
          <span className="block text-[10px] tracking-[0.14em] uppercase font-bold text-[#A7B4BC]/30 mb-5">
            {t('modal_what_solves')}
          </span>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: 12,
            }}
          >
            {project.points.map((point, i) => (
              <div
                key={i}
                className="flex flex-col gap-2 rounded-[14px] border border-white/[0.06]"
                style={{
                  padding: 'clamp(16px,2vw,22px)',
                  background: 'rgba(167,180,188,0.03)',
                }}
              >
                <span className="font-mono text-[10px] text-[#A7B4BC]/25">0{i + 1}</span>
                <span className="text-[#A7B4BC]/85 text-[13px] font-semibold leading-snug">{point.title}</span>
                <span className="text-[#A7B4BC]/45 text-[13px] leading-relaxed">{point.body}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
