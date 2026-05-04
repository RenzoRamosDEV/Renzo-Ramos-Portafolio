import { WordsPullUp } from '../../components/animations/WordsPullUp'
import { ScrollIndicator } from '../../components/ui/ScrollIndicator'
import { PillButton } from '../../components/ui/PillButton'
import bgHero from '../../assets/videos/bg-hero-light.mp4'

export function Hero() {
  return (
    <section id="sobre-mi" className="min-h-screen p-[16px]">
      <div className="relative w-full min-h-[calc(100vh-32px)] rounded-2xl md:rounded-[2rem] overflow-hidden">
        <video className="absolute inset-0 w-full h-full object-cover" src={bgHero} autoPlay loop muted playsInline />

        <div className="noise-overlay opacity-[0.7] mix-blend-overlay pointer-events-none z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 z-10" />

        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 sm:px-8 lg:px-16 overflow-y-auto py-20">
          <div className="bg-[#101010]/80 backdrop-blur-md rounded-2xl md:rounded-3xl p-5 sm:p-8 md:p-12 w-full max-w-7xl border border-white/5 shadow-2xl flex flex-col gap-4 sm:gap-6 lg:gap-8">
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
              style={{ color: '#ffffff', fontSize: 'clamp(22px,5vw,64px)' }}
            >
              Construyo backends robustos para que tu negocio nunca se detenga.
            </p>

            {/* Body text */}
            <div className="text-center leading-relaxed"
              style={{ color: 'rgba(167,180,188,0.7)', fontSize: 'clamp(14px,1.4vw,17px)' }}>
              <p className="m-0 mb-4">
                Desarrollo APIs escalables con Java y Spring Boot bajo principios de Clean Architecture.
              </p>
              <p className="m-0 mb-4">
                ¿El resultado? Sistemas fáciles de mantener, con menos incidencias técnicas y listos para crecer al ritmo de tus usuarios.
              </p>
              <p className="m-0">
                Mi experiencia en frontend y diseño me permite cerrar la brecha entre la lógica y la interfaz, entregando productos coherentes que funcionan bien por dentro y se ven bien por fuera.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <PillButton label="GitHub" href="https://github.com/RenzoRamosDEV" external />
              <PillButton label="LinkedIn" href="https://www.linkedin.com/in/renzoinv04/" external />
              <PillButton label="Curriculum" disabled />
            </div>
          </div>
        </div>

        <ScrollIndicator variant="absolute" iconColor="#000000" targetId="proyectos" />
      </div>
    </section>
  )
}
