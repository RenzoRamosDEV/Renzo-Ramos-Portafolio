# Proyectos Destacados de Renzo Ramos

## 01 · Booqi — Gestión de Reservas de Eventos
*Proyecto en equipo · TFG · Backend Developer*

Plataforma de compra y gestión de entradas para eventos. Participé de forma integral desde el
diseño de la base de datos hasta el despliegue con Docker. Implementé **cuatro microservicios
independientes** en Java con Spring Boot —usuarios, eventos, reservas y pagos—, cada uno con su
propia base de datos MySQL y API REST documentada con Swagger/OpenAPI. Diseñé la comunicación
entre servicios para validar usuarios, eventos y reservas en tiempo real, y orquesté todo con
Docker Compose usando una red interna común, variables de entorno y healthchecks.

**Funcionalidades clave**
- Compra centralizada de entradas en una sola plataforma (explorar, filtrar y comprar).
- Gestión del proceso de reserva de principio a fin (evento, carrito, pago y confirmación).
- Entrega inmediata y digital de tickets en PDF.
- Control de disponibilidad en tiempo real antes de confirmar cada reserva.
- Panel de administración para organizadores (reservas, pagos y estadísticas).

**Tecnologías:** Java · Spring Boot · Spring Data JPA · Spring Web · Spring Validation · MySQL ·
Lombok · MapStruct · SpringDoc OpenAPI · Maven · Docker · Docker Compose · React · Bootstrap

- 📦 Repositorio: https://github.com/RenzoRamosDEV/Booqui-Sistema-Gestion-Reservas-Eventos
- 🌐 Demo: https://renzoramosdev.github.io/Booqui-Sistema-Gestion-Reservas-Eventos/

## 02 · Redactor IA — Reformulador de Textos
*Desarrollador único · Full Stack Developer*

Herramienta web para reformular y mejorar textos usando inteligencia artificial. El usuario pega
su texto, elige el tono deseado y recibe una versión reescrita por un modelo LLM en segundos.
Backend en **Node.js** integrando el SDK de **Groq** con el modelo **LLaMA**, y frontend en
**React + TailwindCSS**. Incluye soporte multilenguaje con i18n y un diseño asistido por IA.

**Funcionalidades clave**
- Mejora de redacción instantánea (versión pulida en segundos).
- Control del tono: formal, casual, profesional, directo, persuasivo, divertido o creativo.
- Intensidad ajustable: desde un leve retoque hasta una reescritura total.
- Control de longitud del texto original.
- Instrucciones personalizadas para afinar el resultado.

**Tecnologías:** Node.js · Groq SDK · Llama · React · TailwindCSS · i18n · TypeScript

- 📦 Repositorio: https://github.com/RenzoRamosDEV/Redactor-IA

## 03 · Pokédex Retro — API Pokémon en Scala
*Desarrollador único · Full Stack Developer*

Pokédex interactiva con estética retro inspirada en la Game Boy original (DMG-01) y los
videojuegos de Pokémon de primera generación. Construida con **Scala y Play Framework**,
consumiendo datos en tiempo real desde **PokéAPI**.

**Características**
- 7 secciones completas: Pokédex, Movimientos, Tipos, Habilidades, Naturalezas, Objetos y Bayas.
- Buscador con filtrado server-side en cada sección.
- 3 temas visuales: Normal (rojo retro), DMG (Game Boy verde LCD) y MONO (gris monocromático).
- Paginación configurable por sección.
- Modal de detalle por Pokémon con stats, tipos, habilidades y barras animadas.

**Tecnologías:** Scala · Play Framework · PokéAPI · CSS

- 📦 Repositorio: https://github.com/RenzoRamosDEV/Api-Pokemon-Scala-Web
