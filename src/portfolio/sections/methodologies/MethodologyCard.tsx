import { motion } from 'framer-motion'
import type { MethodologyItem } from '../../data/methodologies'

type Props = {
  item: MethodologyItem
  index: number
}

export function MethodologyCard({ item, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/10 rounded-xl p-4 flex flex-col gap-3 transition-all duration-200 cursor-default"
    >
      <div className="flex items-center gap-2.5">
        <span className="w-11 h-11 rounded-xl bg-[#A7B4BC]/20 flex items-center justify-center text-[11px] font-bold tracking-wide text-[#A7B4BC] flex-shrink-0">
          {item.label}
        </span>
        <span className="text-[#A7B4BC] font-semibold text-[17px] leading-snug">{item.name}</span>
      </div>
      <p className="text-[#A7B4BC]/70 text-[13px] leading-relaxed m-0">{item.desc}</p>
    </motion.div>
  )
}
