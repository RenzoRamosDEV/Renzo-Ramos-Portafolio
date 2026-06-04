"""Límite de peticiones por IP (ventana deslizante, en RAM).

Se aplica en el backend para que no se pueda saltar borrando caché/localStorage.
"""
import time

from fastapi import Request

from config import MAX_QUESTIONS, RATE_WINDOW

# Timestamps de las preguntas por IP.
_asks_by_ip: dict[str, list[float]] = {}


def client_ip(request: Request) -> str:
    """IP de la conexión directa del visitante."""
    return request.client.host if request.client else "unknown"


def seconds_until_allowed(ip: str) -> int:
    """Registra una pregunta de esta IP. Devuelve los segundos que faltan para
    poder volver a preguntar si se superó el límite, o 0 si está permitida."""
    now = time.time()
    recent = [t for t in _asks_by_ip.get(ip, []) if now - t < RATE_WINDOW]
    if len(recent) >= MAX_QUESTIONS:
        _asks_by_ip[ip] = recent
        return int(RATE_WINDOW - (now - recent[0]))
    recent.append(now)
    _asks_by_ip[ip] = recent
    return 0
