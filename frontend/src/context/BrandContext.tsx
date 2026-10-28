import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export type BrandMode = 'portal' | 'renzen' | 'paramanno';

export interface BrandInfo {
  id: BrandMode;
  name: string;
  tagline: string;
  badge: string;
  primaryColor: string;
  accentColor: string;
  themeClass: string;
}

export const BRAND_CONFIG: Record<BrandMode, BrandInfo> = {
  portal: {
    id: 'portal',
    name: 'The House of Paramanno',
    tagline: 'Artisanal Beverages & Vedic Organic Foods',
    badge: 'Dual Atelier',
    primaryColor: '#2C1E16',
    accentColor: '#D4AF37',
    themeClass: 'theme-portal'
  },
  renzen: {
    id: 'renzen',
    name: 'Renzen',
    tagline: 'The Modern Beverage Atelier — Teas, Coffees & Matcha',
    badge: 'Gen-Z Botanical',
    primaryColor: '#2C1E16',
    accentColor: '#74B72E',
    themeClass: 'theme-renzen'
  },
  paramanno: {
    id: 'paramanno',
    name: 'Paramanno Organic Foods',
    tagline: 'Pure Vedic Harvest — A2 Ghee, Wild Honey & Superfoods',
    badge: 'Traditional Luxury',
    primaryColor: '#2A1810',
    accentColor: '#C2843A',
    themeClass: 'theme-paramanno'
  }
};

interface BrandContextType {
  brand: BrandMode;
  setBrand: (mode: BrandMode) => void;
  brandInfo: BrandInfo;
}

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export function BrandProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [brand, setBrandState] = useState<BrandMode>('portal');

  // Automatically sync brand state with current route
  useEffect(() => {
    const path = router.pathname;
    if (path.startsWith('/paramanno')) {
      setBrandState('paramanno');
    } else if (path.startsWith('/renzen') || path === '/tea' || path === '/coffees') {
      setBrandState('renzen');
    } else if (path === '/') {
      // Root default is portal unless overridden by user interaction
      setBrandState('portal');
    }
  }, [router.pathname]);

  const setBrand = (mode: BrandMode) => {
    setBrandState(mode);
  };

  const brandInfo = BRAND_CONFIG[brand];

  return (
    <BrandContext.Provider value={{ brand, setBrand, brandInfo }}>
      {children}
    </BrandContext.Provider>
  );
}

export function useBrand() {
  const context = useContext(BrandContext);
  if (!context) {
    throw new Error('useBrand must be used within a BrandProvider');
  }
  return context;
}
