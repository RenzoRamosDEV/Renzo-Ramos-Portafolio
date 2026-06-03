import cvPdf from '../../assets/cv/cv-renzo-ramos.pdf'

const LINKS = [
  { ico: '✉', label: 'Email', sub: 'renzoramosivan@gmail.com', href: 'mailto:renzoramosivan@gmail.com', external: false },
  { ico: '⎇', label: 'GitHub', sub: 'github.com/RenzoRamosDEV', href: 'https://github.com/RenzoRamosDEV', external: true },
  { ico: 'in', label: 'LinkedIn', sub: 'linkedin.com/in/renzoinv04', href: 'https://www.linkedin.com/in/renzoinv04/', external: true },
  { ico: '⤓', label: 'Curriculum (PDF)', sub: 'Descargar CV', href: cvPdf, external: true },
]

export function Contact() {
  return (
    <div className="contact">
      <div className="intro">
        ¿Tienes un proyecto o una oportunidad? Estoy abierto a conversar. Encuéntrame aquí:
      </div>
      <div className="links">
        {LINKS.map(l => (
          <a
            className="lnk"
            key={l.label}
            href={l.href}
            {...(l.external ? { target: '_blank', rel: 'noopener' } : {})}
          >
            <div className="li">{l.ico}</div>
            <div>
              <div className="lt">{l.label}</div>
              <div className="ls">{l.sub}</div>
            </div>
            <span className="arrow">→</span>
          </a>
        ))}
      </div>
    </div>
  )
}
