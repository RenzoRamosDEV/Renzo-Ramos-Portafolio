import os
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from langchain_core.messages import AIMessage, HumanMessage, SystemMessage
from langchain_openai import ChatOpenAI
from pydantic import BaseModel

load_dotenv()

# --- Configuración ---------------------------------------------------------
MODEL = os.environ.get("OPENAI_MODEL", "gpt-4o-mini")
MAX_HISTORY = 8       # cuántos mensajes del historial conservamos por sesión
MAX_TOKENS = 500      # longitud máxima de cada respuesta del modelo

llm = ChatOpenAI(model=MODEL, max_tokens=MAX_TOKENS)

# --- Conocimiento de Renzo -------------------------------------------------
# Juntamos todos los .md de knowledge/ una sola vez al arrancar.
# Como el texto es fijo, OpenAI cachea ese prefijo y abarata las llamadas.
KNOWLEDGE_DIR = Path(__file__).parent / "knowledge"
KNOWLEDGE = "\n\n".join(
    md.read_text(encoding="utf-8")
    for md in sorted(KNOWLEDGE_DIR.glob("*.md"))
)

# El system prompt vive en .env y le inyectamos el conocimiento.
SYSTEM_PROMPT = os.environ["SYSTEM_PROMPT"].format(knowledge=KNOWLEDGE)

# Historial de cada conversación, guardado en RAM (se pierde al reiniciar).
# clave = thread_id (una sesión)   valor = lista de mensajes de LangChain
histories: dict[str, list] = {}

# --- API -------------------------------------------------------------------
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["POST"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str
    thread_id: str = "default"


class ChatResponse(BaseModel):
    response: str


def ask_llm(history: list) -> str:
    messages = [SystemMessage(content=SYSTEM_PROMPT), *history]
    return llm.invoke(messages).content


def error_message(error: Exception) -> str:
    if "insufficient_quota" in str(error) or "429" in str(error):
        return "Ahora mismo estoy saturado (límite de uso de la IA). Inténtalo en un rato 🙏"
    return "Ups, tuve un problema procesando tu mensaje. Inténtalo de nuevo."


@app.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    history = histories.setdefault(req.thread_id, [])
    history.append(HumanMessage(content=req.message))

    try:
        answer = ask_llm(history)
    except Exception as error:
        history.pop()  # quitamos la pregunta que no se pudo responder
        return ChatResponse(response=error_message(error))

    history.append(AIMessage(content=answer))
    # Conservamos solo los últimos N mensajes para no crecer sin límite.
    histories[req.thread_id] = history[-MAX_HISTORY:]
    return ChatResponse(response=answer)
