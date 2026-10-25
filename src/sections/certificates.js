// Certificados: sellos giratorios y visor del PDF o imagen
import { certs } from '../data/certificates.js';
import { sectionBackground } from '../components/section-background.js';
import { seal } from '../components/seal.js';
import { modal } from '../components/modal.js';
import { certDocument } from '../components/cert-document.js';
import { $ } from '../utils/dom.js';

export const renderCertificates = () => `<section class="certs" id="certificados">
  ${sectionBackground('CERTIFICADOS')}
  <h2>MIS <em>CERTIFICADOS</em></h2>
  <div class="seals" id="seals">${certs.map(seal).join('')}</div>
</section>`;

export const renderCertViewer = () => modal({
  id: 'viewer', labelledBy: 'v-title', label: 'Visor de certificado', closeId: 'v-close', boxClass: 'box',
  content: `
    <div class="doc" id="v-doc"></div>
    <div class="bar">
      <div><h4 id="v-title"></h4><small id="v-meta"></small></div>
      <div class="actions">
        <a class="btn-o" id="v-cred" href="#" target="_blank" rel="noopener">VER CREDENCIAL ↗</a>
        <a class="btn-o" id="v-open" href="#" target="_blank" rel="noopener">ABRIR EN PESTAÑA ↗</a>
        <a class="btn-o solid" id="v-down" href="#" download>DESCARGAR</a>
      </div>
    </div>`,
});

export function initCertificates() {
  const viewer = $('viewer');
  function open(c) {
    $('v-doc').innerHTML = certDocument(c);
    $('v-title').textContent = c.title;
    $('v-meta').textContent = `${c.org} · ${c.year}`;
    $('v-open').href = c.file; $('v-down').href = c.file;
    $('v-cred').href = c.credential; $('v-cred').style.display = c.credential ? '' : 'none';
    viewer.classList.add('open');
  }
  const close = () => viewer.classList.remove('open');
  $('seals').addEventListener('click', e => { const b = e.target.closest('.seal'); if (b) open(certs[b.dataset.i]); });
  $('v-close').onclick = close;
  viewer.addEventListener('click', e => { if (e.target === viewer) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}
