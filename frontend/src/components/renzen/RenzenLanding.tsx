import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { RENZEN_PRODUCTS } from '@/data';
import { useCart } from '@/context/CartContext';
import styles from '@/styles/RenzenLanding.module.css';

const BEVERAGE_CATEGORIES = [
  {
    name: 'Single-Estate Teas',
    desc: 'First flush Darjeeling, Nilgiri Frost & whole leaf green teas',
    image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=800&q=80',
    filter: 'Tea',
  },
  {
    name: 'Specialty Coffees',
    desc: 'High-altitude Ethiopian micro-lots & Chikmagalur estate roasts',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80',
    filter: 'Coffee',
  },
  {
    name: 'Ceremonial Matcha',
    desc: 'First-harvest shade-grown leaves from Uji, Kyoto stone-ground',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=800&q=80',
    filter: 'Matcha',
  },
];

const FILTER_TABS = ['All', 'Tea', 'Coffee', 'Matcha'];

const STRIP_ITEMS = [
  'Single Estate Harvest',
  'Shade-Grown Ceremonial Uji',
  'Nitrogen Flushed Tins',
  '100% Whole Leaf',
  'Zero Preservatives',
  'Micro-Lot Roasted',
  'Direct From Growers',
  'Sustainable Craft',
];

export default function RenzenLanding() {
  const [activeFilter, setActiveFilter] = useState('All');
  const { totalCount, openCart, addItem } = useCart();

  const filteredProducts =
    activeFilter === 'All'
      ? RENZEN_PRODUCTS
      : RENZEN_PRODUCTS.filter((p) => p.category === activeFilter);

  // Clean emoji badges
  const cleanBadge = (badge?: string) => {
    if (!badge) return '';
    return badge.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '').trim();
  };

  return (
    <div className={styles.wrapper}>
      {/* ── 75% NAVBAR (Floating Island) ───────────────── */}
      <div className={styles.navWrapper}>
        <nav className={styles.nav}>
          <Link href="/renzen" className={styles.navLogo}>
            Renzen
            <span className={styles.navLogoAccent}>Beverages</span>
          </Link>

          {/* Categories: Teas, Coffees, Organics with bold tag names */}
          <div className={styles.navCategories}>
            <button
              onClick={() => setActiveFilter('Tea')}
              className={`${styles.navCategoryTag} ${activeFilter === 'Tea' ? styles.navCategoryTagActive : ''}`}
            >
              <span className={styles.navTagHash}>#</span>
              <strong className={styles.navTagName}>Teas</strong>
            </button>
            <button
              onClick={() => setActiveFilter('Coffee')}
              className={`${styles.navCategoryTag} ${activeFilter === 'Coffee' ? styles.navCategoryTagActive : ''}`}
            >
              <span className={styles.navTagHash}>#</span>
              <strong className={styles.navTagName}>Coffees</strong>
            </button>
            <Link href="/" className={styles.navCategoryTag}>
              <span className={styles.navTagHash}>#</span>
              <strong className={styles.navTagName}>Organics</strong>
            </Link>
          </div>

          <div className={styles.navActions}>
            <button
              className={styles.navCartBtn}
              aria-label="Shopping Cart"
              onClick={openCart}
            >
              <ShoppingBag size={17} />
              {totalCount > 0 && (
                <span className={styles.cartCountBadge}>{totalCount}</span>
              )}
            </button>
            <Link href="/" className={styles.navParamannaLink}>
              Paramanna Organics →
            </Link>
          </div>
        </nav>
      </div>

      {/* ── HERO ────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroTextCol}>
          <span className={styles.heroEyebrow}>The House of Paramanna • Atelier II</span>
          <h1 className={styles.heroTitle}>
            Artisanal Teas &amp;
            <br />
            <span className={styles.heroTitleAccent}>Single-Origin Coffees.</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Mindfully plucked first flushes from Darjeeling, shade-grown
            ceremonial Uji matcha, and high-altitude Ethiopian micro-lots.
            Crafted for pure clarity of taste.
          </p>
          <div className={styles.heroCtaRow}>
            <a href="#collection" className={styles.heroCta}>
              Shop Drops <ArrowRight size={16} />
            </a>
            <Link href="/" className={styles.heroSecBtn}>
              Explore Organics
            </Link>
          </div>
        </div>

        <div className={styles.heroImageCol}>
          <Image
            src="https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=1100&q=85"
            alt="Ceremonial Matcha whisking preparation"
            fill
            className={styles.heroImg}
            priority
          />
        </div>
      </section>

      {/* ── MARQUEE STRIP ───────────────────────────────── */}
      <div className={styles.strip}>
        <div className={styles.stripInner}>
          {[...STRIP_ITEMS, ...STRIP_ITEMS].map((item, idx) => (
            <span key={idx}>
              <span className={styles.stripDot}>◆</span>&nbsp;&nbsp;{item}
            </span>
          ))}
        </div>
      </div>

      {/* ── CATEGORIES ──────────────────────────────────── */}
      <section className={styles.categorySection}>
        <div className={styles.container}>
          <span className={styles.sectionLabel}>Atelier Curation</span>
          <h2 className={styles.sectionTitle}>Crafted Brews</h2>

          <div className={styles.categoryGrid}>
            {BEVERAGE_CATEGORIES.map((cat) => (
              <div
                key={cat.name}
                className={styles.catCard}
                onClick={() => {
                  setActiveFilter(cat.filter);
                  const el = document.getElementById('collection');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className={styles.catImg}
                />
                <div className={styles.catOverlay} />
                <div className={styles.catContent}>
                  <h3 className={styles.catName}>{cat.name}</h3>
                  <p className={styles.catDesc}>{cat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ────────────────────────────────────── */}
      <section id="collection" className={styles.productsSection}>
        <div className={styles.container}>
          <span className={styles.sectionLabel}>Rare Seasonal Releases</span>
          <h2 className={styles.sectionTitle}>The Collection</h2>

          {/* Underline Filter Tabs */}
          <div className={styles.filterTabs}>
            {FILTER_TABS.map((tab) => (
              <button
                key={tab}
                className={`${styles.filterTab} ${activeFilter === tab ? styles.filterTabActive : ''}`}
                onClick={() => setActiveFilter(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className={styles.productGrid}>
            {filteredProducts.map((p) => (
              <div key={p.id} className={styles.productCard}>
                <div className={styles.productImageWrap}>
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className={styles.productImgMain}
                  />
                  {p.hoverImage && (
                    <Image
                      src={p.hoverImage}
                      alt={`${p.name} detail`}
                      fill
                      className={styles.productImgHover}
                    />
                  )}
                  {p.badge && (
                    <span className={styles.productBadge}>
                      {cleanBadge(p.badge)}
                    </span>
                  )}
                </div>
                <h3 className={styles.productName}>{p.name}</h3>
                <p className={styles.productSubtitle}>{p.subtitle}</p>
                <div className={styles.productFooterRow}>
                  <div className={styles.productPriceRow}>
                    <span className={styles.productPrice}>₹{p.price}</span>
                    {p.originalPrice && (
                      <span className={styles.productOrigPrice}>
                        ₹{p.originalPrice}
                      </span>
                    )}
                  </div>
                  <button
                    className={styles.addToCartBtn}
                    onClick={() => addItem(p)}
                    aria-label={`Add ${p.name} to cart`}
                  >
                    Add +
                  </button>
                </div>
                {p.origin && (
                  <span className={styles.productOrigin}>{p.origin}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SISTER ATELIER PARAMANNA CALLOUT ────────────── */}
      <section className={styles.paramannaCallout}>
        <div className={styles.container}>
          <div className={styles.calloutInner}>
            <div>
              <span className={styles.calloutLabel}>Sister Atelier</span>
              <h2 className={styles.calloutTitle}>
                Paramanna Organic Provisions
              </h2>
              <p className={styles.calloutDesc}>
                Cultured A2 Gir cow Bilona ghee, unheated forest honey, and
                ancient superfood provisions nurtured by indigenous farms across
                India.
              </p>
            </div>
            <Link href="/" className={styles.calloutBtn}>
              Visit Paramanna Organics <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────── */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerGrid}>
            <div>
              <h3 className={styles.footerBrandName}>Renzen</h3>
              <p className={styles.footerDesc}>
                Artisanal teas, single-origin coffees and ceremonial grade
                matcha. An atelier of The House of Paramanna.
              </p>
            </div>

            <div>
              <h4 className={styles.footerColTitle}>Beverages</h4>
              <ul className={styles.footerLinks}>
                <li><a href="#collection" className={styles.footerLink}>First Flush Teas</a></li>
                <li><a href="#collection" className={styles.footerLink}>Single Origin Roasts</a></li>
                <li><a href="#collection" className={styles.footerLink}>Ceremonial Matcha</a></li>
                <li><a href="#collection" className={styles.footerLink}>Cold Brew Blends</a></li>
              </ul>
            </div>

            <div>
              <h4 className={styles.footerColTitle}>The House</h4>
              <ul className={styles.footerLinks}>
                <li><Link href="/" className={styles.footerLink}>Paramanna Organics</Link></li>
                <li><Link href="/tea" className={styles.footerLink}>Tea Atelier</Link></li>
                <li><Link href="/coffees" className={styles.footerLink}>Coffee Atelier</Link></li>
                <li><a href="#" className={styles.footerLink}>Purity Standards</a></li>
              </ul>
            </div>
          </div>

          <div className={styles.footerBottom}>
            © {new Date().getFullYear()} Renzen Beverages. All rights reserved.
            A unit of The House of Paramanna.
          </div>
        </div>
      </footer>
    </div>
  );
}
