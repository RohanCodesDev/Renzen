import styles from './Marquee.module.css';

const ITEMS = [
  '🍵 Premium Matcha',
  '☕ Single Origin Coffee',
  '🌿 Organic Goodness',
  '🫖 Darjeeling First Flush',
  '🧄 Farm-to-Table Spices',
  '🌱 Vegan Friendly',
  '✨ No Preservatives',
  '🚀 Free Shipping ₹499+',
];

export default function Marquee() {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div className={styles.wrapper}>
      <div className={styles.track}>
        {doubled.map((item, i) => (
          <span key={i} className={styles.item}>
            {item}
            <span className={styles.dot}>•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
