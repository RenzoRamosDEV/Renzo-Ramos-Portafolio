// Ventana modal (fondo oscuro + caja). La usan el detalle de puestos y el visor de certificados
export const modal = ({ id, labelledBy, closeId, boxClass, content }) => `<div class="viewer" id="${id}" role="dialog" aria-modal="true" aria-labelledby="${labelledBy}">
  <button class="close" id="${closeId}" aria-label="Cerrar">×</button>
  <div class="${boxClass}">${content}
  </div>
</div>`;
