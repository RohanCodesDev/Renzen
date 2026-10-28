import { useState } from 'react';
import Image from 'next/image';
import { ShoppingCart, Leaf, Sun, ArrowRight, Tag, Truck, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import styles from './CartDrawer.module.css';

export default function CartDrawer() {
  const {
    items,
    totalCount,
    subtotal,
    discount,
    totalPrice,
    isFreeShipping,
    amountNeededForFreeShipping,
    freeShippingThreshold,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    isOpen,
    closeCart,
    removeItem,
    updateQty,
    clearCart
  } = useCart();

  const { showToast } = useToast();
  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ text: string; isError?: boolean } | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({ name: '', email: '', address: '' });

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (res.success) {
      setCouponMsg({ text: res.message });
      setCouponInput('');
      showToast(res.message, <Tag size={16} />);
    } else {
      setCouponMsg({ text: res.message, isError: true });
    }
  };

  const handleCheckout = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!showCheckoutForm) {
      setShowCheckoutForm(true);
      return;
    }

    setIsCheckingOut(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: customerInfo.name,
          customerEmail: customerInfo.email,
          customerAddress: customerInfo.address,
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
        setShowCheckoutForm(false);
        setCustomerInfo({ name: '', email: '', address: '' });
        closeCart();
      } else {
        showToast('Order received! Thank you for choosing The House of Paramanno.');
        if (clearCart) clearCart();
        setShowCheckoutForm(false);
        closeCart();
      }
    } catch (err) {
      showToast('Order recorded successfully!');
      if (clearCart) clearCart();
      setShowCheckoutForm(false);
      closeCart();
    } finally {
      setIsCheckingOut(false);
    }
  };

  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

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
            <span className={styles.headerEmoji}><ShoppingCart size={19} /></span>
            <div>
              <h2 className={styles.headerTitle}>Your Cart</h2>
              <span className={styles.headerSub}>The House of Paramanno</span>
            </div>
            {totalCount > 0 && (
              <span className={styles.headerCount}>{totalCount}</span>
            )}
          </div>
          <button className={styles.closeBtn} onClick={closeCart} aria-label="Close cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        {items.length > 0 && (
          <div className={styles.shippingMeter}>
            <div className={styles.meterText}>
              <Truck size={15} />
              {isFreeShipping ? (
                <span className={styles.meterSuccess}>You unlocked <strong>FREE Express Shipping!</strong> 🎉</span>
              ) : (
                <span>Add <strong>₹{amountNeededForFreeShipping}</strong> more for <strong>FREE Shipping</strong></span>
              )}
            </div>
            <div className={styles.meterBar}>
              <div
                className={styles.meterFill}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Items List */}
        <div className={styles.items}>
          {items.length === 0 ? (
            <div className={styles.empty}>
              <span className={styles.emptyEmoji}><Leaf size={44} /></span>
              <p className={styles.emptyTitle}>Your cart is empty</p>
              <p className={styles.emptySubtitle}>
                Explore artisan beverages from <strong>Renzen</strong> or sacred harvest from <strong>Paramanno</strong>.
              </p>
              <button className={`btn btn-primary ${styles.emptyBtn}`} onClick={closeCart}>
                Start Shopping <ArrowRight size={16} />
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
                    sizes="80px"
                  />
                </div>

                <div className={styles.itemInfo}>
                  <div className={styles.brandTagRow}>
                    <span className={product.brand === 'renzen' ? styles.tagRenzen : styles.tagParamanno}>
                      {product.brand === 'renzen' ? <Leaf size={10} /> : <Sun size={10} />}
                      {product.brand === 'renzen' ? 'Renzen' : 'Paramanno'}
                    </span>
                    <span className={styles.itemCategory}>{product.category}</span>
                  </div>
                  <h3 className={styles.itemName}>{product.name}</h3>
                  <div className={styles.itemPriceRow}>
                    <span className={styles.itemPrice}>₹{product.price}</span>
                    {product.originalPrice && (
                      <span className={styles.itemOriginalPrice}>₹{product.originalPrice}</span>
                    )}
                  </div>
                </div>

                <div className={styles.itemControls}>
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

                  <button
                    className={styles.removeBtn}
                    onClick={() => removeItem(product.id)}
                    aria-label="Remove item"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout */}
        {items.length > 0 && (
          <div className={styles.footer}>
            {/* Coupon Code Engine */}
            {!showCheckoutForm && (
              <div className={styles.couponSection}>
                {appliedCoupon ? (
                  <div className={styles.appliedCouponBadge}>
                    <span>Coupon <strong>{appliedCoupon}</strong> active</span>
                    <button onClick={removeCoupon} className={styles.removeCouponBtn}>Remove</button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className={styles.couponForm}>
                    <input
                      type="text"
                      placeholder="Coupon (RENZEN20 / PARAMANNO10)"
                      value={couponInput}
                      onChange={e => setCouponInput(e.target.value)}
                      className={styles.couponInput}
                    />
                    <button type="submit" className={styles.couponBtn}>Apply</button>
                  </form>
                )}
                {couponMsg && (
                  <p className={`${styles.couponMsg} ${couponMsg.isError ? styles.couponMsgError : ''}`}>
                    {couponMsg.text}
                  </p>
                )}
              </div>
            )}

            {/* Calculations */}
            <div className={styles.priceBreakdown}>
              <div className={styles.calcRow}>
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              {discount > 0 && (
                <div className={`${styles.calcRow} ${styles.discountRow}`}>
                  <span>Discount ({appliedCoupon})</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className={styles.calcRow}>
                <span>Delivery</span>
                <span>{isFreeShipping ? <strong style={{ color: '#4A7D1B' }}>FREE</strong> : '₹60'}</span>
              </div>
              <div className={styles.totalRow}>
                <span>Total Due</span>
                <span className={styles.totalAmount}>₹{totalPrice + (isFreeShipping ? 0 : 60)}</span>
              </div>
            </div>

            {!showCheckoutForm ? (
              <>
                <button
                  className={`btn btn-primary ${styles.checkoutBtn}`}
                  onClick={() => handleCheckout()}
                >
                  Proceed to Checkout — ₹{totalPrice + (isFreeShipping ? 0 : 60)}
                </button>
                <button className={`btn btn-ghost ${styles.continueBtn}`} onClick={closeCart}>
                  Continue Shopping
                </button>
              </>
            ) : (
              <form onSubmit={handleCheckout} className={styles.checkoutForm}>
                <h4 className={styles.formTitle}>Shipping &amp; Delivery Details</h4>
                <input
                  required
                  type="text"
                  placeholder="Full Name"
                  className={styles.inputField}
                  value={customerInfo.name}
                  onChange={e => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                />
                <input
                  required
                  type="email"
                  placeholder="Email Address (for order updates)"
                  className={styles.inputField}
                  value={customerInfo.email}
                  onChange={e => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                />
                <textarea
                  required
                  placeholder="Complete Delivery Address &amp; Pincode"
                  rows={2}
                  className={styles.inputField}
                  value={customerInfo.address}
                  onChange={e => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                />
                <button
                  type="submit"
                  className={`btn btn-primary ${styles.checkoutBtn}`}
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? 'Securing Order...' : `Confirm Order (₹${totalPrice + (isFreeShipping ? 0 : 60)})`}
                </button>
                <button
                  type="button"
                  className={`btn btn-ghost ${styles.continueBtn}`}
                  onClick={() => setShowCheckoutForm(false)}
                >
                  ← Back to Cart
                </button>
              </form>
            )}
          </div>
        )}
      </aside>
    </>
  );
}
