import React, { useState, useEffect } from 'react';
import { Crown, Flame, Leaf, Heart, Star, Sparkles, Sprout, Coffee } from 'lucide-react';
import ProductCard, { Product } from './ProductCard';
import styles from './CoffeeProducts.module.css';

// --- DATA ---
const COFFEE_CATEGORIES = [
  {
    title: 'Agglomerated',
    description: 'Instant coffee with a rich aroma and bold flavour, perfect for a quick and satisfying cup.',
    products: [],
  },
  {
    title: 'Freeze Dried',
    description: 'Premium instant coffee that preserves the delicate flavours and aromas of fresh beans.',
    products: [],
  },
  {
    title: 'Spray',
    description: 'Classic spray-dried instant coffee, smooth and soluble for everyday enjoyment.',
    products: [],
  },
  {
    title: 'Flavoured',
    description: 'Deliciously infused coffees featuring hints of hazelnut, vanilla, caramel, and more.',
    products: [],
  }
];

export default function CoffeeProducts() {
  const [expandedCats, setExpandedCats] = useState<Record<string, boolean>>({});
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          setProducts(data.filter((p: Product) => p.category === 'Coffee'));
        }
      } catch (err) {
        console.error('Failed to fetch coffees', err);
      }
    };
    fetchProducts();
  }, []);

  // Map products to categories
  const categoriesWithProducts = COFFEE_CATEGORIES.map(cat => ({
    ...cat,
    products: products.filter(p => p.subCategory === cat.title || (!p.subCategory && cat.title === 'Spray'))
  }));

  const toggleViewAll = (title: string) => {
    setExpandedCats(prev => ({ ...prev, [title]: !prev[title] }));
  };

  const scrollToCategory = (title: string) => {
    const el = document.getElementById(`coffee-cat-${title.replace(/\s+/g, '-')}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className={styles.container}>
      <div className={styles.navScroll}>
        {categoriesWithProducts.map(cat => (
          <button
            key={cat.title}
            onClick={() => scrollToCategory(cat.title)}
            className={styles.navPill}
          >
            {cat.title}
          </button>
        ))}
      </div>

      {categoriesWithProducts.map((cat, index) => {
        const isExpanded = expandedCats[cat.title];
        const displayedProducts = isExpanded ? cat.products : cat.products.slice(0, 3);
        return (
          <React.Fragment key={cat.title}>
            <div id={`coffee-cat-${cat.title.replace(/\s+/g, '-')}`} className={styles.categorySection}>
              <div className={styles.categoryHeaderWrapper}>
                <div className={styles.categoryHeaderTop}>
                  <h2 className={styles.categoryTitle}>{cat.title}</h2>
                  {cat.products.length > 3 && (
                    <button className={styles.viewAllBtn} onClick={() => toggleViewAll(cat.title)}>
                      {isExpanded ? 'View Less' : 'View All'}
                    </button>
                  )}
                </div>
                {cat.description && <p className={styles.categoryDesc}>{cat.description}</p>}
              </div>
              <div className={isExpanded ? styles.productGridExpanded : styles.productGrid}>
                {displayedProducts.map(p => (
                  <ProductCard key={p.id} product={p as Product} />
                ))}
                {cat.products.length === 0 && <p className={styles.emptyText}>More products coming soon...</p>}
              </div>
            </div>
            {index < categoriesWithProducts.length - 1 && (
              <div className={styles.dividerWrapper}><div className={styles.dividerLine} /></div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
