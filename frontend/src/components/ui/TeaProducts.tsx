import React, { useState } from 'react';
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
      },
      {
        id: 1012,
        name: 'Moonlight Pluck First Flush',
        subtitle: 'Delicate, sweet, and hand-plucked during full moon.',
        price: 599,
        image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8c2a1?w=600&q=80',
        category: 'Tea',
      },
      {
        id: 1013,
        name: 'Premium White Reserve',
        subtitle: 'Unoxidized silvery tips, mild and incredibly smooth.',
        price: 749,
        image: 'https://images.unsplash.com/photo-1627492275512-4eb349924c29?w=600&q=80',
        badge: 'Limited ✨',
        badgeType: 'cream',
        category: 'Tea',
      },
      {
        id: 1014,
        name: 'Classic Clonal Spring',
        subtitle: 'Bright yellow cup, high floral aroma.',
        price: 429,
        originalPrice: 499,
        image: 'https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?w=600&q=80',
        category: 'Tea',
      },
      {
        id: 1015,
        name: 'Himalayan Spring Mystique',
        subtitle: 'A delicate pale brew with grassy undertones.',
        price: 629,
        image: 'https://images.unsplash.com/photo-1582787019808-01e4a2c5a2c9?w=600&q=80',
        category: 'Tea',
      },
      {
        id: 1016,
        name: 'Early Pluck Reserve',
        subtitle: 'First harvest leaves, extremely floral and bright.',
        price: 479,
        image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600&q=80',
        badge: 'New 🍃',
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
      },
      {
        id: 1022,
        name: 'Ruby Oolong Summer',
        subtitle: 'Semi-oxidized, complex roasted notes.',
        price: 499,
        image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8c2a1?w=600&q=80',
        category: 'Tea',
      },
      {
        id: 1023,
        name: 'High Elevation Reserve',
        subtitle: 'Deep amber infusion from high altitude bushes.',
        price: 649,
        originalPrice: 799,
        image: 'https://images.unsplash.com/photo-1576092762791-dd9e2220d9f4?w=600&q=80',
        badge: 'Sale 🔥',
        badgeType: 'orange',
        category: 'Tea',
      },
      {
        id: 1024,
        name: 'Vintage Summer Classic',
        subtitle: 'Well-rounded everyday cup with slight astringency.',
        price: 349,
        image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600&q=80',
        category: 'Tea',
      },
      {
        id: 1025,
        name: 'Muscatel Supreme',
        subtitle: 'Our signature second flush, robust and sweet.',
        price: 599,
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80',
        category: 'Tea',
      },
      {
        id: 1026,
        name: 'Summer Twilight Oolong',
        subtitle: 'Perfectly oxidized for a smooth evening cup.',
        price: 429,
        image: 'https://images.unsplash.com/photo-1627492275512-4eb349924c29?w=600&q=80',
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
      },
      {
        id: 1032,
        name: 'Red Peak Autumnal',
        subtitle: 'Deep red cup with robust, nutty undertones.',
        price: 399,
        image: 'https://images.unsplash.com/photo-1582787019808-01e4a2c5a2c9?w=600&q=80',
        category: 'Tea',
      },
      {
        id: 1033,
        name: 'Amber Delight',
        subtitle: 'Sweet aftertaste, perfect for chilly evenings.',
        price: 479,
        originalPrice: 550,
        image: 'https://images.unsplash.com/photo-1627492275512-4eb349924c29?w=600&q=80',
        category: 'Tea',
      },
      {
        id: 1034,
        name: 'Late Harvest Muscatel',
        subtitle: 'A rare lingering muscatel flavor in autumn.',
        price: 529,
        image: 'https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?w=600&q=80',
        badge: 'Rare 🌟',
        badgeType: 'cream',
        category: 'Tea',
      },
      {
        id: 1035,
        name: 'Copper Glow Autumnal',
        subtitle: 'Rich caramel notes with a woody finish.',
        price: 389,
        image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8c2a1?w=600&q=80',
        category: 'Tea',
      },
      {
        id: 1036,
        name: 'Himalayan Frost Reserve',
        subtitle: 'Plucked just before winter, sweet and mellow.',
        price: 549,
        image: 'https://images.unsplash.com/photo-1582787019808-01e4a2c5a2c9?w=600&q=80',
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
      },
      {
        id: 1042,
        name: 'Mint Green Blend',
        subtitle: 'Refreshing green tea hand-blended with spearmint.',
        price: 349,
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80',
        category: 'Tea',
      },
      {
        id: 1043,
        name: 'Jasmine Green Classic',
        subtitle: 'Naturally scented with fresh night-blooming jasmine.',
        price: 459,
        originalPrice: 500,
        image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8c2a1?w=600&q=80',
        badge: 'Popular ❤️',
        badgeType: 'orange',
        category: 'Tea',
      },
      {
        id: 1044,
        name: 'Roasted Green',
        subtitle: 'Mildly roasted for a slightly toasty, savory finish.',
        price: 419,
        image: 'https://images.unsplash.com/photo-1576092762791-dd9e2220d9f4?w=600&q=80',
        category: 'Tea',
      },
      {
        id: 1045,
        name: 'Sencha Style Green',
        subtitle: 'Steamed leaves giving a vibrant, savory brew.',
        price: 499,
        image: 'https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?w=600&q=80',
        category: 'Tea',
      },
      {
        id: 1046,
        name: 'Lemon Ginger Green',
        subtitle: 'Zesty lemon and warming ginger on a green base.',
        price: 399,
        image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600&q=80',
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
      },
      {
        id: 1052,
        name: 'Peach & Mango Oolong',
        subtitle: 'Tropical fruit pieces blended with premium oolong.',
        price: 549,
        image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600&q=80',
        category: 'Tea',
      },
      {
        id: 1053,
        name: 'Chamomile Vanilla',
        subtitle: 'Soothing chamomile kissed with real vanilla bean.',
        price: 399,
        image: 'https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?w=600&q=80',
        category: 'Tea',
      },
      {
        id: 1054,
        name: 'Lavender Earl Grey',
        subtitle: 'Classic bergamot black tea elevated with lavender.',
        price: 479,
        originalPrice: 550,
        image: 'https://images.unsplash.com/photo-1582787019808-01e4a2c5a2c9?w=600&q=80',
        badge: 'New 🍃',
        badgeType: 'matcha',
        category: 'Tea',
      },
      {
        id: 1055,
        name: 'Berry Hibiscus Bliss',
        subtitle: 'A vibrant red infusion packed with mixed berries.',
        price: 449,
        image: 'https://images.unsplash.com/photo-1627492275512-4eb349924c29?w=600&q=80',
        category: 'Tea',
      },
      {
        id: 1056,
        name: 'Blue Pea Flower Magic',
        subtitle: 'Earthy notes with a magical blue hue.',
        price: 529,
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80',
        category: 'Tea',
      }
    ]
  }
];

export default function TeaProducts() {
  const [expandedCats, setExpandedCats] = useState<Record<string, boolean>>({});

  const toggleViewAll = (title: string) => {
    setExpandedCats(prev => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <div className={styles.container}>
      {TEA_CATEGORIES.map((cat, index) => {
        const isExpanded = expandedCats[cat.title];
        const displayedProducts = isExpanded ? cat.products : cat.products.slice(0, 3);
        
        return (
          <React.Fragment key={cat.title}>
            <div className={styles.categorySection}>
              <div className={styles.categoryHeader}>
                <h2 className={styles.categoryTitle}>{cat.title}</h2>
                {cat.products.length > 3 && (
                  <button 
                    className={styles.viewAllBtn} 
                    onClick={() => toggleViewAll(cat.title)}
                  >
                    {isExpanded ? 'View Less' : 'View All'}
                  </button>
                )}
              </div>
              
              <div className={isExpanded ? styles.productGridExpanded : styles.productGrid}>
                {displayedProducts.map(p => (
                  <ProductCard key={p.id} product={p as Product} />
                ))}
                {cat.products.length === 0 && (
                  <p className={styles.emptyText}>More products coming soon...</p>
                )}
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}
