import { Chip } from '../../components/ui/Chip'
import type { StackItem } from '../../data/stack'

type Props = {
  item: StackItem
  isSelected: boolean
  onClick: () => void
  delay: number
}

export function StackChip({ item, isSelected, onClick, delay }: Props) {
  return (
    <Chip
      label={item.name}
      isSelected={isSelected}
      onClick={onClick}
      delay={delay}
      badge={
        <img
          src={item.icon}
          alt={item.name}
          className="w-5 h-5 object-contain flex-shrink-0"
          style={{ mixBlendMode: 'screen' }}
        />
      }
    />
  )
}
