import { useRef } from 'react'
import { SectionTitle } from '../../components/ui/SectionTitle'
import { experienceItems } from '../../data/experience'
import { educationItems } from '../../data/education'
import { certificateItems } from '../../data/certificates'
import { useInView } from '../../hooks/useInView'
import { ExternalLink } from 'lucide-react'

type TimelineType = 'job' | 'edu' | 'cert'

type TimelineEntry = {
  type: TimelineType
  year: string
  title: string
  company: string
  period: string
  desc?: string
  url?: string
  pdf?: string
  accent?: boolean
}

const ALL_TIMELINE: TimelineEntry[] = [
  {
    type: 'job',
    year: '2025',
    title: experienceItems[0].title,
    company: experienceItems[0].company,
    period: experienceItems[0].period,
    desc: experienceItems[0].desc,
  },
  ...educationItems.map(e => ({
    type: 'edu' as TimelineType,
    year: e.period.slice(0, 4),
    title: e.title,
    company: e.company,
    period: e.period,
    desc: e.desc,
  })),
  ...certificateItems.map(c => ({
    type: 'cert' as TimelineType,
    year: c.period.slice(-4),
    title: c.title,
    company: c.company,
    period: c.period,
    url: c.credential,
    pdf: c.pdf,
  })),
]

const TIMELINE_JOBS = ALL_TIMELINE.filter(i => i.type === 'job')
const TIMELINE_CERTS = ALL_TIMELINE.filter(i => i.type === 'cert')
const TIMELINE_EDU = ALL_TIMELINE.filter(i => i.type === 'edu')

const TYPE_LABELS: Record<TimelineType, string> = {
  job: 'Laboral',
  edu: 'Formación',
  cert: 'Certificado',
}

const TYPE_DOT: Record<TimelineType, string> = {
  job: '#A7B4BC',
  edu: 'rgba(167,180,188,0.4)',
  cert: 'rgba(167,180,188,0.25)',
}

const TYPE_LINE: Record<TimelineType, string> = {
  job: 'rgba(167,180,188,0.4)',
  edu: 'rgba(167,180,188,0.15)',
  cert: 'rgba(167,180,188,0.08)',
}

const LABEL_COLOR = '#A7B4BC'

function TimelineNode({
  item,
  index,
  isLast,
  hideLabel = false,
}: {
  item: TimelineEntry
  index: number
  isLast: boolean
  hideLabel?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const visible = useInView(ref, 0.05)
  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        gap: 'clamp(16px,3vw,32px)',
        position: 'relative',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(-20px)',
        transition: `opacity 0.5s ${index * 0.07}s ease, transform 0.5s ${index * 0.07}s ease`,
      }}
    >
      <div className="flex flex-col items-center flex-shrink-0 w-12">
        <span
          className="font-mono text-[10px] mb-1.5 whitespace-nowrap"
          style={{ color: LABEL_COLOR, letterSpacing: '0.05em' }}
        >
          {item.year}
        </span>
        <div
          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
          style={{
            background: TYPE_DOT[item.type],
            boxShadow: item.accent ? '0 0 0 3px rgba(167,180,188,0.15)' : undefined,
          }}
        />
        {!isLast && (
          <div
            className="w-px flex-1 mt-1"
            style={{ minHeight: 24, background: `linear-gradient(to bottom, ${TYPE_LINE[item.type]}, rgba(167,180,188,0.04))` }}
          />
        )}
      </div>

      <div
        style={{ paddingBottom: isLast ? 0 : 'clamp(20px,3vw,36px)', flex: 1, minWidth: 0 }}
      >
        {!hideLabel && (
          <span
            className="inline-block text-[9px] tracking-[0.14em] uppercase mb-1.5"
            style={{ color: LABEL_COLOR, fontWeight: 700 }}
          >
            {TYPE_LABELS[item.type]}
          </span>
        )}

        <div
          className={
            item.accent
              ? 'bg-[#101010]/82 backdrop-blur-md border border-white/[0.06] shadow-[0_8px_40px_rgba(0,0,0,0.45)] rounded-[18px] p-[clamp(16px,2vw,24px)]'
              : 'border-l border-white/[0.07] pl-[clamp(12px,2vw,20px)]'
          }
        >
          <div className="flex justify-between items-start flex-wrap gap-2">
            <div>
              <h4
                className="m-0 leading-[1.2] font-semibold"
                style={{
                  color: LABEL_COLOR,
                  fontSize: 'clamp(14px,2.2vw,22px)',
                  letterSpacing: '-0.03em',
                }}
              >
                {item.title}
              </h4>
              <p
                className="text-[11px] md:text-[13px] mt-1 tracking-[0.08em] uppercase"
                style={{ color: LABEL_COLOR, margin: '4px 0 0' }}
              >
                {item.company}
              </p>
            </div>
            <span
              className="font-mono whitespace-nowrap flex-shrink-0 text-[10.5px] md:text-[12px]"
              style={{ color: LABEL_COLOR }}
            >
              {item.period}
            </span>
          </div>

          {item.desc && (
            <p
              className="text-[12.5px] md:text-[14px] leading-relaxed mt-2.5"
              style={{ color: LABEL_COLOR, margin: '10px 0 0' }}
            >
              {item.desc.split('\n').filter(Boolean).map((line, i) => (
                <span key={i} className={`block ${line.startsWith('-') ? 'pl-2' : ''}`}>
                  {line}
                </span>
              ))}
            </p>
          )}

          {(item.url || item.pdf) && (
            <div className="mt-3 flex items-center gap-4">
              {item.pdf && (
                <a
                  href={item.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="timeline-link flex items-center gap-1 text-[11px] no-underline"
                >
                  Ver certificado <ExternalLink className="w-3 h-3" />
                </a>
              )}
              {item.url && item.url !== '#' && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="timeline-link flex items-center gap-1 text-[11px] no-underline"
                >
                  Ver credencial <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ExperienceCard({ targetId }: { targetId: string }) {
  return (
    <div className="section-grid relative w-full flex flex-col">
      <div className="section-vignette absolute inset-0 z-[3] pointer-events-none" />
      <div
        className="relative z-10 flex-1 flex flex-col justify-center md:justify-between"
        style={{
          padding: 'clamp(24px,6vw,64px) clamp(20px,4.5vw,64px) clamp(24px,4vw,48px)',
          gap: 'clamp(28px,4vw,44px)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div className="flex items-baseline justify-between flex-wrap gap-3">
          <SectionTitle line1="Trayectoria Laboral" line2="& Certificados" />
        </div>

        {/* Mobile: columna única */}
        <div className="flex md:hidden flex-col gap-[clamp(16px,2vw,24px)] max-w-lg mx-auto w-full">
          <div className="bg-[#101010]/70 backdrop-blur-md border border-white/[0.06] rounded-[18px] p-[clamp(24px,3vw,40px)] flex flex-col gap-0">
            <span className="text-[12px] tracking-[0.14em] uppercase mb-6 font-bold" style={{ color: LABEL_COLOR }}>Laboral</span>
            {TIMELINE_JOBS.map((item, i) => (
              <TimelineNode key={`job-${i}`} item={item} index={i} isLast={i === TIMELINE_JOBS.length - 1} hideLabel />
            ))}
          </div>
          <div className="bg-[#101010]/70 backdrop-blur-md border border-white/[0.06] rounded-[18px] p-[clamp(24px,3vw,40px)] flex flex-col gap-0">
            <span className="text-[12px] tracking-[0.14em] uppercase mb-6 font-bold" style={{ color: LABEL_COLOR }}>Certificados</span>
            {TIMELINE_CERTS.map((item, i) => (
              <TimelineNode key={`cert-${i}`} item={item} index={i} isLast={i === TIMELINE_CERTS.length - 1} hideLabel />
            ))}
          </div>
          <div className="bg-[#101010]/70 backdrop-blur-md border border-white/[0.06] rounded-[18px] p-[clamp(16px,2vw,28px)] flex flex-col gap-0">
            <span className="text-[12px] tracking-[0.14em] uppercase mb-4 font-bold" style={{ color: LABEL_COLOR }}>Formación</span>
            {TIMELINE_EDU.map((item, i) => (
              <TimelineNode key={`edu-${i}`} item={item} index={i} isLast={i === TIMELINE_EDU.length - 1} hideLabel />
            ))}
          </div>
        </div>

        {/* Desktop: 2 columnas */}
        <div className="hidden md:grid grid-cols-2 gap-[clamp(16px,2vw,24px)] flex-1 content-center">
          <div className="bg-[#101010]/70 backdrop-blur-md border border-white/[0.06] rounded-[18px] p-[clamp(24px,3vw,40px)] flex flex-col gap-0">
            <span className="text-[12px] tracking-[0.14em] uppercase mb-6 font-bold" style={{ color: LABEL_COLOR }}>Laboral</span>
            {TIMELINE_JOBS.map((item, i) => (
              <TimelineNode key={`job-${i}`} item={item} index={i} isLast={i === TIMELINE_JOBS.length - 1} hideLabel />
            ))}
          </div>
          <div className="bg-[#101010]/70 backdrop-blur-md border border-white/[0.06] rounded-[18px] p-[clamp(24px,3vw,40px)] flex flex-col gap-0">
            <span className="text-[12px] tracking-[0.14em] uppercase mb-6 font-bold" style={{ color: LABEL_COLOR }}>Certificados</span>
            {TIMELINE_CERTS.map((item, i) => (
              <TimelineNode key={`cert-${i}`} item={item} index={i} isLast={i === TIMELINE_CERTS.length - 1} hideLabel />
            ))}
          </div>
        </div>

        <div className="flex justify-center pt-2">
        </div>
      </div>
    </div>
  )
}

function EducationCard() {
  return (
    <div className="section-grid relative w-full flex flex-col">
      <div className="section-vignette absolute inset-0 z-[3] pointer-events-none" />
      <div
        className="relative z-10 flex-1 flex flex-col justify-center md:justify-between"
        style={{
          padding: 'clamp(24px,6vw,64px) clamp(20px,4.5vw,64px) clamp(24px,4vw,48px)',
          gap: 'clamp(28px,4vw,44px)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div className="flex items-baseline justify-between flex-wrap gap-3">
          <SectionTitle line1="Trayectoria" line2="en Formación" />
        </div>

        <div className="w-full bg-[#101010]/70 backdrop-blur-md border border-white/[0.06] rounded-[18px] p-[clamp(16px,2vw,28px)] flex flex-col gap-0">
          <span className="text-[12px] tracking-[0.14em] uppercase mb-4 font-bold" style={{ color: LABEL_COLOR }}>Formación</span>
          {/* Mobile: columna */}
          <div className="flex md:hidden flex-col max-w-lg mx-auto w-full">
            {TIMELINE_EDU.map((item, i) => (
              <TimelineNode key={`edu-${i}`} item={item} index={i} isLast={i === TIMELINE_EDU.length - 1} hideLabel />
            ))}
          </div>
          {/* Desktop: fila horizontal */}
          <div className="hidden md:grid gap-[clamp(12px,2vw,24px)]" style={{ gridTemplateColumns: `repeat(${TIMELINE_EDU.length}, 1fr)` }}>
            {TIMELINE_EDU.map((item, i) => (
              <div key={`edu-h-${i}`} className="border-l border-white/[0.07] pl-4 flex flex-col gap-1">
                <h4 className="m-0 leading-[1.2] font-semibold" style={{ color: LABEL_COLOR, letterSpacing: '-0.03em', fontSize: 'clamp(16px,2.2vw,22px)' }}>{item.title}</h4>
                <p className="text-[13px] tracking-[0.08em] uppercase m-0" style={{ color: LABEL_COLOR }}>{item.company}</p>
                <span className="font-mono text-[12px]" style={{ color: LABEL_COLOR }}>{item.period}</span>
                {item.desc && (
                  <p className="text-[14px] leading-relaxed m-0 mt-1" style={{ color: LABEL_COLOR }}>
                    {item.desc.split('\n').filter(Boolean).map((line, j) => (
                      <span key={j} className={`block ${line.startsWith('-') ? 'pl-2' : ''}`}>{line}</span>
                    ))}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center pt-2">
        </div>
      </div>
    </div>
  )
}

export function Experience() {
  return (
    <>
      <section id="experiencia" className="bg-black">
        <ExperienceCard targetId="experiencia-formacion" />
      </section>

      {/* Solo desktop */}
      <section id="experiencia-formacion" className="hidden md:block bg-black">
        <EducationCard />
      </section>
    </>
  )
}
