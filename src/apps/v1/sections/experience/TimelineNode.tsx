import { useRef } from 'react'
import { ExternalLink } from 'lucide-react'
import { useInView } from '../../hooks/useInView'

export type TimelineType = 'job' | 'edu' | 'cert'

export type TimelineEntry = {
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

type Props = {
  item: TimelineEntry
  index: number
  isLast: boolean
  hideLabel?: boolean
  typeLabels: Record<TimelineType, string>
  seecert: string
  seecred: string
}

export function TimelineNode({ item, index, isLast, hideLabel = false, typeLabels, seecert, seecred }: Props) {
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

      <div style={{ paddingBottom: isLast ? 0 : 'clamp(20px,3vw,36px)', flex: 1, minWidth: 0 }}>
        {!hideLabel && (
          <span
            className="inline-block text-[9px] tracking-[0.14em] uppercase mb-1.5"
            style={{ color: LABEL_COLOR, fontWeight: 700 }}
          >
            {typeLabels[item.type]}
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
                style={{ color: LABEL_COLOR, fontSize: 'clamp(14px,2.2vw,22px)', letterSpacing: '-0.03em' }}
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
                  {seecert} <ExternalLink className="w-3 h-3" />
                </a>
              )}
              {item.url && item.url !== '#' && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="timeline-link flex items-center gap-1 text-[11px] no-underline"
                >
                  {seecred} <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
