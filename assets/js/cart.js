/**
 * BLUSH & THREAD - Cart, Wishlist & Commerce Store
 * Premium Contemporary Women's Fashion Boutique
 */

const CART_STORAGE_KEY = 'blush_thread_cart_v1';
const WISHLIST_STORAGE_KEY = 'blush_thread_wishlist_v1';
const COUPON_STORAGE_KEY = 'blush_thread_applied_coupon';

// Shipping thresholds
const FREE_SHIPPING_THRESHOLD = 5000;
const STANDARD_SHIPPING_FEE = 250;

/**
 * Cart Manager
 */
const BlushCart = {
  getCart() {
    try {
      const data = localStorage.getItem(CART_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error loading cart:', e);
      return [];
    }
  },

  saveCart(cart) {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      this.updateBadges();
      window.dispatchEvent(new CustomEvent('blush:cart-updated', { detail: { cart } }));
    } catch (e) {
      console.error('Error saving cart:', e);
    }
  },

  addToCart(productId, size = 'M', colorName = null, quantity = 1, showToastNotification = true) {
    const product = typeof getProductById === 'function' ? getProductById(productId) : null;
    if (!product) return false;

    const chosenColor = colorName || (product.colors && product.colors[0] ? product.colors[0].name : 'Natural');
    const chosenSize = size || (product.sizes && product.sizes[0] ? product.sizes[0] : 'One Size');
    const cartItemId = `${product.id}_${chosenColor}_${chosenSize}`;

    let cart = this.getCart();
    const existingIndex = cart.findIndex(item => item.cartItemId === cartItemId);

    if (existingIndex > -1) {
      cart[existingIndex].quantity += Number(quantity);
    } else {
      cart.push({
        cartItemId: cartItemId,
        productId: product.id,
        name: product.name,
        subtitle: product.subtitle,
        categoryName: product.categoryName,
        price: product.price,
        image: product.images[0],
        color: chosenColor,
        size: chosenSize,
        quantity: Number(quantity)
      });
    }

    this.saveCart(cart);

    if (showToastNotification) {
      BlushUI.showToast(
        "Added to Bag",
        `${product.name} (${chosenSize} / ${chosenColor}) has been added.`,
        "success",
        { label: "View Bag", onClick: () => BlushUI.openQuickBag() }
      );
    }

    return true;
  },

  removeFromCart(cartItemId) {
    let cart = this.getCart();
    const removedItem = cart.find(item => item.cartItemId === cartItemId);
    cart = cart.filter(item => item.cartItemId !== cartItemId);
    this.saveCart(cart);

    if (removedItem) {
      BlushUI.showToast("Removed", `${removedItem.name} removed from your bag.`, "info");
    }
  },

  updateQuantity(cartItemId, newQty) {
    let cart = this.getCart();
    const itemIndex = cart.findIndex(item => item.cartItemId === cartItemId);

    if (itemIndex > -1) {
      const qty = parseInt(newQty, 10);
      if (qty <= 0) {
        this.removeFromCart(cartItemId);
        return;
      }
      cart[itemIndex].quantity = qty;
      this.saveCart(cart);
    }
  },

  clearCart() {
    localStorage.removeItem(CART_STORAGE_KEY);
    this.updateBadges();
    window.dispatchEvent(new CustomEvent('blush:cart-updated', { detail: { cart: [] } }));
  },

  getSubtotal() {
    const cart = this.getCart();
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },

  getItemCount() {
    const cart = this.getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
  },

  updateBadges() {
    const count = this.getItemCount();
    const badges = document.querySelectorAll('.cart-count-badge');
    badges.forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'inline-flex' : 'none';
      if (count > 0) {
        badge.classList.remove('badge-pop');
        void badge.offsetWidth; // force reflow
        badge.classList.add('badge-pop');
      }
    });

    const wishlistCount = BlushWishlist.getCount();
    const wBadges = document.querySelectorAll('.wishlist-count-badge');
    wBadges.forEach(badge => {
      badge.textContent = wishlistCount;
      badge.style.display = wishlistCount > 0 ? 'inline-flex' : 'none';
    });
  }
};

/**
 * Wishlist Manager
 */
const BlushWishlist = {
  getWishlist() {
    try {
      const data = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  saveWishlist(list) {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(list));
      BlushCart.updateBadges();
      window.dispatchEvent(new CustomEvent('blush:wishlist-updated', { detail: { wishlist: list } }));
    } catch (e) {
      console.error('Error saving wishlist:', e);
    }
  },

  isInWishlist(productId) {
    const list = this.getWishlist();
    return list.includes(productId);
  },

  toggleWishlist(productId) {
    let list = this.getWishlist();
    const product = typeof getProductById === 'function' ? getProductById(productId) : null;
    const isPresent = list.includes(productId);

    if (isPresent) {
      list = list.filter(id => id !== productId);
      this.saveWishlist(list);
      BlushUI.showToast("Removed from Wishlist", product ? product.name : "Item removed from saved list.", "info");
    } else {
      list.push(productId);
      this.saveWishlist(list);
      BlushUI.showToast("Saved to Wishlist", product ? product.name : "Item saved to your wishlist.", "success", {
        label: "View Wishlist",
        onClick: () => BlushUI.openWishlistDrawer()
      });
    }

    this.updateHeartIcons();
    return !isPresent;
  },

  getCount() {
    return this.getWishlist().length;
  },

  updateHeartIcons() {
    const list = this.getWishlist();
    document.querySelectorAll('[data-wishlist-id]').forEach(btn => {
      const id = btn.getAttribute('data-wishlist-id');
      if (list.includes(id)) {
        btn.classList.add('is-active');
        btn.setAttribute('aria-label', 'Remove from wishlist');
      } else {
        btn.classList.remove('is-active');
        btn.setAttribute('aria-label', 'Add to wishlist');
      }
    });
  }
};

/**
 * UI Overlays (Quick Bag Drawer, Wishlist Drawer, Quick View, Toast, Search)
 */
const BlushUI = {
  init() {
    this.injectOverlayDOM();
    this.bindGlobalEvents();
    BlushCart.updateBadges();
    BlushWishlist.updateHeartIcons();
  },

  injectOverlayDOM() {
    // Quick Bag Drawer
    if (!document.getElementById('quick-bag-drawer')) {
      const drawer = document.createElement('div');
      drawer.id = 'quick-bag-drawer';
      drawer.className = 'blush-drawer-overlay';
      drawer.innerHTML = `
        <div class="blush-drawer-backdrop" data-action="close-bag"></div>
        <div class="blush-drawer-panel" role="dialog" aria-modal="true" aria-label="Shopping Bag">
          <div class="blush-drawer-header">
            <div>
              <span class="drawer-eyebrow">YOUR ATELIER SELECTION</span>
              <h3 class="drawer-title">Shopping Bag (<span class="drawer-count">0</span>)</h3>
            </div>
            <button class="drawer-close-btn" data-action="close-bag" aria-label="Close Shopping Bag">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>

          <div class="drawer-shipping-notice" id="drawer-shipping-notice">
            <!-- Free shipping bar inserted dynamically -->
          </div>

          <div class="drawer-body" id="drawer-bag-items">
            <!-- Items rendered dynamically -->
          </div>

          <div class="drawer-footer" id="drawer-bag-footer">
            <div class="drawer-summary-row">
              <span class="summary-label">Estimated Subtotal</span>
              <span class="summary-value" id="drawer-subtotal">₹0</span>
            </div>
            <p class="drawer-tax-note">Taxes and express shipping calculated at checkout.</p>
            <div class="drawer-actions">
              <a href="cart.html" class="btn btn-secondary btn-full">VIEW FULL BAG</a>
              <button class="btn btn-primary btn-full" id="drawer-checkout-btn">PROCEED TO CHECKOUT</button>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(drawer);
    }

    // Wishlist Drawer
    if (!document.getElementById('wishlist-drawer')) {
      const wDrawer = document.createElement('div');
      wDrawer.id = 'wishlist-drawer';
      wDrawer.className = 'blush-drawer-overlay';
      wDrawer.innerHTML = `
        <div class="blush-drawer-backdrop" data-action="close-wishlist"></div>
        <div class="blush-drawer-panel" role="dialog" aria-modal="true" aria-label="Wishlist">
          <div class="blush-drawer-header">
            <div>
              <span class="drawer-eyebrow">SAVED SILHOUETTES</span>
              <h3 class="drawer-title">Your Wishlist (<span class="wishlist-drawer-count">0</span>)</h3>
            </div>
            <button class="drawer-close-btn" data-action="close-wishlist" aria-label="Close Wishlist">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
          <div class="drawer-body" id="drawer-wishlist-items">
            <!-- Wishlist items rendered dynamically -->
          </div>
        </div>
      `;
      document.body.appendChild(wDrawer);
    }

    // Quick View Modal
    if (!document.getElementById('quick-view-modal')) {
      const modal = document.createElement('div');
      modal.id = 'quick-view-modal';
      modal.className = 'blush-modal-overlay';
      modal.innerHTML = `
        <div class="blush-modal-backdrop" data-action="close-quickview"></div>
        <div class="blush-modal-container" role="dialog" aria-modal="true">
          <button class="modal-close-btn" data-action="close-quickview" aria-label="Close modal">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
          <div class="quickview-content" id="quickview-modal-body">
            <!-- Injected via renderQuickView -->
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    // Search Overlay
    if (!document.getElementById('search-overlay')) {
      const search = document.createElement('div');
      search.id = 'search-overlay';
      search.className = 'blush-search-overlay';
      search.innerHTML = `
        <div class="blush-search-backdrop" data-action="close-search"></div>
        <div class="blush-search-container">
          <div class="blush-search-header">
            <div class="search-input-wrap">
              <svg class="search-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/>
              </svg>
              <input type="text" id="global-search-input" placeholder="Search Chanderi silk, blazer dresses, palazzos..." autocomplete="off">
              <button class="search-clear-btn" id="search-clear-btn" aria-label="Clear search" style="display:none;">&times;</button>
            </div>
            <button class="search-close-btn" data-action="close-search" aria-label="Close search">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
          <div class="search-suggestions" id="search-suggestions">
            <span class="suggest-label">Trending Searches:</span>
            <div class="suggest-tags">
              <button class="suggest-tag" data-query="Chanderi">Chanderi Silk</button>
              <button class="suggest-tag" data-query="Dress">Midi Dresses</button>
              <button class="suggest-tag" data-query="Organza">Organza</button>
              <button class="suggest-tag" data-query="Blazer">Tailored Blazer</button>
              <button class="suggest-tag" data-query="Saree">Rose Gold Saree</button>
            </div>
          </div>
          <div class="search-results-area" id="search-results-area">
            <!-- Results rendered live -->
          </div>
        </div>
      `;
      document.body.appendChild(search);
    }

    // Toast Container
    if (!document.getElementById('blush-toast-container')) {
      const toastContainer = document.createElement('div');
      toastContainer.id = 'blush-toast-container';
      toastContainer.className = 'blush-toast-container';
      document.body.appendChild(toastContainer);
    }
  },

  bindGlobalEvents() {
    // Backdrop and close button delegation
    document.addEventListener('click', (e) => {
      const target = e.target.closest('[data-action]');
      if (!target) return;
      const action = target.getAttribute('data-action');

      if (action === 'open-bag') {
        e.preventDefault();
        this.openQuickBag();
      } else if (action === 'close-bag') {
        this.closeQuickBag();
      } else if (action === 'open-wishlist') {
        e.preventDefault();
        this.openWishlistDrawer();
      } else if (action === 'close-wishlist') {
        this.closeWishlistDrawer();
      } else if (action === 'open-search') {
        e.preventDefault();
        this.openSearchModal();
      } else if (action === 'close-search') {
        this.closeSearchModal();
      } else if (action === 'close-quickview') {
        this.closeQuickView();
      } else if (action === 'toggle-wishlist') {
        e.preventDefault();
        e.stopPropagation();
        const id = target.getAttribute('data-product-id');
        if (id) BlushWishlist.toggleWishlist(id);
      } else if (action === 'quick-add') {
        e.preventDefault();
        e.stopPropagation();
        const id = target.getAttribute('data-product-id');
        if (id) {
          const product = getProductById(id);
          const size = product.sizes ? product.sizes[0] : 'One Size';
          const color = product.colors ? product.colors[0].name : 'Default';
          BlushCart.addToCart(id, size, color, 1);
        }
      } else if (action === 'quick-view') {
        e.preventDefault();
        e.stopPropagation();
        const id = target.getAttribute('data-product-id');
        if (id) this.openQuickView(id);
      }
    });

    // Keyboard ESC to close any open modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeQuickBag();
        this.closeWishlistDrawer();
        this.closeQuickView();
        this.closeSearchModal();
      }
    });

    // Cart update event listener
    window.addEventListener('blush:cart-updated', () => {
      if (document.getElementById('quick-bag-drawer').classList.contains('is-open')) {
        this.renderQuickBag();
      }
    });

    // Wishlist update event listener
    window.addEventListener('blush:wishlist-updated', () => {
      if (document.getElementById('wishlist-drawer').classList.contains('is-open')) {
        this.renderWishlist();
      }
      BlushWishlist.updateHeartIcons();
    });

    // Search input live query
    const searchInput = document.getElementById('global-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        const clearBtn = document.getElementById('search-clear-btn');
        if (clearBtn) clearBtn.style.display = query ? 'block' : 'none';
        this.performLiveSearch(query);
      });

      const clearBtn = document.getElementById('search-clear-btn');
      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          searchInput.value = '';
          clearBtn.style.display = 'none';
          this.performLiveSearch('');
          searchInput.focus();
        });
      }
    }

    // Search suggestion tag click
    document.addEventListener('click', (e) => {
      const tag = e.target.closest('.suggest-tag');
      if (tag && searchInput) {
        const query = tag.getAttribute('data-query');
        searchInput.value = query;
        const clearBtn = document.getElementById('search-clear-btn');
        if (clearBtn) clearBtn.style.display = 'block';
        this.performLiveSearch(query);
      }
    });

    // Drawer checkout button click
    const checkoutBtn = document.getElementById('drawer-checkout-btn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        this.closeQuickBag();
        window.location.href = 'cart.html#checkout';
      });
    }
  },

  /**
   * Quick Bag Drawer Controls
   */
  openQuickBag() {
    this.renderQuickBag();
    const drawer = document.getElementById('quick-bag-drawer');
    if (drawer) {
      drawer.classList.add('is-open');
      document.body.classList.add('blush-modal-open');
    }
  },

  closeQuickBag() {
    const drawer = document.getElementById('quick-bag-drawer');
    if (drawer) {
      drawer.classList.remove('is-open');
      document.body.classList.remove('blush-modal-open');
    }
  },

  renderQuickBag() {
    const cart = BlushCart.getCart();
    const itemsContainer = document.getElementById('drawer-bag-items');
    const countEl = document.querySelector('.drawer-count');
    const subtotalEl = document.getElementById('drawer-subtotal');
    const shippingBar = document.getElementById('drawer-shipping-notice');
    const footerEl = document.getElementById('drawer-bag-footer');

    if (!itemsContainer) return;

    const itemCount = BlushCart.getItemCount();
    const subtotal = BlushCart.getSubtotal();

    if (countEl) countEl.textContent = itemCount;
    if (subtotalEl) subtotalEl.textContent = formatPriceINR(subtotal);

    // Free shipping progress calculation
    if (shippingBar) {
      if (subtotal >= FREE_SHIPPING_THRESHOLD) {
        shippingBar.innerHTML = `
          <div class="shipping-progress unlocked">
            <span class="shipping-icon">✦</span>
            <span>You have unlocked <strong>Complimentary Express Shipping!</strong></span>
          </div>
        `;
      } else {
        const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
        const percent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
        shippingBar.innerHTML = `
          <div class="shipping-progress">
            <p>Add <strong>${formatPriceINR(remaining)}</strong> more to enjoy <strong>Complimentary Express Delivery</strong></p>
            <div class="progress-track">
              <div class="progress-fill" style="width: ${percent}%;"></div>
            </div>
          </div>
        `;
      }
    }

    if (cart.length === 0) {
      itemsContainer.innerHTML = `
        <div class="drawer-empty-state">
          <div class="empty-icon-art">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#C58F96" stroke-width="1.2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
          </div>
          <h4 class="empty-title">Your shopping bag is empty</h4>
          <p class="empty-desc">Discover our curated silhouettes crafted in handloom silk, organza, and fine Italian crepe.</p>
          <a href="shop.html" class="btn btn-primary" onclick="BlushUI.closeQuickBag()">EXPLORE COLLECTION</a>
        </div>
      `;
      if (footerEl) footerEl.style.display = 'none';
      return;
    }

    if (footerEl) footerEl.style.display = 'block';

    itemsContainer.innerHTML = cart.map(item => `
      <div class="drawer-item" data-cart-item-id="${item.cartItemId}">
        <div class="drawer-item-img-wrap">
          <img src="${item.image}" alt="${item.name}" loading="lazy">
        </div>
        <div class="drawer-item-info">
          <div class="item-header-row">
            <h4 class="drawer-item-title"><a href="product.html?id=${item.productId}">${item.name}</a></h4>
            <button class="item-remove-btn" onclick="BlushCart.removeFromCart('${item.cartItemId}')" aria-label="Remove item">
              &times;
            </button>
          </div>
          <p class="drawer-item-meta">${item.size} · ${item.color}</p>
          <div class="drawer-item-pricing-row">
            <div class="drawer-qty-stepper">
              <button class="qty-btn" onclick="BlushCart.updateQuantity('${item.cartItemId}', ${item.quantity - 1})" aria-label="Decrease quantity">-</button>
              <span class="qty-val">${item.quantity}</span>
              <button class="qty-btn" onclick="BlushCart.updateQuantity('${item.cartItemId}', ${item.quantity + 1})" aria-label="Increase quantity">+</button>
            </div>
            <span class="drawer-item-price">${formatPriceINR(item.price * item.quantity)}</span>
          </div>
        </div>
      </div>
    `).join('');
  },

  /**
   * Wishlist Drawer Controls
   */
  openWishlistDrawer() {
    this.renderWishlist();
    const drawer = document.getElementById('wishlist-drawer');
    if (drawer) {
      drawer.classList.add('is-open');
      document.body.classList.add('blush-modal-open');
    }
  },

  closeWishlistDrawer() {
    const drawer = document.getElementById('wishlist-drawer');
    if (drawer) {
      drawer.classList.remove('is-open');
      document.body.classList.remove('blush-modal-open');
    }
  },

  renderWishlist() {
    const wishlistIds = BlushWishlist.getWishlist();
    const container = document.getElementById('drawer-wishlist-items');
    const countEl = document.querySelector('.wishlist-drawer-count');
    if (!container) return;

    if (countEl) countEl.textContent = wishlistIds.length;

    if (wishlistIds.length === 0) {
      container.innerHTML = `
        <div class="drawer-empty-state">
          <div class="empty-icon-art">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#C58F96" stroke-width="1.2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </div>
          <h4 class="empty-title">Your wishlist is empty</h4>
          <p class="empty-desc">Save your most coveted contemporary designs to revisit anytime.</p>
          <a href="shop.html" class="btn btn-primary" onclick="BlushUI.closeWishlistDrawer()">DISCOVER STYLES</a>
        </div>
      `;
      return;
    }

    const products = wishlistIds.map(id => getProductById(id)).filter(Boolean);

    container.innerHTML = products.map(p => `
      <div class="drawer-item wishlist-item">
        <div class="drawer-item-img-wrap">
          <img src="${p.images[0]}" alt="${p.name}" loading="lazy">
        </div>
        <div class="drawer-item-info">
          <div class="item-header-row">
            <h4 class="drawer-item-title"><a href="product.html?id=${p.id}">${p.name}</a></h4>
            <button class="item-remove-btn" onclick="BlushWishlist.toggleWishlist('${p.id}')" aria-label="Remove from wishlist">
              &times;
            </button>
          </div>
          <p class="drawer-item-meta">${p.categoryName}</p>
          <span class="drawer-item-price">${formatPriceINR(p.price)}</span>
          <div class="wishlist-actions">
            <button class="btn btn-sm btn-primary" onclick="BlushCart.addToCart('${p.id}', '${p.sizes[0]}', '${p.colors[0].name}', 1); BlushUI.closeWishlistDrawer(); BlushUI.openQuickBag();">
              MOVE TO BAG
            </button>
            <a href="product.html?id=${p.id}" class="btn btn-sm btn-secondary">VIEW DETAILS</a>
          </div>
        </div>
      </div>
    `).join('');
  },

  /**
   * Quick View Modal Controls
   */
  openQuickView(productId) {
    const product = getProductById(productId);
    if (!product) return;

    const modalBody = document.getElementById('quickview-modal-body');
    if (!modalBody) return;

    modalBody.innerHTML = `
      <div class="quickview-grid">
        <div class="quickview-gallery">
          <div class="quickview-main-image">
            <img id="qv-main-img" src="${product.images[0]}" alt="${product.name}">
          </div>
          <div class="quickview-thumbs">
            ${product.images.map((img, idx) => `
              <button class="qv-thumb ${idx === 0 ? 'active' : ''}" onclick="document.getElementById('qv-main-img').src='${img}'; document.querySelectorAll('.qv-thumb').forEach(t=>t.classList.remove('active')); this.classList.add('active');">
                <img src="${img}" alt="${product.name} view ${idx + 1}">
              </button>
            `).join('')}
          </div>
        </div>
        <div class="quickview-details">
          <span class="qv-category">${product.categoryName}</span>
          <h2 class="qv-title">${product.name}</h2>
          <p class="qv-subtitle">${product.subtitle}</p>
          <div class="qv-price-row">
            <span class="qv-price">${formatPriceINR(product.price)}</span>
            ${product.originalPrice ? `<span class="qv-original-price">${formatPriceINR(product.originalPrice)}</span>` : ''}
            <span class="qv-tax-note">Inclusive of all taxes</span>
          </div>

          <p class="qv-desc">${product.description}</p>

          <!-- Color Swatches -->
          <div class="qv-option-group">
            <label class="qv-label">Color: <span id="qv-selected-color">${product.colors[0].name}</span></label>
            <div class="qv-color-swatches" id="qv-colors">
              ${product.colors.map((c, i) => `
                <button type="button" class="swatch-btn ${i === 0 ? 'active' : ''}" data-color="${c.name}" style="background-color: ${c.hex};" title="${c.name}" onclick="document.querySelectorAll('.swatch-btn').forEach(b=>b.classList.remove('active')); this.classList.add('active'); document.getElementById('qv-selected-color').textContent='${c.name}';">
                  <span class="sr-only">${c.name}</span>
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Size Selector -->
          <div class="qv-option-group">
            <div class="qv-label-row">
              <label class="qv-label">Size: <span id="qv-selected-size">${product.sizes[0]}</span></label>
              <a href="product.html?id=${product.id}#size-guide" class="qv-size-link">Size Guide</a>
            </div>
            <div class="qv-size-selector" id="qv-sizes">
              ${product.sizes.map((s, i) => `
                <button type="button" class="size-pill ${i === 0 ? 'active' : ''}" data-size="${s}" onclick="document.querySelectorAll('.size-pill').forEach(b=>b.classList.remove('active')); this.classList.add('active'); document.getElementById('qv-selected-size').textContent='${s}';">
                  ${s}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Quantity and Add to Bag -->
          <div class="qv-actions-row">
            <div class="qv-qty-picker">
              <button type="button" class="qty-btn" onclick="let inp=document.getElementById('qv-qty-input'); inp.value=Math.max(1, parseInt(inp.value)-1);">-</button>
              <input type="number" id="qv-qty-input" value="1" min="1" max="10" readonly>
              <button type="button" class="qty-btn" onclick="let inp=document.getElementById('qv-qty-input'); inp.value=Math.min(10, parseInt(inp.value)+1);">+</button>
            </div>
            <button type="button" class="btn btn-primary btn-add-bag" id="qv-add-btn">
              ADD TO SHOPPING BAG
            </button>
          </div>

          <div class="qv-footer-links">
            <a href="product.html?id=${product.id}" class="qv-full-details-link">
              View Complete Product Specifications & Styling Guide &rarr;
            </a>
          </div>
        </div>
      </div>
    `;

    // Bind Add to Bag in quickview
    document.getElementById('qv-add-btn').onclick = () => {
      const activeColor = document.getElementById('qv-selected-color').textContent;
      const activeSize = document.getElementById('qv-selected-size').textContent;
      const qty = parseInt(document.getElementById('qv-qty-input').value, 10) || 1;
      BlushCart.addToCart(product.id, activeSize, activeColor, qty);
      this.closeQuickView();
      this.openQuickBag();
    };

    const modal = document.getElementById('quick-view-modal');
    modal.classList.add('is-open');
    document.body.classList.add('blush-modal-open');
  },

  closeQuickView() {
    const modal = document.getElementById('quick-view-modal');
    if (modal) {
      modal.classList.remove('is-open');
      document.body.classList.remove('blush-modal-open');
    }
  },

  /**
   * Global Search Modal Controls
   */
  openSearchModal() {
    const overlay = document.getElementById('search-overlay');
    const input = document.getElementById('global-search-input');
    if (overlay) {
      overlay.classList.add('is-open');
      document.body.classList.add('blush-modal-open');
      if (input) {
        setTimeout(() => input.focus(), 150);
      }
    }
  },

  closeSearchModal() {
    const overlay = document.getElementById('search-overlay');
    if (overlay) {
      overlay.classList.remove('is-open');
      document.body.classList.remove('blush-modal-open');
    }
  },

  performLiveSearch(query) {
    const resultsContainer = document.getElementById('search-results-area');
    if (!resultsContainer) return;

    if (!query || query.length < 2) {
      resultsContainer.innerHTML = '';
      return;
    }

    const q = query.toLowerCase();
    const matches = BLUSH_PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q) ||
      p.categoryName.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
    );

    if (matches.length === 0) {
      resultsContainer.innerHTML = `
        <div class="search-empty">
          <p>No silhouettes found matching "<strong>${query}</strong>".</p>
          <span class="search-hint">Try searching for <em>Chanderi</em>, <em>Blazer</em>, <em>Dress</em>, or <em>Silk</em>.</span>
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = `
      <div class="search-results-header">
        <span>Found ${matches.length} curated result${matches.length > 1 ? 's' : ''}</span>
      </div>
      <div class="search-results-grid">
        ${matches.map(p => `
          <div class="search-result-card">
            <a href="product.html?id=${p.id}" class="search-result-thumb">
              <img src="${p.images[0]}" alt="${p.name}" loading="lazy">
            </a>
            <div class="search-result-info">
              <span class="search-result-cat">${p.categoryName}</span>
              <h4 class="search-result-title"><a href="product.html?id=${p.id}">${p.name}</a></h4>
              <span class="search-result-price">${formatPriceINR(p.price)}</span>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  /**
   * Toast Notification System
   */
  showToast(title, message, type = 'info', action = null) {
    const container = document.getElementById('blush-toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `blush-toast blush-toast-${type}`;
    toast.innerHTML = `
      <div class="toast-indicator"></div>
      <div class="toast-body">
        <h5 class="toast-title">${title}</h5>
        <p class="toast-msg">${message}</p>
        ${action ? `<button class="toast-action-btn" type="button">${action.label}</button>` : ''}
      </div>
      <button class="toast-close-btn" aria-label="Close notification">&times;</button>
    `;

    if (action && action.onClick) {
      const btn = toast.querySelector('.toast-action-btn');
      if (btn) {
        btn.addEventListener('click', () => {
          action.onClick();
          toast.remove();
        });
      }
    }

    const closeBtn = toast.querySelector('.toast-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => toast.remove());
    }

    container.appendChild(toast);

    // Auto-remove after 4.5 seconds
    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 350);
    }, 4500);
  }
};

// Auto initialize on DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => BlushUI.init());
} else {
  BlushUI.init();
}
