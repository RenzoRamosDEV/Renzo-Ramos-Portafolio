"""Interacción con el modelo de OpenAI vía LangChain."""
from langchain_core.messages import SystemMessage
from langchain_openai import ChatOpenAI

from config import MAX_TOKENS, MODEL
from knowledge import SYSTEM_PROMPT

llm = ChatOpenAI(model=MODEL, max_tokens=MAX_TOKENS)


def ask_llm(history: list) -> str:
    """Llama al modelo con el system prompt + el historial de la conversación."""
    messages = [SystemMessage(content=SYSTEM_PROMPT), *history]
    return llm.invoke(messages).content


def error_message(error: Exception) -> str:
    """Mensaje amable según el tipo de fallo del LLM (p.ej. cuota agotada)."""
    if "insufficient_quota" in str(error) or "429" in str(error):
        return "Ahora mismo estoy saturado (límite de uso de la IA). Inténtalo en un rato 🙏"
    return "Ups, tuve un problema procesando tu mensaje. Inténtalo de nuevo."
