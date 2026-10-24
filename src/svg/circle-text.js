// Texto que gira alrededor de un círculo: insignia de la portada, botón de volver arriba y sellos de certificados
export function circleText({ cls, size, radius, pathId, textLength, text, ariaHidden = false, inner = '' }) {
  const c = size / 2;
  const d = `M${c - radius} ${c} a${radius} ${radius} 0 1 1 ${radius * 2} 0 a${radius} ${radius} 0 1 1 -${radius * 2} 0`;
  return `<svg class="${cls}" viewBox="0 0 ${size} ${size}"${ariaHidden ? ' aria-hidden="true"' : ''}>
        <defs><path id="${pathId}" d="${d}"/></defs>${inner}
        <text><textPath href="#${pathId}" textLength="${textLength}" lengthAdjust="spacing">${text}</textPath></text>
      </svg>`;
}
