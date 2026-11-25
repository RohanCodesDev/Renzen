import React from 'react';

export type BrandType = 'paramanno' | 'renzen';

export interface Product {
  id: number;
  brand: BrandType;
  name: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  image: string;
  hoverImage?: string;
  badge?: string;
  badgeIcon?: React.ReactNode;
  badgeType?: 'matcha' | 'orange' | 'cream' | 'gold' | 'organic';
  category: string;
  subCategory?: string;
  rating?: number;
  reviewsCount?: number;
  weight?: string;
  tags?: string[];
  inStock?: boolean;
  description?: string;
  flavorNotes?: string[];
  origin?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  title: string;
  sub?: string;
  image: string;
  link?: string;
  count?: string;
  filter?: string;
}

export interface TrustPartner {
  name: string;
  role: string;
  initials: string;
  verified?: boolean;
}

export interface Testimonial {
  id: number;
  author: string;
  role?: string;
  location?: string;
  rating: number;
  quote: string;
  date?: string;
}
