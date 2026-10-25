// Pregunta frecuente desplegable (<details>: funciona sin JavaScript y el texto está siempre en el HTML)
export const faqItem = ({ q, a }, i) => `
      <details class="faq-item"${i === 0 ? ' open' : ''}>
        <summary><h3>${q}</h3><span class="faq-icon" aria-hidden="true"></span></summary>
        <p>${a}</p>
      </details>`;
