/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** URL base del backend del chatbot (sin /chat). Ej: https://bot.midominio.com */
  readonly VITE_CHAT_API_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
