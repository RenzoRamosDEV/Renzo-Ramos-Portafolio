import { useCallback, useEffect, useState } from 'react'
import './styles/globals.css'
import { LanguageProvider } from './i18n/LanguageContext'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Intro } from './sections/Intro'
import { Hero } from './sections/Hero'
import { Projects } from './sections/Projects'
import { ProjectDetail } from './sections/ProjectDetail'
import { Stack } from './sections/Stack'
import { ExperienceEducation } from './sections/ExperienceEducation'
import { Certificates } from './sections/Certificates'
import { Contact } from './sections/Contact'
import { ChatWidget } from './components/chat/ChatWidget'
import type { Project } from './data/projects'

export function PortfolioSite() {
  const [active, setActive] = useState<Project | null>(null)
  const [showIntro, setShowIntro] = useState(true)
  const dismissIntro = useCallback(() => setShowIntro(false), [])

  // El intro y el chat son solo de cliente: no se pre-renderizan (no son
  // contenido SEO y dependen de APIs del navegador). Evita saltos de hidratación.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // Abre el detalle empujando una entrada al historial: el botón "atrás"
  // del navegador cierra la vista en lugar de salir del sitio.
  const openProject = (project: Project) => {
    window.history.pushState({ project: project.num }, '')
    setActive(project)
  }
  const closeProject = () => {
    if (window.history.state?.project) window.history.back()
    else setActive(null)
  }

  useEffect(() => {
    const onPop = () => setActive(null)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  return (
    <LanguageProvider>
      <div style={{ background: '#f5f5f7', color: '#1d1d1f', minHeight: '100vh' }}>
        {mounted && showIntro && <Intro onDone={dismissIntro} />}
        <Navbar />
        <main>
          <Hero />
          <Projects onOpen={openProject} />
          <Stack />
          <ExperienceEducation />
          <Certificates />
          <Contact />
        </main>
        <Footer />
        {active && <ProjectDetail project={active} onClose={closeProject} />}
        {mounted && <ChatWidget />}
      </div>
    </LanguageProvider>
  )
}
