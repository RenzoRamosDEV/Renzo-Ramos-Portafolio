import { useState } from 'react'
import { getProjects } from '../../data/projects'
import { useLanguage } from '../../i18n/LanguageContext'
import { ProjectCard } from './ProjectCard'
import { ProjectModal } from './ProjectModal'
import type { Project } from '../../data/projects'

export function ProjectsSection() {
  const { t, lang } = useLanguage()
  const [activeProject, setActiveProject] = useState<Project | null>(null)
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
          <div className="flex flex-col leading-[1.1] tracking-[-0.07em]" style={{ fontSize: 'clamp(40px,6vw,80px)', fontWeight: 500 }}>
            <span style={{ color: '#A7B4BC' }}>{t('features_title1')}</span>
            <span style={{ color: 'rgba(167,180,188,0.25)' }}>{t('features_title2')}</span>
          </div>

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
                onLearnMore={() => setActiveProject(project)}
              />
            ))}
          </div>
        </div>
      </div>

      {activeProject && (
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </section>
  )
}
