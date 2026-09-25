import React from 'react';
import Image from 'next/image';
import ProductCard, { Product } from './ProductCard';
import styles from './TeaProducts.module.css';

// ─── DATA: Easily editable by the user ─────────────────────────────────────
const TEA_CATEGORIES = [
  {
    title: 'Darjeeling First Flush',
    products: [
      {
        id: 101,
        name: 'Spring Blossom First Flush',
        subtitle: 'Light, floral, and brisk with classic muscatel notes.',
        price: 499,
        originalPrice: 650,
        image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600&q=80',
        hoverImage: 'https://images.unsplash.com/photo-1576092762791-dd9e2220d9f4?w=600&q=80',
        badge: 'Best Seller 👑',
        badgeType: 'matcha',
        category: 'Tea',
      }
    ]
  },
  {
    title: 'Darjeeling Second Flush',
    products: [
      {
        id: 102,
        name: 'Summer Muscatel',
        subtitle: 'Rich, full-bodied with a pronounced fruity aroma.',
        price: 549,
        image: 'https://images.unsplash.com/photo-1582787019808-01e4a2c5a2c9?w=600&q=80',
        badge: 'New 🍃',
        badgeType: 'orange',
        category: 'Tea',
      }
    ]
  },
  {
    title: 'Darjeeling Autumn Flush',
    products: [
      {
        id: 103,
        name: 'Autumn Gold',
        subtitle: 'Smooth, mellow, and coppery bright.',
        price: 449,
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80',
        category: 'Tea',
      }
    ]
  },
  {
    title: 'Darjeeling Green Tea',
    products: [
      {
        id: 104,
        name: 'Emerald Green Estate',
        subtitle: 'Unoxidized, fresh and grassy with high antioxidants.',
        price: 399,
        image: 'https://images.unsplash.com/photo-1627492275512-4eb349924c29?w=600&q=80',
        badge: 'Organic 🌿',
        badgeType: 'matcha',
        category: 'Tea',
      }
    ]
  },
  {
    title: 'Fruity & Floral Teas',
    products: [
      {
        id: 105,
        name: 'Rose & Hibiscus Infusion',
        subtitle: 'Caffeine-free botanical blend with tart cherry notes.',
        price: 499,
        originalPrice: 599,
        image: 'https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?w=600&q=80',
        badge: 'Popular ❤️',
        badgeType: 'orange',
        category: 'Tea',
      }
    ]
  }
];

export default function TeaProducts() {
  return (
    <div className={styles.container}>
      {TEA_CATEGORIES.map((cat, index) => (
        <React.Fragment key={cat.title}>
          <div className={styles.categorySection}>
            <h2 className={styles.categoryTitle}>{cat.title}</h2>
            
            <div className={styles.productGrid}>
              {cat.products.map(p => (
                <ProductCard key={p.id} product={p as Product} />
              ))}
              {cat.products.length === 0 && (
                <p className={styles.emptyText}>More products coming soon...</p>
              )}
            </div>
          </div>

        </React.Fragment>
      ))}
    </div>
  );
}
