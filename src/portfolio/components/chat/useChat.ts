import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'

export type Msg = { role: 'user' | 'bot'; text: string }

const THREAD_KEY = 'pf-chat-thread'   // localStorage: id de conversación (continuidad en el backend)
const MSGS_KEY = 'pf-chat-msgs'       // localStorage: mensajes visibles del chat

// Reusamos el thread_id guardado para no perder la conversación al recargar la página.
function getThreadId(): string {
  let id = localStorage.getItem(THREAD_KEY)
  if (!id) {
    id = `widget-${Math.random().toString(36).slice(2)}`
    localStorage.setItem(THREAD_KEY, id)
  }
  return id
}
const THREAD_ID = getThreadId()

// En dev usa localhost; en producción define VITE_CHAT_API_URL (ej. la URL pública de la Pi).
const API_URL = `${import.meta.env.VITE_CHAT_API_URL ?? 'http://localhost:8000'}/chat`

export const CHAT_TXT = {
  es: {
    greeting: '¡Hola! Soy el asistente de Renzo. Pregúntame sobre su experiencia, proyectos o tecnologías.',
    placeholder: 'Pregunta sobre Renzo...',
    title: 'Asistente IA',
    offline: 'No se pudo conectar con el asistente. ¿Está el servidor corriendo?',
    open: 'Abrir chat',
  },
  en: {
    greeting: "Hi! I'm Renzo's assistant. Ask me about his experience, projects or technologies.",
    placeholder: 'Ask about Renzo...',
    title: 'AI Assistant',
    offline: "Couldn't reach the assistant. Is the server running?",
    open: 'Open chat',
  },
} as const

/** Estado y lógica del chat con el asistente, compartido entre la burbuja (móvil) y la sección (desktop). */
export function useChat() {
  const { lang } = useLanguage()
  const txt = CHAT_TXT[lang === 'en' ? 'en' : 'es']

  // Recuperamos la conversación guardada; si no hay, arrancamos con el saludo.
  const [msgs, setMsgs] = useState<Msg[]>(() => {
    const saved = localStorage.getItem(MSGS_KEY)
    if (saved) {
      try { return JSON.parse(saved) as Msg[] } catch { /* ignora json corrupto */ }
    }
    return [{ role: 'bot', text: txt.greeting }]
  })
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  // Solo está el saludo inicial si no había conversación guardada.
  const greeted = useRef(msgs.length === 1)

  // Persistimos la conversación para que sobreviva a recargas de la página.
  useEffect(() => {
    localStorage.setItem(MSGS_KEY, JSON.stringify(msgs))
  }, [msgs])

  // Si cambia el idioma y solo está el saludo, lo traducimos.
  useEffect(() => {
    setMsgs(prev => (prev.length === 1 && greeted.current ? [{ role: 'bot', text: txt.greeting }] : prev))
  }, [lang, txt.greeting])

  async function send(text?: string) {
    const value = (text ?? input).trim()
    if (!value || loading) return
    greeted.current = false
    setInput('')
    setMsgs(prev => [...prev, { role: 'user', text: value }])
    setLoading(true)
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: value, thread_id: THREAD_ID }),
      })
      const data = await res.json()
      setMsgs(prev => [...prev, { role: 'bot', text: data.response }])
    } catch {
      setMsgs(prev => [...prev, { role: 'bot', text: txt.offline }])
    } finally {
      setLoading(false)
    }
  }

  return { lang, txt, msgs, input, setInput, loading, send }
}
