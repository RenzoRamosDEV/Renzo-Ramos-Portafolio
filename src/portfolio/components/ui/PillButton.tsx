import { ArrowRight } from 'lucide-react'

type Common = {
  label: string
  width?: 'xs' | 'sm' | 'md'
}

type AsLink = Common & { href: string; disabled?: false; external?: boolean; onClick?: never }
type AsButton = Common & { href?: undefined; disabled?: boolean; external?: never; onClick?: () => void }

const SIZE_MAP = {
  xs: { width: 'w-16 lg:w-24', text: 'text-xs lg:text-sm', icon: 'w-7 h-7 lg:w-9 lg:h-9', padding: 'pl-3 pr-1 py-1 lg:pl-4 lg:pr-1.5 lg:py-1.5' },
  sm: { width: 'w-20', text: 'text-xs', icon: 'w-7 h-7', padding: 'pl-3 pr-1 py-1' },
  md: { width: 'w-20 md:w-28', text: 'text-xs md:text-base', icon: 'w-7 h-7 md:w-10 md:h-10', padding: 'pl-3 pr-1 py-1 md:pl-5 md:pr-1.5 md:py-1.5' },
} as const

export function PillButton(props: AsLink | AsButton) {
  const { label, width = 'md' } = props
  const { width: widthClass, text: textClass, icon: iconClass, padding: paddingClass } = SIZE_MAP[width]
  const baseClass = `group flex items-center gap-2 hover:gap-3 bg-[#A7B4BC] rounded-full ${paddingClass} transition-all duration-300 no-underline border-0`

  const inner = (
    <>
      <span className={`text-black font-medium ${textClass} text-center ${widthClass}`}>{label}</span>
      <span className={`bg-black rounded-full ${iconClass} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
        <ArrowRight className="w-4 h-4 text-[#A7B4BC]" />
      </span>
    </>
  )

  if ('href' in props && props.href) {
    return (
      <a
        href={props.href}
        target={props.external ? '_blank' : undefined}
        rel={props.external ? 'noopener noreferrer' : undefined}
        className={baseClass}
      >
        {inner}
      </a>
    )
  }

  const disabled = (props as AsButton).disabled
  return (
    <button
      onClick={(props as AsButton).onClick}
      disabled={disabled}
      className={`${baseClass} cursor-pointer ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
    >
      {inner}
    </button>
  )
}
