// Ventana modal (fondo oscuro + caja). La usan el detalle de puestos y el visor de certificados
// label: nombre del diálogo mientras su título (labelledBy) está vacío
export const modal = ({ id, labelledBy, label, closeId, boxClass, content }) => `<div class="viewer" id="${id}" role="dialog" aria-modal="true" aria-labelledby="${labelledBy}" aria-label="${label}">
  <button class="close" id="${closeId}" aria-label="Cerrar">×</button>
  <div class="${boxClass}">${content}
  </div>
</div>`;
