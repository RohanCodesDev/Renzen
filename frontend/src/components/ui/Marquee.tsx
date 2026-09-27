import styles from './Marquee.module.css';
import { Leaf, Coffee, Sprout, Sparkles, Rocket } from 'lucide-react';

const ITEMS = [
  { icon: <Leaf size={18} className="inline mr-2 align-text-bottom" />, text: 'Premium Matcha' },
  { icon: <Coffee size={18} className="inline mr-2 align-text-bottom" />, text: 'Single Origin Coffee' },
  { icon: <Sprout size={18} className="inline mr-2 align-text-bottom" />, text: 'Organic Goodness' },
  { icon: <Coffee size={18} className="inline mr-2 align-text-bottom" />, text: 'Darjeeling First Flush' },
  { icon: <Leaf size={18} className="inline mr-2 align-text-bottom" />, text: 'Farm-to-Table Spices' },
  { icon: <Sprout size={18} className="inline mr-2 align-text-bottom" />, text: 'Vegan Friendly' },
  { icon: <Sparkles size={18} className="inline mr-2 align-text-bottom" />, text: 'No Preservatives' },
  { icon: <Rocket size={18} className="inline mr-2 align-text-bottom" />, text: 'Free Shipping ₹499+' },
];

export default function Marquee() {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div className={styles.wrapper}>
      <div className={styles.track}>
        {doubled.map((item, i) => (
          <span key={i} className={styles.item}>
            {item.icon} {item.text}
            <span className={styles.dot}>•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
