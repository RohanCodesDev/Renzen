import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import ParamannoNavbar from '@/components/paramanno/ParamannoNavbar';
import ParamannoProductCard from '@/components/paramanno/ParamannoProductCard';
import { PARAMANNO_PRODUCTS } from '@/data';
import { Sun, ShieldCheck, Sparkles, Droplets, HeartHandshake, Award, ArrowRight } from 'lucide-react';
import styles from '@/styles/Paramanno.module.css';

const CATEGORIES = [
  { label: 'All Harvest', count: '12 items' },
  { label: 'Ghee', count: 'A2 Vedic Bilona' },
  { label: 'Honey', count: 'Raw Forest Nectar' },
  { label: 'Seeds', count: 'Superfood Seeds' },
  { label: 'Spices', count: 'Lakadong & Saffron' },
  { label: 'Oils', count: 'Cold Pressed Kohlu' },
];

export default function ParamannoHomePage() {
  const [activeCategory, setActiveCategory] = useState('All Harvest');

  const filteredProducts = activeCategory === 'All Harvest'
    ? PARAMANNO_PRODUCTS
    : PARAMANNO_PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <>
      <Head>
        <title>Paramanno Organic Foods — Vedic A2 Ghee, Raw Forest Honey & Superfoods</title>
        <meta
          name="description"
          content="Traditional Indian organic foods. Vedic A2 Gir cow Bilona ghee, unheated wild forest honey, and organic superfoods. The mother brand of The House of Paramanno."
        />
      </Head>

      <ParamannoNavbar />

      <main className={styles.mainWrapper}>
        {/* ── HERITAGE HERO ────────────────────────────────────────── */}
        <section className={styles.heroSection}>
          <div className={styles.heroContainer}>
            <div className={styles.heroTextCol}>
              <span className={styles.heroEyebrow}>
                <Sparkles size={14} className={styles.heroEyebrowIcon} />
                Mother Brand • The House of Paramanno
              </span>
              <h1 className={styles.heroTitle}>
                Sacred Vedic Harvest.<br />
                <span className={styles.heroTitleGold}>Uncompromised Purity.</span>
              </h1>
              <p className={styles.heroSubtitle}>
                Time-honoured artisanal organic foods crafted according to ancient Ayurvedic principles.
                Cultured A2 Gir cow ghee churned in wooden Bilonas, raw wild forest honey, and sun-dried superfood seeds.
              </p>

              <div className={styles.heroCtas}>
                <a href="#harvest" className={styles.primaryBtn}>
                  Shop Pure Harvest <ArrowRight size={16} />
                </a>
                <a href="#purity" className={styles.secondaryBtn}>
                  Our Vedic Purity Pledge
                </a>
              </div>

              <div className={styles.heroPurityRow}>
                <div className={styles.purityPoint}>
                  <ShieldCheck size={18} color="#C2843A" />
                  <span>Lab Tested 0% Adulteration</span>
                </div>
                <div className={styles.purityPoint}>
                  <Droplets size={18} color="#C2843A" />
                  <span>Cultured Desi Curd Bilona</span>
                </div>
              </div>
            </div>

            <div className={styles.heroMediaCol}>
              <div className={styles.heroImageWrapper}>
                <Image
                  src="https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?w=900&q=85"
                  alt="Vedic A2 Gir Cow Ghee in Earthen Pot"
                  fill
                  className={styles.heroImage}
                  priority
                />
                <div className={styles.heroFloatingSeal}>
                  <Award size={24} color="#D4AF37" />
                  <div>
                    <strong>A2 Vedic Gir Cow</strong>
                    <span>Bilona Churned at Dawn</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SACRED STRIP ─────────────────────────────────────────── */}
        <div className={styles.sacredStrip}>
          <div className={styles.stripInner}>
            <span>🏺 BI-DIRECTIONAL WOODEN CHURNED</span>
            <span>•</span>
            <span>🐝 UNHEATED WILD HONEY</span>
            <span>•</span>
            <span>🌱 SUN-DRIED RAW SEEDS</span>
            <span>•</span>
            <span>✨ GI TAGGED KASHMIRI MONGRA</span>
            <span>•</span>
            <span>🌾 ZERO CHEMICAL PRESERVATIVES</span>
          </div>
        </div>

        {/* ── PRODUCTS SECTION ─────────────────────────────────────── */}
        <section id="harvest" className={styles.harvestSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <div>
                <span className={styles.sectionLabel}>Direct from Indigenous Farms</span>
                <h2 className={styles.sectionTitle}>The Paramanno Harvest</h2>
              </div>
              <p className={styles.sectionDesc}>
                Small batch provisions harvested in harmony with traditional farming cycles.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className={styles.filterPills}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat.label}
                  className={`${styles.filterBtn} ${activeCategory === cat.label ? styles.filterBtnActive : ''}`}
                  onClick={() => setActiveCategory(cat.label)}
                >
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>

            {/* Products Grid */}
            <div className={styles.productGrid}>
              {filteredProducts.map(product => (
                <ParamannoProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* ── PURITY PLEDGE SECTION ────────────────────────────────── */}
        <section id="purity" className={styles.puritySection}>
          <div className={styles.container}>
            <div className={styles.purityHeader}>
              <span className={styles.sectionLabel}>The Vedic Standard</span>
              <h2 className={styles.sectionTitle}>The 4 Pillars of Paramanno Purity</h2>
            </div>

            <div className={styles.pillarsGrid}>
              <div className={styles.pillarCard}>
                <span className={styles.pillarNum}>01</span>
                <h3>Vedic Bilona Churning</h3>
                <p>
                  We never make ghee from industrial milk cream. Only whole cultured curd from grass-fed Gir cows is bi-directionally churned at sunrise to retain granular goodness.
                </p>
              </div>

              <div className={styles.pillarCard}>
                <span className={styles.pillarNum}>02</span>
                <h3>100% Unheated Forest Honey</h3>
                <p>
                  Tribal gatherers harvest honey from wild forest blossoms. It is strained through cotton without pasteurization, preserving natural pollen and live enzymes.
                </p>
              </div>

              <div className={styles.pillarCard}>
                <span className={styles.pillarNum}>03</span>
                <h3>Triple Tested For Toxins</h3>
                <p>
                  Every lot is rigorously tested in accredited laboratories for heavy metals, antibiotic residues, and artificial additives. Complete transparency.
                </p>
              </div>

              <div className={styles.pillarCard}>
                <span className={styles.pillarNum}>04</span>
                <h3>Glass &amp; Earthen Vessels</h3>
                <p>
                  No plastic leaching. Our ghee and honey are packed in food-grade glass jars and clay pots that protect the bio-active prana of the food.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── SISTER BRAND CALLOUT ─────────────────────────────────── */}
        <section className={styles.sisterCalloutSection}>
          <div className={styles.container}>
            <div className={styles.sisterBox}>
              <div className={styles.sisterText}>
                <span className={styles.sisterBadge}>Sister Atelier</span>
                <h2>Looking for Artisanal Teas &amp; Specialty Coffees?</h2>
                <p>
                  Explore <strong>Renzen</strong>, our beverage atelier dedicated to rare Darjeeling flushes, single-origin roasts, and ceremonial grade Uji matcha.
                </p>
              </div>
              <a href="/renzen" className={styles.sisterBtn}>
                Visit Renzen Beverages <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerGrid}>
            <div className={styles.footerBrand}>
              <div className={styles.footerLogo}>
                <Sun size={26} color="#D4AF37" />
                <span>PARAMANNO</span>
              </div>
              <p className={styles.footerTagline}>
                Pure Vedic Harvest &amp; Organic Provisions. The Mother Brand of The House of Paramanno.
              </p>
            </div>

            <div className={styles.footerLinks}>
              <h4>Provisions</h4>
              <ul>
                <li><a href="#harvest">A2 Bilona Ghee</a></li>
                <li><a href="#harvest">Wild Raw Honey</a></li>
                <li><a href="#harvest">Superfood Seeds</a></li>
                <li><a href="#harvest">Cold Pressed Oils</a></li>
              </ul>
            </div>

            <div className={styles.footerLinks}>
              <h4>The House</h4>
              <ul>
                <li><a href="/">The House of Paramanno (Gateway)</a></li>
                <li><a href="/renzen">Renzen Beverages (Sister Atelier)</a></li>
                <li><a href="#purity">Vedic Purity Pledge</a></li>
                <li><a href="#">Farmer Alliances</a></li>
              </ul>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <p>© {new Date().getFullYear()} Paramanno Organic Foods. All rights reserved. A core unit of The House of Paramanno.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
