import { GitBranch, Link2 } from 'lucide-react'
import cvPdf from '../../assets/cv/CV Renzo Ramos.pdf'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/RenzoRamosDEV',
      icon: GitBranch,
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/renzoinv04/',
      icon: Link2,
    },
  ]

  const quickLinks = [
    { name: 'Sobre mí', href: '#sobre-mi' },
    { name: 'Proyectos', href: '#proyectos' },
    { name: 'Experiencia', href: '#experiencia' },
    { name: 'Stack', href: '#stack' },
    { name: 'Metodologías', href: '#metodologias' },
  ]

  return (
    <footer className="relative border-t border-[#A7B4BC]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Brand + descripción + sociales */}
          <div className="flex flex-col gap-3">
            <span className="text-white font-semibold text-base">Renzo Ramos</span>
            <p className="text-[#A7B4BC]/60 text-sm leading-relaxed max-w-xs">
              Desarrollador Junior de Apliaciones Multiplataforma
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col gap-2">
            {quickLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[#A7B4BC]/50 hover:text-white text-sm transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Links clave + copyright */}
          <div className="flex flex-col items-start md:items-end gap-3">
            <div className="flex flex-col gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-[#A7B4BC]/25 hover:border-[#A7B4BC]/60 bg-[#A7B4BC]/5 hover:bg-[#A7B4BC]/10 text-[#A7B4BC]/70 hover:text-white px-4 py-2 rounded-md text-sm transition-all duration-200 min-w-[140px]"
                >
                  <social.icon className="w-4 h-4" />
                  {social.name}
                </a>
              ))}
              <a
                href={cvPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-[#A7B4BC]/25 hover:border-[#A7B4BC]/60 bg-[#A7B4BC]/5 hover:bg-[#A7B4BC]/10 text-[#A7B4BC]/70 hover:text-white px-4 py-2 rounded-md text-sm transition-all duration-200 min-w-[140px]"
              >
                <span className="text-sm">↓</span> Curriculum
              </a>
            </div>
            <span className="text-[#A7B4BC]/30 text-xs mt-1">© {currentYear} Renzo Ramos</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
