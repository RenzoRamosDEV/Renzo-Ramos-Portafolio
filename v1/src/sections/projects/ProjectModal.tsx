import { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
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
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(16px)' }}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-5xl bg-[#111316] border border-white/[0.07] rounded-[24px] shadow-[0_32px_80px_rgba(0,0,0,0.8)] flex flex-col"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black hover:bg-black/70 border border-white/10 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {images.length > 0 && (
          <div className="relative w-full bg-black rounded-t-[24px] overflow-hidden flex-shrink-0" style={{ aspectRatio: '16/6' }}>
            <img
              src={images[imgIndex]}
              alt={project.title}
              className="w-full h-full object-cover object-top transition-opacity duration-300"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setImgIndex(i => (i - 1 + images.length) % images.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 border-0 rounded-full w-9 h-9 flex items-center justify-center cursor-pointer transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-white/70" />
                </button>
                <button
                  onClick={() => setImgIndex(i => (i + 1) % images.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 border-0 rounded-full w-9 h-9 flex items-center justify-center cursor-pointer transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-white/70" />
                </button>
                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
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
          </div>
        )}

        <div className="flex flex-col gap-6 p-6 sm:p-8">
          <div>
            <h2
              className="text-white font-semibold m-0 leading-[1.1]"
              style={{ fontSize: 'clamp(20px,2.5vw,28px)', letterSpacing: '-0.04em' }}
            >
              {project.title}
            </h2>
            <p className="text-[#A7B4BC]/50 text-[13px] mt-2 m-0 leading-relaxed">{project.desc}</p>
          </div>

          {project.points?.length > 0 && (
            <div className="hidden md:flex flex-col gap-4">
              <span className="text-[10px] tracking-[0.14em] uppercase font-bold text-[#A7B4BC]/30">
                {t('modal_what_solves')}
              </span>
              {project.points.map((point, i) => (
                <div key={i} className="flex gap-3">
                  <span
                    className="flex-shrink-0 font-mono text-[10px] text-[#A7B4BC]/25 mt-[2px]"
                    style={{ minWidth: 20 }}
                  >
                    0{i + 1}
                  </span>
                  <div>
                    <span className="text-[#A7B4BC]/85 text-[13px] font-semibold">{point.title}. </span>
                    <span className="hidden sm:inline text-[#A7B4BC]/50 text-[13px] leading-relaxed">{point.body}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-white/[0.06]">
            <div className="hidden sm:flex flex-wrap gap-1.5">
              {project.badges.map(badge => (
                <span
                  key={badge}
                  className="px-3 py-1 rounded-[6px] bg-[#A7B4BC]/[0.07] border border-[#A7B4BC]/10 text-[#A7B4BC]/55 text-[13px]"
                >
                  {badge}
                </span>
              ))}
            </div>
            {project.repo && <PillButton label={t('modal_repository')} href={project.repo} external />}
          </div>
        </div>
      </div>
    </div>
  )
}
