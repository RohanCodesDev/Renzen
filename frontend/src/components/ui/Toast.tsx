import { useEffect, useState } from 'react';
import { useToast, ToastMessage } from '@/context/ToastContext';
import styles from './Toast.module.css';

function ToastItem({ toast }: { toast: ToastMessage }) {
  const { removeToast } = useToast();
  const [exiting, setExiting] = useState(false);

  const dismiss = () => {
    setExiting(true);
    setTimeout(() => removeToast(toast.id), 350);
  };

  // Trigger exit animation just before auto-remove
  useEffect(() => {
    const timer = setTimeout(() => setExiting(true), 3100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`${styles.toast} ${styles[toast.type ?? 'success']} ${exiting ? styles.exit : styles.enter}`}
      role="alert"
    >
      <span className={styles.emoji}>{toast.emoji}</span>
      <span className={styles.message}>{toast.message}</span>
      <button className={styles.close} onClick={dismiss} aria-label="Close">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M18 6 6 18M6 6l12 12"/>
        </svg>
      </button>
    </div>
  );
}

export default function ToastContainer() {
  const { toasts } = useToast();

  return (
    <div className={styles.container} aria-live="polite">
      {toasts.map(t => <ToastItem key={t.id} toast={t} />)}
    </div>
  );
}
