import { SHADES } from '../data/shades.js';

export const SKIN_TONES = [
  { id: 'fair', name: 'Fair 01', hex: '#F8D8C9', undertone: 'Cool Rose' },
  { id: 'light', name: 'Light 02', hex: '#EFCAB4', undertone: 'Warm Peach' },
  { id: 'medium', name: 'Medium 03', hex: '#D6A685', undertone: 'Golden Honey' },
  { id: 'tan', name: 'Tan 04', hex: '#BA8059', undertone: 'Warm Amber' },
  { id: 'deep', name: 'Deep 05', hex: '#875135', undertone: 'Rich Bronze' },
  { id: 'rich', name: 'Rich 06', hex: '#452218', undertone: 'Deep Cocoa' }
];

export function initTryOn(container, onShadeSelect3D) {
  let activeSkin = SKIN_TONES[1]; // default light
  let activeShade = SHADES[0]; // default Cherry Kiss

  const markup = `
    <div class="tryon-grid">
      <!-- Left: Photoreal Lip SVG & Arm Swatch -->
      <div class="tryon-visual-wrap">
        <div class="tryon-stage-frame">
          <svg id="tryon-svg" viewBox="0 0 500 500" class="tryon-svg">
            <defs>
              <!-- Skin noise/pore filter -->
              <filter id="skin-grain" x="0%" y="0%" width="100%" height="100%">
                <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" result="noise" />
                <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.07 0" />
                <feBlend in="SourceGraphic" mode="multiply" />
              </filter>

              <!-- Lip creasing texture -->
              <filter id="lip-creases">
                <feTurbulence type="fractalNoise" baseFrequency="0.08 0.4" numOctaves="2" result="creaseNoise" />
                <feDisplacementMap in="SourceGraphic" in2="creaseNoise" scale="3" xChannelSelector="R" yChannelSelector="G" />
              </filter>

              <!-- Dynamic Skin Gradient -->
              <radialGradient id="skin-gradient" cx="50%" cy="50%" r="55%">
                <stop offset="0%" id="skin-stop-center" stop-color="${activeSkin.hex}" stop-opacity="1" />
                <stop offset="100%" id="skin-stop-edge" stop-color="#C28B67" stop-opacity="0.9" />
              </radialGradient>

              <!-- Dynamic Lip Base Gradient -->
              <linearGradient id="lip-base-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" id="lip-base-top" stop-color="${activeShade.color}" stop-opacity="0.95" />
                <stop offset="100%" id="lip-base-bot" stop-color="${activeShade.color}" stop-opacity="0.85" />
              </linearGradient>

              <!-- Specular Gloss Highlight -->
              <linearGradient id="gloss-grad" x1="15%" y1="0%" x2="85%" y2="100%">
                <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.75" />
                <stop offset="45%" stop-color="#FFFFFF" stop-opacity="0.1" />
                <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.0" />
              </linearGradient>
            </defs>

            <!-- Face / Chin Canvas Base -->
            <rect width="500" height="500" fill="url(#skin-gradient)" filter="url(#skin-grain)" />

            <!-- Soft Philtrum and Chin Shadow Shading -->
            <path d="M 230 110 Q 250 145 270 110" stroke="rgba(0,0,0,0.06)" stroke-width="14" fill="none" stroke-linecap="round" />
            <path d="M 242 120 L 244 190 M 258 120 L 256 190" stroke="rgba(255,255,255,0.18)" stroke-width="3" stroke-linecap="round" />
            
            <!-- Chin crease shadow -->
            <path d="M 200 375 Q 250 395 300 375" stroke="rgba(0,0,0,0.08)" stroke-width="8" fill="none" stroke-linecap="round" />

            <!-- Group: Lips with realistic creasing -->
            <g id="lips-group" filter="url(#lip-creases)">
              <!-- Upper Lip -->
              <path id="upper-lip"
                d="M 120 250 
                   C 160 215, 210 200, 238 215 
                   C 246 220, 250 226, 250 226 
                   C 250 226, 254 220, 262 215 
                   C 290 200, 340 215, 380 250 
                   C 340 262, 290 256, 262 254
                   C 254 253, 250 255, 250 255
                   C 250 255, 246 253, 238 254
                   C 210 256, 160 262, 120 250 Z"
                fill="url(#lip-base-grad)"
              />

              <!-- Lower Lip -->
              <path id="lower-lip"
                d="M 120 250
                   C 160 262, 210 254, 250 255
                   C 290 254, 340 262, 380 250
                   C 365 315, 315 348, 250 348
                   C 185 348, 135 315, 120 250 Z"
                fill="url(#lip-base-grad)"
              />

              <!-- Center Oral Aperture Shadow Line -->
              <path d="M 122 250 C 180 260, 220 253, 250 256 C 280 253, 320 260, 378 250"
                stroke="rgba(40,5,10,0.75)" stroke-width="2.5" fill="none" stroke-linecap="round" />
            </g>

            <!-- Anatomical Vertical Lip Creases / Fine Micro-Lines -->
            <g opacity="0.35" stroke="rgba(0,0,0,0.3)" stroke-width="1.2" stroke-linecap="round">
              <path d="M 190 230 L 192 248" />
              <path d="M 215 224 L 217 251" />
              <path d="M 235 220 L 235 253" />
              <path d="M 265 220 L 265 253" />
              <path d="M 285 224 L 283 251" />
              <path d="M 310 230 L 308 248" />
              <!-- Lower lip creases -->
              <path d="M 180 260 L 185 310" />
              <path d="M 210 260 L 212 328" />
              <path d="M 235 260 L 236 338" />
              <path d="M 250 262 L 250 340" />
              <path d="M 265 260 L 264 338" />
              <path d="M 290 260 L 288 328" />
              <path d="M 320 260 L 315 310" />
            </g>

            <!-- Specular Highlights & Velvet Finish Layer -->
            <g id="gloss-layer">
              <!-- Lower Lip Volume Plump Highlight -->
              <ellipse cx="250" cy="295" rx="55" ry="18" fill="url(#gloss-grad)" opacity="0.5" />
              <!-- Cupid's Bow Highlight Sparkle -->
              <path d="M 238 214 Q 250 220 262 214" stroke="rgba(255,255,255,0.6)" stroke-width="2" fill="none" />
              <circle cx="238" cy="215" r="2.5" fill="rgba(255,255,255,0.7)" />
              <circle cx="262" cy="215" r="2.5" fill="rgba(255,255,255,0.7)" />
            </g>
          </svg>

          <!-- Arm Swatch Floating Badge -->
          <div class="arm-swatch-chip">
            <span class="swatch-chip-label">Live Arm Swatch</span>
            <div class="swatch-smear-bar" id="arm-swatch-smear" style="background: ${activeShade.color};">
              <div class="swatch-shine"></div>
            </div>
            <span class="swatch-skin-tag" id="arm-skin-label">${activeSkin.name}</span>
          </div>
        </div>
      </div>

      <!-- Right: Selectors & Product Details -->
      <div class="tryon-panel">
        <div class="tryon-header">
          <span class="luxury-eyebrow">Virtual Shade Concierge</span>
          <h3 class="tryon-title" id="tryon-shade-name">${activeShade.name}</h3>
          <p class="tryon-desc" id="tryon-shade-desc">${activeShade.tagline}</p>
        </div>

        <!-- Metric badges -->
        <div class="tryon-metrics">
          <div class="metric-pill">
            <span class="m-label">Finish</span>
            <span class="m-val" id="tryon-finish">${activeShade.finish}</span>
          </div>
          <div class="metric-pill">
            <span class="m-label">Formulation</span>
            <span class="m-val" id="tryon-ing">${activeShade.ingredients.split(',')[0]}</span>
          </div>
          <div class="metric-pill">
            <span class="m-label">Sale Price</span>
            <span class="m-val highlight" id="tryon-price">$${activeShade.price.toFixed(2)}</span>
          </div>
        </div>

        <!-- 1. Skin Tone Selector -->
        <div class="selector-section">
          <div class="selector-head">
            <label class="selector-title">Select Skin Tone</label>
            <span class="selector-subtitle" id="selected-skin-name">${activeSkin.name} (${activeSkin.undertone})</span>
          </div>
          <div class="skin-tone-row">
            ${SKIN_TONES.map(s => `
              <button class="skin-dot ${s.id === activeSkin.id ? 'active' : ''}" 
                data-skin-id="${s.id}" 
                style="background: ${s.hex};"
                title="${s.name} - ${s.undertone}">
              </button>
            `).join('')}
          </div>
        </div>

        <!-- 2. Shade Pills -->
        <div class="selector-section">
          <div class="selector-head">
            <label class="selector-title">Choose Formulation Shade</label>
            <span class="selector-subtitle" id="selected-shade-num">Shade ${activeShade.id} of 08</span>
          </div>
          <div class="shade-pills-grid">
            ${SHADES.map(sh => `
              <button class="shade-pill ${sh.id === activeShade.id ? 'active' : ''}" data-shade-id="${sh.id}">
                <span class="shade-pill-dot" style="background: ${sh.color};"></span>
                <span class="shade-pill-name">${sh.name}</span>
                <span class="shade-pill-finish">${sh.finish}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="tryon-actions">
          <button class="btn-luxury-primary" id="btn-see-in-3d">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
            See It In 3D Atelier
          </button>
          <button class="btn-luxury-secondary" id="btn-tryon-add-bag">
            Add to Bag · $${activeShade.price.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = markup;

  // Update visual SVG and DOM state
  function updateTryOn() {
    // Tween skin colors
    const skinStopCenter = document.getElementById('skin-stop-center');
    const skinStopEdge = document.getElementById('skin-stop-edge');
    if (skinStopCenter && skinStopEdge) {
      skinStopCenter.setAttribute('stop-color', activeSkin.hex);
      // Generate slightly deeper edge shade
      skinStopEdge.setAttribute('stop-color', adjustColor(activeSkin.hex, -30));
    }

    // Tween lip colors
    const lipBaseTop = document.getElementById('lip-base-top');
    const lipBaseBot = document.getElementById('lip-base-bot');
    if (lipBaseTop && lipBaseBot) {
      lipBaseTop.setAttribute('stop-color', activeShade.color);
      lipBaseBot.setAttribute('stop-color', adjustColor(activeShade.color, -20));
    }

    // Adjust gloss layer opacity based on finish
    const glossLayer = document.getElementById('gloss-layer');
    if (glossLayer) {
      if (activeShade.finish === 'Gloss') glossLayer.setAttribute('opacity', '1.0');
      else if (activeShade.finish === 'Satin') glossLayer.setAttribute('opacity', '0.65');
      else if (activeShade.finish === 'Cream') glossLayer.setAttribute('opacity', '0.5');
      else if (activeShade.finish === 'Velvet') glossLayer.setAttribute('opacity', '0.35');
      else glossLayer.setAttribute('opacity', '0.15'); // Matte
    }

    // Arm swatch
    const armSmear = document.getElementById('arm-swatch-smear');
    if (armSmear) armSmear.style.background = activeShade.color;

    const armSkinLabel = document.getElementById('arm-skin-label');
    if (armSkinLabel) armSkinLabel.textContent = `${activeSkin.name} · ${activeSkin.undertone}`;

    // Text labels
    document.getElementById('tryon-shade-name').textContent = activeShade.name;
    document.getElementById('tryon-shade-desc').textContent = activeShade.tagline;
    document.getElementById('tryon-finish').textContent = activeShade.finish;
    document.getElementById('tryon-ing').textContent = activeShade.ingredients.split(',')[0];
    document.getElementById('tryon-price').textContent = `$${activeShade.price.toFixed(2)}`;
    document.getElementById('selected-skin-name').textContent = `${activeSkin.name} (${activeSkin.undertone})`;
    document.getElementById('selected-shade-num').textContent = `Shade ${activeShade.id} of 08`;
    document.getElementById('btn-tryon-add-bag').textContent = `Add to Bag · $${activeShade.price.toFixed(2)}`;
  }

  // Event handlers
  container.querySelectorAll('.skin-dot').forEach(btn => {
    btn.addEventListener('click', (e) => {
      container.querySelectorAll('.skin-dot').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const skinId = btn.getAttribute('data-skin-id');
      activeSkin = SKIN_TONES.find(s => s.id === skinId) || SKIN_TONES[0];
      updateTryOn();
    });
  });

  container.querySelectorAll('.shade-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.shade-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const shadeId = btn.getAttribute('data-shade-id');
      activeShade = SHADES.find(s => s.id === shadeId) || SHADES[0];
      updateTryOn();
    });
  });

  const btn3D = container.querySelector('#btn-see-in-3d');
  if (btn3D) {
    btn3D.addEventListener('click', () => {
      if (onShadeSelect3D) {
        const shadeIndex = SHADES.findIndex(s => s.id === activeShade.id);
        onShadeSelect3D(shadeIndex);
      }
    });
  }

  const btnAddBag = container.querySelector('#btn-tryon-add-bag');
  if (btnAddBag) {
    btnAddBag.addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('roselle:add-to-bag', { detail: { shade: activeShade } }));
    });
  }

  return {
    setShade(shadeIndex) {
      activeShade = SHADES[shadeIndex] || SHADES[0];
      container.querySelectorAll('.shade-pill').forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-shade-id') === activeShade.id);
      });
      updateTryOn();
    }
  };
}

function adjustColor(col, amt) {
  let num = parseInt(col.replace('#', ''), 16);
  let r = (num >> 16) + amt;
  let b = ((num >> 8) & 0x00FF) + amt;
  let g = (num & 0x0000FF) + amt;
  return `#${(0x1000000 + (r < 255 ? (r < 1 ? 0 : r) : 255) * 0x10000 + (b < 255 ? (b < 1 ? 0 : b) : 255) * 0x100 + (g < 255 ? (g < 1 ? 0 : g) : 255)).toString(16).slice(1)}`;
}

