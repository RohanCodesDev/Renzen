---
name: progressive-refactoring-workflow
description: >-
  Provides a structured, safe, step-by-step workflow for progressively refactoring, modularizing, and expanding e-commerce codebases. Use when executing large-scale structural improvements, adding missing routes, establishing data fallbacks, or modernizing component architecture.
---

# Progressive Refactoring & Architecture Workflow

This skill outlines the progressive refactoring strategy for transforming the **Renzen** codebase into an enterprise-grade, polished, and maintainable web application without regressions or breaking changes.

---

## 1. Core Principles

1. **Incremental Refinement:** Never break existing working features while introducing new capabilities. Test changes at each step.
2. **Resilient Data Architecture:**
   - Real e-commerce apps must remain fully functional even if PostgreSQL or external APIs are unreachable during local dev or client demonstrations.
   - Implement an intelligent hybrid data layer: Attempt to query database/API first; if empty or offline, seamlessly fallback to rich, statically typed mock datasets (`@/data/products.ts`).
3. **Route Completeness:** Eliminate all 404 dead ends across the entire application (Navbar, Hero buttons, Category grid, Product cards, Footer links).
4. **State Persistence:** Ensure critical user state (Shopping Cart, Wishlist, Applied Coupons, User Preferences) seamlessly persists to `localStorage`.

---

## 2. Refactoring Phases

### Phase 1: Foundation & Data Resilience
- Audit `package.json` and ensure all dependencies install cleanly.
- Verify fonts and design tokens in `globals.css`.
- Update `@/data/products.ts` with comprehensive catalog items across all categories:
  - Teas (Darjeeling First Flush, Summer Muscatel, Jasmine Green, Kashmiri Kahwa)
  - Coffees (Ethiopian Yirgacheffe, Malabar Monsoon, Hazelnut Cold Brew)
  - Organics (Wild Forest Honey, Chia Seeds, A2 Desi Ghee, Stoneground Spices)
  - Bundles (Morning Zen Ritual Set, Immunity Booster Pack, Cold Brew Starter Kit)
- Update API routes (`/api/products`, etc.) and page loaders so they gracefully fallback to mock data if Prisma cannot connect to PostgreSQL.

### Phase 2: Route Completion & Core Pages
Implement all missing pages with cohesive, high-aesthetic layouts:
- `/organics` — Organics & Superfoods collection with filter pills and origin badges.
- `/bundles` — Curated gift boxes and subscription bundles with savings callouts.
- `/journal` — Editorial wellness & brewing articles with rich reading layout.
- `/product/[id]` — Dynamic product detail page with image gallery, flavor notes, brewing guide, quantity picker, reviews, and related products.
- `/checkout` — Streamlined 2-step checkout with coupon code application, address collection, and simulated payment modes (UPI, Cards, Cash on Delivery).
- `/our-story` — Brand heritage, ethical sourcing pledge, farmer partnerships, and sustainability mission.

### Phase 3: Interactive Polish & Micro-Delights
- **Cart Drawer Upgrade:** Free shipping progress bar, quantity stepper, coupon input, direct checkout CTA.
- **Search Modal:** Fast live client-side fuzzy search across all products with thumbnail previews.
- **Quick View Modal:** Instant preview modal on product cards.
- **Mobile Navigation Drawer:** Responsive slide-out menu with all collection links and social handles.
- **Aesthetic Refinement:** Smooth spring animations, magnetic CTAs, floating stickers, and toast feedback.

### Phase 4: Validation & Quality Control
- Validate TypeScript compilation (`npm run build` or `npx tsc --noEmit`).
- Verify responsive layout on mobile, tablet, and desktop viewports.
- Confirm zero console errors or hydration mismatches.
