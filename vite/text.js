// Pasa a mayúsculas normales los textos que en la web se ven en MAYÚSCULAS ("JUNIOR AI ENGINEER · AI & DATA"
// → "Junior AI Engineer · AI & Data"), respetando siglas y nombres propios. Lo usan vite/llms.js y vite/structured-data.js
const KEEP = { ai: 'AI', ia: 'IA', dam: 'DAM', mcp: 'MCP', tuio: 'TUIO', seidor: 'SEIDOR', isil: 'ISIL', cesur: 'CESUR', linkedin: 'LinkedIn', aem: 'AEM' };
const SMALL = new Set(['de', 'del', 'en', 'con', 'y', 'e', 'la', 'el', 'los', 'las', 'a', 'para', 'por']);

export const niceCase = s => s.toLowerCase().split(/(\s+|·)/).map((w, i) => {
  const bare = w.replace(/[^\p{L}]/gu, '');
  if (KEEP[bare]) return w.replace(bare, KEEP[bare]);
  if (i > 0 && SMALL.has(w)) return w;
  return w.replace(/\p{L}/u, c => c.toUpperCase());
}).join('');
