import './styles/globals.css'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Hero } from './sections/hero/Hero'
import { Features } from './sections/features/Features'
import { Experience } from './sections/experience/Experience'
import { Stack } from './sections/stack/Stack'
import { Methodologies } from './sections/stack/Methodologies'

function App() {
  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <Features />
      <Experience />
      <Stack />
      <Methodologies />
      <Footer />
    </main>
  )
}

export default App
