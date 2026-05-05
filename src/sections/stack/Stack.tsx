import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { SectionTitle } from '../../components/ui/SectionTitle'
import { StackChip } from './StackChip'
import { StackDetailCard } from './StackDetailCard'
import { STACK } from '../../data/stack'
import type { StackItem } from '../../data/stack'

const STACK_GROUPS = [
  { key: 'back',        label: 'Backend'  },
  { key: 'stack-tools', label: 'Tools'    },
  { key: 'front',       label: 'Frontend' },
  { key: 'ia',          label: 'IA'       },
] as const

const stackRows = STACK_GROUPS.map(g => ({ ...g, items: STACK.filter(s => s.cat === g.key) }))

function DesktopStackCard({ item, index }: { item: StackItem; index: number }) {
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

export function Stack() {
  const [selectedStack, setSelectedStack] = useState<StackItem | null>(null)

  return (
    <section id="stack" className="bg-black">
      <div className="section-grid relative w-full flex flex-col">
        <div className="section-vignette absolute inset-0 z-[3] pointer-events-none" />

        <div className="relative z-10 flex-1 xl:overflow-hidden px-4 sm:px-6 lg:px-16 flex flex-col gap-3 lg:gap-4 py-6 lg:py-8 justify-center">

          <SectionTitle line1="Herramientas" line2="en mi Stack" />

          {/* Desktop: cards grandes por grupo */}
          <div className="hidden lg:flex flex-col gap-3">
            {stackRows.map((row) => (
              <div key={row.key} className="flex flex-col gap-1.5">
                <span className="text-[12px] font-bold tracking-widest uppercase text-[#A7B4BC]">
                  {row.label}
                </span>
                <div className="grid grid-cols-4 xl:grid-cols-6 gap-2 items-stretch">
                  {row.items.map((item, i) => (
                    <DesktopStackCard key={item.name} item={item} index={i} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: chips + detail card inline */}
          <div className="flex lg:hidden flex-col max-w-lg mx-auto w-full">
            {stackRows.map((row, ri) => (
              <div key={row.key} className="flex flex-col">
                <div className="flex flex-col gap-2 py-3">
                  <span className="text-[11px] font-bold tracking-widest uppercase text-[#A7B4BC]/40">
                    {row.label}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {row.items.map((item, i) => (
                      <StackChip
                        key={item.name}
                        item={item}
                        delay={ri * 0.03 + i * 0.02}
                        isSelected={selectedStack?.name === item.name}
                        onClick={() => setSelectedStack(p => p?.name === item.name ? null : item)}
                      />
                    ))}
                  </div>
                </div>
                <AnimatePresence>
                  {selectedStack && row.items.some(i => i.name === selectedStack.name) && (
                    <StackDetailCard
                      key={selectedStack.name}
                      item={selectedStack}
                      onClose={() => setSelectedStack(null)}
                    />
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </div>

        <div className="relative z-10 flex justify-center pb-6 pt-4">
        </div>
      </div>
    </section>
  )
}
