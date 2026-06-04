"""Configuración central del chatbot: variables de entorno y constantes.

Todo lo ajustable vive aquí para no tenerlo desperdigado por el código.
Las variables sensibles (OPENAI_API_KEY, SYSTEM_PROMPT...) se leen del .env.
"""
import os

from dotenv import load_dotenv

load_dotenv()

# --- Modelo / LLM ----------------------------------------------------------
MODEL = os.environ.get("OPENAI_MODEL", "gpt-4o-mini")
MAX_HISTORY = 8       # cuántos mensajes del historial conservamos por sesión
MAX_TOKENS = 500      # longitud máxima de cada respuesta del modelo

# --- Límite de peticiones --------------------------------------------------
# Como máximo MAX_QUESTIONS preguntas por IP en una ventana de RATE_WINDOW.
# Se aplica en el backend (por IP) para que no se pueda saltar borrando caché.
MAX_QUESTIONS = 6
RATE_WINDOW = 6 * 60 * 60  # segundos (6 horas)

# --- CORS ------------------------------------------------------------------
# En local permitimos cualquier origen (el front de Vite en localhost:5173).
CORS_ORIGINS = ["*"]
