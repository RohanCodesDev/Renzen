# Frontend Aesthetic & Engineering Guidelines

1. **Aesthetic Excellence (Gen-Z & Luxury E-Commerce):**
   - Base Palette: `#FFFDD0` (Light Cream), `#2C1E16` (Roast Espresso), `#74B72E` (Matcha), `#FF5722` (Sunrise Orange).
   - Never produce dull, generic, or default bootstrap-like interfaces. Use glassmorphism, soft drop shadows, subtle grain/noise overlays, and bold typography.
   - Use Google Fonts (`Outfit`, `Plus Jakarta Sans`, `Josefin Sans`, and `Great Vibes` for cursive highlights).

2. **Zero Dead Links:**
   - Every link in header, footer, product grid, and banners must resolve to a fully styled, functional page.
   - Implement `/organics`, `/bundles`, `/journal`, `/product/[id]`, `/checkout`, and `/our-story`.

3. **Data Resilience & Fallback:**
   - Always fallback to curated data in `@/data/products.ts` if PostgreSQL or Prisma is unavailable, ensuring the store renders flawlessly.
   - Persist Cart and Wishlist to `localStorage`.

4. **Component Architecture:**
   - Use Vanilla CSS Modules (`*.module.css`) for localized styling without Tailwind conflicts.
   - Keep components modular, accessible, and performant.
