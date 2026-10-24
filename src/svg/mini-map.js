import { cssVar } from '../utils/theme.js';

// Mini mapa de las tarjetas de experiencia: plano de calles y un pin que da vueltas (animateMotion)
export const miniMap = ({ dur, path }) => `<svg viewBox="0 0 120 130" aria-hidden="true">
              <rect width="120" height="130" fill="#1e1e1e"/>
              <g stroke="#3a3a3a" stroke-width="1.2" fill="none">
                <path d="M-5 20 L60 45 L125 30"/><path d="M-5 70 L40 60 L80 85 L125 75"/><path d="M-5 110 L50 100 L125 120"/>
                <path d="M20 -5 L30 60 L15 135"/><path d="M70 -5 L60 45 L80 85 L75 135"/><path d="M105 -5 L100 70 L110 135"/>
              </g>
              <g stroke="#2c2c2c" stroke-width=".7" fill="none">
                <path d="M-5 40 L125 55"/><path d="M-5 90 L125 95"/><path d="M45 -5 L50 135"/><path d="M90 -5 L88 135"/>
              </g>
              <!-- El pin da vueltas por el mapa -->
              <g>
                <animateMotion dur="${dur}" repeatCount="indefinite" path="${path}"/>
                <path d="M72 30 a8 8 0 0 1 8 8 c0 6 -8 14 -8 14 s-8 -8 -8 -14 a8 8 0 0 1 8 -8z" fill="${cssVar('--accent')}"/>
                <circle cx="72" cy="38" r="3" fill="#1e1e1e"/>
              </g>
            </svg>`;
