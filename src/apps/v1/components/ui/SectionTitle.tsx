import { WordsPullUp } from '../motion/WordsPullUp'

type Props = {
  line1: string
  line2?: string
  align?: 'left' | 'center' | 'right'
}

export function SectionTitle({ line1, line2, align = 'left' }: Props) {
  const alignClass = align === 'left' ? 'text-left' : align === 'right' ? 'text-right' : 'text-center'
  return (
    <div className={`flex flex-col leading-[1.1] tracking-[-0.07em] ${alignClass}`} style={{ fontSize: 'clamp(40px,6vw,80px)', fontWeight: 500 }}>
      <span style={{ color: '#A7B4BC' }}>
        <WordsPullUp text={line1} align={align} />
      </span>
      {line2 && (
        <span style={{ color: 'rgba(167,180,188,0.25)' }}>
          <WordsPullUp text={line2} align={align} />
        </span>
      )}
    </div>
  )
}
