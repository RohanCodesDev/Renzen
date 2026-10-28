import { useState, useEffect } from 'react';
import Head from 'next/head';
import RenzenNavbar from '@/components/renzen/RenzenNavbar';
import Marquee from '@/components/ui/Marquee';
import ProductCard from '@/components/ui/ProductCard';
import MagneticButton from '@/components/ui/MagneticButton';
import styles from '@/styles/Home.module.css';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useTypewriter } from '@/hooks/useTypewriter';
import { RENZEN_PRODUCTS, Product } from '@/data';
import { Crown, Droplet, Sprout, Heart, Flame, Leaf, Coffee, Gift, Smile, Star, Package, RefreshCw, Rocket, FlaskConical, MessageSquare, ArrowRight } from 'lucide-react';

const CATEGORIES = [
  { icon: <Leaf size={24} />, label: 'Teas', count: '24 variants', color: '#74B72E', bg: '#f0fbe0' },
  { icon: <Coffee size={24} />, label: 'Coffees', count: '18 origins', color: '#8B5E3C', bg: '#fdf0e6' },
  { icon: <Sprout size={24} />, label: 'Matcha', count: '6 ceremonial', color: '#2d7a4f', bg: '#e8f5ee' },
  { icon: <Gift size={24} />, label: 'Cold Brews', count: '8 blends', color: '#c9913c', bg: '#fdf5e6' },
];

export default function RenzenHomePage() {
  const catRef      = useScrollReveal();
  const productsRef = useScrollReveal();
  const promoRef    = useScrollReveal();
  const featRef     = useScrollReveal();
  const newsRef     = useScrollReveal();
  const { revealed, activeLine } = useTypewriter();
  
  const [activeCategory, setActiveCategory] = useState('All');
  const [products, setProducts] = useState<Product[]>(RENZEN_PRODUCTS);
  const FILTER_CATEGORIES = ['All', 'Tea', 'Coffee', 'Matcha'];
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setProducts(data.filter((p: Product) => p.category !== 'Ghee' && p.category !== 'Honey' && p.category !== 'Seeds'));
          }
        }
      } catch (err) {
        console.warn('Using curated fallback products', err);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <>
      <Head>
        <title>Renzen — Premium Teas, Coffees & Ceremonial Matcha | The House of Paramanno</title>
        <meta name="description" content="Discover India's finest teas, single-origin coffees, and ceremonial matcha. Modern Gen-Z sips by The House of Paramanno." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <RenzenNavbar />

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
                  Single-estate artisanal teas, single-origin specialty coffees &amp; shade-grown ceremonial matcha —
                  crafted for the mindful generation.
                </p>
                <div className={`flex gap-sm ${styles.heroCtas} ${activeLine === -1 ? styles.heroCtasVisible : ''}`}>
                  <MagneticButton className="btn btn-primary">
                    Explore Drops
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </MagneticButton>
                  <MagneticButton className="btn btn-outline">Our Story</MagneticButton>
                </div>
              </div>

              {/* Cell B — Matcha image (tall, spans 2 rows) */}
              <div className={`${styles.bentoCell} ${styles.cellImgTall}`}>
                <img
                  src="https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=700&q=80"
                  alt="Matcha preparation"
                  className={styles.bentoImg}
                />
                <span className={`badge badge-glass ${styles.cellImgBadge}`}>
                  <Leaf size={14} className="mr-1 inline-block" /> Ceremonial Matcha
                </span>
              </div>

              {/* Cell C — Stat: Customers */}
              <div className={`${styles.bentoCell} ${styles.cellStat} ${styles.cellStatGreen}`}>
                <span className={styles.cellStatNum}>50K+</span>
                <span className={styles.cellStatLabel}>Mindful Sippers</span>
                <span className={styles.cellStatEmoji}><Smile size={24} /></span>
              </div>

              {/* Cell D — Coffee image (wide) */}
              <div className={`${styles.bentoCell} ${styles.cellImgWide}`}>
                <img
                  src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80"
                  alt="Coffee beans"
                  className={styles.bentoImg}
                />
                <span className={`badge badge-glass ${styles.cellImgBadge}`}>
                  <Coffee size={14} className="mr-1 inline-block" /> Single Origin
                </span>
              </div>

              {/* Cell E — Stat: Rating */}
              <div className={`${styles.bentoCell} ${styles.cellStat} ${styles.cellStatCoffee}`}>
                <span className={styles.cellStatNum}>4.9★</span>
                <span className={styles.cellStatLabel}>Avg Rating</span>
                <span className={styles.cellStatEmoji}><Star size={24} /></span>
              </div>

              {/* Cell F — Trust tags */}
              <div className={`${styles.bentoCell} ${styles.cellImgTall2}`}>
                <img
                  src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&q=80"
                  alt="Organic tea collection"
                  className={styles.bentoImg}
                />
                <div className={styles.cellImgOverlay}>
                  <p className={styles.cellTrustLine}><Rocket size={16} className="inline-block mr-1 align-text-bottom" /> Free Shipping over ₹499</p>
                  <p className={styles.cellTrustLine}><Sprout size={16} className="inline-block mr-1 align-text-bottom" /> Eco-Friendly Tins</p>
                  <p className={styles.cellTrustLine}><RefreshCw size={16} className="inline-block mr-1 align-text-bottom" /> 100% Direct From Estates</p>
                </div>
              </div>

              {/* Cell G — Stat: Products */}
              <div className={`${styles.bentoCell} ${styles.cellStat} ${styles.cellStatCream}`}>
                <span className={styles.cellStatNum}>40+</span>
                <span className={styles.cellStatLabel}>Artisanal Blends</span>
                <span className={styles.cellStatEmoji}><Package size={24} /></span>
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
                <span className="text-label" style={{ color: 'var(--matcha-dark)' }}>Browse by collection</span>
                <h2 className={`display-md ${styles.sectionTitle}`}>Shop the Sips</h2>
              </div>
            </div>

            <div ref={catRef} className={`${styles.categoriesGrid} stagger-children`}>
              {CATEGORIES.map((cat) => (
                <div
                  key={cat.label}
                  className={styles.categoryCard}
                  style={{ '--cat-bg': cat.bg, '--cat-color': cat.color } as React.CSSProperties}
                >
                  <span className={styles.catEmoji}>{cat.icon}</span>
                  <h3 className={styles.catLabel}>{cat.label}</h3>
                  <p className={styles.catCount}>{cat.count}</p>
                  <span className={styles.catArrow}><ArrowRight size={16} /></span>
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
                <span className="text-label" style={{ color: 'var(--matcha-dark)' }}>Freshly roasted &amp; plucked</span>
                <h2 className={`display-md ${styles.sectionTitle} flex items-center gap-2`}>Fresh Drops <Flame size={28} /></h2>
              </div>
            </div>
            
            {/* Category Filter Toggles */}
            <div className={styles.filterToggles}>
              {FILTER_CATEGORIES.map(cat => (
                <button 
                  key={cat}
                  className={`btn ${activeCategory === cat ? 'btn-primary' : 'btn-outline'} ${styles.filterBtn}`}
                  onClick={() => setActiveCategory(cat)}
                  style={activeCategory === cat ? { color: 'var(--cream)' } : {}}
                >
                  <span>{cat}</span>
                </button>
              ))}
            </div>

            {/* Product Grid */}
            <div className={styles.productGrid}>
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>

        {/* ── PROMO BANNER ────────────────────────────────────────── */}
        <section className={`section ${styles.promoSection}`}>
          <div className="container">
            <div ref={promoRef} className={`${styles.promoBanner} reveal`}>
              <div className={styles.promoBlob} />
              <div className={styles.promoContent}>
                <p className={styles.promoEyebrow}>— Limited First Order Offer</p>
                <h2 className={`display-lg ${styles.promoTitle}`}>
                  Your First Ritual.<br />
                  <span style={{ color: 'var(--matcha)' }}>20% Off.</span>
                </h2>
                <p className={styles.promoSub}>
                  Use code <strong>RENZEN20</strong> at checkout. Direct from artisanal gardens straight to your cup.
                </p>
                <button className="btn btn-primary">
                  Claim Code RENZEN20 <ArrowRight size={16} className="inline-block ml-1 align-text-bottom" />
                </button>
              </div>
              <div className={styles.promoIllustration}>
                <img
                  src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&q=80"
                  alt="Tea collection"
                  className={styles.promoImg}
                />
                <div className={styles.promoFloatBadge}>
                  <span><Gift size={20} /></span>
                  <span>Gift Tins Available</span>
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
                { icon: <Sprout size={24} />, title: 'Direct From Estates', desc: 'Sourced straight from single estates in Darjeeling, Uji & Chikmagalur.' },
                { icon: <FlaskConical size={24} />, title: 'Zero Additives', desc: '100% natural whole leaves and pure coffee beans. Never artificial.' },
                { icon: <Package size={24} />, title: 'Nitrogen Flushed Tins', desc: 'Locks in freshness so your first cup tastes as vivid as the day it was picked.' },
                { icon: <MessageSquare size={24} />, title: 'The House of Paramanno', desc: 'Proud sister atelier of Paramanno, sharing an uncompromising standard of purity.' },
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
              <span className={styles.newsletterEmoji}><Leaf size={32} /></span>
              <h2 className={`display-md ${styles.newsletterTitle}`}>
                Join the Renzen Sip Tribe
              </h2>
              <p className={styles.newsletterSub}>
                Get early notifications on seasonal first flushes, micro-lot coffee roasts, and secret drops.
              </p>
              <form className={styles.newsletterForm} onSubmit={e => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className={styles.newsletterInput}
                  required
                />
                <button type="submit" className="btn btn-primary">
                  Subscribe <ArrowRight size={16} className="inline-block ml-1 align-text-bottom" />
                </button>
              </form>
              <p className={styles.newsletterNote}>✓ 20% discount code will be sent immediately</p>
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
              <p className={styles.footerTagline}>The Modern Beverage Atelier by The House of Paramanno.</p>
            </div>
            <div className={styles.footerLinks}>
              {[
                { title: 'Beverages', links: ['Teas', 'Single Origin Coffee', 'Matcha', 'Cold Brews'] },
                { title: 'The House', links: ['Paramanno Organic Foods', 'A2 Desi Ghee', 'Raw Honey', 'Purity Pledge'] },
                { title: 'Care', links: ['Brewing Guides', 'Shipping', 'Returns', 'Contact'] },
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
            <p>© {new Date().getFullYear()} Renzen • A unit of The House of Paramanno. Made with <Leaf size={14} className="inline-block text-matcha mx-1" /> in India.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
