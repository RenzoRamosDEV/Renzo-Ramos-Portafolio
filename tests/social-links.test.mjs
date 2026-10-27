// Enlaces sociales (GITHUB, LINKEDIN, CV) de la portada y de contacto, y los recursos del CV
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { renderHero } from '../src/sections/hero.js';
import { renderContact } from '../src/sections/contact.js';

const CV_HREF = 'media/cv/cv-renzo-ramos.pdf';
const CV_ICON = 'media/icons/cv.png';
const publicPath = rel => fileURLToPath(new URL(`../public/${rel}`, import.meta.url));

// Extrae [{ href, target, rel, icon, label }] de los <a> dentro de <div class="…">…</div>
const linksIn = (markup, cls) => {
  const block = markup.match(new RegExp(`<div class="${cls}">([\\s\\S]*?)</div>`))?.[1] ?? '';
  return [...block.matchAll(/<a href="([^"]*)" target="([^"]*)" rel="([^"]*)"><img src="([^"]*)"[^>]*>([^<]*)<\/a>/g)]
    .map(([, href, target, rel, icon, label]) => ({ href, target, rel, icon, label }));
};

const sections = [
  { name: 'portada', render: renderHero, cls: 'tags' },
  { name: 'contacto', render: renderContact, cls: 'socials' },
];

for (const { name, render, cls } of sections) {
  test(`${name}: el enlace CV abre el PDF en pestaña nueva con su icono`, () => {
    const cv = linksIn(render(), cls).find(l => l.label === 'CV');
    assert.deepEqual(cv, { href: CV_HREF, target: '_blank', rel: 'noopener', icon: CV_ICON, label: 'CV' });
  });

  test(`${name}: los enlaces van en el orden GITHUB, LINKEDIN, CV`, () => {
    assert.deepEqual(linksIn(render(), cls).map(l => l.label), ['GITHUB', 'LINKEDIN', 'CV']);
  });
}

test('el PDF del CV existe y es el nuevo (más ligero que el antiguo de 899 KB)', () => {
  const { size } = statSync(publicPath(CV_HREF));
  assert.ok(size > 0 && size < 500_000, `tamaño inesperado: ${size} bytes`);
});

test('el icono del CV existe en public/media/icons', () => {
  assert.ok(statSync(publicPath(CV_ICON)).size > 0);
});
