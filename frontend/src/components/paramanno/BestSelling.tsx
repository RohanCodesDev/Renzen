import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Check, Sun } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import type { Product } from '@/types';
import styles from '@/styles/ParamannaHome.module.css';

interface BestSellingProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery?: string;
}

interface ProvisionItem extends Product {
  weight: string;
}

const PROVISIONS: ProvisionItem[] = [
  {
    id: 201,
    brand: 'paramanno',
    name: 'Vedic A2 Gir Cow Ghee',
    subtitle: 'Cultured whole milk curd churned in wooden bilonas over woodfire',
    price: 1450,
    weight: '500 ml',
    image: 'https://images.unsplash.com/photo-1631438420064-8f1b2b52b2e6?w=800&q=85',
    category: 'Ghee',
  },
  {
    id: 202,
    brand: 'paramanno',
    name: 'Wild Forest Raw Honey',
    subtitle: 'Unheated wild blossom nectar ethically harvested by Toda stewards',
    price: 520,
    weight: '400 g',
    image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&q=85',
    category: 'Honey',
  },
  {
    id: 203,
    brand: 'paramanno',
    name: 'Organic Superfood Seeds Trio',
    subtitle: 'Unroasted chia, golden flax, and heirloom pumpkin seeds',
    price: 440,
    weight: '350 g',
    image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=800&q=85',
    category: 'Seeds',
  },
  {
    id: 204,
    brand: 'paramanno',
    name: 'Kashmiri Mongra Saffron',
    subtitle: 'All-red saffron stigmas handpicked at daybreak in Pampore',
    price: 850,
    weight: '1 g',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=85',
    category: 'Spices',
  },
  {
    id: 205,
    brand: 'paramanno',
    name: 'Wood-Churned Mustard Oil',
    subtitle: 'Slow-pressed in traditional wooden kohlus at ambient temperature',
    price: 360,
    weight: '500 ml',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=85',
    category: 'Oils',
  },
  {
    id: 206,
    brand: 'paramanno',
    name: 'Lakadong Heirloom Turmeric',
    subtitle: 'Sun-cured golden rhizomes stone-milled in small batches',
    price: 390,
    weight: '200 g',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&q=85',
    category: 'Spices',
  },
];

const CATEGORIES = ['All', 'Ghee', 'Honey', 'Seeds', 'Oils', 'Spices'];

export default function BestSelling({
  activeCategory,
  onSelectCategory,
  searchQuery = '',
}: BestSellingProps) {
  const { addItem } = useCart();
  const { showToast } = useToast();
  const [addedId, setAddedId] = useState<number | null>(null);

  const handleAddToBag = (prod: ProvisionItem) => {
    addItem(prod);
    setAddedId(prod.id);
    showToast(`${prod.name} added to your bag`, <Sun size={15} color="#A65229" />);
    setTimeout(() => {
      setAddedId((curr) => (curr === prod.id ? null : curr));
    }, 1600);
  };

  const filteredProducts = PROVISIONS.filter((prod) => {
    if (activeCategory !== 'All' && prod.category !== activeCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        prod.name.toLowerCase().includes(q) ||
        prod.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <section id="provisions" className={styles.bestSellingSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionHeading}>Our Pantry</h2>

          <div className={styles.filterTabs} role="tablist" aria-label="Filter provisions by category">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => onSelectCategory(cat)}
                  className={`${styles.filterTab} ${isActive ? styles.filterTabActive : ''}`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="pantryFilterPill"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      className={styles.filterTabPill}
                    />
                  )}
                  <span className={styles.filterTabLabel}>{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className={styles.productGrid}>
            {filteredProducts.map((prod) => {
              const isAdded = addedId === prod.id;

              return (
                <article key={prod.id} className={styles.productCard}>
                  <div className={styles.productImgBox}>
                    <Image
                      src={prod.image}
                      alt={prod.name}
                      fill
                      sizes="(max-width: 639px) 100vw, (max-width: 960px) 50vw, 33vw"
                      className={styles.productImg}
                    />
                  </div>

                  <div className={styles.productTitleRow}>
                    <h3 className={styles.productName}>{prod.name}</h3>
                    <span className={styles.productPrice}>
                      ₹{prod.price.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <p className={styles.productWeightText}>{prod.weight}</p>

                  <button
                    type="button"
                    className={`${styles.addToBagBtn} ${isAdded ? styles.addToBagBtnAdded : ''}`}
                    onClick={() => handleAddToBag(prod)}
                  >
                    {isAdded ? (
                      <>
                        <Check size={14} strokeWidth={2} /> Added to Bag
                      </>
                    ) : (
                      'Add to Bag'
                    )}
                  </button>
                </article>
              );
            })}
          </div>
        ) : (
          <div className={styles.emptyFilterState}>
            <p>No provisions matched your current filter.</p>
          </div>
        )}
      </div>
    </section>
  );
}
