import Head from 'next/head';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import TeaProducts from '@/components/ui/TeaProducts';
import styles from '@/styles/Category.module.css';
export default function TeaPage() {
  return (
    <>
      <Head>
        <title>Premium Teas & Matcha — Renzen</title>
        <meta name="description" content="Discover our hand-picked selection of premium teas and vibrant stone-ground matchas." />
      </Head>

      <Navbar />

      <main className={styles.splitLayout}>
        <section className={styles.stickyHero}>
          <Image
            src="/hero-tea.jpg"
            alt="Misty tea estate at golden hour"
            fill
            className={styles.heroBg}
            priority
            unoptimized
          />
          <div className={styles.heroOverlay} />
          
          <div className={styles.heroContent}>
            <span className={styles.heroEyebrow}>Our Curation</span>
            <h1 className={styles.title}>The Tea<br/>Collection.</h1>
            <p className={styles.subtitle}>
              From the misty hills of Darjeeling to the vibrant matcha fields of Uji. 
              Sourced directly from organic estates for the perfect brew.
            </p>
          </div>
        </section>

        {/* ── RIGHT: SCROLLING PRODUCTS ──────────────────────────────────────────── */}
        <section className={styles.scrollingContent}>
          <TeaProducts />
        </section>
      </main>
    </>
  );
}
