import React from 'react';
import Link from 'next/link';
import styles from './Footer7.module.css';

export interface Footer7Link {
  name: string;
  href: string;
}

export interface Footer7Props {
  brandTitle?: string;
  brandHref?: string;
  links?: Footer7Link[];
  copyright?: string;
  onLinkClick?: (href: string) => void;
}

const defaultLinks: Footer7Link[] = [
  { name: 'Pantry', href: '#provisions' },
  { name: 'Heritage', href: '#heritage' },
  { name: 'Teas', href: '/tea' },
  { name: 'Coffees', href: '/coffees' },
];

export const Footer7 = ({
  brandTitle = 'Paramanna',
  brandHref = '/paramanno',
  links = defaultLinks,
  copyright = `© ${new Date().getFullYear()} Paramanna Organic Foods`,
  onLinkClick,
}: Footer7Props) => {
  return (
    <footer className={styles.footerSection}>
      <div className={styles.container}>
        <div className={styles.singleRow}>
          <Link href={brandHref} className={styles.logoTitle}>
            {brandTitle}
          </Link>

          <ul className={styles.linksRow}>
            {links.map((link) => (
              <li key={link.name} className={styles.linkItem}>
                {link.href.startsWith('#') ? (
                  <a href={link.href} onClick={() => onLinkClick?.(link.href)}>
                    {link.name}
                  </a>
                ) : (
                  <Link href={link.href}>{link.name}</Link>
                )}
              </li>
            ))}
          </ul>

          <p className={styles.copyright}>{copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer7;
