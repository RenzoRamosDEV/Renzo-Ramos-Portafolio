import { getPublicPath } from '../utils/paths.js';

export const certificateItems = [
  {
    title: "Certificado Spring Boot",
    company: "LinkedIn Learning",
    period: "may. 2026",
    location: "Online",
    credential: "https://www.linkedin.com/learning/certificates/7b7c86e65a375f5a2e3f6dd941c68683bfbda364592dacc893275a5e0a80eef6?trk=share_certificate",
    pdf: getPublicPath("/certificates/CertificadoDeFinalizacion_SpringBootEsencial.pdf"),
    preview: getPublicPath("/certificates/springboot-preview-1.png"),
    desc: "Desarrollo de aplicaciones backend con Spring Boot, aplicando fundamentos, persistencia, seguridad y mensajería en un proyecto práctico.",
  },
  {
    title: "Certificado Profesional de Inteligencia Artificial",
    company: "GOOGLE",
    period: "abr. 2026",
    location: "Online",
    credential: "https://www.coursera.org/account/accomplishments/professional-cert/certificate/XKQE5SSM3EDZ",
    pdf: getPublicPath("/certificates/CertificadoDeGoogleIA.pdf"),
    preview: getPublicPath("/certificates/google-ia-preview-1.png"),
    desc: "Certificado profesional en Inteligencia Artificial emitido por Google. Aprendizaje de modelos de IA y mejores prácticas.",
  },
  {
    title: "Certificado Desarrollo con Inteligencia Artificial",
    company: "BIG SCHOOL",
    period: "mar. 2026",
    location: "Online",
    credential: "https://media.licdn.com/dms/image/v2/D4E2DAQGBotbg0sY_KQ/profile-treasury-document-images_800/B4EZzn8Z1JIEAc-/1/1773417900843?e=1778112000&v=beta&t=f5m4BqHbkr3eO2EGxBbOv7tCLjrjbRbU5opU2NlnSiw",
    pdf: getPublicPath("/certificates/CertificadoDeIniciacionAlDesarrolloConIA.pdf"),
    preview: getPublicPath("/certificates/bigschool-ia-preview-1.png"),
    desc: "Formación de 6 horas sobre el flujo de trabajo de 'cero a Producción'. Fundamentos para integrar modelos de IA en proyectos reales.",
  }
];
