import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ToastProvider } from '@/context/ToastContext';
import { CartProvider } from '@/context/CartContext';
import { BrandProvider } from '@/context/BrandContext';
import { MessagesProvider } from '@/context/MessagesContext';
import { SessionProvider } from 'next-auth/react';
import ToastContainer from '@/components/ui/Toast';
import CartDrawer from '@/components/ui/CartDrawer';
import ContactWidget from '@/components/ui/ContactWidget';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <BrandProvider>
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
      </BrandProvider>
    </SessionProvider>
  );
}
