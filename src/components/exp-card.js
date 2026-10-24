// Tarjeta de un puesto (slot "a" o "b"). El contenido lo rellena la sección de experiencia
import { miniMap } from '../svg/mini-map.js';

export const expCard = (slot, map) => `<div class="exp-card fade-swap" id="exp-${slot}-card">
        <div class="kicker" id="exp-${slot}-kicker"></div>
        <div class="role" id="exp-${slot}-role"></div>
        <div class="tiles">
          <div class="tile tall map">
            ${miniMap(map)}
            <small id="exp-${slot}-place"></small>
          </div>
          <div class="tile tall"><small>EMPRESA</small><strong id="exp-${slot}-company"></strong></div>
          <div class="tile"><small>DESDE</small><strong id="exp-${slot}-from"></strong></div>
          <div class="tile"><small>HASTA</small><strong id="exp-${slot}-to"></strong></div>
        </div>
        <button class="cta-btn" id="exp-${slot}-more" type="button">VER MÁS <span>→</span></button>
      </div>`;
