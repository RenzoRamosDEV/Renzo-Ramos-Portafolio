# Proyectos Destacados de Renzo Ramos

## 01 · Booqi — Sistema de Gestión de Reservas de Eventos
*Proyecto en equipo · Backend Developer*

Plataforma web que permite descubrir eventos (conciertos, conferencias, etc.), comprar entradas y
gestionar reservas, todo desde el navegador. El usuario explora el catálogo, selecciona entradas,
paga y recibe automáticamente su ticket en **PDF**, además de poder consultar su historial de
reservas. Existe un **panel de administración** para crear y administrar eventos, ver estadísticas
y controlar el aforo disponible.

Desarrollado por dos personas (Renzo Iván Ramos de los Ríos y Melanie Gabriela Cárdenas Hidalgo) y
construido como una aplicación profesional lista para producción con **arquitectura de
microservicios**: cada funcionalidad —usuarios, eventos, reservas y pagos— corre de forma
independiente en su propio servicio, lo que permite escalar y mantener el sistema sin que una parte
afecte a las demás.

**Tecnologías**
- Backend (microservicios): Java · Spring Boot · Spring Data JPA · Spring Validation · Maven ·
  Lombok · MapStruct · Hibernate (JPA) · OpenAPI/Swagger (SpringDoc) · JUnit 5 · Pitest (mutation testing)
- Base de datos: MySQL · H2 (solo tests)
- Frontend: React · React Router · Vite · Bootstrap · Axios · PDF Lib
- DevOps: Docker · Docker Compose

- 📦 Repositorio: https://github.com/RenzoRamosDEV/Booqui-Sistema-Gestion-Reservas-Eventos
- 🌐 Demo: https://renzoramosdev.github.io/Booqui-Sistema-Gestion-Reservas-Eventos/

## 02 · Redactor IA — Reformulación de Textos con IA
*Desarrollador único · Full Stack Developer*

Herramienta web que permite a cualquier persona mejorar o reformular textos usando inteligencia
artificial, sin conocimientos técnicos. El usuario escribe o pega su texto, elige el tono (formal,
casual, profesional, persuasivo, etc.) y en segundos recibe una versión mejorada generada por un
modelo de IA. También puede controlar qué tan drástico es el cambio y agregar instrucciones
adicionales para personalizar el resultado. Está disponible en **español e inglés** y cuenta con
medidas de seguridad para evitar el abuso del servicio.

**Tecnologías**
- Frontend: React · Vite · Tailwind CSS · i18next · Lucide React · TypeScript
- Backend: Node.js · Express · Google Generative AI (Gemini) · Groq SDK · dotenv · cors · helmet · express-rate-limit

- 📦 Repositorio: https://github.com/RenzoRamosDEV/Redactor-IA

## 03 · Pokédex Retro + Chatbot ReAct (MCP)
*Desarrollador único · Full Stack + IA*

Aplicación web completa construida de cero que combina desarrollo de software tradicional con
inteligencia artificial. Tiene dos partes principales:

1. **Pokédex Web**: enciclopedia interactiva de Pokémon con estética retro de los años 90. Permite
   buscar y explorar Pokémon, movimientos, tipos, habilidades, objetos y más, con diseño visual
   cuidado y 3 temas de color (interfaz hecha solo con **CSS puro**, sin librerías externas).
2. **Chatbot con IA**: asistente conversacional que responde preguntas en lenguaje natural (p. ej.
   "¿Cuáles son las debilidades de Charizard?" o "¿Qué Pokémon aprende Rayo?"). La IA **razona paso
   a paso (ReAct)** y consulta los datos en tiempo real.

El backend (API REST) está en Scala con Play Framework; un **servidor MCP** en Python expone los
datos como herramientas (tools) y un **agente ReAct** (OpenAI SDK + FastAPI) las consume. Demuestra
construir un sistema de principio a fin (frontend, backend, API e IA) e integrar el **Model Context
Protocol (MCP)**, un protocolo emergente que conecta modelos de lenguaje con herramientas externas.

**Tecnologías**
- Backend (API REST): Scala · Play Framework · Spray JSON · Guice · SBT
- Servidor MCP: Python · MCP (Model Context Protocol) · Requests
- Agente ReAct / Chatbot: Python · OpenAI SDK · FastAPI · Uvicorn · MCP · python-dotenv

- 📦 Repositorio: https://github.com/RenzoRamosDEV/Api-Pokemon-Scala-Web
