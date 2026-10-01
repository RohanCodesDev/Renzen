import { useState } from 'react';
import Image from 'next/image';
import { ShoppingCart, Leaf, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import styles from './CartDrawer.module.css';

export default function CartDrawer() {
  const { items, totalCount, totalPrice, isOpen, closeCart, removeItem, updateQty, clearCart } = useCart();
  const { showToast } = useToast();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: 'Guest Customer',
          customerEmail: 'guest@example.com',
          customerAddress: '123 Guest St, Guest City',
          total: totalPrice,
          items: items.map(item => ({
            productName: item.product.name,
            qty: item.quantity,
            price: item.product.price
          }))
        })
      });
      if (res.ok) {
        showToast('Order placed successfully! 🚀');
        if (clearCart) clearCart();
        closeCart();
      } else {
        showToast('Failed to place order.');
      }
    } catch (err) {
      showToast('Error during checkout.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropVisible : ''}`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`} aria-label="Cart">
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.headerEmoji}><ShoppingCart size={20} /></span>
            <h2 className={styles.headerTitle}>Your Cart</h2>
            {totalCount > 0 && (
              <span className={styles.headerCount}>{totalCount}</span>
            )}
          </div>
          <button className={styles.closeBtn} onClick={closeCart} aria-label="Close cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className={styles.items}>
          {items.length === 0 ? (
            <div className={styles.empty}>
              <span className={styles.emptyEmoji}><Leaf size={48} /></span>
              <p className={styles.emptyTitle}>Your cup is empty</p>
              <p className={styles.emptySubtitle}>Add some organic goodness to get started.</p>
              <button className={`btn btn-primary ${styles.emptyBtn}`} onClick={closeCart}>
                Browse Products <ArrowRight size={16} className="inline-block ml-1 align-text-bottom" />
              </button>
            </div>
          ) : (
            items.map(({ product, quantity }) => (
              <div key={product.id} className={styles.item}>
                <div className={styles.itemImg}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className={styles.itemImgEl}
                    unoptimized
                  />
                </div>

                <div className={styles.itemInfo}>
                  <span className={styles.itemCategory}>{product.category}</span>
                  <h3 className={styles.itemName}>{product.name}</h3>
                  <span className={styles.itemPrice}>₹{product.price}</span>
                </div>

                <div className={styles.itemControls}>
                  {/* Qty stepper */}
                  <div className={styles.stepper}>
                    <button
                      className={styles.stepBtn}
                      onClick={() => updateQty(product.id, quantity - 1)}
                      aria-label="Decrease quantity"
                    >−</button>
                    <span className={styles.stepCount}>{quantity}</span>
                    <button
                      className={styles.stepBtn}
                      onClick={() => updateQty(product.id, quantity + 1)}
                      aria-label="Increase quantity"
                    >+</button>
                  </div>

                  {/* Remove */}
                  <button
                    className={styles.removeBtn}
                    onClick={() => removeItem(product.id)}
                    aria-label="Remove item"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.subtotal}>
              <span>Subtotal</span>
              <span className={styles.subtotalPrice}>₹{totalPrice}</span>
            </div>
            <p className={styles.footerNote}>Shipping & taxes calculated at checkout</p>
            <button 
              className={`btn btn-primary ${styles.checkoutBtn}`} 
              onClick={handleCheckout}
              disabled={isCheckingOut}
            >
              {isCheckingOut ? 'Processing...' : `Checkout — ₹${totalPrice}`}
            </button>
            <button className={`btn btn-ghost ${styles.continueBtn}`} onClick={closeCart}>
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
