import { useState, useRef, useEffect } from 'react'
import type { ReactNode } from 'react'
import iarr from '../../assets/IARR.png'

type Msg = { role: 'user' | 'bot'; text: string }

/** Convierte enlaces [texto](url), **negrita**, `código`, *cursiva*, emails y teléfonos en JSX. */
function inline(text: string): ReactNode[] {
  // Separamos por los marcadores manteniéndolos para poder reemplazarlos.
  // Incluye también emails sueltos y teléfonos (que empiezan por + y dígitos/espacios).
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

/** Renderiza el Markdown que devuelve el bot: párrafos, viñetas y listas numeradas. */
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
    const bullet = line.match(/^[*-]\s+(.*)$/)        // "* item" o "- item"
    const numbered = line.match(/^\d+\.\s+(.*)$/)     // "1. item"
    if (bullet) {
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

const THREAD_ID = `session-${Math.random().toString(36).slice(2)}`

export function Chat() {
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: 'bot', text: '¡Hola! Soy el asistente de Renzo. Pregúntame sobre su experiencia, proyectos o tecnologías.' },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs, loading])

  async function send() {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    setMsgs(prev => [...prev, { role: 'user', text }])
    setLoading(true)
    try {
      const res = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, thread_id: THREAD_ID }),
      })
      const data = await res.json()
      setMsgs(prev => [...prev, { role: 'bot', text: data.response }])
    } catch {
      setMsgs(prev => [...prev, { role: 'bot', text: 'No se pudo conectar con el asistente. ¿Está el servidor corriendo?' }])
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
    <div className="chat">
      <div className="chat-messages">
        {msgs.map((m, i) => (
          <div key={i} className={`chat-msg chat-msg-${m.role}`}>
            {m.role === 'bot' && <div className="chat-avatar"><img src={iarr} alt="Asistente IA" /></div>}
            <div className="chat-bubble">{m.role === 'bot' ? renderMarkdown(m.text) : m.text}</div>
          </div>
        ))}
        {loading && (
          <div className="chat-msg chat-msg-bot">
            <div className="chat-avatar"><img src={iarr} alt="Asistente IA" /></div>
            <div className="chat-bubble chat-typing">
              <span /><span /><span />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div className="chat-input-row">
        <textarea
          className="chat-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={onKey}
          placeholder="Pregunta sobre Renzo..."
          rows={1}
        />
        <button className="chat-send" onClick={send} disabled={loading || !input.trim()}>
          ↑
        </button>
      </div>
    </div>
  )
}
