import { useState } from 'react'
import './styles/globals.css'
import { LanguageProvider } from './i18n/LanguageContext'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Hero } from './sections/hero/Hero'
import { ProjectsSection } from './sections/projects/ProjectsSection'
import { ProjectModal } from './sections/projects/ProjectModal'
import { ExperienceSection } from './sections/experience/ExperienceSection'
import { StackSection } from './sections/stack/StackSection'
import { MethodologiesSection } from './sections/methodologies/MethodologiesSection'
import { ChatWidget } from './components/chat/ChatWidget'
import type { Project } from './data/projects'

export function PortfolioSite() {
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
        <div className="portfolio-scroll-body" style={{ height: '100%', overflowY: 'auto' }}>
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
        {/* Burbuja flotante del asistente IA */}
        <ChatWidget />
      </div>
    </LanguageProvider>
  )
}
