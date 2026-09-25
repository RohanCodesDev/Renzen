import Image from 'next/image';
import { useState } from 'react';
import styles from './ProductCard.module.css';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';

export interface Product {
  id: number;
  name: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  image: string;
  hoverImage?: string;
  badge?: string;
  badgeType?: 'matcha' | 'orange' | 'cream';
  category: string;
}

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addItem, openCart } = useCart();
  const { showToast } = useToast();
  const [added, setAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [bump, setBump] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    setAdded(true);

    // Badge bump animation
    setBump(true);
    setTimeout(() => setBump(false), 400);

    // Toast notification
    const categoryEmoji: Record<string, string> = {
      Tea: '🍵', Coffee: '☕', Matcha: '🍃', Organic: '🌿',
    };
    showToast(
      `${product.name} added to cart`,
      categoryEmoji[product.category] ?? '✓'
    );

    setTimeout(() => setAdded(false), 2000);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={`${styles.image} ${product.hoverImage ? styles.imagePrimary : ''}`}
          unoptimized
        />
        {product.hoverImage && (
          <Image
            src={product.hoverImage}
            alt={`${product.name} lifestyle`}
            fill
            className={`${styles.image} ${styles.imageSecondary}`}
            unoptimized
          />
        )}

        {/* Badges */}
        <div className={styles.badges}>
          {product.badge && (
            <span className={`badge badge-${product.badgeType ?? 'matcha'} ${styles.badge}`}>
              {product.badge}
            </span>
          )}
          {discount && (
            <span className={`badge badge-orange ${styles.badge}`}>
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          className={`${styles.wishlistBtn} ${isWishlisted ? styles.wishlisted : ''}`}
          onClick={() => setIsWishlisted(!isWishlisted)}
          aria-label="Wishlist"
        >
          <svg width="16" height="16" viewBox="0 0 24 24"
            fill={isWishlisted ? 'currentColor' : 'none'}
            stroke="currentColor" strokeWidth="2.2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>

        {/* Quick Add Overlay */}
        <div className={styles.overlay}>
          <button
            className={`btn btn-primary ${styles.addBtn} ${added ? styles.added : ''}`}
            onClick={handleAdd}
          >
            {added ? '✓ Added!' : '+ Add to Cart'}
          </button>
        </div>
      </div>

      <div className={styles.info}>
        <span className={`text-label ${styles.category}`}>{product.category}</span>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.subtitle}>{product.subtitle}</p>
        <div className={styles.priceRow}>
          <span className={styles.price}>₹{product.price}</span>
          {product.originalPrice && (
            <span className={styles.originalPrice}>₹{product.originalPrice}</span>
          )}
          <button
            className={`${styles.quickCart} ${bump ? styles.bump : ''}`}
            onClick={handleAdd}
            aria-label="Quick add"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
