'use client';

import { useSearchParams } from 'next/navigation';
import { useI18n } from '@/contexts/I18nContext';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { FaExclamationTriangle } from 'react-icons/fa';

export default function AuthError() {
  const { t } = useI18n();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const getErrorMessage = () => {
    switch (error) {
      case 'OAuthSignin':
      case 'OAuthCallback':
      case 'OAuthCreateAccount':
      case 'EmailCreateAccount':
      case 'Callback':
        return t('auth.error.oauth');
      case 'AccessDenied':
        return t('auth.error.accessDenied');
      case 'Verification':
        return t('auth.error.verification');
      case 'Configuration':
        return t('auth.error.configuration');
      default:
        return t('auth.error.default');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
              <FaExclamationTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {t('auth.error.title')}
          </h2>
          <p className="mt-2 text-sm text-red-600">
            {getErrorMessage()}
          </p>
        </div>
        
        <div className="mt-8 space-y-4">
          <Link href="/auth/signin" className="w-full">
            <Button variant="primary" className="w-full">
              {t('auth.error.tryAgain')}
            </Button>
          </Link>
          
          <div className="text-center">
            <Link href="/" className="text-sm font-medium text-purple-600 hover:text-purple-500">
              {t('auth.error.backToHome')}
            </Link>
          </div>
        </div>
        
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>{t('auth.error.help')}</p>
        </div>
      </div>
    </div>
  );
} 