import springbootPreview from '../assets/certificates/cert-linkedin-springboot-preview.png'
import googlePreview from '../assets/certificates/cert-google-ia-preview.png'
import bigschoolPreview from '../assets/certificates/cert-bigschool-ia-preview.png'
import springbootPdf from '../assets/certificates/cert-linkedin-springboot.pdf'
import googlePdf from '../assets/certificates/cert-google-ia.pdf'
import bigschoolPdf from '../assets/certificates/cert-bigschool-ia.pdf'
import type { Lang } from '../i18n/translations'

export type CertificateItem = {
  title: string
  company: string
  period: string
  location: string
  credential: string
  pdf: string
  preview: string
  desc: string
}

type CertificateItemRaw = {
  title: Record<Lang, string>
  company: string
  period: Record<Lang, string>
  location: string
  credential: string
  pdf: string
  preview: string
  desc: Record<Lang, string>
}

const CERTIFICATES_RAW: CertificateItemRaw[] = [
  {
    title: {
      es: 'Certificado Spring Boot Esencial',
      en: 'Essential Spring Boot Certificate',
    },
    company: 'LINKEDIN LEARNING',
    period: {
      es: 'may. 2026',
      en: 'May. 2026',
    },
    location: 'Online',
    credential: 'https://www.linkedin.com/learning/certificates/7b7c86e65a375f5a2e3f6dd941c68683bfbda364592dacc893275a5e0a80eef6?trk=share_certificate',
    pdf: springbootPdf,
    preview: springbootPreview,
    desc: {
      es: 'Desarrollo de aplicaciones backend con Spring Boot, aplicando fundamentos, persistencia, seguridad y mensajería en un proyecto práctico.',
      en: 'Backend application development with Spring Boot, applying fundamentals, persistence, security, and messaging in a practical project.',
    },
  },
  {
    title: {
      es: 'Certificado Profesional de Inteligencia Artificial',
      en: 'Professional Artificial Intelligence Certificate',
    },
    company: 'GOOGLE',
    period: {
      es: 'abr. 2026',
      en: 'Apr. 2026',
    },
    location: 'Online',
    credential: 'https://www.coursera.org/account/accomplishments/professional-cert/certificate/XKQE5SSM3EDZ',
    pdf: googlePdf,
    preview: googlePreview,
    desc: {
      es: 'Certificado profesional en Inteligencia Artificial emitido por Google. Aprendizaje de modelos de IA y mejores prácticas.',
      en: 'Professional certificate in Artificial Intelligence issued by Google. Learning of AI models and best practices.',
    },
  },
  {
    title: {
      es: 'Certificado Desarrollo con Inteligencia Artificial',
      en: 'AI-Assisted Development Certificate',
    },
    company: 'BIG SCHOOL',
    period: {
      es: 'mar. 2026',
      en: 'Mar. 2026',
    },
    location: 'Online',
    credential: 'https://media.licdn.com/dms/image/v2/D4E2DAQGBotbg0sY_KQ/profile-treasury-document-images_800/B4EZzn8Z1JIEAc-/1/1773417900843?e=1778112000&v=beta&t=f5m4BqHbkr3eO2EGxBbOv7tCLjrjbRbU5opU2NlnSiw',
    pdf: bigschoolPdf,
    preview: bigschoolPreview,
    desc: {
      es: "Formación de 6 horas sobre el flujo de trabajo de 'cero a Producción'. Fundamentos para integrar modelos de IA en proyectos reales.",
      en: "6-hour training on the 'zero to Production' workflow. Fundamentals for integrating AI models into real projects.",
    },
  },
]

export function getCertificates(lang: Lang): CertificateItem[] {
  return CERTIFICATES_RAW.map(item => ({
    title: item.title[lang],
    company: item.company,
    period: item.period[lang],
    location: item.location,
    credential: item.credential,
    pdf: item.pdf,
    preview: item.preview,
    desc: item.desc[lang],
  }))
}
