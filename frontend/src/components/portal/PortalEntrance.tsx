import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Leaf, Sparkles, Sun, ShieldCheck, Heart, Coffee, Droplets } from 'lucide-react';
import styles from './PortalEntrance.module.css';

export default function PortalEntrance() {
  const [splashVisible, setSplashVisible] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    // Welcome splash stays for 2.2 seconds then smoothly dissolves
    const timer = setTimeout(() => {
      setFadingOut(true);
      setTimeout(() => setSplashVisible(false), 800);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  const handleSkipSplash = () => {
    setFadingOut(true);
    setTimeout(() => setSplashVisible(false), 400);
  };

  return (
    <div className={styles.portalWrapper}>
      {/* ── INTRO SPLASH OVERLAY ─────────────────────────────────── */}
      {splashVisible && (
        <div
          className={`${styles.splashOverlay} ${fadingOut ? styles.splashFadeOut : ''}`}
          onClick={handleSkipSplash}
        >
          <div className={styles.splashContent}>
            <span className={styles.splashBadge}>
              <Sparkles size={16} /> Welcome to the Heritage
            </span>
            <h1 className={styles.splashTitle}>
              The House of <span className={styles.splashGold}>Paramanno</span>
            </h1>
            <p className={styles.splashSubtitle}>
              Two distinct ateliers. One unwavering commitment to purity, craft, and mindful living.
            </p>
            <div className={styles.splashLoader}>
              <div className={styles.splashBar} />
            </div>
            <button className={styles.skipBtn} onClick={handleSkipSplash}>
              Click to Explore Instantly ↓
            </button>
          </div>
        </div>
      )}

      {/* ── MAIN DUAL-BRAND SHOWCASE ─────────────────────────────── */}
      <header className={styles.portalHeader}>
        <div className={styles.brandHeaderInner}>
          <div className={styles.houseCrest}>
            <Sparkles size={20} className={styles.crestIcon} />
            <div>
              <span className={styles.crestSuper}>Curated By</span>
              <h2 className={styles.crestTitle}>THE HOUSE OF PARAMANNO</h2>
            </div>
          </div>
          <p className={styles.crestTagline}>Select your destination atelier below</p>
        </div>
      </header>

      <main className={styles.dualGrid}>
        {/* ── LEFT: RENZEN (BEVERAGES & GEN-Z BOTANICAL) ─────────── */}
        <div className={`${styles.brandCard} ${styles.renzenCard}`}>
          <div className={styles.cardBg}>
            <Image
              src="https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=1200&q=85"
              alt="Artisanal Tea and Matcha Preparation"
              fill
              className={styles.bgImage}
              priority
            />
            <div className={styles.overlayRenzen} />
          </div>

          <div className={styles.cardContent}>
            <div className={styles.brandBadgeRenzen}>
              <Leaf size={14} /> The Beverage Atelier
            </div>

            <h2 className={styles.brandName}>RENZEN</h2>
            <p className={styles.brandStatement}>
              Mindful sips crafted for the new generation. Artisanal flushes, single-origin roasts, and ceremonial grade matchas.
            </p>

            <div className={styles.offeringPills}>
              <span>🍵 First Flush Teas</span>
              <span>☕ Single Origin Coffee</span>
              <span>⚡ Ceremonial Matcha</span>
              <span>🧊 Cold Brew Blends</span>
            </div>

            <div className={styles.vibeCallout}>
              <span className={styles.vibeLabel}>VIBE:</span>
              <span>Gen-Z Minimalist • High Kinetic Energy • Clean Botanical</span>
            </div>

            <Link href="/renzen" className={`btn ${styles.enterBtnRenzen}`}>
              Explore Renzen Beverages <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        {/* ── RIGHT: PARAMANNO (HERITAGE ORGANIC FOODS) ──────────── */}
        <div className={`${styles.brandCard} ${styles.paramannoCard}`}>
          <div className={styles.cardBg}>
            <Image
              src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=1200&q=85"
              alt="Raw Honey and Organic Harvest"
              fill
              className={styles.bgImage}
              priority
            />
            <div className={styles.overlayParamanno} />
          </div>

          <div className={styles.cardContent}>
            <div className={styles.brandBadgeParamanno}>
              <Sun size={14} /> Heritage Organic Foods
            </div>

            <h2 className={styles.brandName}>PARAMANNO</h2>
            <p className={styles.brandStatement}>
              Time-honored Vedic wellness. Authentic A2 Bilona cow ghee, unfiltered wild forest honey, and sun-dried superfood seeds.
            </p>

            <div className={styles.offeringPills}>
              <span>🏺 Vedic A2 Gir Cow Ghee</span>
              <span>🐝 Wild Forest Raw Honey</span>
              <span>🌱 Superfood Seeds</span>
              <span>✨ Kashmiri Mongra Saffron</span>
            </div>

            <div className={styles.vibeCallout}>
              <span className={styles.vibeLabel}>VIBE:</span>
              <span>Artisanal Luxury • Vedic Roots • 100% Unadulterated</span>
            </div>

            <Link href="/paramanno" className={`btn ${styles.enterBtnParamanno}`}>
              Explore Paramanno Organic Foods <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </main>

      {/* ── SHARED HERITAGE TRUST STRIP ─────────────────────────── */}
      <footer className={styles.portalFooter}>
        <div className={styles.footerContainer}>
          <div className={styles.trustItem}>
            <ShieldCheck size={22} className={styles.trustIcon} />
            <div>
              <h4>100% Certified Purity</h4>
              <p>Every single batch independently lab-tested</p>
            </div>
          </div>
          <div className={styles.trustItem}>
            <Droplets size={22} className={styles.trustIcon} />
            <div>
              <h4>Zero Chemical Nasties</h4>
              <p>No synthetic preservatives or adulterants</p>
            </div>
          </div>
          <div className={styles.trustItem}>
            <Heart size={22} className={styles.trustIcon} />
            <div>
              <h4>Direct Farmer Alliances</h4>
              <p>Ethical fair-trade partnerships across India</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
