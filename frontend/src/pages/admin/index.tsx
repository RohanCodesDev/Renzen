import { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { ArrowUpRight, ArrowDownRight, MoreHorizontal, Calendar, Download, Filter } from 'lucide-react';
import styles from '@/styles/Admin.module.css';

export default function AdminDashboard() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/orders');
        if (res.ok) {
          const data = await res.json();
          setOrders(data.slice(0, 5)); // Show only recent 5 orders
        }
      } catch (err) {
        console.error('Failed to fetch orders', err);
      }
    };
    fetchOrders();
  }, []);
  const STATS = [
    { title: 'Total Revenue', value: '₹4,52,000', change: '+12.5%', isPos: true },
    { title: 'Active Orders', value: '142', change: '+5.2%', isPos: true },
    { title: 'Products Sold', value: '1,286', change: '-1.4%', isPos: false },
    { title: 'New Customers', value: '450', change: '+18.2%', isPos: true },
  ];



  return (
    <AdminLayout title="Overview">
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Dashboard</h1>
          <p className={styles.pageSub}>Here's what's happening with your store today.</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.btnAdmin}>
            <Calendar size={16} /> Last 30 Days
          </button>
          <button className={`${styles.btnAdmin} ${styles.btnPrimary}`}>
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      <div className={styles.statsGrid}>
        {STATS.map(stat => (
          <div key={stat.title} className={styles.statCard}>
            <div className={styles.statHeader}>
              <span>{stat.title}</span>
              <MoreHorizontal size={16} className={styles.statIcon} />
            </div>
            <div>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statChange}>
                <span className={stat.isPos ? styles.changePosBg : styles.changeNegBg}>
                  {stat.isPos ? <ArrowUpRight size={12} className="inline mr-1" /> : <ArrowDownRight size={12} className="inline mr-1" />}
                  {stat.change}
                </span>
                <span className={styles.statSubtext}>vs last month</span>
              </div>
            </div>
          </div>
        ))}
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
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td style={{ fontWeight: 500, color: 'var(--brown-dark)' }}>{order.id.substring(0, 8)}</td>
                  <td>
                    {order.customer?.name}
                    <span className={styles.subText}>{order.customer?.email}</span>
                  </td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>
                    {order.items && order.items.length > 0 ? order.items[0].productName : 'No items'}
                    {order.items && order.items.length > 1 && <span className={styles.subText}>+ {order.items.length - 1} more items</span>}
                  </td>
                  <td style={{ fontWeight: 500 }}>₹{order.total}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${
                      order.status === 'Completed' || order.status === 'Delivered' ? styles.statusCompleted :
                      order.status === 'Pending' || order.status === 'Processing' ? styles.statusPending :
                      styles.statusProcessing
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button className={styles.iconBtn}><MoreHorizontal size={16} /></button>
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
