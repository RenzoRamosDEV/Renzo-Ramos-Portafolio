import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { SectionTitle } from '../../components/ui/SectionTitle'
import { ItemDetailCard } from '../../shared/ItemDetailCard'
import { getMethodologies } from '../../data/methodologies'
import { useLanguage } from '../../i18n/LanguageContext'
import { MethodologyCard } from './MethodologyCard'
import { MethodologyChip } from './MethodologyChip'
import type { MethodologyItem } from '../../data/methodologies'

export function MethodologiesSection() {
  const { t, lang } = useLanguage()
  const [selectedItem, setSelectedItem] = useState<MethodologyItem | null>(null)

  const methodGroups = [
    { key: 'arch',    label: t('method_group_arch')    },
    { key: 'testing', label: t('method_group_testing') },
    { key: 'process', label: t('method_group_process') },
    { key: 'ui',      label: t('method_group_ui')      },
  ] as const

  const allItems = getMethodologies(lang)
  const groupedRows = methodGroups.map(g => ({ ...g, items: allItems.filter(m => m.cat === g.key) }))

  return (
    <section id="metodologias" className="bg-black">
      <div className="section-grid relative w-full flex flex-col">
        <div className="section-vignette absolute inset-0 z-[3] pointer-events-none" />

        <div className="relative z-10 flex-1 xl:overflow-hidden px-4 sm:px-6 lg:px-16 flex flex-col gap-4 py-6 lg:py-8 justify-center">
          <SectionTitle line1={t('method_title1')} line2={t('method_title2')} />

          {/* Desktop */}
          <div className="hidden lg:flex flex-col gap-3">
            {groupedRows.map((row) => (
              <div key={row.key} className="flex flex-col gap-2">
                <span className="text-[13px] font-bold tracking-widest uppercase text-[#A7B4BC]">
                  {row.label}
                </span>
                <div className="grid grid-cols-4 xl:grid-cols-6 gap-3">
                  {row.items.map((item, i) => (
                    <MethodologyCard key={item.name} item={item} index={i} />
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
                      <MethodologyChip
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
