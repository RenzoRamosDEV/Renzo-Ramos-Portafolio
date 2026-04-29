import { useEffect } from 'react';
import { useTweaks } from './hooks/useTweaks';
import { SCHEMES, TWEAK_DEFAULTS } from './constants/schemes';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { StackSection } from './components/StackSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsSection } from './components/ProjectsSection';
import { Footer } from './components/Footer';
import { TweaksPanel, TweakSection, TweakSelect } from './components/TweaksPanel';
import { initStarfield } from './utils/starfield';
import { initCursorTrail } from './utils/cursorTrail';

import './styles/base.css';
import './styles/nav.css';
import './styles/hero.css';
import './styles/stack.css';
import './styles/experience.css';
import './styles/projects.css';
import './styles/modal.css';
import './styles/footer.css';
import './styles/animations.css';

export function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const scheme = tweaks.accentScheme;
  const s = SCHEMES[scheme] || SCHEMES['purple-pink'];

  useEffect(() => {
    window.__trailAccent = s.a;
  }, [s.a]);

  useEffect(() => {
    const starfieldCanvas = document.getElementById('starfield');
    const cursorTrailCanvas = document.getElementById('cursor-trail');

    if (starfieldCanvas) initStarfield(starfieldCanvas);
    if (cursorTrailCanvas) initCursorTrail(cursorTrailCanvas);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' });
    }
  };

  return (
    <>
      <Nav scheme={scheme} onScrollTo={scrollTo} />

      <div className="portfolio-root">
        <Hero scheme={scheme} onScrollTo={scrollTo} />
        <StackSection scheme={scheme} />
        <ExperienceSection scheme={scheme} />
        <ProjectsSection scheme={scheme} />
        <Footer />
      </div>

      <TweaksPanel title="Personalizar">
        <TweakSection label="Color del acento">
          <TweakSelect
            id="accentScheme"
            value={tweaks.accentScheme}
            options={[
              { value: 'purple-pink', label: 'Púrpura → Rosa (original)' },
              { value: 'blue-cyan', label: 'Azul → Cyan' },
              { value: 'emerald-teal', label: 'Esmeralda → Teal' },
              { value: 'orange-red', label: 'Naranja → Rojo' }
            ]}
            onChange={(v) => setTweak('accentScheme', v)}
          />
        </TweakSection>
      </TweaksPanel>

    </>
  );
}
