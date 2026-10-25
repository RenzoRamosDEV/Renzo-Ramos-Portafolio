// Genera las versiones WebP responsive de las imágenes de public/media y public/img en public/opt/
// (480, 960 y 1600 px de ancho, sin agrandar). Se ejecuta antes de dev y build; solo rehace las que cambian.
import sharp from 'sharp';
import { readdirSync, statSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { widthsFor, webpPath } from '../src/utils/responsive.js';

const PUBLIC = new URL('../public/', import.meta.url).pathname;
const SOURCES = ['media', 'img'];
const SKIP = /\/(icons|og|certificados|cv)\//;

const files = dir => readdirSync(dir).flatMap(f => {
  const p = join(dir, f);
  return statSync(p).isDirectory() ? files(p) : [p];
});

let made = 0, kept = 0;
for (const file of SOURCES.flatMap(d => files(join(PUBLIC, d)))) {
  if (!/\.(png|jpe?g)$/i.test(file) || SKIP.test(file + '/')) continue;
  const src = relative(PUBLIC, file);
  const { width } = await sharp(file).metadata();
  for (const w of widthsFor(width)) {
    const out = join(PUBLIC, webpPath(src, w));
    if (existsSync(out) && statSync(out).mtimeMs >= statSync(file).mtimeMs) { kept++; continue; }
    mkdirSync(dirname(out), { recursive: true });
    await sharp(file).resize({ width: w }).webp({ quality: 80, effort: 5 }).toFile(out);
    made++;
  }
}
console.log(`imágenes WebP: ${made} generadas, ${kept} ya al día (public/opt/)`);
