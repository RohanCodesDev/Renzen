import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ToastProvider } from '@/context/ToastContext';
import { CartProvider } from '@/context/CartContext';
import ToastContainer from '@/components/ui/Toast';
import CartDrawer from '@/components/ui/CartDrawer';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ToastProvider>
      <CartProvider>
        <Component {...pageProps} />
        {/* Global UI overlays */}
        <ToastContainer />
        <CartDrawer />
      </CartProvider>
    </ToastProvider>
  );
}
