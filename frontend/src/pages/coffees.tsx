import Head from 'next/head';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CoffeeProducts from '@/components/ui/CoffeeProducts';
import MirrorBackground from '@/components/ui/MirrorBackground';
import styles from '@/styles/Category.module.css';
import coffeeStyles from '@/styles/Coffee.module.css';

export default function CoffeePage() {
  return (
    <>
      <Head>
        <title>Single Origin Coffees — Renzen</title>
        <meta name="description" content="Discover our hand-picked selection of single origin coffees, cold brews, espresso blends and organic specialty roasts." />
      </Head>

      <Navbar />

      <main className={styles.splitLayout}>
        <section className={`${styles.stickyHero} ${coffeeStyles.stickyHero}`}>
          <div className={coffeeStyles.noisyDarkBrown}>
            <MirrorBackground src="/ce180e641144b17889e9b390073da64d.jpg" tileSize={250} opacity={0.15} mixBlendMode="overlay" />
          </div>
          <div className={styles.heroOverlay} />

          <div className={styles.heroContent}>
            <span className={styles.heroEyebrow}>Our Curation</span>
            <h1 className={styles.title}>
              The <span className={`${styles.cursiveText} ${coffeeStyles.cursiveAccent}`}>Coffee</span><br />Collection.
            </h1>
            <p className={styles.subtitle}>
              From the misty highlands of Ethiopia to the sun-drenched farms of Colombia.
              Sourced directly from farms for the perfect cup.
            </p>
          </div>
        </section>

        <section className={`${styles.scrollingContent} ${coffeeStyles.scrollingContent}`}>
          <MirrorBackground src="/ce180e641144b17889e9b390073da64d.jpg" tileSize={350} opacity={0.06} mixBlendMode="multiply" />
          <CoffeeProducts />
        </section>
      </main>

      <Footer variant="brown" />
    </>
  );
}
