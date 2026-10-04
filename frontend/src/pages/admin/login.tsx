import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Coffee } from 'lucide-react';
import styles from '@/styles/Admin.module.css';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError('Invalid email or password');
      setLoading(false);
    } else {
      router.push('/admin');
    }
  };

  return (
    <>
      <Head>
        <title>Admin Login — Renzen</title>
      </Head>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'var(--bg-cream)' }}>
        <div style={{ background: 'white', padding: '3rem', borderRadius: '8px', border: '1px solid var(--brown-dark)', width: '100%', maxWidth: '400px', boxShadow: '4px 4px 0 var(--brown-dark)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
            <Coffee size={32} color="var(--matcha)" />
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--brown-dark)' }}>Renzen Admin</h1>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {error && <p style={{ color: 'var(--orange-dark)', fontSize: '0.9rem', textAlign: 'center', fontWeight: 600 }}>{error}</p>}
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--brown-dark)' }}>Email</label>
              <input 
                required 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.searchBar} 
                style={{ width: '100%' }} 
                placeholder="admin@renzen.com"
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--brown-dark)' }}>Password</label>
              <input 
                required 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.searchBar} 
                style={{ width: '100%' }} 
              />
            </div>

            <button 
              type="submit" 
              className={`${styles.btnAdmin} ${styles.btnPrimary}`} 
              style={{ width: '100%', marginTop: '0.5rem' }}
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
