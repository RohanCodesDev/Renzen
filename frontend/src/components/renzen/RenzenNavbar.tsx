import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Leaf, Search, ShoppingBag } from 'lucide-react';
import BrandSwitcher from '@/components/portal/BrandSwitcher';
import { useCart } from '@/context/CartContext';
import styles from './RenzenNavbar.module.css';

export default function RenzenNavbar() {
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
      <BrandSwitcher currentBrand="renzen" />
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.inner}>
          {/* Logo */}
          <Link href="/renzen" className={styles.logo}>
            <span className={styles.leafIcon}>
              <Leaf size={22} color="var(--matcha, #74B72E)" />
            </span>
            <span className={styles.logoText}>Renzen</span>
            <span className={styles.logoBadge}>Beverages</span>
          </Link>

          {/* Navigation */}
          <nav className={`${styles.nav} hide-mobile`}>
            {[
              { label: 'All Sips', href: '/renzen' },
              { label: 'Teas', href: '/renzen/tea' },
              { label: 'Coffees', href: '/renzen/coffees' },
              { label: 'Matcha', href: '/renzen/matcha' },
              { label: 'Cold Brews', href: '/renzen/coffees#cold-brew' },
            ].map(link => (
              <Link key={link.label} href={link.href} className={styles.navLink}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className={styles.actions}>
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

            <Link href="/renzen/tea" className={`btn btn-primary hide-mobile ${styles.shopBtn}`}>
              Explore Drops
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
