"""Carga del conocimiento de Renzo y construcción del system prompt.

Juntamos todos los .md de knowledge/ una sola vez al importar el módulo.
Como el texto es fijo, OpenAI cachea ese prefijo y abarata las llamadas.
"""
import os
from pathlib import Path

KNOWLEDGE_DIR = Path(__file__).parent / "knowledge"


def load_knowledge() -> str:
    """Concatena todos los .md de knowledge/ en un único texto."""
    return "\n\n".join(
        md.read_text(encoding="utf-8")
        for md in sorted(KNOWLEDGE_DIR.glob("*.md"))
    )


# El system prompt vive en .env (reglas anti-inyección) y le inyectamos el conocimiento.
SYSTEM_PROMPT = os.environ["SYSTEM_PROMPT"].format(knowledge=load_knowledge())
