'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Store, Sprout, Leaf } from 'lucide-react';
import styles from './SlideNav.module.css';

export interface SlideNavItem {
  label: string;
  href: string;
  icon: React.ReactElement;
  accent?: boolean;
}

interface Position {
  left: number;
  width: number;
  opacity: number;
}

const DEFAULT_ITEMS: SlideNavItem[] = [
  {
    label: 'Pantry',
    href: '#provisions',
    icon: <Store size={13} strokeWidth={1.6} className={styles.icon} />,
  },
  {
    label: 'Heritage',
    href: '#heritage',
    icon: <Sprout size={13} strokeWidth={1.6} className={styles.icon} />,
  },
  {
    label: 'Renzen ↗',
    href: '/renzen',
    icon: <Leaf size={13} strokeWidth={1.6} className={styles.icon} />,
    accent: true,
  },
];

export const SlideNav = ({ items = DEFAULT_ITEMS }: { items?: SlideNavItem[] }) => {
  const [position, setPosition] = useState<Position>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      onMouseLeave={() => setPosition((prev) => ({ ...prev, opacity: 0 }))}
      className={styles.list}
    >
      {items.map((item) => (
        <li
          key={item.label}
          onMouseEnter={(e) => {
            const { offsetLeft, offsetWidth } = e.currentTarget;
            setPosition({
              left: offsetLeft,
              width: offsetWidth,
              opacity: 1,
            });
          }}
          className={styles.item}
        >
          {item.href.startsWith('#') ? (
            <a
              href={item.href}
              className={`${styles.link} ${item.accent ? styles.linkAccent : ''}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </a>
          ) : (
            <Link
              href={item.href}
              className={`${styles.link} ${item.accent ? styles.linkAccent : ''}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          )}
        </li>
      ))}

      <motion.li
        aria-hidden="true"
        animate={{
          left: position.left,
          width: position.width,
          opacity: position.opacity,
        }}
        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
        className={styles.pill}
      />
    </ul>
  );
};

export default SlideNav;
