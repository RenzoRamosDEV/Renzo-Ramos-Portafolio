import { WordsPullUp } from '../../components/motion/WordsPullUp'
import { ScrollIndicator } from '../../components/ui/ScrollIndicator'
import { PillButton } from '../../components/ui/PillButton'
import { useLanguage } from '../../i18n/LanguageContext'
import bgHero from '../../assets/videos/bg-hero-light.mp4'
import cvPdf from '../../assets/cv/CV Renzo Ramos.pdf'

export function Hero() {
  const { t } = useLanguage()

  return (
    <section id="sobre-mi" className="min-h-screen">
      <div className="relative w-full min-h-screen overflow-hidden">
        <video className="absolute inset-0 w-full h-full object-cover" src={bgHero} autoPlay loop muted playsInline preload="none" />

        <div className="noise-overlay opacity-[0.7] mix-blend-overlay pointer-events-none z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 z-10" />
        <div className="section-vignette absolute inset-0 z-[3] pointer-events-none" />

        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 sm:px-8 lg:px-16 py-10">
          <div className="bg-[#101010]/80 backdrop-blur-md rounded-2xl md:rounded-3xl p-3 sm:p-8 md:p-12 w-full max-w-7xl border border-white/5 shadow-2xl flex flex-col gap-2 sm:gap-6 lg:gap-8">
            {/* Name */}
            <h1
              className="font-medium leading-[0.9] tracking-[-0.05em] m-0 text-center"
              style={{ color: '#ffffff', fontSize: 'clamp(20px,3vw,40px)' }}
            >
              <WordsPullUp text="Renzo Ramos" />
            </h1>

            {/* Subtitle */}
            <p
              className="font-bold leading-[1.05] tracking-[-0.04em] m-0 text-center"
              style={{ color: '#ffffff', fontSize: 'clamp(18px,5vw,64px)' }}
            >
              {t('hero_subtitle')}
            </p>

            {/* Body text */}
            <div className="text-center leading-relaxed"
              style={{ color: 'rgba(167,180,188,0.7)', fontSize: 'clamp(12px,1.4vw,17px)' }}>
              <p className="m-0 mb-4" dangerouslySetInnerHTML={{ __html: t('hero_body1') }} />
              <p className="m-0 mb-4">{t('hero_body2')}</p>
              <p className="m-0" dangerouslySetInnerHTML={{ __html: t('hero_body3') }} />
            </div>

            {/* Buttons */}
            <div className="md:hidden flex flex-wrap items-center justify-center gap-2">
              <PillButton label="GitHub" href="https://github.com/RenzoRamosDEV" external />
              <PillButton label="LinkedIn" href="https://www.linkedin.com/in/renzoinv04/" external />
              <PillButton label={t('hero_btn_curriculum')} href={cvPdf} external />
            </div>
            <div className="hidden md:flex flex-wrap items-center justify-center gap-3">
              <PillButton label="GitHub" href="https://github.com/RenzoRamosDEV" external />
              <PillButton label="LinkedIn" href="https://www.linkedin.com/in/renzoinv04/" external />
              <PillButton label={t('hero_btn_curriculum')} href={cvPdf} external />
            </div>
          </div>
        </div>

        <ScrollIndicator variant="absolute" iconColor="#000000" targetId="proyectos" />
      </div>
    </section>
  )
}
