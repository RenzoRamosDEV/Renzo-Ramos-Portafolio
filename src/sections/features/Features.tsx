import { useRef, useState, useEffect } from 'react'
import { PillButton } from '../../components/ui/PillButton'
import { PROJECTS } from '../../data/projects'
import type { Project } from '../../data/projects'
import { useInView } from '../../hooks/useInView'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
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
              <span className="text-[10px] tracking-[0.14em] uppercase font-bold text-[#A7B4BC]/30">Qué resuelve</span>
              {project.points.map((p, i) => (
                <div key={i} className="flex gap-3">
                  <span
                    className="flex-shrink-0 font-mono text-[10px] text-[#A7B4BC]/25 mt-[2px]"
                    style={{ minWidth: 20 }}
                  >
                    0{i + 1}
                  </span>
                  <div>
                    <span className="text-[#A7B4BC]/85 text-[13px] font-semibold">{p.title}. </span>
                    <span className="hidden sm:inline text-[#A7B4BC]/50 text-[13px] leading-relaxed">{p.body}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-white/[0.06]">
            <div className="hidden sm:flex flex-wrap gap-1.5">
              {project.badges.map(t => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-[6px] bg-[#A7B4BC]/[0.07] border border-[#A7B4BC]/10 text-[#A7B4BC]/55 text-[13px]"
                >
                  {t}
                </span>
              ))}
            </div>
            {project.repo && <PillButton label="Repositorio" href={project.repo} external />}
          </div>
        </div>
      </div>
    </div>
  )
}

type ProjectCardProps = {
  index: number
  project: Project
  onLearnMore: () => void
}

function ProjectCard({ index, project, onLearnMore }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const visible = useInView(ref, 0.12)

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.65s ${index * 0.12}s cubic-bezier(0.16,1,0.3,1), transform 0.65s ${index * 0.12}s cubic-bezier(0.16,1,0.3,1)`,
      }}
    >
      <div className="bg-[#101010]/82 backdrop-blur-md border border-white/[0.06] shadow-[0_8px_40px_rgba(0,0,0,0.45)] rounded-[20px] overflow-hidden flex flex-col h-full">
        <div className="flex items-start p-[clamp(18px,2.5vw,28px)] pb-0">
          <span
            className="font-bold leading-none text-[#A7B4BC]/[0.07]"
            style={{ fontSize: 'clamp(36px,5vw,60px)', letterSpacing: '-0.07em' }}
          >
            {project.num}
          </span>
        </div>

        <div className="flex flex-col gap-3 flex-1 p-[clamp(12px,2vw,20px)] px-[clamp(18px,2.5vw,28px)] pb-[clamp(18px,2.5vw,28px)]">
          <h3
            className="text-white font-semibold m-0 leading-[1.1]"
            style={{ fontSize: 'clamp(18px,2.5vw,26px)', letterSpacing: '-0.04em' }}
          >
            {project.title}
          </h3>

          <p className="text-[#A7B4BC]/50 text-[15px] leading-relaxed m-0">{project.summary}</p>

          {project.badges.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-auto pt-3">
              {project.badges.map(t => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-[6px] bg-[#A7B4BC]/[0.07] border border-[#A7B4BC]/10 text-[#A7B4BC]/55 text-[13px]"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="h-px mx-6 bg-gradient-to-r from-transparent via-[#A7B4BC]/08 to-transparent" />
        <div className="p-3 px-[clamp(14px,2vw,24px)] flex flex-row gap-2 justify-center lg:justify-end">
          <PillButton label="Saber más" width="xs" onClick={onLearnMore} />
          {project.repo && <PillButton label="Repo" width="xs" href={project.repo} external />}
        </div>
      </div>
    </div>
  )
}

export function Features() {
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  return (
    <section id="proyectos" className="bg-black">
      <div className="section-grid relative w-full overflow-hidden flex flex-col pb-6 lg:pb-0">
        <div className="section-vignette absolute inset-0 z-[1] pointer-events-none" />

        <div
          className="relative z-10 flex-1 flex flex-col justify-center"
          style={{
            padding: 'clamp(80px,5vw,64px) clamp(20px,4vw,56px) clamp(36px,6vw,72px)',
            gap: 'clamp(20px,3vw,36px)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex flex-col leading-[1.1] tracking-[-0.07em]" style={{ fontSize: 'clamp(40px,6vw,80px)', fontWeight: 500 }}>
              <span style={{ color: '#A7B4BC' }}>Proyectos</span>
              <span style={{ color: 'rgba(167,180,188,0.25)' }}>Destacados</span>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
              gap: 'clamp(10px,1.5vw,16px)',
            }}
          >
            {PROJECTS.map((p, i) => (
              <ProjectCard
                key={p.num}
                index={i}
                project={p}
                onLearnMore={() => setActiveProject(p)}
              />
            ))}
          </div>

        </div>

        <div className="relative z-10 flex justify-center pb-6 pt-2 lg:pb-0 lg:pt-0 lg:absolute lg:bottom-8 lg:left-0 lg:right-0">
        </div>
      </div>

      {activeProject && (
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </section>
  )
}
