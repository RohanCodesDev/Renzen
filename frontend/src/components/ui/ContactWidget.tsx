import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { MessageCircle, X, Send, CheckCircle2 } from 'lucide-react';
import styles from './ContactWidget.module.css';
import { useMessages } from '@/context/MessagesContext';

export default function ContactWidget() {
  const router = useRouter();
  const { addQuery } = useMessages();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const nameInput = form.elements[0] as HTMLInputElement;
    const emailInput = form.elements[1] as HTMLInputElement;
    const msgInput = form.elements[2] as HTMLTextAreaElement;

    await addQuery({
      name: nameInput.value,
      email: emailInput.value,
      message: msgInput.value
    });

    setIsSubmitted(true);
    form.reset();
    
    // Reset after 3 seconds
    setTimeout(() => {
      setIsOpen(false);
      setTimeout(() => setIsSubmitted(false), 300); // Wait for modal close animation
    }, 3000);
  };

  // Hide completely on admin routes
  if (router.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <div className={styles.fabContainer} ref={modalRef}>
      
      {/* The Floating Modal */}
      <div className={`${styles.modal} ${isOpen ? styles.modalOpen : ''}`}>
        <div className={styles.header}>
          <div className={styles.headerIcon}>
            <MessageCircle size={28} />
          </div>
          <div>
            <h3 className={styles.title}>Contact Renzen</h3>
            <p className={styles.subtitle}>We usually reply within a few hours.</p>
          </div>
        </div>

        {isSubmitted ? (
          <div className={styles.successState}>
            <div className={styles.successIcon}>
              <CheckCircle2 size={24} />
            </div>
            <h4 className={styles.successTitle}>Message Sent!</h4>
            <p className={styles.successDesc}>Thank you for reaching out. Our team will get back to you shortly.</p>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Name</label>
              <input required type="text" className={styles.input} placeholder="John Doe" />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Email</label>
              <input required type="email" className={styles.input} placeholder="john@example.com" />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Message</label>
              <textarea required className={styles.textarea} placeholder="How can we help you?" />
            </div>
            <button type="submit" className={styles.submitBtn}>
              <Send size={16} /> Send Message
            </button>
          </form>
        )}
      </div>

      {/* The FAB Button */}
      <button 
        className={styles.fabButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Contact Us"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>
      
    </div>
  );
}
