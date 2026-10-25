// Tarjeta de un puesto (slot "a" o "b") con los datos del puesto d; la sección la actualiza al pasar de página
import { miniMap } from '../svg/mini-map.js';

export const expCard = (slot, map, d) => `<div class="exp-card fade-swap" id="exp-${slot}-card">
        <div class="kicker" id="exp-${slot}-kicker">${d.kicker}</div>
        <div class="role" id="exp-${slot}-role">${d.role}</div>
        <div class="tiles">
          <div class="tile tall map">
            ${miniMap(map)}
            <small id="exp-${slot}-place">${d.place}</small>
          </div>
          <div class="tile tall"><small>EMPRESA</small><strong id="exp-${slot}-company">${d.company}</strong></div>
          <div class="tile"><small>DESDE</small><strong id="exp-${slot}-from">${d.from}</strong></div>
          <div class="tile"><small>HASTA</small><strong id="exp-${slot}-to">${d.to}</strong></div>
        </div>
        <button class="cta-btn" id="exp-${slot}-more" type="button">VER MÁS <span>→</span></button>
      </div>`;
