'use client';

import { I18nProvider } from '@/contexts/I18nContext';
import { SessionProvider } from 'next-auth/react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <I18nProvider>
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
      </I18nProvider>
    </SessionProvider>
  );
} 