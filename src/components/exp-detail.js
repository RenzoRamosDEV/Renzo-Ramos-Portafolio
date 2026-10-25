// Card con el detalle de un puesto (slot "a" o "b"): sale desde detrás de su tarjeta al pulsar VER MÁS
import { jobMeta } from './job-meta.js';
import { listItems } from './list-items.js';

export const expDetail = (slot, d) => `<div class="exp-detail" id="exp-${slot}-detail" aria-hidden="true">
        <div class="exp-detail-card" role="region" aria-labelledby="exp-${slot}-d-role">
          <button class="exp-detail-close" id="exp-${slot}-d-close" type="button" aria-label="Cerrar detalle">×</button>
          <div class="kicker" id="exp-${slot}-d-kicker">${d.kicker}</div>
          <h3 id="exp-${slot}-d-role">${d.role}</h3>
          <div class="job-meta" id="exp-${slot}-d-meta">${jobMeta(d)}</div>
          <h4 id="exp-${slot}-d-h">${d.left[0]}</h4>
          <p id="exp-${slot}-d-p">${d.left[1]}</p>
          <ul class="exp-list" id="exp-${slot}-d-list">${listItems(d.list)}</ul>
        </div>
      </div>`;
