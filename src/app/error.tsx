'use client';

import { useEffect } from 'react';
import { useI18n } from '@/contexts/I18nContext';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useI18n();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Page Error:', error);
    
    // Aqui poderia enviar para Sentry ou outro serviço
    // if (typeof window !== 'undefined' && window.Sentry) {
    //   window.Sentry.captureException(error);
    // }
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          {t('error.title') || 'Something went wrong'}
        </h2>
        <p className="text-gray-600 mb-6">
          {t('error.description') || 'We\'re sorry, but something went wrong. Please try again later.'}
        </p>
        {error?.message && process.env.NODE_ENV === 'development' && (
          <div className="mt-4 p-4 bg-gray-100 rounded-md text-left overflow-auto max-h-48">
            <p className="font-mono text-sm text-red-500">{error.message}</p>
            {error.stack && (
              <p className="font-mono text-xs mt-2 text-gray-700">{error.stack}</p>
            )}
            {error.digest && (
              <p className="mt-2 text-xs text-gray-500">Error ID: {error.digest}</p>
            )}
          </div>
        )}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
          >
            {t('error.tryAgain') || 'Try again'}
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            {t('error.goHome') || 'Go to Homepage'}
          </button>
        </div>
      </div>
    </div>
  );
} 