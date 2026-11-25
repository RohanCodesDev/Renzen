import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import styles from '@/styles/ParamannaHome.module.css';

export default function HeroSection() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroSplit}>
        {/* Left: Editorial Statement & Single Primary Action */}
        <div className={styles.heroContentCol}>
          <h1 className={styles.heroTitle}>
            Pure, Small-Batch Indian Pantry.
          </h1>

          <p className={styles.heroSubtext}>
            Wood-churned A2 Gir cow ghee, raw forest honey, and cold-pressed
            oils—sourced straight from Indian farms.
          </p>

          <div className={styles.heroCtasRow}>
            <a href="#provisions" className={styles.heroPrimaryBtn}>
              Shop Pantry <ArrowRight size={15} strokeWidth={1.6} />
            </a>
          </div>
        </div>

        {/* Right: Direct Sibling Full-Height Editorial Frame */}
        <div className={styles.heroImgFrame}>
          <Image
            src="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=1200&q=85"
            alt="Golden raw forest honey jar with fresh honeycomb in warm sunlight"
            fill
            sizes="(max-width: 767px) 100vw, 48vw"
            className={styles.heroImg}
            priority
          />
        </div>
      </div>
    </section>
  );
}
