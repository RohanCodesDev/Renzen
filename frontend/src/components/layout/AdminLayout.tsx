import Head from 'next/head';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  LogOut,
  Search,
  Bell,
  MessageSquare,
  Coffee,
  Check
} from 'lucide-react';
import styles from '@/styles/Admin.module.css';
import { useMessages } from '@/context/MessagesContext';

export default function AdminLayout({ children, title = "Admin Dashboard" }: { children: React.ReactNode, title?: string }) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const { queries, unreadCount, markAsRead } = useMessages();
  
  const navItems = [
    { id: '/admin', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
    { id: '/adminProducts', icon: <Package size={18} />, label: 'Products' },
    { id: '/adminOrders', icon: <ShoppingCart size={18} />, label: 'Orders' },
    { id: '/adminCustomers', icon: <Users size={18} />, label: 'Customers' },
    { id: '/adminSettings', icon: <Settings size={18} />, label: 'Settings' },
  ];

  return (
    <>
      <Head>
        <title>{title} — Renzen</title>
      </Head>

      <div className={styles.adminLayout}>
        {/* Mobile Overlay */}
        <div 
          className={`${styles.sidebarOverlay} ${isSidebarOpen ? styles.sidebarOverlayOpen : ''}`} 
          onClick={() => setIsSidebarOpen(false)}
        />

        <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
          <div className={styles.brand}>
            <Coffee size={24} color="var(--matcha)" />
            <span>Renzen</span>
          </div>

          <nav className={styles.nav}>
            {navItems.map(item => (
              <Link 
                key={item.id} 
                href={item.id}
                className={`${styles.navItem} ${router.pathname === item.id ? styles.navItemActive : ''}`}
                onClick={() => setIsSidebarOpen(false)}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}

            <button className={`${styles.navItem} ${styles.logoutBtn}`}>
              <LogOut size={18} />
              <span>Log Out</span>
            </button>
          </nav>
        </aside>

        <main className={styles.mainContent}>
          <header className={styles.topbar}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <button 
                className={`${styles.iconBtn} ${styles.menuToggle}`}
                onClick={() => setIsSidebarOpen(true)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
              </button>
              
              <div className={styles.searchBar}>
                <Search size={16} color="var(--brown-mid)" />
                <input type="text" placeholder="Search orders, products, or customers..." className={styles.searchInput} />
              </div>
            </div>

            <div className={styles.profileSection}>
              <div style={{ position: 'relative' }}>
                <button 
                  className={styles.iconBtn} 
                  onClick={() => setIsMessagesOpen(!isMessagesOpen)}
                >
                  <MessageSquare size={18} />
                  {unreadCount > 0 && (
                    <span className={styles.badge}>{unreadCount}</span>
                  )}
                </button>
                
                {isMessagesOpen && (
                  <div className={styles.notificationsDropdown}>
                    <div style={{ padding: '1rem', borderBottom: '1px solid var(--brown-dark)', background: '#fafafa', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 600, color: 'var(--brown-dark)' }}>Customer Queries</span>
                    </div>
                    {queries.length === 0 ? (
                      <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--brown-mid)', fontSize: '0.9rem' }}>
                        No queries yet.
                      </div>
                    ) : (
                      queries.map(q => (
                        <div key={q.id} className={`${styles.notificationItem} ${!q.isRead ? styles.notificationUnread : ''}`}>
                          <h4>
                            {q.name}
                            <span style={{ fontSize: '0.75rem', color: 'var(--brown-mid)', fontWeight: 400 }}>
                              {new Date(q.createdAt).toLocaleDateString()}
                            </span>
                          </h4>
                          <p style={{ fontSize: '0.75rem', marginBottom: '0.25rem' }}>{q.email}</p>
                          <p>{q.message}</p>
                          {!q.isRead && (
                            <button 
                              onClick={() => markAsRead(q.id)}
                              style={{ background: 'none', border: 'none', color: 'var(--matcha)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.5rem', padding: 0 }}
                            >
                              <Check size={14} /> Mark as read
                            </button>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>

              <button className={styles.iconBtn}>
                <Bell size={18} />
              </button>
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80" 
                alt="Admin Avatar" 
                className={styles.profileAvatar} 
              />
            </div>
          </header>

          <div className={styles.dashboard}>
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
