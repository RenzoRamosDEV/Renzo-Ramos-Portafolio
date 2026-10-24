// Hito de la línea de tiempo de educación
export const timelineStep = s => `
      <div class="step">
        <div class="date">${s.from} — ${s.to}</div>
        <div class="node"></div>
        <div class="body"><h3>${s.center}</h3><div class="degree">${s.degree}</div><p>${s.text}</p><span class="place">${s.place}</span></div>
      </div>`;
