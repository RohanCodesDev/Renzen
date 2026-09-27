import React, { useState } from 'react';
import { Crown, Flame, Leaf, Heart, Star, Sparkles, Sprout, Coffee } from 'lucide-react';
import ProductCard, { Product } from './ProductCard';
import styles from './CoffeeProducts.module.css';

// --- DATA ---
const COFFEE_CATEGORIES = [
  {
    title: 'Single Origin',
    description: 'Traceable, terroir-driven coffees sourced from one farm or cooperative — each cup tells a story.',
    products: [
      { id: 201, name: 'Ethiopian Yirgacheffe', subtitle: 'Bright blueberry & jasmine with a clean citrus finish.', price: 599, originalPrice: 749, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80', hoverImage: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=600&q=80', badge: 'Best Seller', badgeIcon: <Crown size={14} />, badgeType: 'matcha' as const, category: 'Coffee' },
      { id: 2012, name: 'Colombian Huila', subtitle: 'Caramel sweetness with red apple and light nuttiness.', price: 549, image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&q=80', category: 'Coffee' },
      { id: 2013, name: 'Kenyan AA', subtitle: 'Bold blackcurrant and tomato-like brightness.', price: 649, originalPrice: 799, image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&q=80', badge: 'Limited', badgeIcon: <Sparkles size={14} />, badgeType: 'cream' as const, category: 'Coffee' },
      { id: 2014, name: 'Guatemala Antigua', subtitle: 'Smooth chocolate and nutmeg on a full body.', price: 529, image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&q=80', category: 'Coffee' },
      { id: 2015, name: 'Panama Geisha', subtitle: 'Intensely floral, tea-like and silky smooth.', price: 999, image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80', badge: 'Rare', badgeIcon: <Star size={14} />, badgeType: 'cream' as const, category: 'Coffee' },
      { id: 2016, name: 'Brazil Cerrado', subtitle: 'Mild, nutty and low acidity — perfect everyday cup.', price: 449, image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&q=80', badge: 'New', badgeIcon: <Coffee size={14} />, badgeType: 'orange' as const, category: 'Coffee' },
    ],
  },
  {
    title: 'Cold Brew & Specialty',
    description: 'Slow-steeped and perfectly brewed for a rich, smooth coffee experience without the heat.',
    products: [
      { id: 202, name: 'Classic Cold Brew Concentrate', subtitle: 'Smooth, low acidity. Dilute 1:1 with water or milk.', price: 449, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80', badge: 'Popular', badgeIcon: <Heart size={14} />, badgeType: 'orange' as const, category: 'Coffee' },
      { id: 2022, name: 'Nitro Cold Brew', subtitle: 'Velvet smooth with a natural cream-like head.', price: 499, image: 'https://images.unsplash.com/photo-1545696968-1a31da406492?w=600&q=80', category: 'Coffee' },
      { id: 2023, name: 'Vanilla Cold Brew', subtitle: 'Classic cold brew kissed with real Madagascan vanilla.', price: 479, image: 'https://images.unsplash.com/photo-1488591216824-e45d7a5ae1e5?w=600&q=80', badge: 'New', badgeIcon: <Coffee size={14} />, badgeType: 'orange' as const, category: 'Coffee' },
      { id: 2024, name: 'Mocha Cold Brew', subtitle: 'Rich cacao notes blended into smooth cold brew.', price: 519, image: 'https://images.unsplash.com/photo-1527156231393-7023794f363c?w=600&q=80', category: 'Coffee' },
      { id: 2025, name: 'Spiced Cold Brew', subtitle: 'Cinnamon, cardamom & clove layered in cold brew.', price: 489, image: 'https://images.unsplash.com/photo-1485808191679-5f86510bd9a6?w=600&q=80', category: 'Coffee' },
      { id: 2026, name: 'Cold Brew RTD Pack', subtitle: '6-can variety pack for the week ahead.', price: 649, originalPrice: 799, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80', badge: 'Sale', badgeIcon: <Flame size={14} />, badgeType: 'orange' as const, category: 'Coffee' },
    ],
  },
  {
    title: 'Espresso Blends',
    description: 'Expertly balanced blends crafted for crema-rich espresso, flat whites and perfect cappuccinos.',
    products: [
      { id: 203, name: 'House Espresso Blend', subtitle: 'Dark chocolate, hazelnut and sweet crema finish.', price: 499, originalPrice: 599, image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=600&q=80', badge: 'Best Seller', badgeIcon: <Crown size={14} />, badgeType: 'matcha' as const, category: 'Coffee' },
      { id: 2032, name: 'Midnight Blend', subtitle: 'Deep, smoky and intensely bold — for the purists.', price: 549, image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&q=80', category: 'Coffee' },
      { id: 2033, name: 'Golden Ratio Blend', subtitle: 'Medium roast, balanced and crowd-pleasing.', price: 479, image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=600&q=80', category: 'Coffee' },
      { id: 2034, name: 'Velvet Crema Reserve', subtitle: 'Ethiopian + Brazilian blend with silky mouthfeel.', price: 629, originalPrice: 749, image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&q=80', badge: 'Popular', badgeIcon: <Heart size={14} />, badgeType: 'orange' as const, category: 'Coffee' },
      { id: 2035, name: 'Signature Ristretto Blend', subtitle: 'Dense, syrupy with intense dark cherry notes.', price: 579, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80', category: 'Coffee' },
      { id: 2036, name: 'Light Roast Espresso', subtitle: 'Floral and juicy — for the adventurous espresso lover.', price: 529, image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80', badge: 'New', badgeIcon: <Coffee size={14} />, badgeType: 'orange' as const, category: 'Coffee' },
    ],
  },
  {
    title: 'Organic & Specialty',
    description: 'Certified organic, shade-grown and bird-friendly coffees that taste good and do good.',
    products: [
      { id: 204, name: 'Organic Peru Highland', subtitle: 'Smooth milk chocolate, hazelnut and gentle citrus.', price: 569, image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&q=80', badge: 'Organic', badgeIcon: <Sprout size={14} />, badgeType: 'matcha' as const, category: 'Coffee' },
      { id: 2042, name: 'Shade-Grown Sumatra', subtitle: 'Earthy, full-bodied with cedar and dark spice notes.', price: 599, originalPrice: 699, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80', badge: 'Organic', badgeIcon: <Sprout size={14} />, badgeType: 'matcha' as const, category: 'Coffee' },
      { id: 2043, name: 'Bird Friendly Decaf', subtitle: 'Swiss water process decaf — all the flavour, none of the buzz.', price: 489, image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&q=80', category: 'Coffee' },
      { id: 2044, name: 'Fairtrade Honduras', subtitle: 'Warm brown sugar, honey and subtle nuttiness.', price: 529, image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&q=80', category: 'Coffee' },
      { id: 2045, name: 'Biodynamic Nicaragua', subtitle: 'Complex stone fruit with a winey, berry finish.', price: 619, image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&q=80', badge: 'Rare', badgeIcon: <Star size={14} />, badgeType: 'cream' as const, category: 'Coffee' },
      { id: 2046, name: 'Rainforest Alliance Rwanda', subtitle: 'Floral hibiscus and peach in a sweet, clean cup.', price: 579, image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=600&q=80', badge: 'New', badgeIcon: <Leaf size={14} />, badgeType: 'matcha' as const, category: 'Coffee' },
    ],
  },
];

export default function CoffeeProducts() {
  const [expandedCats, setExpandedCats] = useState<Record<string, boolean>>({});

  const toggleViewAll = (title: string) => {
    setExpandedCats(prev => ({ ...prev, [title]: !prev[title] }));
  };

  const scrollToCategory = (title: string) => {
    const el = document.getElementById(`coffee-cat-${title.replace(/\s+/g, '-')}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className={styles.container}>

      {COFFEE_CATEGORIES.map((cat, index) => {
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
            {index < COFFEE_CATEGORIES.length - 1 && (
              <div className={styles.dividerWrapper}><div className={styles.dividerLine} /></div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
