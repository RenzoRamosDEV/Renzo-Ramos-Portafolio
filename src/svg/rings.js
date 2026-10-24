import { cssVar } from '../utils/theme.js';

// Aros de la portada (animaciones SMIL): los exteriores giran en un sentido y el dial interior en el contrario

export const outerRings = () => `<svg class="gear" viewBox="0 0 720 720" aria-hidden="true">
    <!-- Aros exteriores: giran en sentido contrario al círculo, cada uno a su ritmo -->
    <g>
      <animateTransform attributeName="transform" type="rotate" from="360 360 360" to="0 360 360" dur="70s" repeatCount="indefinite"/>
      <circle cx="360" cy="360" r="308" fill="none" stroke="rgba(${cssVar('--accent-rgb')},.75)" stroke-width="2" stroke-dasharray="240 30 60 30" />
    </g>
    <g>
      <animateTransform attributeName="transform" type="rotate" from="360 360 360" to="0 360 360" dur="110s" repeatCount="indefinite"/>
      <circle cx="360" cy="360" r="324" fill="none" stroke="rgba(255,255,255,.25)" stroke-width="6" stroke-dasharray="3 9"/>
    </g>
    <g>
      <animateTransform attributeName="transform" type="rotate" from="360 360 360" to="0 360 360" dur="45s" repeatCount="indefinite"/>
      <circle cx="360" cy="360" r="342" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="1.5" stroke-dasharray="520 80 160 80 260 80" stroke-linecap="round"/>
      <circle cx="360" cy="378" r="4" fill="${cssVar('--accent')}" transform="rotate(30 360 360)"/>
      <circle cx="360" cy="702" r="3" fill="#9a9a9a" transform="rotate(30 360 360)"/>
    </g>
  </svg>`;

export const innerDial = () => `<svg class="gear inner" viewBox="0 0 720 720" aria-hidden="true">
    <g>
      <animateTransform attributeName="transform" type="rotate" from="0 360 360" to="360 360 360" dur="80s" repeatCount="indefinite"/>
      <circle cx="360" cy="360" r="284" fill="none" stroke="rgba(255,255,255,.22)" stroke-width="1.5"/>
      <g stroke="rgba(255,255,255,.3)" stroke-width="2.2" stroke-linecap="round"><line x1="614.0" y1="360.0" x2="638.0" y2="360.0"/><line x1="623.0" y1="383.0" x2="636.9" y2="384.2"/><line x1="620.0" y1="405.8" x2="633.8" y2="408.3"/><line x1="615.0" y1="428.3" x2="628.5" y2="432.0"/><line x1="608.1" y1="450.3" x2="621.2" y2="455.1"/><line x1="599.3" y1="471.6" x2="612.0" y2="477.5"/><line x1="580.0" y1="487.0" x2="600.8" y2="499.0"/><line x1="576.3" y1="511.4" x2="587.7" y2="519.5"/><line x1="562.2" y1="529.7" x2="573.0" y2="538.7"/><line x1="546.7" y1="546.7" x2="556.6" y2="556.6"/><line x1="529.7" y1="562.2" x2="538.7" y2="573.0"/><line x1="511.4" y1="576.3" x2="519.5" y2="587.7"/><line x1="487.0" y1="580.0" x2="499.0" y2="600.8"/><line x1="471.6" y1="599.3" x2="477.5" y2="612.0"/><line x1="450.3" y1="608.1" x2="455.1" y2="621.2"/><line x1="428.3" y1="615.0" x2="432.0" y2="628.5"/><line x1="405.8" y1="620.0" x2="408.3" y2="633.8"/><line x1="383.0" y1="623.0" x2="384.2" y2="636.9"/><line x1="360.0" y1="614.0" x2="360.0" y2="638.0"/><line x1="337.0" y1="623.0" x2="335.8" y2="636.9"/><line x1="314.2" y1="620.0" x2="311.7" y2="633.8"/><line x1="291.7" y1="615.0" x2="288.0" y2="628.5"/><line x1="269.7" y1="608.1" x2="264.9" y2="621.2"/><line x1="248.4" y1="599.3" x2="242.5" y2="612.0"/><line x1="233.0" y1="580.0" x2="221.0" y2="600.8"/><line x1="208.6" y1="576.3" x2="200.5" y2="587.7"/><line x1="190.3" y1="562.2" x2="181.3" y2="573.0"/><line x1="173.3" y1="546.7" x2="163.4" y2="556.6"/><line x1="157.8" y1="529.7" x2="147.0" y2="538.7"/><line x1="143.7" y1="511.4" x2="132.3" y2="519.5"/><line x1="140.0" y1="487.0" x2="119.2" y2="499.0"/><line x1="120.7" y1="471.6" x2="108.0" y2="477.5"/><line x1="111.9" y1="450.3" x2="98.8" y2="455.1"/><line x1="105.0" y1="428.3" x2="91.5" y2="432.0"/><line x1="100.0" y1="405.8" x2="86.2" y2="408.3"/><line x1="97.0" y1="383.0" x2="83.1" y2="384.2"/><line x1="106.0" y1="360.0" x2="82.0" y2="360.0"/><line x1="97.0" y1="337.0" x2="83.1" y2="335.8"/><line x1="100.0" y1="314.2" x2="86.2" y2="311.7"/><line x1="105.0" y1="291.7" x2="91.5" y2="288.0"/><line x1="111.9" y1="269.7" x2="98.8" y2="264.9"/><line x1="120.7" y1="248.4" x2="108.0" y2="242.5"/><line x1="140.0" y1="233.0" x2="119.2" y2="221.0"/><line x1="143.7" y1="208.6" x2="132.3" y2="200.5"/><line x1="157.8" y1="190.3" x2="147.0" y2="181.3"/><line x1="173.3" y1="173.3" x2="163.4" y2="163.4"/><line x1="190.3" y1="157.8" x2="181.3" y2="147.0"/><line x1="208.6" y1="143.7" x2="200.5" y2="132.3"/><line x1="233.0" y1="140.0" x2="221.0" y2="119.2"/><line x1="248.4" y1="120.7" x2="242.5" y2="108.0"/><line x1="269.7" y1="111.9" x2="264.9" y2="98.8"/><line x1="291.7" y1="105.0" x2="288.0" y2="91.5"/><line x1="314.2" y1="100.0" x2="311.7" y2="86.2"/><line x1="337.0" y1="97.0" x2="335.8" y2="83.1"/><line x1="360.0" y1="106.0" x2="360.0" y2="82.0"/><line x1="383.0" y1="97.0" x2="384.2" y2="83.1"/><line x1="405.8" y1="100.0" x2="408.3" y2="86.2"/><line x1="428.3" y1="105.0" x2="432.0" y2="91.5"/><line x1="450.3" y1="111.9" x2="455.1" y2="98.8"/><line x1="471.6" y1="120.7" x2="477.5" y2="108.0"/><line x1="487.0" y1="140.0" x2="499.0" y2="119.2"/><line x1="511.4" y1="143.7" x2="519.5" y2="132.3"/><line x1="529.7" y1="157.8" x2="538.7" y2="147.0"/><line x1="546.7" y1="173.3" x2="556.6" y2="163.4"/><line x1="562.2" y1="190.3" x2="573.0" y2="181.3"/><line x1="576.3" y1="208.6" x2="587.7" y2="200.5"/><line x1="580.0" y1="233.0" x2="600.8" y2="221.0"/><line x1="599.3" y1="248.4" x2="612.0" y2="242.5"/><line x1="608.1" y1="269.7" x2="621.2" y2="264.9"/><line x1="615.0" y1="291.7" x2="628.5" y2="288.0"/><line x1="620.0" y1="314.2" x2="633.8" y2="311.7"/><line x1="623.0" y1="337.0" x2="636.9" y2="335.8"/></g>
      <circle cx="360" cy="360" r="248" fill="none" stroke="rgba(255,255,255,.14)" stroke-width="1"/>
      <circle cx="360" cy="360" r="232" fill="none" stroke="rgba(255,255,255,.1)" stroke-width="1" stroke-dasharray="2 6"/>
      <g fill="#2a2a2a" stroke="rgba(255,255,255,.3)" stroke-width="1.2"><circle cx="530.4" cy="530.4" r="5"/><circle cx="189.6" cy="530.4" r="5"/><circle cx="189.6" cy="189.6" r="5"/><circle cx="530.4" cy="189.6" r="5"/></g>
    </g>
  </svg>`;
