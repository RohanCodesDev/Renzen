import styles from '@/styles/ParamannaHome.module.css';

const PATRON_NOTES = [
  {
    quote:
      'The A2 Vedic Ghee has the nutty, granular texture I have not encountered since childhood summers in Gujarat. Remarkably clean on the palate.',
    author: 'Ananya Swaminathan',
    context: 'Mumbai · A2 Vedic Bilona Ghee',
  },
  {
    quote:
      'Unheated Nilgiri forest honey that naturally crystallizes when the weather cools. You can taste immediately that it has never seen high heat.',
    author: 'Vikram Ramanathan',
    context: 'Bengaluru · Wild Forest Raw Honey',
  },
  {
    quote:
      'Their dark amber glass jars and direct origin notes make Paramanna my trusted household pantry for authentic Ayurvedic staples.',
    author: 'Dr. Meera Kulkarni',
    context: 'New Delhi · Saffron & Lakadong Turmeric',
  },
];

export default function Testimonials() {
  return (
    <section id="reviews" className={styles.testimonialSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div>
            <span className={styles.sectionEyebrow}>Patron Correspondence</span>
            <h2 className={styles.sectionHeading}>Notes from Mindful Kitchens</h2>
          </div>
        </div>

        <div className={styles.patronGrid}>
          {PATRON_NOTES.map((note) => (
            <blockquote key={note.author} className={styles.patronNote}>
              <p className={styles.patronQuote}>&ldquo;{note.quote}&rdquo;</p>
              <footer className={styles.patronFooter}>
                <span className={styles.patronAuthor}>{note.author}</span>
                <span className={styles.patronContext}>{note.context}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
