'use client';

import { Inter } from 'next/font/google';
import { I18nProvider } from '@/contexts/I18nContext';
import { SessionProvider } from 'next-auth/react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { LocaleHtmlLang } from '@/components/layout/LocaleHtmlLang';
import ErrorBoundary from '@/components/ErrorBoundary';
import PerformanceMonitor from '@/components/PerformanceMonitor';
import './globals.css';
import { WishListProvider } from '@/contexts/WishListContext';
import { CookieConsent } from '@/components/CookieConsent';
import { Suspense } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ErrorBoundary>
          <I18nProvider>
            <SessionProvider>
              <LocaleHtmlLang />
              <PerformanceMonitor />
              <WishListProvider>
                <div className="min-h-screen flex flex-col">
                  <Navbar />
                  <main className="flex-grow">
                    {children}
                  </main>
                  <Footer />
                  <CookieConsent />
                </div>
              </WishListProvider>
            </SessionProvider>
          </I18nProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
} 