import { CERTIFICATES } from '../data/certificates'

export function Certificates() {
  return (
    <div className="certs">
      {CERTIFICATES.map(c => (
        <div className="cert" key={c.title}>
          <img className="cert-preview" src={c.preview} alt={c.title} loading="lazy" />
          <div className="ci">
            <h4>{c.title}</h4>
            <div className="issuer">{c.issuer}</div>
            <div className="cd">{c.desc}</div>
            <div className="cert-links">
              {c.credential && (
                <a href={c.credential} target="_blank" rel="noopener">
                  Ver credencial →
                </a>
              )}
              <a href={c.pdf} target="_blank" rel="noopener">
                PDF →
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
