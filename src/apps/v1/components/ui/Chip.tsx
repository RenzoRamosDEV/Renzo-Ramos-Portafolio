import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { ReactNode } from 'react'

type Props = {
  label: string
  badge: ReactNode
  isSelected: boolean
  onClick: () => void
  delay: number
}

export function Chip({ label, badge, isSelected, onClick, delay }: Props) {
  const ref = useRef<HTMLButtonElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      initial={{ opacity: 0, y: 6 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
      transition={{ duration: 0.25, delay }}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97 }}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-150 border select-none cursor-pointer ${
        isSelected
          ? 'bg-white/10 border-white/20 text-white'
          : 'bg-white/4 border-white/7 text-[#A7B4BC]/75 hover:bg-white/8 hover:border-white/12 hover:text-[#A7B4BC]'
      }`}
    >
      {badge}
      {label}
    </motion.button>
  )
}
