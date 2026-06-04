import { Chip } from '../../components/ui/Chip'
import type { MethodologyItem } from '../../data/methodologies'

type Props = {
  item: MethodologyItem
  isSelected: boolean
  onClick: () => void
  delay: number
}

export function MethodologyChip({ item, isSelected, onClick, delay }: Props) {
  return (
    <Chip
      label={item.name}
      isSelected={isSelected}
      onClick={onClick}
      delay={delay}
      badge={
        <span className="w-6 h-6 rounded-md bg-[#A7B4BC]/40 flex items-center justify-center text-[8px] font-bold tracking-wide text-[#A7B4BC] flex-shrink-0">
          {item.label}
        </span>
      }
    />
  )
}
