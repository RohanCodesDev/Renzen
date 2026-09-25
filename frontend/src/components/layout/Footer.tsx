import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Brand Info */}
          <div className={styles.brandCol}>
            <h2 className={styles.logo}>Renzen</h2>
            <p className={styles.description}>
              Elevating the art of tea. From the misty hills of Darjeeling to the vibrant matcha fields of Uji, we bring the world's finest leaves directly to your cup.
            </p>
          </div>

          {/* Links */}
          <div className={styles.linksCol}>
            <h3 className={styles.heading}>Shop</h3>
            <ul className={styles.list}>
              <li><Link href="/tea">Tea Collection</Link></li>
              <li><Link href="/matcha">Ceremonial Matcha</Link></li>
              <li><Link href="/coffee">Artisan Coffee</Link></li>
              <li><Link href="/teaware">Teaware</Link></li>
            </ul>
          </div>

          <div className={styles.linksCol}>
            <h3 className={styles.heading}>About</h3>
            <ul className={styles.list}>
              <li><Link href="/our-story">Our Story</Link></li>
              <li><Link href="/sourcing">Sourcing Practices</Link></li>
              <li><Link href="/journal">The Journal</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className={styles.newsletterCol}>
            <h3 className={styles.heading}>Join the Club</h3>
            <p className={styles.subtext}>Subscribe for early access to rare flushes and new harvests.</p>
            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Your email address" className={styles.input} />
              <button type="submit" className={styles.submitBtn}>→</button>
            </form>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} Renzen Tea Co. All rights reserved.</p>
          <div className={styles.legal}>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
