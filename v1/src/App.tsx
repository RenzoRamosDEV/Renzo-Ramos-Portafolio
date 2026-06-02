import './styles/globals.css'
import { LanguageProvider } from './i18n/LanguageContext'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Hero } from './sections/hero/Hero'
import { ProjectsSection } from './sections/projects/ProjectsSection'
import { ExperienceSection } from './sections/experience/ExperienceSection'
import { StackSection } from './sections/stack/StackSection'
import { MethodologiesSection } from './sections/methodologies/MethodologiesSection'

function App() {
  return (
    <LanguageProvider>
      <main className="bg-black">
        <Navbar />
        <Hero />
        <ProjectsSection />
        <ExperienceSection />
        <StackSection />
        <MethodologiesSection />
        <Footer />
      </main>
    </LanguageProvider>
  )
}

export default App
