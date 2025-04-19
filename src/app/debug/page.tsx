'use client';

import { useI18n } from '@/contexts/I18nContext';
import { useEffect } from 'react';

export default function DebugPage() {
  const { t, locale, isLoading, messages, availableLocales } = useI18n();

  useEffect(() => {
    console.log('Debug - Current locale:', locale);
    console.log('Debug - Loading state:', isLoading);
    console.log('Debug - Available locales:', availableLocales);
    console.log('Debug - All messages:', messages);
  }, [locale, isLoading, messages, availableLocales]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Debug Information</h1>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Current State</h2>
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(
            {
              locale,
              isLoading,
              availableLocales,
            },
            null,
            2
          )}
        </pre>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Loaded Messages</h2>
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(messages, null, 2)}
        </pre>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Translation Tests</h2>
        <div className="space-y-2">
          <p>
            <strong>Auth Title:</strong> {t('auth.signin.title', 'auth')}
          </p>
          <p>
            <strong>Auth Description:</strong> {t('auth.signin.description', 'auth')}
          </p>
          <p>
            <strong>App Name:</strong> {t('app.name', 'common')}
          </p>
        </div>
      </section>
    </div>
  );
} 