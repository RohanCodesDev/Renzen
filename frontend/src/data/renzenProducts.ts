export interface Product {
  id: number;
  brand: 'renzen' | 'paramanno';
  name: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  image: string;
  hoverImage?: string;
  badge?: string;
  badgeIcon?: React.ReactNode;
  badgeType?: 'matcha' | 'orange' | 'cream' | 'gold';
  category: string;
  subCategory?: string;
  rating?: number;
  reviewsCount?: number;
  tags?: string[];
  inStock?: boolean;
  description?: string;
  flavorNotes?: string[];
  origin?: string;
}

export const RENZEN_PRODUCTS: Product[] = [
  {
    id: 101,
    brand: 'renzen',
    name: 'Darjeeling First Flush (Spring Pluck)',
    subtitle: 'Crisp floral aroma with champagne muscatel finish',
    price: 499,
    originalPrice: 650,
    image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=700&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1576092762791-dd9e2220d9f4?w=700&q=80',
    badge: 'Bestseller 👑',
    badgeType: 'matcha',
    category: 'Tea',
    subCategory: 'First Flush',
    rating: 4.9,
    reviewsCount: 142,
    tags: ['Organic', 'Single Estate', 'Spring 2025'],
    flavorNotes: ['Muscatel Grape', 'White Peach', 'Mountain Spring'],
    origin: 'Darjeeling, West Bengal',
    description: 'Harvested during the first spring plucking at 6,500ft altitude. Unoxidized green edges give a light golden liqueur with brisk, champagne-like floral sweetness.'
  },
  {
    id: 102,
    brand: 'renzen',
    name: 'Ceremonial Grade Uji Matcha',
    subtitle: 'Stone-ground, shade-grown first harvest leaves',
    price: 899,
    originalPrice: 1199,
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=700&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1582787019808-01e4a2c5a2c9?w=700&q=80',
    badge: 'Fresh Drop 💧',
    badgeType: 'matcha',
    category: 'Matcha',
    subCategory: 'Ceremonial',
    rating: 5.0,
    reviewsCount: 98,
    tags: ['Stone Ground', 'Zero Bitterness', 'Superfood'],
    flavorNotes: ['Rich Umami', 'Creamy Sweet Grass', 'Velvety Finish'],
    origin: 'Uji, Kyoto, Japan',
    description: 'Vibrant neon green ceremonial matcha. Shade-grown for 30 days before harvest to maximize L-Theanine and chlorophyll. Delivers steady, sustained calm energy.'
  },
  {
    id: 103,
    brand: 'renzen',
    name: 'Ethiopian Yirgacheffe Single Origin',
    subtitle: 'Bright citrus clarity with sweet blueberry undertones',
    price: 649,
    originalPrice: 799,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=700&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=700&q=80',
    badge: 'Light Roast ☕',
    badgeType: 'orange',
    category: 'Coffee',
    subCategory: 'Single Origin',
    rating: 4.8,
    reviewsCount: 76,
    tags: ['100% Arabica', 'Washed Process', 'Altitude 2000m'],
    flavorNotes: ['Bergamot', 'Blueberry', 'Wild Honey'],
    origin: 'Yirgacheffe, Ethiopia',
    description: 'Grown on smallholder heirloom garden plots. Lightly roasted to accentuate jasmine floral aromatics and sparkling Meyer lemon acidity.'
  },
  {
    id: 104,
    brand: 'renzen',
    name: 'Artisan Cold Brew Concentrate (16-Hour)',
    subtitle: 'Ultra-smooth, zero-bitterness concentrated brew',
    price: 499,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=700&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1517701550927-30cfcb64ac45?w=700&q=80',
    badge: 'Fan Fav ⚡',
    badgeType: 'orange',
    category: 'Coffee',
    subCategory: 'Cold Brew',
    rating: 4.9,
    reviewsCount: 210,
    tags: ['Ready to Mix', 'Low Acid', 'Natural Sweetness'],
    flavorNotes: ['Dark Chocolate', 'Molasses', 'Nutty Toffee'],
    origin: 'Chikmagalur, Karnataka',
    description: 'Slow cold-water steeped for 16 hours from single-origin Arabica. Yields 6 cups of refreshing, chocolatey goodness.'
  },
  {
    id: 105,
    brand: 'renzen',
    name: 'Kashmiri Kahwa Green Reserve',
    subtitle: 'Spiced green tea infused with whole saffron & almonds',
    price: 549,
    originalPrice: 699,
    image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8c2a1?w=700&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1576092762791-dd9e2220d9f4?w=700&q=80',
    badge: 'Royal Blend 👑',
    badgeType: 'cream',
    category: 'Tea',
    subCategory: 'Spiced Blend',
    rating: 4.9,
    reviewsCount: 115,
    tags: ['Kashmiri Saffron', 'Green Cardamom', 'Almond Flakes'],
    flavorNotes: ['Sweet Saffron', 'Green Cardamom', 'Roasted Almond'],
    origin: 'Pampore, Kashmir',
    description: 'Traditional Kashmiri warming tea crafted with whole green tea leaves, real saffron stigmas, cinnamon bark, and slivered almonds.'
  },
  {
    id: 106,
    brand: 'renzen',
    name: 'Malabar Monsoon Arabica Dark Roast',
    subtitle: 'Low acidity, heavy crema with spicy smoky notes',
    price: 599,
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=700&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=700&q=80',
    badge: 'Monsooned 🌧️',
    badgeType: 'orange',
    category: 'Coffee',
    subCategory: 'Dark Roast',
    rating: 4.8,
    reviewsCount: 88,
    tags: ['Specialty Coffee', 'South Indian', 'Espresso Ready'],
    flavorNotes: ['Tobacco Leaf', 'Earthy Dark Cacao', 'Spiced Oak'],
    origin: 'Malabar Coast, Kerala',
    description: 'Exposed to monsoon winds in open warehouses for months, giving the beans a distinctive golden hue and unique, velvety body.'
  }
];
