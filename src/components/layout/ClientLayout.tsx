'use client';

import React from 'react';
import { WishListProvider } from '@/contexts/WishListContext';
import { I18nProvider } from '@/contexts/I18nContext';
import { Navbar } from '@/components/layout/Navbar';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <I18nProvider>
      <WishListProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
        </div>
      </WishListProvider>
    </I18nProvider>
  );
} 