import { getProjects } from '../../data/projects'
import { useLanguage } from '../../i18n/LanguageContext'
import { ProjectCard } from './ProjectCard'
import type { Project } from '../../data/projects'

type Props = {
  onLearnMore: (project: Project) => void
}

export function ProjectsSection({ onLearnMore }: Props) {
  const { t, lang } = useLanguage()
  const projects = getProjects(lang)

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
          <h2 className="m-0 flex flex-col leading-[1.1] tracking-[-0.07em]" style={{ fontSize: 'clamp(40px,6vw,80px)', fontWeight: 500 }}>
            <span style={{ color: '#A7B4BC' }}>{t('features_title1')}</span>
            <span style={{ color: 'rgba(167,180,188,0.25)' }}>{t('features_title2')}</span>
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
              gap: 'clamp(10px,1.5vw,16px)',
            }}
          >
            {projects.map((project, i) => (
              <ProjectCard
                key={project.num}
                index={i}
                project={project}
                onLearnMore={() => onLearnMore(project)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
