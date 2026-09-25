import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { totalCount, openCart } = useCart();
  const [prevCount, setPrevCount] = useState(totalCount);
  const [bump, setBump] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Trigger bump animation when count increases
  useEffect(() => {
    if (totalCount > prevCount) {
      setBump(true);
      setTimeout(() => setBump(false), 400);
    }
    setPrevCount(totalCount);
  }, [totalCount]);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <span className={styles.logoLeaf}>🍃</span>
          <span className={styles.logoText}>Renzen</span>
        </Link>

        {/* Nav Links */}
        <ul className={`${styles.links} hide-mobile`}>
          {[
            { label: 'Teas', href: '/tea' },
            { label: 'Coffees', href: '/coffees' },
            { label: 'Organics', href: '/organics' },
            { label: 'Bundles', href: '/bundles' },
            { label: 'Journal', href: '/journal' },
          ].map((item) => (
            <li key={item.label}>
              <Link href={item.href} className={styles.link}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className={styles.actions}>
          <button className={styles.actionBtn} aria-label="Search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </button>

          {/* Cart button with animated badge */}
          <button
            className={styles.actionBtn}
            onClick={openCart}
            aria-label={`Open cart, ${totalCount} items`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            {totalCount > 0 && (
              <span className={`${styles.cartBadge} ${bump ? styles.cartBump : ''}`}>
                {totalCount}
              </span>
            )}
          </button>

          <button className={`btn btn-primary hide-mobile ${styles.shopBtn}`}>
            Shop Now
          </button>
        </div>
      </div>
    </nav>
  );
}
