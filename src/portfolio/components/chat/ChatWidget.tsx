import { useState, useRef, useEffect } from 'react'
import type { ReactNode } from 'react'
import iarr from '../../../assets/IARR.png'
import { useLanguage } from '../../i18n/LanguageContext'
import './chat-widget.css'

type Msg = { role: 'user' | 'bot'; text: string }

const THREAD_ID = `widget-${Math.random().toString(36).slice(2)}`
// En dev usa localhost; en producción define VITE_CHAT_API_URL (ej. la URL pública de la Pi).
const API_URL = `${import.meta.env.VITE_CHAT_API_URL ?? 'http://localhost:8000'}/chat`

/** Enlaces [texto](url), **negrita**, `código`, *cursiva*, emails y teléfonos -> JSX. */
function inline(text: string): ReactNode[] {
  const parts = text
    .split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*|[\w.+-]+@[\w-]+\.[\w.-]+|\+\d[\d\s]{6,}\d)/g)
    .filter(Boolean)
  return parts.map((p, i) => {
    const link = p.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (link) {
      const href = link[2].startsWith('http') ? link[2] : `https://${link[2]}`
      return <a key={i} href={href} target="_blank" rel="noopener noreferrer">{link[1]}</a>
    }
    if (/^[\w.+-]+@[\w-]+\.[\w.-]+$/.test(p)) return <a key={i} href={`mailto:${p}`}>{p}</a>
    if (/^\+\d[\d\s]{6,}\d$/.test(p)) return <a key={i} href={`tel:${p.replace(/\s/g, '')}`}>{p}</a>
    if (p.startsWith('**') && p.endsWith('**')) return <strong key={i}>{p.slice(2, -2)}</strong>
    if (p.startsWith('`') && p.endsWith('`')) return <code key={i}>{p.slice(1, -1)}</code>
    if (p.startsWith('*') && p.endsWith('*')) return <em key={i}>{p.slice(1, -1)}</em>
    return p
  })
}

/** Renderiza párrafos, viñetas y listas numeradas del Markdown del bot. */
function renderMarkdown(text: string): ReactNode {
  const lines = text.split('\n')
  const blocks: ReactNode[] = []
  let list: { ordered: boolean; items: string[] } | null = null

  const flushList = () => {
    if (!list) return
    const items = list.items.map((it, i) => <li key={i}>{inline(it)}</li>)
    blocks.push(list.ordered ? <ol key={blocks.length}>{items}</ol> : <ul key={blocks.length}>{items}</ul>)
    list = null
  }

  for (const raw of lines) {
    const line = raw.trim()
    if (!line) { flushList(); continue }
    const heading = line.match(/^(#{1,6})\s+(.*)$/)
    const bullet = line.match(/^[*-]\s+(.*)$/)
    const numbered = line.match(/^\d+\.\s+(.*)$/)
    if (heading) {
      flushList()
      const level = Math.min(heading[1].length, 4)
      blocks.push(<p key={blocks.length} className={`cw-h cw-h${level}`}>{inline(heading[2])}</p>)
    } else if (bullet) {
      if (!list || list.ordered) { flushList(); list = { ordered: false, items: [] } }
      list.items.push(bullet[1])
    } else if (numbered) {
      if (!list || !list.ordered) { flushList(); list = { ordered: true, items: [] } }
      list.items.push(numbered[1])
    } else {
      flushList()
      blocks.push(<p key={blocks.length}>{inline(line)}</p>)
    }
  }
  flushList()
  return blocks
}

const TXT = {
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

export function ChatWidget() {
  const { lang } = useLanguage()
  const txt = TXT[lang === 'en' ? 'en' : 'es']

  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState<Msg[]>([{ role: 'bot', text: txt.greeting }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const greeted = useRef(true) // el saludo inicial ya está puesto

  // Si cambia el idioma y solo está el saludo, lo traducimos.
  useEffect(() => {
    setMsgs(prev => (prev.length === 1 && greeted.current ? [{ role: 'bot', text: txt.greeting }] : prev))
  }, [lang, txt.greeting])

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs, loading, open])

  async function send() {
    const text = input.trim()
    if (!text || loading) return
    greeted.current = false
    setInput('')
    setMsgs(prev => [...prev, { role: 'user', text }])
    setLoading(true)
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, thread_id: THREAD_ID }),
      })
      const data = await res.json()
      setMsgs(prev => [...prev, { role: 'bot', text: data.response }])
    } catch {
      setMsgs(prev => [...prev, { role: 'bot', text: txt.offline }])
    } finally {
      setLoading(false)
    }
  }

  function onKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <div className="cw">
      {open && (
        <div className="cw-panel" role="dialog" aria-label={txt.title}>
          <div className="cw-header">
            <div className="cw-avatar"><img src={iarr} alt={txt.title} /></div>
            <div className="cw-header-text">
              <span className="cw-title">{txt.title}</span>
              <span className="cw-status">Renzo Ramos</span>
            </div>
            <button className="cw-close" onClick={() => setOpen(false)} aria-label="Cerrar">✕</button>
          </div>

          <div className="cw-messages">
            {msgs.map((m, i) => (
              <div key={i} className={`cw-msg cw-msg-${m.role}`}>
                {m.role === 'bot' && <div className="cw-msg-avatar"><img src={iarr} alt="" /></div>}
                <div className="cw-bubble">{m.role === 'bot' ? renderMarkdown(m.text) : m.text}</div>
              </div>
            ))}
            {loading && (
              <div className="cw-msg cw-msg-bot">
                <div className="cw-msg-avatar"><img src={iarr} alt="" /></div>
                <div className="cw-bubble cw-typing"><span /><span /><span /></div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="cw-input-row">
            <textarea
              className="cw-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onKey}
              placeholder={txt.placeholder}
              rows={1}
            />
            <button className="cw-send" onClick={send} disabled={loading || !input.trim()} aria-label="Enviar">↑</button>
          </div>
        </div>
      )}

      <button
        className={`cw-bubble-btn ${open ? 'is-open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label={txt.open}
      >
        {open ? <span className="cw-chevron">✕</span> : <img src={iarr} alt={txt.title} />}
      </button>
    </div>
  )
}
