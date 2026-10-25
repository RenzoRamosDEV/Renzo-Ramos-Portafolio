// Panel lateral que entra desplazándose desde la derecha (fondo oscuro + tarjeta). Lo usa el detalle de puestos
export const drawer = ({ id, labelledBy, closeId, panelClass = '', content }) => `<div class="drawer" id="${id}" role="dialog" aria-modal="true" aria-labelledby="${labelledBy}" aria-hidden="true">
  <aside class="drawer-panel ${panelClass}">
    <button class="drawer-close" id="${closeId}" type="button" aria-label="Cerrar">×</button>${content}
  </aside>
</div>`;
