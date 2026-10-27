// Contacto: email, enlaces y formulario que abre el correo del visitante
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL, CV_URL, GITHUB_ICON, LINKEDIN_ICON, CV_ICON } from '../data/site.js';
import { sectionBackground } from '../components/section-background.js';
import { socialLink } from '../components/social-link.js';
import { arrowRight } from '../svg/icons.js';
import { $ } from '../utils/dom.js';

export const renderContact = () => `<section class="contact" id="contacto">
  ${sectionBackground('CONTACTO')}
  <div class="contact-grid">
    <div>
      <div class="status"><i></i>DISPONIBLE PARA NUEVOS PROYECTOS</div>
      <h2>¿HABLAMOS?<br><em>ESCRÍBEME</em></h2>
      <p class="lead">¿TIENES UNA IDEA, UN PROYECTO O UNA OFERTA? CUÉNTAMELO Y TE RESPONDO LO ANTES POSIBLE.</p>
      <a class="mail" id="mail-link" href="mailto:${CONTACT_EMAIL}"><span id="mail-text">${CONTACT_EMAIL.toUpperCase()}</span>${arrowRight}</a>
      <div class="socials">
        ${socialLink({ href: GITHUB_URL, icon: GITHUB_ICON, label: 'GITHUB' })}
        ${socialLink({ href: LINKEDIN_URL, icon: LINKEDIN_ICON, label: 'LINKEDIN' })}
        ${socialLink({ href: CV_URL, icon: CV_ICON, label: 'CV' })}
      </div>
    </div>
    <form class="form-card" id="contact-form">
      <div class="kicker">MENSAJE</div>
      <h3>CUÉNTAME TU IDEA</h3>
      <label><span>NOMBRE</span><input name="name" required autocomplete="name"></label>
      <label><span>EMAIL</span><input name="email" type="email" required autocomplete="email"></label>
      <label><span>MENSAJE</span><textarea name="message" required></textarea></label>
      <button type="submit">ENVIAR MENSAJE <span>→</span></button>
    </form>
  </div>
</section>`;

// El formulario abre el correo del visitante con el mensaje ya escrito
export function initContact() {
  $('contact-form').addEventListener('submit', e => {
    e.preventDefault();
    const f = new FormData(e.target);
    const subject = `Contacto desde la web — ${f.get('name')}`;
    const body = `${f.get('message')}\n\n— ${f.get('name')} (${f.get('email')})`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
