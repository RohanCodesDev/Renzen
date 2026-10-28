import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Product } from '@/data';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  totalCount: number;
  subtotal: number;
  discount: number;
  totalPrice: number;
  appliedCoupon: string | null;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
  isFreeShipping: boolean;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (id: number) => void;
  updateQty: (id: number, qty: number) => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  clearCart: () => void;
}

const FREE_SHIPPING_THRESHOLD = 499;

const VALID_COUPONS: Record<string, number> = {
  RENZEN20: 0.20,
  PARAMANNO10: 0.10,
  FIRSTORDER: 0.15,
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('house_of_paramanno_cart');
      const savedCoupon = localStorage.getItem('house_of_paramanno_coupon');
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
      if (savedCoupon) {
        setAppliedCoupon(savedCoupon);
      }
    } catch (e) {
      console.warn('Could not read cart from localStorage', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage whenever items or coupon change
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('house_of_paramanno_cart', JSON.stringify(items));
      if (appliedCoupon) {
        localStorage.setItem('house_of_paramanno_coupon', appliedCoupon);
      } else {
        localStorage.removeItem('house_of_paramanno_coupon');
      }
    } catch (e) {
      console.warn('Could not write cart to localStorage', e);
    }
  }, [items, appliedCoupon, isLoaded]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback((product: Product, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { product, quantity }];
    });
  }, []);

  const removeItem = useCallback((id: number) => {
    setItems(prev => prev.filter(i => i.product.id !== id));
  }, []);

  const updateQty = useCallback((id: number, qty: number) => {
    if (qty <= 0) {
      setItems(prev => prev.filter(i => i.product.id !== id));
    } else {
      setItems(prev =>
        prev.map(i => (i.product.id === id ? { ...i, quantity: qty } : i))
      );
    }
  }, []);

  const applyCoupon = useCallback((code: string) => {
    const clean = code.trim().toUpperCase();
    if (VALID_COUPONS[clean]) {
      setAppliedCoupon(clean);
      return { success: true, message: `Coupon ${clean} applied! (${VALID_COUPONS[clean] * 100}% off)` };
    }
    return { success: false, message: 'Invalid coupon code. Try RENZEN20 or PARAMANNO10' };
  }, []);

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setAppliedCoupon(null);
  }, []);

  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  
  const discountRate = appliedCoupon ? (VALID_COUPONS[appliedCoupon] || 0) : 0;
  const discount = Math.round(subtotal * discountRate);
  const totalPrice = Math.max(0, subtotal - discount);

  const isFreeShipping = totalPrice >= FREE_SHIPPING_THRESHOLD;
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - totalPrice);

  return (
    <CartContext.Provider
      value={{
        items,
        totalCount,
        subtotal,
        discount,
        totalPrice,
        appliedCoupon,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        amountNeededForFreeShipping,
        isFreeShipping,
        isOpen,
        openCart,
        closeCart,
        addItem,
        removeItem,
        updateQty,
        applyCoupon,
        removeCoupon,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
