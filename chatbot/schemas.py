"""Modelos de entrada/salida del endpoint /chat."""
from pydantic import BaseModel


class ChatRequest(BaseModel):
    message: str
    thread_id: str = "default"


class ChatResponse(BaseModel):
    response: str
