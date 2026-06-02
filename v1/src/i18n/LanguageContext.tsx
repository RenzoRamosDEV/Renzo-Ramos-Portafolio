import { createContext, useContext, useState, type ReactNode } from 'react'
import { translations, type Lang, type TranslationKey } from './translations'

type LanguageContextType = {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const stored = localStorage.getItem('pf-lang')
    return (stored === 'en' || stored === 'es') ? stored : 'es'
  })

  const setLang = (newLang: Lang) => {
    localStorage.setItem('pf-lang', newLang)
    setLangState(newLang)
  }

  const t = (key: TranslationKey): string => translations[lang][key]

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
