import AdminLayout from '@/components/layout/AdminLayout';
import { Save } from 'lucide-react';
import styles from '@/styles/Admin.module.css';

export default function AdminSettings() {
  return (
    <AdminLayout title="Settings">
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Settings</h1>
          <p className={styles.pageSub}>Manage your store preferences and configurations.</p>
        </div>
        <div className={styles.headerActions}>
          <button className={`${styles.btnAdmin} ${styles.btnPrimary}`}>
            <Save size={16} /> Save Changes
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gap: '2rem' }}>
        <div className={styles.sectionBlock}>
          <div className={styles.sectionBlockHeader}>
            <h2 className={styles.sectionBlockTitle}>Store Information</h2>
          </div>
          <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--brown-dark)' }}>Store Name</label>
              <input type="text" defaultValue="Renzen" className={styles.searchBar} style={{ width: '100%', maxWidth: '400px' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--brown-dark)' }}>Support Email</label>
              <input type="email" defaultValue="support@renzen.com" className={styles.searchBar} style={{ width: '100%', maxWidth: '400px' }} />
            </div>
          </div>
        </div>

        <div className={styles.sectionBlock}>
          <div className={styles.sectionBlockHeader}>
            <h2 className={styles.sectionBlockTitle}>Payment Gateway</h2>
          </div>
          <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--brown-dark)' }}>Stripe Secret Key</label>
              <input type="password" defaultValue="sk_test_123456789" className={styles.searchBar} style={{ width: '100%', maxWidth: '600px' }} />
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '0.5rem' }}>
              <input type="checkbox" id="testMode" defaultChecked />
              <label htmlFor="testMode" style={{ fontSize: '0.85rem', color: 'var(--brown-dark)' }}>Enable Test Mode</label>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
