import { useLanguage } from '../i18n/LanguageContext'
import { getStack } from '../data/stack'
import type { StackItem } from '../data/stack'
import type { TranslationKey } from '../i18n/translations'

const GROUPS: { cat: StackItem['cat']; labelKey: TranslationKey }[] = [
  { cat: 'back', labelKey: 'stack_group_back' },
  { cat: 'front', labelKey: 'stack_group_front' },
  { cat: 'ia', labelKey: 'stack_group_ia' },
  { cat: 'stack-tools', labelKey: 'stack_group_tools' },
]

export function Stack() {
  const { t, lang } = useLanguage()
  const tools = getStack(lang)

  return (
    <section id="stack" style={{ maxWidth: 1024, margin: '0 auto', padding: '48px 22px 20px' }}>
      <div style={{ background: '#fff', borderRadius: 24, padding: '48px 44px' }}>
        <h2 style={{ margin: '0 0 4px', fontSize: 'clamp(26px,3.4vw,34px)', fontWeight: 600, letterSpacing: '-.02em' }}>{t('stack_title')}</h2>
        <p style={{ margin: '0 0 30px', fontSize: 18, color: '#6e6e73' }}>{t('stack_sub')}</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {GROUPS.map((group) => {
            const items = tools.filter((tool) => tool.cat === group.cat)
            if (items.length === 0) return null
            return (
              <div key={group.cat}>
                <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: '#86868b', marginBottom: 14 }}>
                  {t(group.labelKey)}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(108px,1fr))', gap: 14 }}>
                  {items.map((tool) => (
                    <div key={tool.name} style={{ background: '#f5f5f7', borderRadius: 16, padding: '18px 10px', textAlign: 'center' }}>
                      <img src={tool.icon} alt={tool.name} style={{ width: 38, height: 38, objectFit: 'contain', display: 'block', margin: '0 auto 10px' }} />
                      <div style={{ fontSize: 12.5, fontWeight: 500 }}>{tool.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
