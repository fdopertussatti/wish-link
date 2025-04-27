'use client';

import { useI18n } from '@/contexts/I18nContext';
import Link from 'next/link';
import Image from 'next/image';

type TranslationKey = 
  | 'footer.rights'
  | 'footer.privacy'
  | 'footer.terms'
  | 'footer.madeBy';

const defaultTranslations: Record<TranslationKey, string> = {
  'footer.rights': 'All rights reserved.',
  'footer.privacy': 'Privacy Policy',
  'footer.terms': 'Terms of Service',
  'footer.madeBy': 'Made by'
};

export function Footer() {
  const { t, isLoading } = useI18n();

  const translate = (key: string) => {
    return t(`footer.${key}`) || defaultTranslations[`footer.${key}` as TranslationKey];
  };

  if (isLoading) {
    return (
      <footer className="w-full border-t border-gray-200 dark:border-gray-700 py-6 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="h-8 w-40 bg-gray-200 dark:bg-gray-700 animate-pulse rounded mb-4 md:mb-0"></div>
            <div>
              <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
              <div className="flex space-x-4 mt-2">
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-700 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="flex items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">{translate('madeBy')}</span>
              <Image 
                src="/pertussatti_logo.svg" 
                alt="Pertussatti Logo" 
                width={120} 
                height={40}
                className="dark:filter dark:invert"
              />
            </div>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <p>© 2024 WishLink. {translate('rights')}</p>
            <div className="flex space-x-4 mt-2">
              <Link href="/privacy" className="hover:text-primary">
                {translate('privacy')}
              </Link>
              <Link href="/terms" className="hover:text-primary">
                {translate('terms')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 