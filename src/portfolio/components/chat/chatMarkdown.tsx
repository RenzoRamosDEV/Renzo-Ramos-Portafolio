import type { ReactNode } from 'react'

/** Enlaces [texto](url), **negrita**, `código`, *cursiva*, emails y teléfonos -> JSX. */
export function inline(text: string): ReactNode[] {
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
export function renderMarkdown(text: string): ReactNode {
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
