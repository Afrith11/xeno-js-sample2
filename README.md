# BLUSH & THREAD
## Premium Contemporary Women's Fashion Boutique

> *"DRESSED IN YOUR OWN BEAUTY."*

A luxury contemporary women's fashion ecommerce website crafted in pure **HTML5**, **CSS3**, and **Vanilla JavaScript (ES6+)**. Designed to reflect a high-end international boutique blending authentic Indian handloom textiles (Chanderi silk, Banarasi brocade, Jamdani) with modern global tailoring and fluid architectural silhouettes.

---

## 1. Brand Identity & Color System

- **Dusty Rose**: `#C58F96` (Primary accent, highlights & tags)
- **Warm Ivory**: `#F8F4EF` (Base atmosphere & editorial background)
- **Soft Blush**: `#EAD5D3` (Subtle card surfaces & badge backgrounds)
- **Champagne**: `#C5AD91` (Metallic accents, borders & dividers)
- **Deep Burgundy**: `#542D39` (Primary editorial typography & announcement strip)
- **Warm Charcoal**: `#35302F` (Soft body typography & icons)

### Typography
- **Headings & Display**: *Cormorant Garamond* (Editorial Serif)
- **Navigation, Buttons & Body**: *Plus Jakarta Sans* (Modern Sans-serif)
- **Editorial Signatures**: *Alex Brush* (Calligraphy Script)

---

## 2. Architecture & Pages

| Page | File | Description |
|------|------|-------------|
| **Homepage** | `index.html` | Editorial split hero, category discovery, new arrivals grid, brand campaign, signature collection, brand story, testimonials, newsletter. |
| **Shop All** | `shop.html` | Complete catalog of 16 designs with live category filtering, sorting (price, newest, rating), and active filter tags. |
| **New Arrivals** | `new-arrivals.html` | Dedicated seasonal capsule drop showcase with category filters and atelier promise highlights. |
| **Collections** | `collection.html` | Interactive lookbook featuring clickable hotspot pins ("Shop the Look") with garment previews. |
| **Product Details** | `product.html` | Multi-angle image gallery, color swatches, size selectors, quantity stepper, accordions for specifications and care, and related recommendations. |
| **About Us** | `about.html` | Brand philosophy ("MADE FOR THE WAY YOU FEEL"), artisan craft pillars, ethics, and Founder's note. |
| **Contact & Salons** | `contact.html` | Flagship boutique addresses (Bangalore & Mumbai), appointment booking form with validation, and client FAQ accordion. |
| **Shopping Bag** | `cart.html` | Working cart with quantity updates, promo code vouchers (`BLUSH10` for 10% off, `WELCOME` for ₹500 off), free shipping progress bar, and complete demo checkout modal. |

---

## 3. Frontend Features & Functionality

1. **Header & Navigation**:
   - **Top Announcement Strip**: Центered announcement bar in Deep Burgundy (`#542D39`).
   - **3-Column Desktop Grid (`1fr auto 1fr`)**: Mathematically centres the brand logo relative to the viewport while keeping left menu links and right utility icons balanced.
   - **Sticky Navigation**: Soft blur backdrop and compact height transition on scroll.
   - **Slide-out Mobile Drawer**: Accessible drawer menu with background scroll lock and Escape key dismiss.

2. **Commerce & Persistence**:
   - **Persistent Cart**: Stored in `localStorage` (`blush_thread_cart_v1`).
   - **Persistent Wishlist**: Stored in `localStorage` (`blush_thread_wishlist_v1`) with real-time heart active states.
   - **Live Header Badges**: Dynamic item counters for cart and wishlist across all pages.
   - **Quick Bag Drawer**: Slide-out cart accessible from any page.
   - **Quick View Modal**: Rapid product inspection without leaving the page.
   - **Global Search Overlay**: Instant live search querying titles, categories, materials, and tags.
   - **Voucher Validation**: Supports `BLUSH10` (10% discount) and `WELCOME` (₹500 gift voucher).
   - **Demo Checkout Flow**: Multi-step checkout with address validation, payment selector (UPI, Card, COD), and generated Order ID receipt.

---

## 4. Project Structure

```
blush-and-thread/
├── index.html
├── shop.html
├── new-arrivals.html
├── collection.html
├── product.html
├── about.html
├── contact.html
├── cart.html
├── vercel.json
├── README.md
└── assets/
    ├── css/
    │   ├── style.css
    │   └── responsive.css
    ├── js/
    │   ├── products.js
    │   ├── cart.js
    │   └── main.js
    └── images/
```

---

## 5. Deployment

### Vercel (Recommended)
1. Push this repository to GitHub or run `vercel` in the project root.
2. Vercel automatically detects the static HTML/CSS/JS site and deploys instantly.

### Local Development
Run any static file server:
```bash
# Using Python:
python -m http.server 3000

# Using Node.js:
npx serve .
```
Visit `http://localhost:3000` in your browser.
