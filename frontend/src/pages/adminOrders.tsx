import { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Eye, CheckCircle, Truck, Filter, X } from 'lucide-react';
import styles from '@/styles/Admin.module.css';
import { useToast } from '@/context/ToastContext';

export default function AdminOrders() {
  const { showToast } = useToast();
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/orders');
        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        }
      } catch (err) {
        console.error('Failed to fetch orders', err);
      }
    };
    fetchOrders();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
        showToast(`Order ${id.substring(0, 8)} marked as ${newStatus}!`);
      }
    } catch (err) {
      showToast('Failed to update status');
    }
  };

  return (
    <AdminLayout title="Orders">
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Orders</h1>
          <p className={styles.pageSub}>View and fulfill customer orders.</p>
        </div>
      </div>

      <div className={styles.sectionBlock}>
        <div className={styles.sectionBlockHeader}>
          <h2 className={styles.sectionBlockTitle}>Recent Orders</h2>
          <div className={styles.headerActions}>
            <button className={styles.btnAdmin}>
              <Filter size={16} /> Filter
            </button>
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Fulfillment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td style={{ fontWeight: 500 }}>{order.id.substring(0, 8)}</td>
                  <td>{order.customer?.name}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td style={{ fontWeight: 600 }}>₹{order.total}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${order.payment === 'Paid' ? styles.statusCompleted : styles.statusPending}`}>
                      {order.payment}
                    </span>
                  </td>
                  <td>
                    <span className={`${styles.statusBadge} ${
                      order.status === 'Delivered' ? styles.statusCompleted :
                      order.status === 'Processing' ? styles.statusPending :
                      styles.statusProcessing
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <div className={styles.headerActions} style={{ gap: '0.25rem' }}>
                      <button className={styles.iconBtn} title="View Details" onClick={() => setSelectedOrder(order)}><Eye size={16} /></button>
                      <button className={styles.iconBtn} title="Mark as Shipped" onClick={() => updateStatus(order.id, 'Shipped')}><Truck size={16} /></button>
                      <button className={styles.iconBtn} title="Mark as Delivered" onClick={() => updateStatus(order.id, 'Delivered')}><CheckCircle size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(255,255,255,0.9)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'white', border: '1px solid var(--brown-dark)', padding: '2.5rem', width: '90%', maxWidth: '500px', position: 'relative' }}>
            <button 
              onClick={() => setSelectedOrder(null)} 
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--brown-dark)' }}
            >
              <X size={24} />
            </button>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--brown-dark)', marginBottom: '0.5rem' }}>Order {selectedOrder.id.substring(0, 8)}</h2>
            <p style={{ color: 'var(--brown-mid)', fontSize: '0.9rem', marginBottom: '2rem' }}>Placed on {new Date(selectedOrder.createdAt).toLocaleDateString()}</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <h3 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--brown-mid)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Customer Details</h3>
                <p style={{ color: 'var(--brown-dark)', fontWeight: 600 }}>{selectedOrder.customer?.name}</p>
                <p style={{ color: 'var(--brown-dark)', fontSize: '0.9rem' }}>{selectedOrder.customer?.email}</p>
                <p style={{ color: 'var(--brown-dark)', fontSize: '0.9rem', marginTop: '0.25rem' }}>{selectedOrder.customer?.address}</p>
              </div>

              <div>
                <h3 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--brown-mid)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Items</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {selectedOrder.items.map((item: any, idx: number) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--brown-dark)', fontSize: '0.9rem' }}>
                      <span>{item.qty}x {item.productName}</span>
                      <span>₹{item.price}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--brown-dark)', fontSize: '1.1rem', fontWeight: 700, marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                  <span>Total</span>
                  <span>₹{selectedOrder.total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
