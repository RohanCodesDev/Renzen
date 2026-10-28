---
name: ecommerce-frontend-design
description: >-
  Provides comprehensive design guidelines, aesthetic standards, color systems, typography tokens, bento-box layouts, glassmorphism, micro-interactions, and conversion-optimized UX patterns for creating high-end, award-winning Gen-Z and luxury e-commerce websites. Use whenever designing, styling, or auditing UI/UX components.
---

# E-Commerce Frontend Design & Aesthetic Excellence Guide

This skill defines the visual language, design system tokens, layout architectures, and interactive micro-experiences for creating modern, professional, high-conversion e-commerce applications (specifically the **Renzen / OrganiZ** Gen-Z premium tea, coffee, and organic food brand).

---

## 1. Brand Identity & Design Ethos

- **Brand Tone:** Unapologetic, fresh, earthy yet electric. A blend of streetwear hypebeast energy (Bewakoof / The Souled Store) with the refined minimalism and speed of modern SaaS (Linear, Raycast, Apple).
- **Core Principle:** Every pixel must convey tactile craft, warmth, and organic purity without feeling boring, dated, or traditional.
- **Rule of Visual Impact:** Wow the user within the first 3 seconds. Use rich contrast, playful stickers/badges, fluid hover animations, dynamic bento grids, and ambient atmospheric textures.

---

## 2. Color Palette & Harmonic Tokens

Always use semantic CSS custom properties defined in `globals.css`:

```css
:root {
  /* Warm Organic Foundations */
  --cream: #FFFDD0;             /* Primary soft background */
  --cream-dark: #F5EFC2;        /* Subtle contrast cream */
  --cream-light: #FFFEF5;       /* Card highlight / luminous cream */
  
  /* Deep Earth & Text */
  --brown-dark: #2C1E16;        /* High-contrast roast brown text & primary buttons */
  --brown-mid: #5C3D2E;         /* Secondary text, subtle borders */
  --brown-light: #8B5E3C;       /* Warm mocha accents */
  
  /* Vibrant Botanical Accents */
  --matcha: #74B72E;            /* Vibrant ceremonial matcha green */
  --matcha-dark: #4A7D1B;       /* Deep matcha for readable text & borders */
  --matcha-glow: rgba(116, 183, 46, 0.25);
  --matcha-surface: #F0FBE0;    /* Light matcha badge background */

  /* Energy CTAs & Drops */
  --orange: #FF5722;            /* Sunrise Orange CTA button & hot drops */
  --orange-dark: #D84315;       /* Dark orange active state */
  --orange-glow: rgba(255, 87, 34, 0.25);
  --orange-surface: #FDF0E6;    /* Soft peach badge background */

  /* Neutral & Glass Tokens */
  --white: #FFFFFF;
  --glass-bg: rgba(255, 253, 208, 0.72);
  --glass-border: rgba(44, 30, 22, 0.08);
  --glass-blur: blur(16px);
}
```

---

## 3. Typography & Hierarchy

- **Display & Headings:** `Outfit` or `Josefin Sans` (font-weight: 700 to 900). Chunky, editorial letter spacing (`-0.02em` to `-0.03em`), punchy line heights (`0.95` to `1.15`).
- **Body & Captions:** Clean geometric sans (e.g., `Plus Jakarta Sans`, `Inter`, `Josefin Sans`). Font weights: 400 for regular prose, 500-600 for labels, prices, and interactive items.
- **Accent Cursive / Editorial Touch:** `Great Vibes` or `Playfair Display Italic` sparingly for one-word accents (e.g., *Savour.*, *The Tea Collection.*).
- **Scale:**
  - `display-xl`: `clamp(3.5rem, 8vw, 7rem)` — Hero statement
  - `display-lg`: `clamp(2.4rem, 5vw, 4.5rem)` — Section titles
  - `display-md`: `clamp(1.6rem, 3.5vw, 2.5rem)` — Bento / Feature headings
  - `text-label`: `0.75rem`, uppercase, letter-spacing `0.15em`, weight 700.

---

## 4. Bento Box Grid Architecture

Bento grids deliver structured visual hierarchy that showcases media, stats, and CTAs simultaneously.

### Grid Anatomy:
1. **Hero Headline Cell (Spans 2 cols, 2 rows):**
   - High-contrast typography with typewriter or kinetic text.
   - Primary and secondary Magnetic CTAs.
2. **Featured Media Cell (Tall / Portrait):**
   - High-resolution hero imagery or looping video.
   - Pinned floating glass badge (`Matcha Ceremony`, `Harvest 2025`).
3. **Dynamic Stat Cells:**
   - Bold numbers (`50K+`, `4.9★`, `100% Organic`).
   - Micro-icon with gentle float or pulse animation.
4. **Trust & Proof Cell:**
   - Rapid-fire bullet stickers with micro-icons (Free Shipping, Eco Packaging, 7-Day Returns).

---

## 5. Micro-Interactions & Motion Design

1. **Magnetic Buttons:**
   - Buttons slightly attract towards the cursor on hover within a 30px radius.
   - Smooth transform reset on `mouseleave`.
2. **Product Card Hover Swaps:**
   - Default: Pristine product render or packaging shot.
   - Hover: Sensory lifestyle photo (e.g. pouring green matcha, steeping amber tea, freshly pulled espresso).
   - Instant "+ Quick Add" floating bar with feedback animation.
3. **Cart Drawer Micro-Delights:**
   - Smooth slide-in from right (`translateX(0)` with cubic-bezier `(0.16, 1, 0.3, 1)`).
   - **Free Shipping Progress Bar:** Dynamic meter calculating `₹[500 - total]` remaining for free shipping.
   - **Cart Bump Animation:** Navbar cart badge scales to 1.35 and bounces down when an item is added.
   - **Sound & Haptics / Toast:** Floating toast pill informing the user with category icon and quick "View Cart" action.
4. **Infinite Marquee Ticker:**
   - Seamless dual-track infinite scroll ticker separating sections.
   - Streetwear aesthetic with alternating badges (🔥 FRESH HARVEST • 🍵 CEREMONIAL GRADE • ⚡ DIRECT FROM FARMS).

---

## 6. E-Commerce UX Checklist for Every Page

- [ ] **Sticky Glass Navbar:** Backdrop blur, logo, nav links with active indicator, live cart counter, search trigger, mobile hamburger.
- [ ] **Mobile Drawer Navigation:** Full overlay navigation for viewports `< 768px` so mobile users can navigate all collections effortlessly.
- [ ] **Quick View / Modal:** Instant modal view showing flavor profile, tasting notes, brewing temperature, and direct add-to-cart without page jump.
- [ ] **Cart Persistence:** Automatically synchronizes cart state with `localStorage` so items survive page reloads.
- [ ] **Coupon & Discount Engine:** Interactive code validation (e.g., `RENZEN20` applies 20% discount with instant visual celebration).
- [ ] **Zero Dead Ends:** Every link in Navbar, Footer, and Category cards must lead to a functioning, richly designed page.
- [ ] **Resilient Mock Fallback:** When database connection is offline, seamlessly populate with high-fidelity, flavorful product mock datasets.
