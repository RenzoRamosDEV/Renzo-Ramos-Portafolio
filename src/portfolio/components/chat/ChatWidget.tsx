import { useState, useRef, useEffect } from 'react'
import { Maximize2, Minimize2 } from 'lucide-react'
import iarr from '../../../assets/IARR.png'
import { renderMarkdown } from './chatMarkdown'
import { useChat } from './useChat'
import './chat-widget.css'

export function ChatWidget() {
  const { txt, msgs, input, setInput, loading, send } = useChat()
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState(false)   // true = ventana grande centrada
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs, loading, open, expanded])

  function onKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  function close() {
    setOpen(false)
    setExpanded(false)
  }

  // Cabecera, mensajes e input se comparten entre el popup y la ventana grande.
  const header = (
    <div className="cw-header">
      <div className="cw-avatar"><img src={iarr} alt={txt.title} /></div>
      <div className="cw-header-text">
        <span className="cw-title">{txt.title}</span>
        <span className="cw-status">Renzo Ramos</span>
      </div>
      <button
        className="cw-icon-btn"
        onClick={() => setExpanded(e => !e)}
        aria-label={expanded ? 'Minimizar' : 'Expandir'}
      >
        {expanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
      </button>
      <button className="cw-icon-btn" onClick={close} aria-label="Cerrar">✕</button>
    </div>
  )

  const messages = (
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
  )

  const inputRow = (
    <div className="cw-input-row">
      <textarea
        className="cw-input"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={onKey}
        placeholder={txt.placeholder}
        rows={1}
      />
      <button className="cw-send" onClick={() => send()} disabled={loading || !input.trim()} aria-label="Enviar">↑</button>
    </div>
  )

  return (
    <div className="cw">
      {/* Popup acoplado a la burbuja */}
      {open && !expanded && (
        <div className="cw-panel" role="dialog" aria-label={txt.title}>
          {header}
          {messages}
          {inputRow}
        </div>
      )}

      {/* Ventana aparte: grande, centrada, con el estilo de la página */}
      {open && expanded && (
        <div className="cw-overlay" onClick={() => setExpanded(false)}>
          <div
            className="cw-window section-grid"
            role="dialog"
            aria-label={txt.title}
            onClick={e => e.stopPropagation()}
          >
            <div className="cw-window-vignette" />
            <div className="cw-window-inner">
              {header}
              {messages}
              {inputRow}
            </div>
          </div>
        </div>
      )}

      <button
        className={`cw-bubble-btn ${open ? 'is-open' : ''}`}
        onClick={() => (open ? close() : setOpen(true))}
        aria-label={txt.open}
      >
        {open ? <span className="cw-chevron">✕</span> : <img src={iarr} alt={txt.title} />}
      </button>
    </div>
  )
}
