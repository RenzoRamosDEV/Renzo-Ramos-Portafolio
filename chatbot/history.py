"""Historial de cada conversación, guardado en RAM (se pierde al reiniciar).

clave = thread_id (una sesión)   valor = lista de mensajes de LangChain
"""
from langchain_core.messages import AIMessage, HumanMessage

from config import MAX_HISTORY

_histories: dict[str, list] = {}


def add_user_message(thread_id: str, text: str) -> list:
    """Añade la pregunta del usuario al historial y lo devuelve."""
    history = _histories.setdefault(thread_id, [])
    history.append(HumanMessage(content=text))
    return history


def add_bot_message(thread_id: str, text: str) -> None:
    """Añade la respuesta del bot y recorta el historial a MAX_HISTORY mensajes."""
    history = _histories.setdefault(thread_id, [])
    history.append(AIMessage(content=text))
    _histories[thread_id] = history[-MAX_HISTORY:]


def drop_last(thread_id: str) -> None:
    """Quita el último mensaje (la pregunta que no se pudo responder)."""
    history = _histories.get(thread_id)
    if history:
        history.pop()
