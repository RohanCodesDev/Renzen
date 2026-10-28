import Image from 'next/image';
import { useState } from 'react';
import { Sun, ShieldCheck, Check, Star } from 'lucide-react';
import { Product } from '@/data';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import styles from './ParamannoProductCard.module.css';

interface Props {
  product: Product;
}

export default function ParamannoProductCard({ product }: Props) {
  const { addItem } = useCart();
  const { showToast } = useToast();
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    setAdded(true);
    showToast(`${product.name} added to cart`, <Sun size={16} color="#C2843A" />);
    setTimeout(() => setAdded(false), 1800);
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
          className={styles.image}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Purity & Discount Badges */}
        <div className={styles.badges}>
          {product.badge && (
            <span className={styles.heritageBadge}>
              {product.badge}
            </span>
          )}
          {discount && (
            <span className={styles.discountBadge}>
              Save {discount}%
            </span>
          )}
        </div>

        {/* Origin Stamp */}
        {product.origin && (
          <div className={styles.originStamp}>
            <ShieldCheck size={12} />
            <span>{product.origin}</span>
          </div>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.categoryRow}>
          <span className={styles.category}>{product.category}</span>
          {product.rating && (
            <span className={styles.rating}>
              <Star size={13} fill="#C2843A" color="#C2843A" />
              <span>{product.rating.toFixed(1)}</span>
              {product.reviewsCount && <span className={styles.reviews}>({product.reviewsCount})</span>}
            </span>
          )}
        </div>

        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.subtitle}>{product.subtitle}</p>

        {product.flavorNotes && (
          <div className={styles.notesRow}>
            {product.flavorNotes.map(note => (
              <span key={note} className={styles.noteTag}>{note}</span>
            ))}
          </div>
        )}

        <div className={styles.footerRow}>
          <div className={styles.priceGroup}>
            <span className={styles.price}>₹{product.price}</span>
            {product.originalPrice && (
              <span className={styles.originalPrice}>₹{product.originalPrice}</span>
            )}
          </div>

          <button
            className={`${styles.addBtn} ${added ? styles.addBtnSuccess : ''}`}
            onClick={handleAdd}
            aria-label={`Add ${product.name} to cart`}
          >
            {added ? (
              <>
                <Check size={14} /> Added
              </>
            ) : (
              '+ Add to Cart'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
