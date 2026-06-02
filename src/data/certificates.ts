import springbootPreview from '../assets/certs/cert-linkedin-springboot-preview.png'
import googlePreview from '../assets/certs/cert-google-ia-preview.png'
import bigschoolPreview from '../assets/certs/cert-bigschool-ia-preview.png'
import springbootPdf from '../assets/certs/cert-linkedin-springboot.pdf'
import googlePdf from '../assets/certs/cert-google-ia.pdf'
import bigschoolPdf from '../assets/certs/cert-bigschool-ia.pdf'

export type Certificate = {
  title: string
  issuer: string
  desc: string
  preview: string
  pdf: string
  credential?: string
}

export const CERTIFICATES: Certificate[] = [
  {
    title: 'Essential Spring Boot Certificate',
    issuer: 'LinkedIn Learning · Mayo 2026',
    desc: 'Desarrollo de aplicaciones backend con Spring Boot: fundamentos, persistencia, seguridad y mensajería en un proyecto práctico.',
    preview: springbootPreview,
    pdf: springbootPdf,
    credential: 'https://www.linkedin.com/learning/certificates/7b7c86e65a375f5a2e3f6dd941c68683bfbda364592dacc893275a5e0a80eef6',
  },
  {
    title: 'Professional Artificial Intelligence Certificate',
    issuer: 'Google / Coursera · Abril 2026',
    desc: 'Certificado profesional en Inteligencia Artificial emitido por Google. Modelos de IA, mejores prácticas y aplicaciones reales.',
    preview: googlePreview,
    pdf: googlePdf,
    credential: 'https://www.coursera.org/account/accomplishments/professional-cert/certificate/XKQE5SSM3EDZ',
  },
  {
    title: 'AI-Assisted Development Certificate',
    issuer: 'Big School · Marzo 2026',
    desc: 'Formación de 6 horas sobre el flujo zero-to-production integrando modelos de IA en proyectos reales.',
    preview: bigschoolPreview,
    pdf: bigschoolPdf,
  },
]
