import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import styles from '@/styles/ParamannaHome.module.css';

export default function RenzenBanner() {
  return (
    <section className={styles.renzenBannerSection}>
      <div className={styles.container}>
        <div className={styles.renzenBannerInner}>
          <div className={styles.renzenBannerText}>
            <h2 className={styles.renzenBannerTitle}>
              Also from our house: Renzen
            </h2>
            <p className={styles.renzenBannerDesc}>
              Single-origin Darjeeling teas, Uji matcha, and specialty coffee.
            </p>
          </div>
          <Link href="/renzen" className={styles.renzenBannerBtn}>
            Visit Renzen <ArrowRight size={15} strokeWidth={1.6} />
          </Link>
        </div>
      </div>
    </section>
  );
}
