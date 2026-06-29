import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'

export type Msg = { role: 'user' | 'bot'; text: string }

const THREAD_KEY = 'pf-chat-thread'   // localStorage: id de conversación (continuidad en el backend)
const MSGS_KEY = 'pf-chat-msgs'       // localStorage: mensajes visibles del chat
const RATE_KEY = 'pf-chat-rate'       // localStorage: timestamps de las preguntas enviadas

// Límite anti-abuso: como máximo MAX_QUESTIONS preguntas por ventana de WINDOW_MS (ventana deslizante).
const MAX_QUESTIONS = 6
const WINDOW_MS = 6 * 60 * 60 * 1000  // 6 horas

// Lee del localStorage los timestamps de preguntas que siguen dentro de la ventana actual.
function getRecentAsks(): number[] {
  const now = Date.now()
  try {
    const saved = JSON.parse(localStorage.getItem(RATE_KEY) ?? '[]') as number[]
    return saved.filter(t => now - t < WINDOW_MS)
  } catch {
    return []
  }
}

// Reusamos el thread_id guardado para no perder la conversación al recargar la página.
// Lazy: se calcula en el primer uso (cliente), no al importar el módulo (compatible con SSG).
let _threadId: string | null = null
function getThreadId(): string {
  if (_threadId) return _threadId
  let id = localStorage.getItem(THREAD_KEY)
  if (!id) {
    id = `widget-${Math.random().toString(36).slice(2)}`
    localStorage.setItem(THREAD_KEY, id)
  }
  _threadId = id
  return id
}

// El backend corre en local (ver chatbot/). Arráncalo con uvicorn en el puerto 8000.
const API_BASE = 'http://localhost:8000'
const API_URL = `${API_BASE}/chat`
const HEALTH_URL = `${API_BASE}/health`
const HEALTH_INTERVAL_MS = 15_000  // cada cuánto comprobamos si el backend sigue vivo

export const CHAT_TXT = {
  es: {
    greeting: '¡Hola! Soy el asistente de Renzo. Pregúntame sobre su experiencia, proyectos o tecnologías.',
    placeholder: 'Pregunta sobre Renzo...',
    title: 'Asistente IA',
    offline: 'No se pudo conectar con el asistente. ¿Está el servidor corriendo?',
    disabled: 'Asistente IA deshabilitado',
    open: 'Abrir chat',
    // {n} = horas, {m} = minutos hasta poder volver a preguntar.
    limit: 'Has alcanzado el límite de 6 preguntas cada 6 horas. Vuelve a intentarlo en {n}h {m}min.',
    counter: '{r} de {t} preguntas restantes',
  },
  en: {
    greeting: "Hi! I'm Renzo's assistant. Ask me about his experience, projects or technologies.",
    placeholder: 'Ask about Renzo...',
    title: 'AI Assistant',
    offline: "Couldn't reach the assistant. Is the server running?",
    disabled: 'AI assistant disabled',
    open: 'Open chat',
    // {n} = hours, {m} = minutes until you can ask again.
    limit: "You've reached the limit of 6 questions every 6 hours. Try again in {n}h {m}min.",
    counter: '{r} of {t} questions left',
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
  // ¿El backend está encendido? null = aún sin comprobar (la burbuja arranca deshabilitada).
  const [online, setOnline] = useState<boolean | null>(null)
  // Cuántas preguntas quedan en la ventana actual (se recalcula al enviar).
  const [remaining, setRemaining] = useState(() => Math.max(0, MAX_QUESTIONS - getRecentAsks().length))
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

  // Sondeamos el backend: si está caído, la burbuja se ve gris y no se puede abrir.
  useEffect(() => {
    let alive = true
    async function ping() {
      try {
        const res = await fetch(HEALTH_URL, { method: 'GET' })
        if (alive) setOnline(res.ok)
      } catch {
        if (alive) setOnline(false)
      }
    }
    ping()
    const id = setInterval(ping, HEALTH_INTERVAL_MS)
    return () => { alive = false; clearInterval(id) }
  }, [])

  async function send(text?: string) {
    const value = (text ?? input).trim()
    if (!value || loading) return

    // Límite de preguntas: si se superó la cuota de la ventana, avisamos y no enviamos.
    const recent = getRecentAsks()
    if (recent.length >= MAX_QUESTIONS) {
      const msLeft = WINDOW_MS - (Date.now() - recent[0])
      const n = Math.floor(msLeft / (60 * 60 * 1000))
      const m = Math.ceil((msLeft % (60 * 60 * 1000)) / (60 * 1000))
      greeted.current = false
      setMsgs(prev => [...prev, { role: 'bot', text: txt.limit.replace('{n}', String(n)).replace('{m}', String(m)) }])
      setRemaining(0)
      return
    }
    const asks = [...recent, Date.now()]
    localStorage.setItem(RATE_KEY, JSON.stringify(asks))
    setRemaining(Math.max(0, MAX_QUESTIONS - asks.length))

    greeted.current = false
    setInput('')
    setMsgs(prev => [...prev, { role: 'user', text: value }])
    setLoading(true)
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: value, thread_id: getThreadId() }),
      })
      const data = await res.json()
      setMsgs(prev => [...prev, { role: 'bot', text: data.response }])
    } catch {
      setMsgs(prev => [...prev, { role: 'bot', text: txt.offline }])
    } finally {
      setLoading(false)
    }
  }

  return { lang, txt, msgs, input, setInput, loading, send, remaining, maxQuestions: MAX_QUESTIONS, online: online === true }
}
