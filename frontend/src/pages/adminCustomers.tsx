import { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Mail, MoreHorizontal, Filter } from 'lucide-react';
import styles from '@/styles/Admin.module.css';
import { useToast } from '@/context/ToastContext';

export default function AdminCustomers() {
  const { showToast } = useToast();
  const [customers, setCustomers] = useState<any[]>([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch('/api/customers');
        if (res.ok) {
          const data = await res.json();
          setCustomers(data);
        }
      } catch (err) {
        console.error('Failed to fetch customers', err);
      }
    };
    fetchCustomers();
  }, []);

  return (
    <AdminLayout title="Customers">
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Customers</h1>
          <p className={styles.pageSub}>View registered customers and their purchase history.</p>
        </div>
      </div>

      <div className={styles.sectionBlock}>
        <div className={styles.sectionBlockHeader}>
          <h2 className={styles.sectionBlockTitle}>Customer List</h2>
          <div className={styles.headerActions}>
            <button className={styles.btnAdmin} onClick={() => showToast('Advanced filtering coming soon!')}>
              <Filter size={16} /> Filter
            </button>
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Total Orders</th>
                <th>Total Spent</th>
                <th>Joined Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(customer => (
                <tr key={customer.id}>
                  <td style={{ fontWeight: 500 }}>{customer.id.substring(0, 8)}</td>
                  <td style={{ fontWeight: 600 }}>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.ordersCount}</td>
                  <td style={{ fontWeight: 500 }}>₹{customer.totalSpent}</td>
                  <td>{new Date(customer.joinedAt).toLocaleDateString()}</td>
                  <td>
                    <div className={styles.headerActions} style={{ gap: '0.25rem' }}>
                      <button className={styles.iconBtn} title="Email Customer" onClick={() => window.location.href = `mailto:${customer.email}`}><Mail size={16} /></button>
                      <button className={styles.iconBtn} title="More Options" onClick={() => showToast('More customer options coming soon')}><MoreHorizontal size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
