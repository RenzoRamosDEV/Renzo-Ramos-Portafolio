"""API FastAPI del asistente. Orquesta los módulos; la lógica vive aparte:

  config.py     → variables de entorno y constantes
  knowledge.py  → carga del conocimiento + system prompt
  llm.py        → llamada a OpenAI y mensajes de error
  history.py    → historial de cada conversación (en RAM)
  ratelimit.py  → límite de preguntas por IP
  schemas.py    → modelos de petición/respuesta
"""
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from config import CORS_ORIGINS, MAX_QUESTIONS
from history import add_bot_message, add_user_message, drop_last
from llm import ask_llm, error_message
from ratelimit import client_ip, seconds_until_allowed
from schemas import ChatRequest, ChatResponse

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    # Sonda ligera para que el frontend sepa si el backend está encendido.
    return {"ok": True}


@app.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest, request: Request):
    # Límite por IP: si superó la cuota, respondemos con un aviso amable (sin llamar al LLM).
    wait = seconds_until_allowed(client_ip(request))
    if wait:
        hours, minutes = wait // 3600, (wait % 3600) // 60 + 1
        return ChatResponse(
            response=f"Has alcanzado el límite de {MAX_QUESTIONS} preguntas cada 6 horas. "
                     f"Vuelve a intentarlo en {hours}h {minutes}min 🙏"
        )

    history = add_user_message(req.thread_id, req.message)
    try:
        answer = ask_llm(history)
    except Exception as error:
        drop_last(req.thread_id)  # quitamos la pregunta que no se pudo responder
        return ChatResponse(response=error_message(error))

    add_bot_message(req.thread_id, answer)
    return ChatResponse(response=answer)
