// Pastillas de tecnologías de un proyecto: las 8 primeras y un "+N" con el resto
export function stackPills(stack) {
  const shown = stack.slice(0, 8), rest = stack.length - shown.length;
  return shown.map(t => `<span>${t.toUpperCase()}</span>`).join('') + (rest > 0 ? `<span>+${rest}</span>` : '');
}
