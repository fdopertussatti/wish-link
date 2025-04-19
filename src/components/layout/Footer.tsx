'use client';

import { useI18n } from '@/contexts/I18nContext';

type TranslationKey = 
  | 'footer.rights'
  | 'footer.privacy'
  | 'footer.terms';

const defaultTranslations: Record<TranslationKey, string> = {
  'footer.rights': 'All rights reserved.',
  'footer.privacy': 'Privacy Policy',
  'footer.terms': 'Terms of Service'
};

export function Footer() {
  const { t, isLoading } = useI18n();

  const translate = (key: TranslationKey) => {
    const value = t(key, 'common');
    return value === key ? defaultTranslations[key] : value;
  };

  if (isLoading) {
    return (
      <footer className="bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="h-4 w-64 bg-gray-100 animate-pulse rounded-md" />
            <div className="flex gap-4 mt-4 md:mt-0">
              <div className="h-4 w-24 bg-gray-100 animate-pulse rounded-md" />
              <div className="h-4 w-24 bg-gray-100 animate-pulse rounded-md" />
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-600">
            © {new Date().getFullYear()} WishLink. {translate('footer.rights')}
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a
              href="/privacidade"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              {translate('footer.privacy')}
            </a>
            <a
              href="/termos"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              {translate('footer.terms')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
} 