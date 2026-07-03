import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { translations, type Lang, type TranslationKey } from './translations'

type LanguageContextType = {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Arranca en 'es' (idioma del HTML pre-renderizado) para que el render del
  // servidor y el primer render del cliente coincidan (hidratación sin saltos).
  const [lang, setLangState] = useState<Lang>('es')

  const setLang = (newLang: Lang) => {
    if (typeof window !== 'undefined') localStorage.setItem('pf-lang', newLang)
    setLangState(newLang)
  }

  // Tras montar en el cliente, aplica el idioma guardado en localStorage.
  useEffect(() => {
    const stored = localStorage.getItem('pf-lang')
    if (stored === 'en' || stored === 'es') setLangState(stored)
  }, [])

  // Mantiene <html lang> sincronizado con el idioma activo (SEO / accesibilidad).
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

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
