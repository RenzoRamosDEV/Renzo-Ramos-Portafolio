import { motion } from 'framer-motion'
import type { StackItem } from '../data/stack'
import type { MethodologyItem } from '../data/methodologies'

type Props = {
  item: StackItem | MethodologyItem
  onClose: () => void
  reverse?: boolean
}

export function ItemDetailCard({ item, onClose, reverse = false }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: reverse ? -10 : 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: reverse ? -10 : 10 }}
      transition={{ duration: 0.18 }}
      className="w-full lg:w-80 lg:self-stretch lg:flex-shrink-0 bg-[#111]/80 backdrop-blur-md border border-white/5 rounded-2xl p-5 mb-2 flex flex-col gap-4 relative"
    >
      <button
        onClick={onClose}
        className="absolute top-3 right-4 text-[#A7B4BC]/25 hover:text-[#A7B4BC]/70 transition-colors text-lg leading-none cursor-pointer border-0 bg-transparent"
      >
        ×
      </button>

      <div className="flex items-center gap-4">
        <div className="w-16 h-16 flex items-center justify-center flex-shrink-0">
          {item.kind === 'methodology' ? (
            <span className="w-14 h-14 rounded-2xl bg-[#A7B4BC]/40 flex items-center justify-center text-base font-bold text-[#A7B4BC] tracking-wide">
              {item.label}
            </span>
          ) : (
            <img
              src={item.icon}
              alt={item.name}
              className="w-14 h-14 object-contain"
              style={{ mixBlendMode: 'screen' }}
            />
          )}
        </div>
        <span className="text-white font-semibold text-xl leading-snug">{item.name}</span>
      </div>

      <div className="h-px bg-white/5" />
      <p className="text-[#A7B4BC]/55 text-sm leading-relaxed m-0">{item.desc}</p>
    </motion.div>
  )
}
