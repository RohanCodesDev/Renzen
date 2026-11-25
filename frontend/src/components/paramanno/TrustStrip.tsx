import styles from '@/styles/ParamannaHome.module.css';

export default function TrustStrip() {
  return (
    <section className={styles.trustStrip} aria-label="Certifications">
      <div className={styles.container}>
        <p className={styles.trustLine}>
          FSSAI Certified &nbsp;·&nbsp; India Organic &nbsp;·&nbsp; Lab-Tested &nbsp;·&nbsp; Farm Direct
        </p>
      </div>
    </section>
  );
}
