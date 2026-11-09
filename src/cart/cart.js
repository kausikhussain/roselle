import { SHADES } from '../data/shades.js';

export class CartManager {
  constructor() {
    this.items = [];
    this.promoCode = 'BF30';
    this.discountRate = 0.30;
    this.promoApplied = true;
    this.subscribers = [];
    this.load();
  }

  load() {
    try {
      const saved = localStorage.getItem('roselle_cart');
      if (saved) {
        this.items = JSON.parse(saved);
      } else {
        // Initial sample item for instant delight
        this.items = [
          { shade: SHADES[0], qty: 1 }
        ];
      }
    } catch (e) {
      this.items = [{ shade: SHADES[0], qty: 1 }];
    }
  }

  save() {
    try {
      localStorage.setItem('roselle_cart', JSON.stringify(this.items));
    } catch (e) {}
    this.notify();
  }

  subscribe(callback) {
    this.subscribers.push(callback);
    callback(this.getState());
  }

  notify() {
    const state = this.getState();
    this.subscribers.forEach(cb => cb(state));
    window.dispatchEvent(new CustomEvent('roselle:cart-updated', { detail: state }));
  }

  addItem(shade, qty = 1) {
    const existing = this.items.find(i => i.shade.id === shade.id);
    if (existing) {
      existing.qty += qty;
    } else {
      this.items.push({ shade, qty });
    }
    this.save();
    this.openDrawer();
  }

  removeItem(shadeId) {
    this.items = this.items.filter(i => i.shade.id !== shadeId);
    this.save();
  }

  updateQty(shadeId, delta) {
    const item = this.items.find(i => i.shade.id === shadeId);
    if (item) {
      item.qty += delta;
      if (item.qty <= 0) {
        this.removeItem(shadeId);
      } else {
        this.save();
      }
    }
  }

  applyPromo(code) {
    if (code.trim().toUpperCase() === 'BF30') {
      this.promoApplied = true;
      this.discountRate = 0.30;
      this.notify();
      return { success: true, message: '30% Black Friday VIP discount applied!' };
    }
    return { success: false, message: 'Invalid promo code. Try "BF30"' };
  }

  getState() {
    const totalCount = this.items.reduce((acc, i) => acc + i.qty, 0);
    const originalSubtotal = this.items.reduce((acc, i) => acc + (i.shade.originalPrice * i.qty), 0);
    const subtotal = this.items.reduce((acc, i) => acc + (i.shade.price * i.qty), 0);
    const discountAmount = originalSubtotal - subtotal;
    const shipping = subtotal > 50 || subtotal === 0 ? 0 : 7.50;
    const total = subtotal + shipping;

    return {
      items: this.items,
      totalCount,
      originalSubtotal,
      subtotal,
      discountAmount,
      shipping,
      total,
      promoApplied: this.promoApplied
    };
  }

  openDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-backdrop');
    if (drawer && overlay) {
      drawer.classList.add('open');
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  closeDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-backdrop');
    if (drawer && overlay) {
      drawer.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  clear() {
    this.items = [];
    this.save();
  }
}

export function initCartUI(cart) {
  const badge = document.getElementById('nav-bag-count');
  const drawerItems = document.getElementById('drawer-items-list');
  const drawerSubtotal = document.getElementById('drawer-subtotal');
  const drawerDiscount = document.getElementById('drawer-discount');
  const drawerTotal = document.getElementById('drawer-total');
  const drawerFreeShip = document.getElementById('drawer-freeship-progress');
  const drawerShipLabel = document.getElementById('drawer-ship-label');

  function render(state) {
    if (badge) {
      badge.textContent = state.totalCount;
      badge.style.display = state.totalCount > 0 ? 'flex' : 'none';
    }

    if (drawerItems) {
      if (state.items.length === 0) {
        drawerItems.innerHTML = `
          <div class="empty-cart-state">
            <div class="empty-cart-icon">🛍️</div>
            <h4>Your Vanity is Empty</h4>
            <p>Select your signature Roselle formulation from the atelier.</p>
          </div>
        `;
      } else {
        drawerItems.innerHTML = state.items.map(item => `
          <div class="cart-item-row" data-id="${item.shade.id}">
            <div class="cart-item-swatch" style="background: ${item.shade.color};"></div>
            <div class="cart-item-info">
              <div class="cart-item-head">
                <h4 class="cart-item-title">${item.shade.name}</h4>
                <span class="cart-item-price">$${(item.shade.price * item.qty).toFixed(2)}</span>
              </div>
              <div class="cart-item-meta">
                <span>Shade ${item.shade.id} · ${item.shade.finish}</span>
                <span class="strikethrough">$${(item.shade.originalPrice * item.qty).toFixed(2)}</span>
              </div>
              <div class="cart-item-controls">
                <div class="qty-counter">
                  <button class="qty-btn" data-action="dec" data-id="${item.shade.id}">−</button>
                  <span class="qty-num">${item.qty}</span>
                  <button class="qty-btn" data-action="inc" data-id="${item.shade.id}">+</button>
                </div>
                <button class="cart-remove-btn" data-id="${item.shade.id}">Remove</button>
              </div>
            </div>
          </div>
        `).join('');

        // Event listeners for item buttons
        drawerItems.querySelectorAll('.qty-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const action = btn.getAttribute('data-action');
            cart.updateQty(id, action === 'inc' ? 1 : -1);
          });
        });

        drawerItems.querySelectorAll('.cart-remove-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            cart.removeItem(id);
          });
        });
      }
    }

    if (drawerSubtotal) drawerSubtotal.textContent = `$${state.originalSubtotal.toFixed(2)}`;
    if (drawerDiscount) drawerDiscount.textContent = `-$${state.discountAmount.toFixed(2)}`;
    if (drawerTotal) drawerTotal.textContent = `$${state.total.toFixed(2)}`;

    // Free shipping threshold ($50)
    if (drawerFreeShip && drawerShipLabel) {
      const remaining = Math.max(0, 50 - state.subtotal);
      const pct = Math.min(100, (state.subtotal / 50) * 100);
      drawerFreeShip.style.width = `${pct}%`;
      if (remaining === 0) {
        drawerShipLabel.innerHTML = '✨ <strong>Complimentary Insured Courier & Gift Box</strong> Unlocked';
      } else {
        drawerShipLabel.innerHTML = `Add <strong>$${remaining.toFixed(2)}</strong> for Free Express Delivery`;
      }
    }
  }

  cart.subscribe(render);

  // Bag button toggle
  const navBag = document.getElementById('nav-bag-btn');
  if (navBag) {
    navBag.addEventListener('click', () => cart.openDrawer());
  }

  const closeBtn = document.getElementById('cart-close-btn');
  const backdrop = document.getElementById('cart-backdrop');
  if (closeBtn) closeBtn.addEventListener('click', () => cart.closeDrawer());
  if (backdrop) backdrop.addEventListener('click', () => cart.closeDrawer());

  // Listen for global add-to-bag events
  window.addEventListener('roselle:add-to-bag', (e) => {
    if (e.detail && e.detail.shade) {
      cart.addItem(e.detail.shade, e.detail.qty || 1);
    }
  });

  // Promo code form
  const promoBtn = document.getElementById('btn-apply-promo');
  const promoInput = document.getElementById('cart-promo-input');
  const promoMsg = document.getElementById('cart-promo-msg');
  if (promoBtn && promoInput && promoMsg) {
    promoBtn.addEventListener('click', () => {
      const res = cart.applyPromo(promoInput.value);
      promoMsg.textContent = res.message;
      promoMsg.className = `promo-msg ${res.success ? 'success' : 'error'}`;
    });
  }

  // Checkout modal trigger
  const checkoutBtn = document.getElementById('btn-checkout');
  const checkoutModal = document.getElementById('checkout-modal');
  const checkoutClose = document.getElementById('checkout-close');
  const checkoutForm = document.getElementById('checkout-form');
  const checkoutSuccess = document.getElementById('checkout-success');

  if (checkoutBtn && checkoutModal) {
    checkoutBtn.addEventListener('click', () => {
      cart.closeDrawer();
      checkoutModal.classList.add('open');
      if (checkoutForm) checkoutForm.style.display = 'block';
      if (checkoutSuccess) checkoutSuccess.style.display = 'none';
      const orderTotal = document.getElementById('modal-order-total');
      if (orderTotal) orderTotal.textContent = `$${cart.getState().total.toFixed(2)}`;
    });
  }

  if (checkoutClose && checkoutModal) {
    checkoutClose.addEventListener('click', () => checkoutModal.classList.remove('open'));
  }

  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      checkoutForm.style.display = 'none';
      if (checkoutSuccess) checkoutSuccess.style.display = 'block';
      cart.clear();
    });
  }
}

