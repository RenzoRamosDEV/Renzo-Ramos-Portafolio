import { useRef } from 'react'
import { PillButton } from '../../components/ui/PillButton'
import { useInView } from '../../hooks/useInView'
import { useLanguage } from '../../i18n/LanguageContext'
import type { Project } from '../../data/projects'

type Props = {
  index: number
  project: Project
  onLearnMore: () => void
}

export function ProjectCard({ index, project, onLearnMore }: Props) {
  const { t } = useLanguage()
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
              {project.badges.map(badge => (
                <span
                  key={badge}
                  className="px-3 py-1 rounded-[6px] bg-[#A7B4BC]/[0.07] border border-[#A7B4BC]/10 text-[#A7B4BC]/55 text-[13px]"
                >
                  {badge}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="h-px mx-6 bg-gradient-to-r from-transparent via-[#A7B4BC]/08 to-transparent" />
        <div className="p-3 px-[clamp(14px,2vw,24px)] flex flex-row gap-2 justify-center lg:justify-end">
          <PillButton label={t('features_learn_more')} width="xs" onClick={onLearnMore} />
          {project.repo && <PillButton label={t('features_repo')} width="xs" href={project.repo} external />}
        </div>
      </div>
    </div>
  )
}
