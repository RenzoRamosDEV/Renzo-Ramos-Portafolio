import { ArrowDown } from 'lucide-react'

type Props = {
  targetId?: string
  variant?: 'absolute' | 'inline'
  iconColor?: string
  bottomClass?: string
}

export function ScrollIndicator({ targetId, variant = 'inline', iconColor = '#A7B4BC', bottomClass }: Props) {
  const handleClick = () => {
    if (targetId) {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
    }
  }

  const positionClass = variant === 'absolute'
    ? `absolute ${bottomClass ?? 'bottom-6 md:bottom-10'} left-0 right-0 mx-auto z-20 pointer-events-auto`
    : ''

  return (
    <div
      onClick={handleClick}
      className={`${positionClass} cursor-pointer flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full shadow-lg transition-all duration-300 animate-bounce`}
    >
      <ArrowDown className="w-6 h-6 md:w-8 md:h-8" strokeWidth={2.5} style={{ color: iconColor }} />
    </div>
  )
}
