import { useState } from 'react'
import './v1/styles/globals.css'
import { LanguageProvider } from './v1/i18n/LanguageContext'
import { Navbar } from './v1/components/layout/Navbar'
import { Footer } from './v1/components/layout/Footer'
import { Hero } from './v1/sections/hero/Hero'
import { ProjectsSection } from './v1/sections/projects/ProjectsSection'
import { ProjectModal } from './v1/sections/projects/ProjectModal'
import { ExperienceSection } from './v1/sections/experience/ExperienceSection'
import { StackSection } from './v1/sections/stack/StackSection'
import { MethodologiesSection } from './v1/sections/methodologies/MethodologiesSection'
import type { Project } from './v1/data/projects'

export function PortfolioV1() {
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  return (
    <LanguageProvider>
      <div style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
        {/* Navbar flotante sobre el contenido */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 50, pointerEvents: 'none' }}>
          <div style={{ pointerEvents: 'auto' }}>
            <Navbar />
          </div>
        </div>
        {/* Contenido scrolleable */}
        <div className="v1-scroll-body" style={{ height: '100%', overflowY: 'auto' }}>
          <Hero />
          <ProjectsSection onLearnMore={setActiveProject} />
          <ExperienceSection />
          <StackSection />
          <MethodologiesSection />
          <Footer />
        </div>
        {/* Detalle de proyecto: cubre todo el contenedor */}
        {activeProject && (
          <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
        )}
      </div>
    </LanguageProvider>
  )
}
