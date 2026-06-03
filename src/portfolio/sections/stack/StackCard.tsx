import { motion } from 'framer-motion'
import type { StackItem } from '../../data/stack'

type Props = {
  item: StackItem
  index: number
}

export function StackCard({ item, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/10 rounded-xl p-4 flex flex-col gap-2.5 transition-all duration-200 cursor-default"
    >
      <div className="flex items-center gap-2.5">
        <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
          <img
            src={item.icon}
            alt={item.name}
            className="w-9 h-9 object-contain"
            style={{ mixBlendMode: 'screen' }}
          />
        </div>
        <span className="text-[#A7B4BC] font-semibold text-[15px] leading-snug truncate">{item.name}</span>
      </div>
      <p className="text-[#A7B4BC]/70 text-[12px] leading-relaxed m-0">{item.desc}</p>
    </motion.div>
  )
}
