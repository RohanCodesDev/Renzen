import Head from 'next/head';
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Marquee from '@/components/ui/Marquee';
import ProductCard, { Product } from '@/components/ui/ProductCard';
import styles from '@/styles/Home.module.css';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useTypewriter } from '@/hooks/useTypewriter';

// ─── DATA ────────────────────────────────────────────────────────────────────

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Darjeeling First Flush',
    subtitle: 'Light & floral with muscatel notes',
    price: 449,
    originalPrice: 599,
    image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600&q=80',
    badge: 'Best Seller 👑',
    badgeType: 'matcha',
    category: 'Tea',
  },
  {
    id: 2,
    name: 'Ceremonial Matcha',
    subtitle: 'Stone-ground, vibrant shade-grown',
    price: 749,
    originalPrice: 999,
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600&q=80',
    badge: 'New Drop 💧',
    badgeType: 'orange',
    category: 'Matcha',
  },
  {
    id: 3,
    name: 'Ethiopian Yirgacheffe',
    subtitle: 'Bright, blueberry & citrus finish',
    price: 599,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80',
    badge: 'Organic 🌿',
    badgeType: 'matcha',
    category: 'Coffee',
  },
  {
    id: 4,
    name: 'Wild Forest Honey',
    subtitle: 'Raw, unfiltered from the Nilgiris',
    price: 349,
    originalPrice: 449,
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=80',
    badge: 'Fan Fav ❤️',
    badgeType: 'orange',
    category: 'Organic',
  },
  {
    id: 5,
    name: 'Cold Brew Concentrate',
    subtitle: 'Smooth, less acidic. No bitterness.',
    price: 449,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80',
    category: 'Coffee',
  },
  {
    id: 6,
    name: 'Kashmiri Kahwa Blend',
    subtitle: 'Saffron, cardamom & rose petals',
    price: 549,
    originalPrice: 699,
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&q=80',
    badge: 'Limited 🔥',
    badgeType: 'orange',
    category: 'Tea',
  },
];

const CATEGORIES = [
  { emoji: '🍵', label: 'Teas', count: '24 variants', color: '#74B72E', bg: '#f0fbe0' },
  { emoji: '☕', label: 'Coffees', count: '18 origins', color: '#8B5E3C', bg: '#fdf0e6' },
  { emoji: '🌿', label: 'Organics', count: '32 products', color: '#2d7a4f', bg: '#e8f5ee' },
  { emoji: '🎁', label: 'Gift Sets', count: '12 curated', color: '#c9913c', bg: '#fdf5e6' },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function Home() {
  const catRef      = useScrollReveal();
  const productsRef = useScrollReveal();
  const promoRef    = useScrollReveal();
  const featRef     = useScrollReveal();
  const newsRef     = useScrollReveal();
  const { revealed, activeLine } = useTypewriter();
  
  const [activeCategory, setActiveCategory] = useState('All');
  const FILTER_CATEGORIES = ['All', 'Tea', 'Coffee', 'Organic', 'Matcha'];
  
  const filteredProducts = activeCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <>
      <Head>
        <title>Renzen — Premium Teas, Coffees & Organic Foods</title>
        <meta name="description" content="Discover India's finest teas, single-origin coffees, and organic superfoods. No nasties, just nature." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className={styles.mainWrapper}>
        {/* ── HERO BENTO ───────────────────────────────────────────── */}
        <section className={styles.hero}>
          <div className={`container ${styles.bentoCont}`}>
            <div className={styles.bentoGrid}>

              {/* Cell A — Headline (spans 2 cols, 2 rows) */}
              <div className={`${styles.bentoCell} ${styles.cellHeadline}`}>
                <h1 className={styles.heroTitle}>
                  <span className={styles.twLine}>
                    {'Sip.'.slice(0, revealed[0])}
                    {activeLine === 0 && <span className={styles.twCursor} />}
                  </span>
                  <em className={`${styles.heroTitleAccent} ${styles.twLine}`}>
                    {'Savour.'.slice(0, revealed[1])}
                    {activeLine === 1 && <span className={styles.twCursor} />}
                  </em>
                  <span className={styles.twLine}>
                    {'Sustain.'.slice(0, revealed[2])}
                    {activeLine === 2 && <span className={styles.twCursor} />}
                  </span>
                </h1>
                <p className={styles.heroSub}>
                  Premium teas, single-origin coffees &amp; farm-fresh organic foods —
                  crafted for the mindful generation.
                </p>
                <div className={`flex gap-sm ${styles.heroCtas} ${activeLine === -1 ? styles.heroCtasVisible : ''}`}>
                  <button className="btn btn-primary">
                    Explore Collection
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                  <button className="btn btn-outline">Our Story</button>
                </div>
              </div>

              {/* Cell B — Matcha image (tall, spans 2 rows) */}
              <div className={`${styles.bentoCell} ${styles.cellImgTall}`}>
                <img
                  src="https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=700&q=80"
                  alt="Matcha preparation"
                  className={styles.bentoImg}
                />
                <span className={`badge badge-glass ${styles.cellImgBadge}`}>🍵 Matcha</span>
              </div>

              {/* Cell C — Stat: Customers */}
              <div className={`${styles.bentoCell} ${styles.cellStat} ${styles.cellStatGreen}`}>
                <span className={styles.cellStatNum}>50K+</span>
                <span className={styles.cellStatLabel}>Happy Customers</span>
                <span className={styles.cellStatEmoji}>😊</span>
              </div>

              {/* Cell D — Coffee image (wide) */}
              <div className={`${styles.bentoCell} ${styles.cellImgWide}`}>
                <img
                  src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80"
                  alt="Coffee beans"
                  className={styles.bentoImg}
                />
                <span className={`badge badge-glass ${styles.cellImgBadge}`}>☕ Single Origin</span>
              </div>

              {/* Cell E — Stat: Rating */}
              <div className={`${styles.bentoCell} ${styles.cellStat} ${styles.cellStatCoffee}`}>
                <span className={styles.cellStatNum}>4.9★</span>
                <span className={styles.cellStatLabel}>Avg Rating</span>
                <span className={styles.cellStatEmoji}>⭐</span>
              </div>

              {/* Cell F — Trust tags + organic image */}
              <div className={`${styles.bentoCell} ${styles.cellImgTall2}`}>
                <img
                  src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=80"
                  alt="Organic honey"
                  className={styles.bentoImg}
                />
                <div className={styles.cellImgOverlay}>
                  <p className={styles.cellTrustLine}>🚀 Free Shipping over ₹499</p>
                  <p className={styles.cellTrustLine}>🌱 Eco-Friendly Packaging</p>
                  <p className={styles.cellTrustLine}>🔄 Easy 7-Day Returns</p>
                </div>
              </div>

              {/* Cell G — Stat: Products */}
              <div className={`${styles.bentoCell} ${styles.cellStat} ${styles.cellStatCream}`}>
                <span className={styles.cellStatNum}>80+</span>
                <span className={styles.cellStatLabel}>Products</span>
                <span className={styles.cellStatEmoji}>📦</span>
              </div>

            </div>
          </div>
        </section>


        {/* ── MARQUEE ─────────────────────────────────────────────── */}
        <Marquee />

        {/* ── CATEGORIES ──────────────────────────────────────────── */}
        <section className={`section ${styles.categoriesSection}`}>
          <div className="container">
            <div className={`flex items-center justify-between ${styles.sectionHead}`}>
              <div>
                <span className="text-label" style={{ color: 'var(--matcha-dark)' }}>Browse by category</span>
                <h2 className={`display-md ${styles.sectionTitle}`}>Shop the Range</h2>
              </div>
              <button className="btn btn-text hide-mobile">View All →</button>
            </div>

            <div ref={catRef} className={`${styles.categoriesGrid} stagger-children`}>
              {CATEGORIES.map((cat) => (
                <div
                  key={cat.label}
                  className={styles.categoryCard}
                  style={{ '--cat-bg': cat.bg, '--cat-color': cat.color } as React.CSSProperties}
                >
                  <span className={styles.catEmoji}>{cat.emoji}</span>
                  <h3 className={styles.catLabel}>{cat.label}</h3>
                  <p className={styles.catCount}>{cat.count}</p>
                  <span className={styles.catArrow}>→</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRODUCTS ────────────────────────────────────────────── */}
        <section className={`section ${styles.productsSection}`}>
          <div className="container">
            <div className={`flex items-center justify-between ${styles.sectionHead} reveal`} ref={productsRef}>
              <div>
                <span className="text-label" style={{ color: 'var(--matcha-dark)' }}>Freshly curated</span>
                <h2 className={`display-md ${styles.sectionTitle}`}>Fresh Drops 🔥</h2>
              </div>
              <button className="btn btn-text hide-mobile">See All Products →</button>
            </div>
            
            {/* Category Filter Toggles */}
            <div className={styles.filterToggles}>
              {FILTER_CATEGORIES.map(cat => (
                <button 
                  key={cat}
                  className={`btn ${activeCategory === cat ? 'btn-primary' : 'btn-outline'} ${styles.filterBtn}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Horizontal scroll on mobile, grid on desktop */}
            <div className={styles.productGrid}>
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>

        {/* ── MARQUEE 2 (reversed) ────────────────────────────────── */}
        <div className={styles.marqueeReverse}>
          <Marquee />
        </div>

        {/* ── PROMO BANNER ────────────────────────────────────────── */}
        <section className={`section ${styles.promoSection}`}>
          <div className="container">
            <div ref={promoRef} className={`${styles.promoBanner} reveal`}>
              <div className={styles.promoBlob} />
              <div className={styles.promoContent}>
                <p className={styles.promoEyebrow}>— Limited Time Offer</p>
                <h2 className={`display-lg ${styles.promoTitle}`}>
                  Your First Order.<br />
                  <span style={{ color: 'var(--matcha)' }}>20% Off.</span>
                </h2>
                <p className={styles.promoSub}>
                  Use code <strong>RENZEN20</strong> at checkout. No minimum order.
                  Fresh, organic, delivered to your door.
                </p>
                <button className="btn btn-primary">
                  Claim Your Discount →
                </button>
              </div>
              <div className={styles.promoIllustration}>
                <img
                  src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&q=80"
                  alt="Tea collection"
                  className={styles.promoImg}
                />
                <div className={styles.promoFloatBadge}>
                  <span>🎁</span>
                  <span>Gift Wrapping Available</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FEATURES ────────────────────────────────────────────── */}
        <section className={`section ${styles.featuresSection}`}>
          <div className="container">
            <div ref={featRef} className={`${styles.featuresGrid} stagger-children`}>
              {[
                { icon: '🌿', title: 'Farm Direct', desc: 'Sourced straight from verified organic farms across India.' },
                { icon: '🧪', title: 'Lab Tested', desc: 'Every batch tested for purity, potency, and no nasties.' },
                { icon: '📦', title: 'Eco Packaging', desc: 'Compostable packaging that loves the planet as much as you do.' },
                { icon: '💬', title: 'Community First', desc: 'Join 50K+ mindful sippers on our Renzen Tribe loyalty program.' },
              ].map(f => (
                <div key={f.title} className={styles.featureCard}>
                  <span className={styles.featureIcon}>{f.icon}</span>
                  <h3 className={styles.featureTitle}>{f.title}</h3>
                  <p className={styles.featureDesc}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── NEWSLETTER ──────────────────────────────────────────── */}
        <section className={`section ${styles.newsletterSection}`}>
          <div className="container">
            <div ref={newsRef} className={`${styles.newsletter} reveal`}>
              <span className={styles.newsletterEmoji}>🍃</span>
              <h2 className={`display-md ${styles.newsletterTitle}`}>
                Join the Tribe
              </h2>
              <p className={styles.newsletterSub}>
                Get early access to new blends, exclusive drops &amp; wellness tips. No spam, ever.
              </p>
              <form className={styles.newsletterForm} onSubmit={e => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className={styles.newsletterInput}
                  required
                />
                <button type="submit" className="btn btn-primary">
                  Subscribe →
                </button>
              </form>
              <p className={styles.newsletterNote}>✓ Get 10% off your first order as a welcome gift</p>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerTop}>
            <div className={styles.footerBrand}>
              <span className={styles.footerLogo}>🍃 Renzen</span>
              <p className={styles.footerTagline}>Mindful sips for a sustainable world.</p>
            </div>
            <div className={styles.footerLinks}>
              {[
                { title: 'Shop', links: ['Teas', 'Coffees', 'Organics', 'Bundles'] },
                { title: 'Company', links: ['About', 'Journal', 'Careers', 'Press'] },
                { title: 'Support', links: ['FAQs', 'Shipping', 'Returns', 'Contact'] },
              ].map(col => (
                <div key={col.title} className={styles.footerCol}>
                  <h4 className={styles.footerColTitle}>{col.title}</h4>
                  <ul className={styles.footerColLinks}>
                    {col.links.map(l => <li key={l}><a href="#">{l}</a></li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p>© 2025 Renzen. Made with 🍵 in India.</p>
            <p>Privacy Policy · Terms of Service</p>
          </div>
        </div>
      </footer>
    </>
  );
}
