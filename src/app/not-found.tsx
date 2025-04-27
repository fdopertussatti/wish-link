'use client';

import Link from 'next/link';
import { useI18n } from '@/contexts/I18nContext';

export default function NotFound() {
  const { t } = useI18n();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {t('notFound.title') || 'Page Not Found'}
        </h2>
        <p className="text-gray-600 mb-6">
          {t('notFound.description') || 'The page you are looking for doesn\'t exist or has been moved.'}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <Link
            href="/"
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
          >
            {t('notFound.goHome') || 'Go to Homepage'}
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            {t('notFound.goBack') || 'Go Back'}
          </button>
        </div>
      </div>
    </div>
  );
} 