import Image from 'next/image';
import styles from '@/styles/ParamannaHome.module.css';

const PROVENANCE_PILLARS = [
  {
    title: 'Direct from Farms',
    description:
      'Ghee from Saurashtra, wild honey from the Nilgiris, and saffron from Pampore.',
  },
  {
    title: 'Lab-Tested Purity',
    description:
      'Every batch is tested in NABL labs for zero pesticides and zero adulteration.',
  },
  {
    title: 'Packed in Glass',
    description:
      'Bottled in dark amber glass to lock in natural flavor and freshness. No plastic.',
  },
];

export default function HowItWorks() {
  return (
    <section id="heritage" className={styles.heritageSection}>
      <div className={styles.container}>
        <div className={styles.heritageGrid}>
          {/* Left: Editorial Farm & Process Photography */}
          <div className={styles.heritageVisual}>
            <Image
              src="https://images.unsplash.com/photo-1589927986089-35812388d1f4?w=1000&q=85"
              alt="Traditional organic harvest and small-farm preparation"
              fill
              sizes="(max-width: 1080px) 100vw, 45vw"
              className={styles.heroImg}
            />
          </div>

          {/* Right: Editorial Narrative & Hairline Pillars */}
          <div className={styles.heritageStoryCol}>
            <h2 className={styles.sectionHeading}>Made Slow, Kept Pure.</h2>

            <p className={styles.heritageLead}>
              Good food shouldn&apos;t be rushed in a factory. We partner with small
              farmers who still churn, press, and harvest by hand.
            </p>

            <div className={styles.heritagePillars}>
              {PROVENANCE_PILLARS.map((pillar) => (
                <div key={pillar.title} className={styles.heritagePillar}>
                  <h3 className={styles.pillarHeading}>{pillar.title}</h3>
                  <p className={styles.pillarBody}>{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
