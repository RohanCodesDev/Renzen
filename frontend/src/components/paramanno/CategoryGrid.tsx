import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import styles from '@/styles/ParamannaHome.module.css';

interface CategoryGridProps {
  onSelectCategory?: (category: string) => void;
}

const CATEGORIES_GRID = [
  {
    title: 'A2 Vedic Ghee',
    sub: 'Bilona churned in earthen pots',
    category: 'Ghee',
    image: 'https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?w=800&q=80',
  },
  {
    title: 'Wild Raw Honey',
    sub: 'Unheated Nilgiri forest nectar',
    category: 'Honey',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&q=80',
  },
  {
    title: 'Superfood Seeds',
    sub: 'Sun-dried chia, flax & pumpkin',
    category: 'Seeds',
    image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=800&q=80',
  },
  {
    title: 'Cold-Pressed Oils',
    sub: 'Traditional wood-churned kohlu',
    category: 'Oils',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80',
  },
  {
    title: 'Spices & Saffron',
    sub: 'GI tagged Kashmiri mongra',
    category: 'Spices',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80',
  },
  {
    title: 'Teas & Coffees',
    sub: 'Sister atelier — Renzen',
    href: '/renzen',
    image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=800&q=80',
  },
];

export default function CategoryGrid({ onSelectCategory }: CategoryGridProps) {
  const handleCategoryClick = (category: string) => {
    onSelectCategory?.(category);
    document.getElementById('provisions')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="categories" className={styles.categorySection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div>
            <span className={styles.sectionEyebrow}>Curated Collections</span>
            <h2 className={styles.sectionHeading}>The Sacred Provisions</h2>
          </div>
          <a
            href="#provisions"
            onClick={() => onSelectCategory?.('All')}
            className={styles.sectionSeeAll}
          >
            View All Provisions <ArrowRight size={14} strokeWidth={1.6} />
          </a>
        </div>

        <div className={styles.categoryGrid}>
          {CATEGORIES_GRID.map((cat) =>
            cat.href ? (
              <Link key={cat.title} href={cat.href} className={styles.catTile}>
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 720px) 100vw, (max-width: 1080px) 50vw, 33vw"
                  className={styles.catTileImg}
                />
                <div className={styles.catTileOverlay} />
                <div className={styles.catTileContent}>
                  <div>
                    <h3 className={styles.catTileTitle}>{cat.title}</h3>
                    <span className={styles.catTileSub}>{cat.sub}</span>
                  </div>
                  <ArrowRight size={16} strokeWidth={1.5} className={styles.catTileArrow} />
                </div>
              </Link>
            ) : (
              <button
                key={cat.title}
                type="button"
                onClick={() => handleCategoryClick(cat.category!)}
                className={styles.catTile}
              >
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 720px) 100vw, (max-width: 1080px) 50vw, 33vw"
                  className={styles.catTileImg}
                />
                <div className={styles.catTileOverlay} />
                <div className={styles.catTileContent}>
                  <div style={{ textAlign: 'left' }}>
                    <h3 className={styles.catTileTitle}>{cat.title}</h3>
                    <span className={styles.catTileSub}>{cat.sub}</span>
                  </div>
                  <ArrowRight size={16} strokeWidth={1.5} className={styles.catTileArrow} />
                </div>
              </button>
            )
          )}
        </div>
      </div>
    </section>
  );
}
