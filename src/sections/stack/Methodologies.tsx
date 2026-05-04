import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SectionTitle } from '../../components/ui/SectionTitle'

import { StackMethodChip } from './StackMethodChip'
import { StackDetailCard } from './StackDetailCard'
import { METHODOLOGIES } from '../../data/methodologies'
import type { MethodologyItem } from '../../data/methodologies'

const METHOD_GROUPS = [
  { key: 'arch',    label: 'Arquitectura' },
  { key: 'testing', label: 'Testing'      },
  { key: 'process', label: 'Proceso'      },
  { key: 'ui',      label: 'UI'           },
] as const

const methodRows = METHOD_GROUPS.map(g => ({ ...g, items: METHODOLOGIES.filter(m => m.cat === g.key) }))

function DesktopMethodCard({ item, index }: { item: MethodologyItem; index: number }) {
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
      <p className="text-[#A7B4BC]/70 text-[13px] leading-relaxed m-0 line-clamp-3">{item.desc}</p>
    </motion.div>
  )
}

export function Methodologies() {
  const [selectedMet, setSelectedMet] = useState<MethodologyItem | null>(null)

  return (
    <section id="metodologias" className="min-h-screen bg-black p-[16px]">
      <div
        className="relative w-full rounded-2xl md:rounded-[2rem] flex flex-col md:overflow-hidden md:h-[calc(100vh-32px)]"
        style={{
          background: '#1a1d22',
          backgroundImage:
            'linear-gradient(rgba(167,180,188,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(167,180,188,0.03) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          minHeight: 'calc(100vh - 32px)',
        }}
      >
        <div
          className="absolute inset-0 z-[3] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, transparent 50%, rgba(0,0,0,0.6) 100%)' }}
        />

        <div className="relative z-10 flex-1 xl:overflow-hidden px-4 sm:px-6 lg:px-24 flex flex-col gap-4 lg:gap-4 py-10 lg:py-10 pb-20">

          <SectionTitle text="Metodologías que aplico" align="left" leading="snug" />

          {/* Desktop: cards grandes por grupo */}
          <div className="hidden lg:flex flex-col gap-3">
            {methodRows.map((row) => (
              <div key={row.key} className="flex flex-col gap-2">
                <span className="text-[13px] font-bold tracking-widest uppercase text-[#A7B4BC]">
                  {row.label}
                </span>
                <div className="grid grid-cols-4 xl:grid-cols-6 gap-3">
                  {row.items.map((item, i) => (
                    <DesktopMethodCard key={item.name} item={item} index={i} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: chips + detail card inline */}
          <div className="flex lg:hidden flex-col">
            {methodRows.map((row, ri) => (
              <div key={row.key} className="flex flex-col border-b border-white/5 first:border-t first:border-white/5">
                <div className="flex flex-col gap-2 py-3">
                  <span className="text-[11px] font-bold tracking-widest uppercase text-[#A7B4BC]/40">
                    {row.label}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {row.items.map((item, i) => (
                      <StackMethodChip
                        key={item.name}
                        item={item}
                        delay={ri * 0.03 + i * 0.02}
                        isSelected={selectedMet?.name === item.name}
                        onClick={() => setSelectedMet(p => p?.name === item.name ? null : item)}
                      />
                    ))}
                  </div>
                </div>
                <AnimatePresence>
                  {selectedMet && row.items.some(i => i.name === selectedMet.name) && (
                    <StackDetailCard
                      key={selectedMet.name}
                      item={selectedMet}
                      onClose={() => setSelectedMet(null)}
                    />
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </div>


      </div>
    </section>
  )
}
