import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { SectionTitle } from '../../components/ui/SectionTitle'
import { ItemDetailCard } from '../../shared/ItemDetailCard'
import { getStack } from '../../data/stack'
import { useLanguage } from '../../i18n/LanguageContext'
import { StackCard } from './StackCard'
import { StackChip } from './StackChip'
import type { StackItem } from '../../data/stack'

export function StackSection() {
  const { t, lang } = useLanguage()
  const [selectedItem, setSelectedItem] = useState<StackItem | null>(null)

  const stackGroups = [
    { key: 'back',        label: t('stack_group_back')  },
    { key: 'stack-tools', label: t('stack_group_tools') },
    { key: 'front',       label: t('stack_group_front') },
    { key: 'ia',          label: t('stack_group_ia')    },
  ] as const

  const allItems = getStack(lang)
  const groupedRows = stackGroups.map(g => ({ ...g, items: allItems.filter(s => s.cat === g.key) }))

  return (
    <section id="stack" className="bg-black">
      <div className="section-grid relative w-full flex flex-col">
        <div className="section-vignette absolute inset-0 z-[3] pointer-events-none" />

        <div className="relative z-10 flex-1 xl:overflow-hidden px-4 sm:px-6 lg:px-16 flex flex-col gap-3 lg:gap-4 py-6 lg:py-8 justify-center">
          <SectionTitle line1={t('stack_title1')} line2={t('stack_title2')} />

          {/* Desktop */}
          <div className="hidden lg:flex flex-col gap-3">
            {groupedRows.map((row) => (
              <div key={row.key} className="flex flex-col gap-1.5">
                <span className="text-[12px] font-bold tracking-widest uppercase text-[#A7B4BC]">
                  {row.label}
                </span>
                <div className="grid grid-cols-4 xl:grid-cols-6 gap-2 items-stretch">
                  {row.items.map((item, i) => (
                    <StackCard key={item.name} item={item} index={i} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile */}
          <div className="flex lg:hidden flex-col max-w-lg mx-auto w-full">
            {groupedRows.map((row, ri) => (
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
                        isSelected={selectedItem?.name === item.name}
                        onClick={() => setSelectedItem(p => p?.name === item.name ? null : item)}
                      />
                    ))}
                  </div>
                </div>
                <AnimatePresence>
                  {selectedItem && row.items.some(i => i.name === selectedItem.name) && (
                    <ItemDetailCard
                      key={selectedItem.name}
                      item={selectedItem}
                      onClose={() => setSelectedItem(null)}
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
