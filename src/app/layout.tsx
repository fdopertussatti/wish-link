'use client';

import { Inter } from 'next/font/google';
import { I18nProvider } from '@/contexts/I18nContext';
import { SessionProvider } from 'next-auth/react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { LocaleHtmlLang } from '@/components/layout/LocaleHtmlLang';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={inter.className} suppressHydrationWarning>
        <I18nProvider>
          <SessionProvider>
            <LocaleHtmlLang />
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          </SessionProvider>
        </I18nProvider>
      </body>
    </html>
  );
} 