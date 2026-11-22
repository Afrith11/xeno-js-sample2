/**
 * BLUSH & THREAD - Main Application JavaScript
 * Controls Header, Navigation, Scroll Animations, Page Logic & Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileNav();
  initScrollReveals();
  initNewsletterForms();
  routePageLogic();
});

/**
 * Sticky Header Scroll State
 */
function initStickyHeader() {
  const headerWrapper = document.querySelector('.site-header-wrapper');
  if (!headerWrapper) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      headerWrapper.classList.add('is-scrolled');
    } else {
      headerWrapper.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * Mobile Navigation Drawer
 */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const drawer = document.getElementById('mobile-nav-drawer');
  if (!drawer) return;

  const backdrop = drawer.querySelector('.mobile-nav-backdrop');
  const closeBtn = drawer.querySelector('.mobile-nav-close-btn');
  const links = drawer.querySelectorAll('.mobile-nav-link');

  const openMenu = () => {
    drawer.classList.add('is-open');
    document.body.classList.add('blush-modal-open');
  };

  const closeMenu = () => {
    drawer.classList.remove('is-open');
    document.body.classList.remove('blush-modal-open');
  };

  if (toggleBtn) toggleBtn.addEventListener('click', openMenu);
  if (backdrop) backdrop.addEventListener('click', closeMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  links.forEach(link => link.addEventListener('click', closeMenu));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
      closeMenu();
    }
  });
}

/**
 * Scroll Reveal Animations (IntersectionObserver)
 */
function initScrollReveals() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback if observer not supported
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }
}

/**
 * Newsletter Form Submission with Validation
 */
function initNewsletterForms() {
  const forms = document.querySelectorAll('.newsletter-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.newsletter-input');
      const msg = form.parentElement.querySelector('.newsletter-msg');
      const email = input ? input.value.trim() : '';

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        if (msg) {
          msg.textContent = 'Please enter a valid email address.';
          msg.className = 'newsletter-msg error';
        }
        return;
      }

      // Simulate successful subscription
      input.value = '';
      if (msg) {
        msg.textContent = 'Welcome to the Blush & Thread Atelier. Your private note is on its way.';
        msg.className = 'newsletter-msg success';
      }

      if (window.BlushUI) {
        BlushUI.showToast('Subscription Confirmed', 'You are now part of our private editorial salon.', 'success');
      }
    });
  });
}

/**
 * Reusable Product Card HTML Generator
 */
function generateProductCardHTML(product) {
  const isWishlisted = window.BlushWishlist ? BlushWishlist.isInWishlist(product.id) : false;
  const primaryImg = product.images && product.images[0] ? product.images[0] : '';

  return `
    <article class="product-card reveal-on-scroll" data-product-id="${product.id}">
      <div class="product-card-media">
        <a href="product.html?id=${product.id}" class="product-card-link" aria-label="View ${product.name}">
          <img src="${primaryImg}" alt="${product.name}" class="product-card-img" loading="lazy">
        </a>

        <!-- Badges -->
        <div class="product-badge-wrap">
          ${product.isNew ? '<span class="product-pill pill-rose">New Season</span>' : ''}
          ${product.isBestSeller ? '<span class="product-pill pill-champagne">Atelier Favorite</span>' : ''}
        </div>

        <!-- Wishlist Button -->
        <button type="button" class="product-wishlist-btn ${isWishlisted ? 'is-active' : ''}" 
                data-action="toggle-wishlist" 
                data-product-id="${product.id}" 
                data-wishlist-id="${product.id}"
                aria-label="${isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>

        <!-- Quick Action Overlay -->
        <div class="product-quick-actions">
          <button type="button" class="action-btn-quick" data-action="quick-view" data-product-id="${product.id}">
            Quick View
          </button>
          <button type="button" class="action-btn-quick" data-action="quick-add" data-product-id="${product.id}">
            + Quick Add
          </button>
        </div>
      </div>

      <div class="product-card-body">
        <span class="product-category-tag">${product.categoryName}</span>
        <h3 class="product-title">
          <a href="product.html?id=${product.id}">${product.name}</a>
        </h3>

        <!-- Color Swatch Dots -->
        <div class="product-colors-preview">
          ${(product.colors || []).map(c => `
            <span class="color-dot" style="background-color: ${c.hex};" title="${c.name}"></span>
          `).join('')}
        </div>

        <div class="product-price-row">
          <span class="product-price">${formatPriceINR(product.price)}</span>
          ${product.originalPrice ? `<span class="product-original-price">${formatPriceINR(product.originalPrice)}</span>` : ''}
        </div>
      </div>
    </article>
  `;
}

/**
 * Route-specific logic based on page
 */
function routePageLogic() {
  const path = window.location.pathname.toLowerCase();

  if (document.getElementById('home-new-arrivals-grid')) {
    initHomePage();
  } else if (document.getElementById('shop-products-grid')) {
    initShopPage();
  } else if (document.getElementById('new-arrivals-page-grid')) {
    initNewArrivalsPage();
  } else if (document.getElementById('pdp-container')) {
    initProductDetailPage();
  } else if (document.getElementById('cart-items-container')) {
    initCartPage();
  } else if (document.getElementById('collection-page')) {
    initCollectionPage();
  } else if (document.getElementById('contact-form')) {
    initContactPage();
  }
}

/**
 * 1. Home Page Initialization
 */
function initHomePage() {
  const container = document.getElementById('home-new-arrivals-grid');
  if (!container || typeof BLUSH_PRODUCTS === 'undefined') return;

  // Curate 6 products for the homepage
  const newArrivals = BLUSH_PRODUCTS.filter(p => p.isNew).slice(0, 4);
  const bestSellers = BLUSH_PRODUCTS.filter(p => p.isBestSeller && !p.isNew).slice(0, 2);
  const featured = [...newArrivals, ...bestSellers];

  container.innerHTML = featured.map(p => generateProductCardHTML(p)).join('');
  initScrollReveals();
}

/**
 * 2. Shop All Page Initialization
 */
function initShopPage() {
  const grid = document.getElementById('shop-products-grid');
  const countEl = document.getElementById('shop-results-count');
  const activeTagsContainer = document.getElementById('active-filters-tags');
  const filterPills = document.querySelectorAll('.filter-pill');
  const sortSelect = document.getElementById('shop-sort-select');

  if (!grid || typeof BLUSH_PRODUCTS === 'undefined') return;

  // Parse URL query params
  const urlParams = new URLSearchParams(window.location.search);
  let activeCategory = urlParams.get('category') || 'all';
  let activeSort = 'featured';

  // Set active filter pill based on URL
  filterPills.forEach(pill => {
    if (pill.getAttribute('data-category') === activeCategory) {
      pill.classList.add('active');
    } else {
      pill.classList.remove('active');
    }

    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCategory = pill.getAttribute('data-category');
      applyFilters();
    });
  });

  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      activeSort = e.target.value;
      applyFilters();
    });
  }

  function applyFilters() {
    let items = [...BLUSH_PRODUCTS];

    // Filter by Category
    if (activeCategory !== 'all') {
      items = items.filter(p => p.category === activeCategory);
    }

    // Sort Items
    if (activeSort === 'price-low') {
      items.sort((a, b) => a.price - b.price);
    } else if (activeSort === 'price-high') {
      items.sort((a, b) => b.price - a.price);
    } else if (activeSort === 'newest') {
      items.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    } else if (activeSort === 'rating') {
      items.sort((a, b) => b.rating - a.rating);
    }

    // Render count
    if (countEl) {
      countEl.textContent = `Showing ${items.length} curated design${items.length === 1 ? '' : 's'}`;
    }

    // Active tags
    if (activeTagsContainer) {
      if (activeCategory !== 'all') {
        const catName = items[0] ? items[0].categoryName : activeCategory;
        activeTagsContainer.innerHTML = `
          <span class="filter-count-label">Active Filter:</span>
          <span class="active-filter-pill">
            ${catName}
            <button type="button" id="clear-cat-filter" aria-label="Clear filter">&times;</button>
          </span>
        `;
        document.getElementById('clear-cat-filter').onclick = () => {
          activeCategory = 'all';
          filterPills.forEach(p => {
            if (p.getAttribute('data-category') === 'all') p.classList.add('active');
            else p.classList.remove('active');
          });
          applyFilters();
        };
      } else {
        activeTagsContainer.innerHTML = '';
      }
    }

    // Render Grid
    if (items.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;">
          <h3 style="font-family: var(--font-serif); font-size: 1.85rem; color: var(--color-deep-burgundy); margin-bottom: 0.5rem;">No Designs Found</h3>
          <p style="color: var(--color-charcoal-muted);">Try selecting another category or clear your active filters.</p>
        </div>
      `;
    } else {
      grid.innerHTML = items.map(p => generateProductCardHTML(p)).join('');
    }

    initScrollReveals();
  }

  applyFilters();
}

/**
 * 3. New Arrivals Page Initialization
 */
function initNewArrivalsPage() {
  const grid = document.getElementById('new-arrivals-page-grid');
  const countEl = document.getElementById('new-arrivals-count');
  const filterPills = document.querySelectorAll('.new-arrivals-pill');

  if (!grid || typeof BLUSH_PRODUCTS === 'undefined') return;

  let activeCategory = 'all';

  function renderNewArrivals() {
    let items = BLUSH_PRODUCTS.filter(p => p.isNew);

    if (activeCategory !== 'all') {
      items = items.filter(p => p.category === activeCategory);
    }

    if (countEl) {
      countEl.textContent = `${items.length} Silhouettes in this Drop`;
    }

    grid.innerHTML = items.map(p => generateProductCardHTML(p)).join('');
    initScrollReveals();
  }

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCategory = pill.getAttribute('data-category');
      renderNewArrivals();
    });
  });

  renderNewArrivals();
}

/**
 * 4. Product Detail Page (product.html)
 */
function initProductDetailPage() {
  const container = document.getElementById('pdp-container');
  if (!container || typeof BLUSH_PRODUCTS === 'undefined') return;

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id') || 'bt-01';
  const product = getProductById(productId);

  // Update Page Title
  document.title = `${product.name} | BLUSH & THREAD Atelier`;

  // Breadcrumbs & Metadata
  const breadcrumbName = document.getElementById('pdp-breadcrumb-name');
  if (breadcrumbName) breadcrumbName.textContent = product.name;

  // Main Image & Thumbs
  const mainImg = document.getElementById('pdp-main-image');
  const thumbsRow = document.getElementById('pdp-thumbs-row');

  if (mainImg) {
    mainImg.src = product.images[0];
    mainImg.alt = product.name;
  }

  if (thumbsRow) {
    thumbsRow.innerHTML = product.images.map((img, idx) => `
      <button type="button" class="pdp-thumb-btn ${idx === 0 ? 'active' : ''}" data-index="${idx}">
        <img src="${img}" alt="${product.name} angle ${idx + 1}">
      </button>
    `).join('');

    thumbsRow.querySelectorAll('.pdp-thumb-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        thumbsRow.querySelectorAll('.pdp-thumb-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const idx = btn.getAttribute('data-index');
        mainImg.src = product.images[idx];
      });
    });
  }

  // Header and pricing
  document.getElementById('pdp-category-name').textContent = product.categoryName;
  document.getElementById('pdp-title').textContent = product.name;
  document.getElementById('pdp-subtitle').textContent = product.subtitle;
  document.getElementById('pdp-price').textContent = formatPriceINR(product.price);

  const origPriceEl = document.getElementById('pdp-original-price');
  if (origPriceEl) {
    if (product.originalPrice) {
      origPriceEl.textContent = formatPriceINR(product.originalPrice);
      origPriceEl.style.display = 'inline';
    } else {
      origPriceEl.style.display = 'none';
    }
  }

  document.getElementById('pdp-desc-text').textContent = product.description;

  // Swatches
  const swatchesRow = document.getElementById('pdp-color-swatches');
  const selectedColorName = document.getElementById('pdp-selected-color-name');
  let chosenColor = product.colors[0].name;

  if (swatchesRow) {
    selectedColorName.textContent = chosenColor;
    swatchesRow.innerHTML = product.colors.map((c, i) => `
      <button type="button" class="pdp-swatch-btn ${i === 0 ? 'active' : ''}" 
              style="background-color: ${c.hex};" 
              data-color="${c.name}" 
              title="${c.name}">
      </button>
    `).join('');

    swatchesRow.querySelectorAll('.pdp-swatch-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        swatchesRow.querySelectorAll('.pdp-swatch-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        chosenColor = btn.getAttribute('data-color');
        selectedColorName.textContent = chosenColor;
      });
    });
  }

  // Sizes
  const sizesRow = document.getElementById('pdp-sizes-row');
  const selectedSizeName = document.getElementById('pdp-selected-size-name');
  let chosenSize = product.sizes[0];

  if (sizesRow) {
    selectedSizeName.textContent = chosenSize;
    sizesRow.innerHTML = product.sizes.map((s, i) => `
      <button type="button" class="pdp-size-btn ${i === 0 ? 'active' : ''}" data-size="${s}">
        ${s}
      </button>
    `).join('');

    sizesRow.querySelectorAll('.pdp-size-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        sizesRow.querySelectorAll('.pdp-size-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        chosenSize = btn.getAttribute('data-size');
        selectedSizeName.textContent = chosenSize;
      });
    });
  }

  // Quantity stepper
  const qtyInput = document.getElementById('pdp-qty-val');
  const decBtn = document.getElementById('pdp-qty-dec');
  const incBtn = document.getElementById('pdp-qty-inc');

  if (decBtn && qtyInput) {
    decBtn.onclick = () => {
      let val = parseInt(qtyInput.value, 10) || 1;
      qtyInput.value = Math.max(1, val - 1);
    };
  }

  if (incBtn && qtyInput) {
    incBtn.onclick = () => {
      let val = parseInt(qtyInput.value, 10) || 1;
      qtyInput.value = Math.min(10, val + 1);
    };
  }

  // Add to Bag Button
  const addBtn = document.getElementById('pdp-add-bag-btn');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      const qty = parseInt(qtyInput ? qtyInput.value : 1, 10) || 1;
      addBtn.innerHTML = `ADDING TO BAG...`;
      addBtn.disabled = true;

      setTimeout(() => {
        BlushCart.addToCart(product.id, chosenSize, chosenColor, qty);
        addBtn.innerHTML = `ADDED TO BAG ✓`;
        setTimeout(() => {
          addBtn.innerHTML = `ADD TO SHOPPING BAG`;
          addBtn.disabled = false;
        }, 1500);
      }, 350);
    });
  }

  // Wishlist Action Button
  const wishlistBtn = document.getElementById('pdp-wishlist-toggle');
  if (wishlistBtn) {
    const updateWishlistBtnState = () => {
      const inList = BlushWishlist.isInWishlist(product.id);
      if (inList) {
        wishlistBtn.classList.add('is-active');
        wishlistBtn.setAttribute('title', 'Remove from Wishlist');
      } else {
        wishlistBtn.classList.remove('is-active');
        wishlistBtn.setAttribute('title', 'Add to Wishlist');
      }
    };
    updateWishlistBtnState();

    wishlistBtn.addEventListener('click', () => {
      BlushWishlist.toggleWishlist(product.id);
      updateWishlistBtnState();
    });
  }

  // Accordion Details Injection
  const craftList = document.getElementById('pdp-craft-details-list');
  if (craftList && product.details) {
    craftList.innerHTML = product.details.map(d => `<li>✦ ${d}</li>`).join('');
  }

  // Accordions Click Toggles
  document.querySelectorAll('.pdp-accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.pdp-accordion-item');
      item.classList.toggle('is-open');
    });
  });

  // Related Products
  const relatedGrid = document.getElementById('related-products-grid');
  if (relatedGrid) {
    const related = BLUSH_PRODUCTS.filter(p => p.id !== product.id && (p.category === product.category || p.isBestSeller)).slice(0, 4);
    relatedGrid.innerHTML = related.map(p => generateProductCardHTML(p)).join('');
  }

  initScrollReveals();
}

/**
 * 5. Cart Page (cart.html)
 */
function initCartPage() {
  const itemsContainer = document.getElementById('cart-items-container');
  const countEl = document.getElementById('cart-page-count');
  const subtotalEl = document.getElementById('cart-subtotal-val');
  const shippingEl = document.getElementById('cart-shipping-val');
  const discountRow = document.getElementById('cart-discount-row');
  const discountEl = document.getElementById('cart-discount-val');
  const grandTotalEl = document.getElementById('cart-grand-total-val');
  const shippingMsg = document.getElementById('cart-shipping-progress-banner');
  const emptyState = document.getElementById('cart-empty-view');
  const filledState = document.getElementById('cart-filled-view');
  const couponInput = document.getElementById('cart-coupon-input');
  const applyCouponBtn = document.getElementById('apply-coupon-btn');
  const couponStatus = document.getElementById('coupon-status-msg');

  let appliedDiscountRate = 0; // percentage
  let appliedDiscountFixed = 0; // fixed INR

  // Check persisted coupon
  const savedCoupon = localStorage.getItem('blush_thread_coupon');
  if (savedCoupon === 'BLUSH10') {
    appliedDiscountRate = 0.10;
  } else if (savedCoupon === 'WELCOME') {
    appliedDiscountFixed = 500;
  }

  function renderCartPage() {
    const cart = BlushCart.getCart();
    const count = BlushCart.getItemCount();
    const subtotal = BlushCart.getSubtotal();

    if (countEl) countEl.textContent = count;

    if (cart.length === 0) {
      if (emptyState) emptyState.style.display = 'block';
      if (filledState) filledState.style.display = 'none';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';
    if (filledState) filledState.style.display = 'grid';

    // Render Items
    itemsContainer.innerHTML = cart.map(item => `
      <div class="cart-item-row" data-cart-item-id="${item.cartItemId}">
        <div class="cart-item-thumbnail">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-details">
          <span class="product-category-tag">${item.categoryName}</span>
          <h3 class="cart-item-title"><a href="product.html?id=${item.productId}">${item.name}</a></h3>
          <p class="cart-item-meta">Size: <strong>${item.size}</strong> · Color: <strong>${item.color}</strong></p>
          <div class="cart-item-pricing-stepper">
            <div class="pdp-qty-stepper">
              <button type="button" class="qty-btn" onclick="BlushCart.updateQuantity('${item.cartItemId}', ${item.quantity - 1})">-</button>
              <span class="qty-val">${item.quantity}</span>
              <button type="button" class="qty-btn" onclick="BlushCart.updateQuantity('${item.cartItemId}', ${item.quantity + 1})">+</button>
            </div>
            <button type="button" class="cart-item-remove-link" onclick="BlushCart.removeFromCart('${item.cartItemId}')">
              Remove
            </button>
          </div>
        </div>
        <div class="cart-item-total-col">
          <span class="cart-item-price-val">${formatPriceINR(item.price * item.quantity)}</span>
          <span style="font-size:0.75rem; color:var(--color-charcoal-light);">(${formatPriceINR(item.price)} each)</span>
        </div>
      </div>
    `).join('');

    // Shipping calculation
    const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
    const shippingFee = isFreeShipping ? 0 : STANDARD_SHIPPING_FEE;

    if (shippingEl) {
      shippingEl.textContent = isFreeShipping ? 'FREE' : formatPriceINR(shippingFee);
      if (isFreeShipping) shippingEl.style.color = '#2F6948';
      else shippingEl.style.color = 'inherit';
    }

    // Shipping progress banner
    if (shippingMsg) {
      if (isFreeShipping) {
        shippingMsg.innerHTML = `
          <div class="shipping-progress unlocked" style="background-color: var(--color-blush-tint); padding: 1rem 1.5rem; border: 1px solid var(--border-rose);">
            ✦ Congratulations! You have unlocked <strong>Complimentary Express Delivery</strong>.
          </div>
        `;
      } else {
        const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
        const pct = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
        shippingMsg.innerHTML = `
          <div class="shipping-progress" style="background-color: var(--color-ivory-warm); padding: 1rem 1.5rem; border: 1px solid var(--border-subtle);">
            <p>Add <strong>${formatPriceINR(remaining)}</strong> more to your bag to enjoy <strong>Free Express Delivery</strong></p>
            <div class="progress-track" style="margin-top:0.5rem;"><div class="progress-fill" style="width: ${pct}%;"></div></div>
          </div>
        `;
      }
    }

    // Calculate discount
    let discountAmount = 0;
    if (appliedDiscountRate > 0) {
      discountAmount = Math.round(subtotal * appliedDiscountRate);
    } else if (appliedDiscountFixed > 0) {
      discountAmount = Math.min(subtotal, appliedDiscountFixed);
    }

    if (discountRow && discountEl) {
      if (discountAmount > 0) {
        discountRow.style.display = 'flex';
        discountEl.textContent = `-${formatPriceINR(discountAmount)}`;
      } else {
        discountRow.style.display = 'none';
      }
    }

    // Totals
    if (subtotalEl) subtotalEl.textContent = formatPriceINR(subtotal);
    const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);
    if (grandTotalEl) grandTotalEl.textContent = formatPriceINR(grandTotal);
  }

  // Coupon handling
  if (applyCouponBtn && couponInput) {
    applyCouponBtn.addEventListener('click', () => {
      const code = couponInput.value.trim().toUpperCase();
      if (!code) return;

      if (code === 'BLUSH10') {
        appliedDiscountRate = 0.10;
        appliedDiscountFixed = 0;
        localStorage.setItem('blush_thread_coupon', 'BLUSH10');
        couponStatus.textContent = '10% privilege discount applied to your order.';
        couponStatus.style.color = '#2F6948';
      } else if (code === 'WELCOME') {
        appliedDiscountFixed = 500;
        appliedDiscountRate = 0;
        localStorage.setItem('blush_thread_coupon', 'WELCOME');
        couponStatus.textContent = '₹500 welcome gift voucher applied.';
        couponStatus.style.color = '#2F6948';
      } else {
        couponStatus.textContent = 'Invalid promo code. Try "BLUSH10" or "WELCOME".';
        couponStatus.style.color = '#B22222';
      }
      renderCartPage();
    });
  }

  // Listen to cart events
  window.addEventListener('blush:cart-updated', renderCartPage);

  // Initialize
  renderCartPage();

  // Checkout Modal Trigger
  const checkoutTrigger = document.getElementById('start-checkout-btn');
  const checkoutModal = document.getElementById('checkout-demo-modal');
  if (checkoutTrigger && checkoutModal) {
    checkoutTrigger.addEventListener('click', () => {
      checkoutModal.classList.add('is-open');
      document.body.classList.add('blush-modal-open');
    });

    const closeBtn = checkoutModal.querySelector('[data-action="close-checkout"]');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        checkoutModal.classList.remove('is-open');
        document.body.classList.remove('blush-modal-open');
      });
    }

    // Checkout Form Submission
    const checkoutForm = document.getElementById('demo-checkout-form');
    if (checkoutForm) {
      checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const orderId = 'BT-' + Math.floor(100000 + Math.random() * 900000);
        const orderSummaryModal = document.getElementById('checkout-success-view');

        if (orderSummaryModal) {
          document.getElementById('confirmed-order-id').textContent = orderId;
          document.getElementById('checkout-step-form').style.display = 'none';
          orderSummaryModal.style.display = 'block';
          BlushCart.clearCart();
        }
      });
    }
  }
}

/**
 * 6. Collection Page Hotspots & Gallery
 */
function initCollectionPage() {
  const pins = document.querySelectorAll('.hotspot-pin');
  pins.forEach(pin => {
    pin.addEventListener('click', (e) => {
      e.stopPropagation();
      const productId = pin.getAttribute('data-product-id');
      if (productId && window.BlushUI) {
        BlushUI.openQuickView(productId);
      }
    });
  });
}

/**
 * 7. Contact & Concierge Inquiry Page
 */
function initContactPage() {
  const form = document.getElementById('contact-form');
  const statusMsg = document.getElementById('contact-form-status');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();

    if (!name || !email || !message) {
      if (statusMsg) {
        statusMsg.textContent = 'Please fill out all required details.';
        statusMsg.style.color = '#B22222';
      }
      return;
    }

    // Success response
    form.reset();
    if (statusMsg) {
      statusMsg.textContent = 'Thank you, our boutique concierge will connect with you within 24 hours.';
      statusMsg.style.color = '#2F6948';
    }

    if (window.BlushUI) {
      BlushUI.showToast('Inquiry Received', 'Your consultation request has been forwarded to our stylists.', 'success');
    }
  });

  // FAQ Accordion
  document.querySelectorAll('.faq-accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.faq-accordion-item');
      item.classList.toggle('is-open');
    });
  });
}
