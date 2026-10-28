import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Sun, Search, ShoppingBag, ShieldCheck } from 'lucide-react';
import BrandSwitcher from '@/components/portal/BrandSwitcher';
import { useCart } from '@/context/CartContext';
import styles from './ParamannoNavbar.module.css';

export default function ParamannoNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const { totalCount, openCart } = useCart();
  const [bump, setBump] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (totalCount > 0) {
      setBump(true);
      const timer = setTimeout(() => setBump(false), 400);
      return () => clearTimeout(timer);
    }
  }, [totalCount]);

  return (
    <>
      <BrandSwitcher currentBrand="paramanno" />
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.inner}>
          {/* Logo */}
          <Link href="/paramanno" className={styles.logo}>
            <span className={styles.sunIcon}>
              <Sun size={24} color="#C2843A" />
            </span>
            <div className={styles.logoTextGroup}>
              <span className={styles.logoText}>PARAMANNO</span>
              <span className={styles.logoSubtext}>ORGANIC FOODS</span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className={`${styles.nav} hide-mobile`}>
            {[
              { label: 'All Harvest', href: '/paramanno' },
              { label: 'A2 Gir Ghee', href: '/paramanno/ghee' },
              { label: 'Raw Honey', href: '/paramanno/honey' },
              { label: 'Superfood Seeds', href: '/paramanno/superfoods' },
              { label: 'Purity Pledge', href: '/paramanno/purity' },
            ].map(link => (
              <Link key={link.label} href={link.href} className={styles.navLink}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className={styles.actions}>
            <div className={`${styles.purityBadge} hide-mobile`}>
              <ShieldCheck size={14} color="#C2843A" />
              <span>100% Vedic Lab Tested</span>
            </div>

            <button className={styles.actionBtn} aria-label="Search">
              <Search size={18} />
            </button>

            <button
              className={styles.cartBtn}
              onClick={openCart}
              aria-label={`Open cart (${totalCount} items)`}
            >
              <ShoppingBag size={19} />
              {totalCount > 0 && (
                <span className={`${styles.cartBadge} ${bump ? styles.bump : ''}`}>
                  {totalCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
