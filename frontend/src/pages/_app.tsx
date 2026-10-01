import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ToastProvider } from '@/context/ToastContext';
import { CartProvider } from '@/context/CartContext';
import ToastContainer from '@/components/ui/Toast';
import CartDrawer from '@/components/ui/CartDrawer';
import ContactWidget from '@/components/ui/ContactWidget';
import { MessagesProvider } from '@/context/MessagesContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MessagesProvider>
      <ToastProvider>
        <CartProvider>
          <Component {...pageProps} />
          {/* Global UI overlays */}
          <ToastContainer />
          <CartDrawer />
          <ContactWidget />
        </CartProvider>
      </ToastProvider>
    </MessagesProvider>
  );
}
