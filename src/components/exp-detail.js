// Card con el detalle de un puesto (slot "a" o "b"): sale desde detrás de su tarjeta al pulsar VER MÁS
export const expDetail = slot => `<div class="exp-detail" id="exp-${slot}-detail" aria-hidden="true">
        <div class="exp-detail-card" role="region" aria-labelledby="exp-${slot}-d-role">
          <button class="exp-detail-close" id="exp-${slot}-d-close" type="button" aria-label="Cerrar detalle">×</button>
          <div class="kicker" id="exp-${slot}-d-kicker"></div>
          <h4 id="exp-${slot}-d-role"></h4>
          <div class="job-meta" id="exp-${slot}-d-meta"></div>
          <h5 id="exp-${slot}-d-h"></h5>
          <p id="exp-${slot}-d-p"></p>
          <ul class="exp-list" id="exp-${slot}-d-list"></ul>
        </div>
      </div>`;
