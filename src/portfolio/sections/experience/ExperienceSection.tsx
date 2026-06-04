import { SectionTitle } from '../../components/ui/SectionTitle'
import { getExperience } from '../../data/experience'
import { getEducation } from '../../data/education'
import { getCertificates } from '../../data/certificates'
import { useLanguage } from '../../i18n/LanguageContext'
import { TimelineNode } from './TimelineNode'
import type { TimelineEntry, TimelineType } from './TimelineNode'

const LABEL_COLOR = '#A7B4BC'

function WorkAndCertificatesCard() {
  const { t, lang } = useLanguage()
  const experienceItems = getExperience(lang)
  const certificateItems = getCertificates(lang)

  const typeLabels: Record<TimelineType, string> = {
    job: t('exp_type_job'),
    edu: t('exp_type_edu'),
    cert: t('exp_type_cert'),
  }

  const workEntries: TimelineEntry[] = experienceItems.map(e => ({
    type: 'job',
    year: '2025',
    title: e.title,
    company: e.company,
    period: e.period,
    desc: e.desc,
  }))

  const certificateEntries: TimelineEntry[] = certificateItems.map(c => ({
    type: 'cert',
    year: c.period.slice(-4),
    title: c.title,
    company: c.company,
    period: c.period,
    url: c.credential,
    pdf: c.pdf,
  }))

  const sharedProps = { typeLabels, seecert: t('exp_see_cert'), seecred: t('exp_see_credential') }

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
        <SectionTitle line1={t('exp_title1')} line2={t('exp_title2')} />

        {/* Mobile: columna única */}
        <div className="flex md:hidden flex-col gap-[clamp(16px,2vw,24px)] max-w-lg mx-auto w-full">
          <div className="bg-[#101010]/70 backdrop-blur-md border border-white/[0.06] rounded-[18px] p-[clamp(24px,3vw,40px)] flex flex-col gap-0">
            <span className="text-[12px] tracking-[0.14em] uppercase mb-6 font-bold" style={{ color: LABEL_COLOR }}>
              {t('exp_label_job')}
            </span>
            {workEntries.map((entry, i) => (
              <TimelineNode key={`job-${i}`} item={entry} index={i} isLast={i === workEntries.length - 1} hideLabel {...sharedProps} />
            ))}
          </div>
          <div className="bg-[#101010]/70 backdrop-blur-md border border-white/[0.06] rounded-[18px] p-[clamp(24px,3vw,40px)] flex flex-col gap-0">
            <span className="text-[12px] tracking-[0.14em] uppercase mb-6 font-bold" style={{ color: LABEL_COLOR }}>
              {t('exp_label_cert')}
            </span>
            {certificateEntries.map((entry, i) => (
              <TimelineNode key={`cert-${i}`} item={entry} index={i} isLast={i === certificateEntries.length - 1} hideLabel {...sharedProps} />
            ))}
          </div>
        </div>

        {/* Desktop: 2 columnas */}
        <div className="hidden md:grid grid-cols-2 gap-[clamp(16px,2vw,24px)] flex-1 content-center">
          <div className="bg-[#101010]/70 backdrop-blur-md border border-white/[0.06] rounded-[18px] p-[clamp(24px,3vw,40px)] flex flex-col gap-0">
            <span className="text-[12px] tracking-[0.14em] uppercase mb-6 font-bold" style={{ color: LABEL_COLOR }}>
              {t('exp_label_job')}
            </span>
            {workEntries.map((entry, i) => (
              <TimelineNode key={`job-${i}`} item={entry} index={i} isLast={i === workEntries.length - 1} hideLabel {...sharedProps} />
            ))}
          </div>
          <div className="bg-[#101010]/70 backdrop-blur-md border border-white/[0.06] rounded-[18px] p-[clamp(24px,3vw,40px)] flex flex-col gap-0">
            <span className="text-[12px] tracking-[0.14em] uppercase mb-6 font-bold" style={{ color: LABEL_COLOR }}>
              {t('exp_label_cert')}
            </span>
            {certificateEntries.map((entry, i) => (
              <TimelineNode key={`cert-${i}`} item={entry} index={i} isLast={i === certificateEntries.length - 1} hideLabel {...sharedProps} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function EducationCard() {
  const { t, lang } = useLanguage()
  const educationItems = getEducation(lang)

  const typeLabels: Record<TimelineType, string> = {
    job: t('exp_type_job'),
    edu: t('exp_type_edu'),
    cert: t('exp_type_cert'),
  }

  const educationEntries: TimelineEntry[] = educationItems.map(e => ({
    type: 'edu',
    year: e.period.slice(0, 4),
    title: e.title,
    company: e.company,
    period: e.period,
    desc: e.desc,
  }))

  const sharedProps = { typeLabels, seecert: t('exp_see_cert'), seecred: t('exp_see_credential') }

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
        <SectionTitle line1={t('exp_edu_title1')} line2={t('exp_edu_title2')} />

        <div className="w-full bg-[#101010]/70 backdrop-blur-md border border-white/[0.06] rounded-[18px] p-[clamp(16px,2vw,28px)] flex flex-col gap-0">
          <span className="text-[12px] tracking-[0.14em] uppercase mb-4 font-bold" style={{ color: LABEL_COLOR }}>
            {t('exp_label_edu')}
          </span>

          {/* Mobile */}
          <div className="flex md:hidden flex-col max-w-lg mx-auto w-full">
            {educationEntries.map((entry, i) => (
              <TimelineNode key={`edu-${i}`} item={entry} index={i} isLast={i === educationEntries.length - 1} hideLabel {...sharedProps} />
            ))}
          </div>

          {/* Desktop: fila horizontal */}
          <div
            className="hidden md:grid gap-[clamp(12px,2vw,24px)]"
            style={{ gridTemplateColumns: `repeat(${educationEntries.length}, 1fr)` }}
          >
            {educationEntries.map((entry, i) => (
              <div key={`edu-h-${i}`} className="border-l border-white/[0.07] pl-4 flex flex-col gap-1">
                <h4
                  className="m-0 leading-[1.2] font-semibold"
                  style={{ color: LABEL_COLOR, letterSpacing: '-0.03em', fontSize: 'clamp(16px,2.2vw,22px)' }}
                >
                  {entry.title}
                </h4>
                <p className="text-[13px] tracking-[0.08em] uppercase m-0" style={{ color: LABEL_COLOR }}>
                  {entry.company}
                </p>
                <span className="font-mono text-[12px]" style={{ color: LABEL_COLOR }}>{entry.period}</span>
                {entry.desc && (
                  <p className="text-[14px] leading-relaxed m-0 mt-1" style={{ color: LABEL_COLOR }}>
                    {entry.desc.split('\n').filter(Boolean).map((line, j) => (
                      <span key={j} className={`block ${line.startsWith('-') ? 'pl-2' : ''}`}>{line}</span>
                    ))}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function ExperienceSection() {
  return (
    <>
      <section id="experiencia" className="bg-black">
        <WorkAndCertificatesCard />
      </section>

      <section id="experiencia-formacion" className="hidden md:block bg-black">
        <EducationCard />
      </section>
    </>
  )
}
