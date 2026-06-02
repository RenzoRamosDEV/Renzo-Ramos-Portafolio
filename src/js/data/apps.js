export const apps = {
  about: {
    title: 'Sobre mí', w: 660, h: 440, x: 130, y: 80,
    html: `
      <div class="about">
        <div class="side">
          <div class="avatar">RR</div>
          <h3>Renzo Ramos</h3>
          <div class="r">Backend-Oriented<br>Full Stack Developer</div>
          <ul>
            <li><span class="i">📍</span> Madrid, España</li>
            <li><span class="i">💼</span> renzoramosivan@gmail.com</li>
            <li><span class="i">☕</span> Java · Spring Boot</li>
            <li><span class="i">🗣</span> Español · English</li>
          </ul>
        </div>
        <div class="main">
          <h2>Hola, soy Renzo 👋</h2>
          <p>Desarrollador <b>Full Stack con orientación backend</b> afincado en Madrid. Me especializo en <b>Java y Spring Boot</b>, construyendo APIs REST escalables y mantenibles aplicando arquitectura limpia, principios SOLID y diseño orientado al dominio.</p>
          <p>Conecto la lógica de backend con la interfaz usando <b>React y TypeScript</b>, e integro herramientas de IA de forma deliberada en mi flujo de trabajo — no como muleta, sino como multiplicador de fuerza.</p>
          <div class="pillrow">
            <span class="pill">Java</span><span class="pill">Spring Boot</span><span class="pill">REST API Design</span><span class="pill">Microservicios</span><span class="pill">Docker</span><span class="pill">Clean Architecture</span><span class="pill">SOLID</span><span class="pill">DDD</span>
          </div>
        </div>
      </div>`
  },

  proj: {
    title: 'Proyectos', w: 560, h: 520, x: 420, y: 110,
    html: `
      <div class="grid">
        <div class="proj" data-open="proj-booqi">
          <div class="ptop"><div class="pico pi0">B</div><div class="pmeta"><div class="pk">Proyecto en equipo · Backend lead</div><h4>Booqi — Gestión de Reservas de Eventos</h4><p>4 microservicios Spring Boot independientes con orquestación Docker Compose, comunicación inter-servicio y compra centralizada de tickets.</p></div></div>
          <div class="ptags"><span class="ptag">Java</span><span class="ptag">Spring Boot</span><span class="ptag">Microservicios</span><span class="ptag">MySQL</span><span class="ptag">Docker</span><span class="ptag">React</span></div>
          <div class="open"><span>Ver caso completo</span><span>→</span></div>
        </div>
        <div class="proj" data-open="proj-inv">
          <div class="ptop"><div class="pico pi1">I</div><div class="pmeta"><div class="pk">Desarrollador único · Full Stack</div><h4>Sistema de Gestión de Inventario</h4><p>SPA full-stack de la base de datos al frontend: dashboard en tiempo real, soft-delete con recuperación y tipado end-to-end con TypeScript.</p></div></div>
          <div class="ptags"><span class="ptag">Java 17</span><span class="ptag">Spring Boot</span><span class="ptag">MapStruct</span><span class="ptag">React</span><span class="ptag">TypeScript</span><span class="ptag">TailwindCSS</span></div>
          <div class="open"><span>Ver caso completo</span><span>→</span></div>
        </div>
      </div>`
  },

  'proj-booqi': {
    title: 'Booqi', w: 620, h: 560, x: 300, y: 70,
    html: `
      <div class="pd">
        <div class="hero"><div class="pico pi0">B</div><div><h2>Booqi — Gestión de Reservas de Eventos</h2><div class="sub">Proyecto en equipo · Ownership de todo el backend</div></div></div>
        <div class="body">
          <div class="blk"><div class="h">Mi rol</div><p>Responsable del backend en los 4 microservicios (usuarios, eventos, reservas, pagos) y único encargado de la orquestación con Docker Compose: red compartida, healthchecks y configuración de entornos. El frontend lo desarrollaron compañeros de equipo.</p></div>
          <div class="blk"><div class="h">Arquitectura</div><p>4 microservicios Spring Boot independientes, cada uno con su propia base de datos MySQL y su API REST documentada con Swagger / OpenAPI. Comunicación inter-servicio para validar en tiempo real la identidad del usuario, la existencia del evento y la disponibilidad de asientos.</p></div>
          <div class="blk"><div class="h">Características clave</div><ul class="feat">
            <li>Compra centralizada de tickets</li>
            <li>Generación de ticket en PDF al confirmar la reserva</li>
            <li>Panel de administración para organizadores: creación de eventos y monitorización de reservas y pagos</li>
            <li>Control de disponibilidad en tiempo real</li>
          </ul></div>
          <div class="blk"><div class="h">Tecnologías</div><div class="chips">${['Java','Spring Boot','SpringDoc','Maven','MySQL','React','Bootstrap','TypeScript','Docker'].map(t=>`<span class="chip2">${t}</span>`).join('')}</div></div>
          <a class="repo-btn" href="https://github.com/RenzoRamosDEV/Booqui-Sistema-Gestion-Reservas-Eventos" target="_blank" rel="noopener">⎇ Ver repositorio en GitHub</a>
        </div>
      </div>`
  },

  'proj-inv': {
    title: 'Inventario', w: 620, h: 560, x: 330, y: 80,
    html: `
      <div class="pd">
        <div class="hero"><div class="pico pi1">I</div><div><h2>Sistema de Gestión de Inventario</h2><div class="sub">Desarrollador único · Full-stack end-to-end</div></div></div>
        <div class="body">
          <div class="blk"><div class="h">Backend</div><p>Java 17 + Spring Boot con arquitectura por capas, mapeo DTO con MapStruct, manejo centralizado de excepciones, paginación, filtros de búsqueda multi-criterio, Spring Boot Actuator para monitorización y documentación Swagger / OpenAPI.</p></div>
          <div class="blk"><div class="h">Frontend</div><p>SPA en React + TypeScript con dashboard en tiempo real (valor total del stock, alertas de bajo stock, productos agotados, más caros) y tipado estricto end-to-end en toda la comunicación con la API.</p></div>
          <div class="blk"><div class="h">Características clave</div><ul class="feat">
            <li>Borrado lógico (soft delete) con recuperación de registros</li>
            <li>Ajuste de stock en tiempo real desde la tabla principal</li>
            <li>Filtrado multi-criterio por nombre, estado de stock y estado eliminado</li>
          </ul></div>
          <div class="blk"><div class="h">Tecnologías</div><div class="chips">${['Java 17','Spring Boot','SpringDoc','Maven','MySQL','React','TypeScript','TailwindCSS'].map(t=>`<span class="chip2">${t}</span>`).join('')}</div></div>
          <a class="repo-btn" href="https://github.com/RenzoRamosDEV/Gestion-De-Inventario" target="_blank" rel="noopener">⎇ Ver repositorio en GitHub</a>
        </div>
      </div>`
  },

  stack: {
    title: 'Tech Stack', w: 600, h: 540, x: 380, y: 90,
    html: `
      <div class="sect">
        <h2>Tech Stack & Metodologías</h2>
        <div class="lead">Herramientas y prácticas que uso en el día a día.</div>

        <div class="grouptitle">Backend <span class="ln"></span></div>
        <div class="chips">${['Java','Kotlin','Spring Boot','Spring Modulith','MySQL','Docker','Docker Compose','Maven','Gradle','JUnit','Mockito','Testcontainers','Swagger / OpenAPI'].map(t=>`<span class="chip2 key">${t}</span>`).join('')}</div>

        <div class="grouptitle">Frontend <span class="ln"></span></div>
        <div class="chips">${['HTML','CSS','JavaScript','TypeScript','React','TailwindCSS','CSS Modules'].map(t=>`<span class="chip2">${t}</span>`).join('')}</div>

        <div class="grouptitle">Control de versiones <span class="ln"></span></div>
        <div class="chips">${['Git','Git Flow','Trunk-Based','Commits estructurados'].map(t=>`<span class="chip2">${t}</span>`).join('')}</div>

        <div class="grouptitle">Herramientas de IA <span class="ln"></span></div>
        <div class="chips">${['Claude Code','Copilot CLI','OpenSpec'].map(t=>`<span class="chip2">${t}</span>`).join('')}</div>
        <div class="ainote">Uso la IA de forma deliberada: <b>Claude Code</b> en refactors y decisiones de arquitectura, <b>Copilot CLI</b> para sugerencias en terminal y <b>OpenSpec</b> para redactar specs técnicas antes de implementar. No como muleta — como multiplicador de fuerza.</div>

        <div class="grouptitle">Metodologías <span class="ln"></span></div>
        <div class="chips">${['SOLID','Clean Architecture','TDD','Integration Testing','Agile (Scrum/Kanban)','Spec-Driven Development','Agentic Workflows','Prompt Engineering','Component-Based UI','Responsive Design','DDD'].map(t=>`<span class="chip2">${t}</span>`).join('')}</div>
      </div>`
  },

  path: {
    title: 'Trayectoria', w: 580, h: 500, x: 360, y: 90,
    html: `
      <div class="timeline">
        <div class="tl-group">Experiencia</div>
        <div class="titem"><div class="dot"></div><div class="when">Septiembre 2025 – Actualidad · Madrid</div><h4>Fullstack Developer</h4><div class="where">SEIDOR</div><p>Desarrollo de componentes reutilizables y configurables en Adobe Experience Manager (AEM), lógica de backend modal en Java y gestión de contenido multimedia vía AEM Assets (DAM). Resolución de incidencias, optimización de funcionalidades y documentación técnica para soporte y mantenimiento.</p></div>

        <div class="tl-group">Formación</div>
        <div class="titem"><div class="dot"></div><div class="when">Septiembre 2024 – Junio 2026 · Madrid</div><h4>FP Superior — Desarrollo de Aplicaciones Multiplataforma</h4><div class="where">CESUR</div><p>Java, Spring Boot, Kotlin, Python, HTML, CSS, Maven y Gradle. Desarrollo backend y frontend, APIs REST, gestión de dependencias y buenas prácticas de programación.</p></div>
        <div class="titem"><div class="dot"></div><div class="when">Julio 2025 – Agosto 2025 · Madrid</div><h4>Bootcamp — Fundación Telefónica</h4><div class="where">42 Madrid</div><p>Bootcamp intensivo en C, Linux y shell scripting. Metodología de aprendizaje peer-to-peer con revisión entre estudiantes y validación colaborativa.</p></div>
        <div class="titem"><div class="dot"></div><div class="when">2021 – 2022 · Lima, Perú</div><h4>Diseño Gráfico</h4><div class="where">Instituto San Ignacio de Loyola</div><p>Comunicación visual y herramientas de diseño: Adobe Illustrator, Photoshop e InDesign. Aporta una sensibilidad de diseño que informa mis decisiones de UI en frontend.</p></div>
      </div>`
  },

  cert: {
    title: 'Certificados', w: 560, h: 440, x: 400, y: 120,
    html: `
      <div class="certs">
        <div class="cert"><div class="cb">☕</div><div class="ci"><h4>Essential Spring Boot Certificate</h4><div class="issuer">LinkedIn Learning · Mayo 2026</div><a href="https://www.linkedin.com/learning/certificates/7b7c86e65a375f5a2e3f6dd941c68683bfbda364592dacc893275a5e0a80eef6" target="_blank" rel="noopener">Ver credencial →</a></div></div>
        <div class="cert"><div class="cb">✦</div><div class="ci"><h4>Professional Artificial Intelligence Certificate</h4><div class="issuer">Google / Coursera · Abril 2026</div><a href="https://www.coursera.org/account/accomplishments/professional-cert/certificate/XKQE5SSM3EDZ" target="_blank" rel="noopener">Ver credencial →</a></div></div>
        <div class="cert"><div class="cb">⚡</div><div class="ci"><h4>AI-Assisted Development Certificate</h4><div class="issuer">Big School · Marzo 2026</div><div class="cd">Formación de 6 horas sobre el flujo zero-to-production integrando modelos de IA en proyectos reales.</div></div></div>
      </div>`
  },

  mail: {
    title: 'Contacto', w: 520, h: 430, x: 430, y: 130,
    html: `
      <div class="contact">
        <div class="intro">¿Tienes un proyecto o una oportunidad? Estoy abierto a conversar. Encuéntrame aquí:</div>
        <div class="links">
          <a class="lnk" href="mailto:renzoramosivan@gmail.com"><div class="li">✉</div><div><div class="lt">Email</div><div class="ls">renzoramosivan@gmail.com</div></div><span class="arrow">→</span></a>
          <a class="lnk" href="https://github.com/RenzoRamosDEV" target="_blank" rel="noopener"><div class="li">⎇</div><div><div class="lt">GitHub</div><div class="ls">github.com/RenzoRamosDEV</div></div><span class="arrow">→</span></a>
          <a class="lnk" href="https://www.linkedin.com/in/renzoinv04/" target="_blank" rel="noopener"><div class="li">in</div><div><div class="lt">LinkedIn</div><div class="ls">linkedin.com/in/renzoinv04</div></div><span class="arrow">→</span></a>
          <a class="lnk" href="https://renzoramosdev.github.io/Renzo-Ramos-Portafolio/" target="_blank" rel="noopener"><div class="li">◈</div><div><div class="lt">Portafolio web</div><div class="ls">renzoramosdev.github.io</div></div><span class="arrow">→</span></a>
        </div>
      </div>`
  },

  v1: {
    title: 'Portafolio v1', w: 900, h: 580, x: 200, y: 80,
    html: `<iframe src="v1/dist/index.html" style="width:100%;height:100%;border:none;display:block;" title="Portafolio v1"></iframe>`
  },

  config: {
    title: 'Preferencias', w: 480, h: 520, x: 200, y: 120,
    html: `
      <div class="cfg">
        <div class="cfg-section">
          <div class="cfg-title">Apariencia</div>
          <div class="cfg-row">
            <div class="cfg-label"><span class="cfg-ico">☾</span>Tema</div>
            <div class="cfg-segmented" id="cfg-theme">
              <button data-val="light">☀ Claro</button>
              <button data-val="dark">☾ Oscuro</button>
              <button data-val="auto">⬤ Auto</button>
            </div>
          </div>
          <div class="cfg-row">
            <div class="cfg-label"><span class="cfg-ico">◉</span>Color de acento</div>
            <div class="cfg-colors" id="cfg-accent">
              <span class="cfg-dot" data-color="0071e3" style="background:#0071e3" title="Azul Apple"></span>
              <span class="cfg-dot" data-color="a855f7" style="background:#a855f7" title="Violeta"></span>
              <span class="cfg-dot" data-color="22c1c3" style="background:#22c1c3" title="Teal"></span>
              <span class="cfg-dot" data-color="f0a500" style="background:#f0a500" title="Dorado"></span>
              <span class="cfg-dot" data-color="ef4444" style="background:#ef4444" title="Rojo"></span>
              <span class="cfg-dot" data-color="34c759" style="background:#34c759" title="Verde"></span>
            </div>
          </div>
        </div>

        <div class="cfg-section">
          <div class="cfg-title">Fondo de escritorio</div>
          <div class="cfg-wallpapers" id="cfg-wall">
            <div class="cfg-wall-opt" data-wall="blue" style="background:linear-gradient(150deg,#d7e3ff,#eef7ff)"></div>
            <div class="cfg-wall-opt" data-wall="night" style="background:linear-gradient(150deg,#06122e,#0c1430)"></div>
            <div class="cfg-wall-opt" data-wall="aurora" style="background:linear-gradient(150deg,#0d1b2a,#1b4332,#081c15)"></div>
            <div class="cfg-wall-opt" data-wall="sunset" style="background:linear-gradient(150deg,#1a1a2e,#16213e,#0f3460)"></div>
            <div class="cfg-wall-opt" data-wall="rose"   style="background:linear-gradient(150deg,#fce4ec,#f8bbd9,#fdf2f8)"></div>
            <div class="cfg-wall-opt" data-wall="slate"  style="background:linear-gradient(150deg,#1e293b,#334155,#0f172a)"></div>
          </div>
        </div>

        <div class="cfg-section">
          <div class="cfg-title">Animaciones</div>
          <div class="cfg-row">
            <div class="cfg-label"><span class="cfg-ico">◈</span>Velocidad de ventanas</div>
            <input class="cfg-range" id="cfg-speed" type="range" min="50" max="500" step="50" value="280">
            <span class="cfg-range-val" id="cfg-speed-val">280ms</span>
          </div>
        </div>

        <div class="cfg-section">
          <div class="cfg-title">Sobre este portafolio</div>
          <div class="cfg-info">
            <div class="cfg-info-row"><span>Versión</span><span>2.0</span></div>
            <div class="cfg-info-row"><span>Stack</span><span>HTML · CSS · JS vanilla</span></div>
            <div class="cfg-info-row"><span>Hosting</span><span>GitHub Pages</span></div>
            <div class="cfg-info-row"><span>Autor</span><span>Renzo Ramos</span></div>
          </div>
        </div>
      </div>`
  }
};
