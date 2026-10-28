import Link from 'next/link';
import { useRouter } from 'next/router';
import { Sparkles, Leaf, Sun } from 'lucide-react';
import styles from './BrandSwitcher.module.css';

interface BrandSwitcherProps {
  currentBrand: 'renzen' | 'paramanno';
}

export default function BrandSwitcher({ currentBrand }: BrandSwitcherProps) {
  const router = useRouter();

  return (
    <div className={styles.bar}>
      <div className={styles.container}>
        <div className={styles.houseLabel}>
          <Sparkles size={13} className={styles.houseIcon} />
          <span>The House of Paramanno</span>
        </div>

        <div className={styles.toggleGroup}>
          <Link
            href="/renzen"
            className={`${styles.tab} ${currentBrand === 'renzen' ? styles.tabActiveRenzen : ''}`}
          >
            <Leaf size={13} className={styles.tabIcon} />
            <span className={styles.tabTitle}>RENZEN</span>
            <span className={styles.tabBadge}>Beverages</span>
          </Link>

          <span className={styles.divider}>/</span>

          <Link
            href="/paramanno"
            className={`${styles.tab} ${currentBrand === 'paramanno' ? styles.tabActiveParamanno : ''}`}
          >
            <Sun size={13} className={styles.tabIcon} />
            <span className={styles.tabTitle}>PARAMANNO</span>
            <span className={styles.tabBadge}>Organic Foods</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
