import { Product, RENZEN_PRODUCTS } from './renzenProducts';
import { PARAMANNO_PRODUCTS } from './paramannoProducts';

export type { Product };
export { RENZEN_PRODUCTS, PARAMANNO_PRODUCTS };

export const ALL_PRODUCTS: Product[] = [
  ...RENZEN_PRODUCTS,
  ...PARAMANNO_PRODUCTS
];

// Preserves backward compatibility with existing components importing PRODUCTS
export const PRODUCTS = ALL_PRODUCTS;

export function getProductsByBrand(brand: 'renzen' | 'paramanno'): Product[] {
  return ALL_PRODUCTS.filter(p => p.brand === brand);
}

export function getProductById(id: number | string): Product | undefined {
  const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
  return ALL_PRODUCTS.find(p => p.id === numericId);
}

export function getProductsByCategory(category: string, brand?: 'renzen' | 'paramanno'): Product[] {
  return ALL_PRODUCTS.filter(p => {
    const matchesCategory = p.category.toLowerCase() === category.toLowerCase();
    return brand ? matchesCategory && p.brand === brand : matchesCategory;
  });
}
