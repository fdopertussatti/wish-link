'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { useI18n } from '@/contexts/I18nContext';
import { Button } from '../ui/Button';
import { FaSignOutAlt } from 'react-icons/fa';

interface LogoutConfirmationProps {
  onClose: () => void;
}

export function LogoutConfirmation({ onClose }: LogoutConfirmationProps) {
  const { t } = useI18n();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    await signOut({ callbackUrl: '/' });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-purple-100">
            <FaSignOutAlt className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            {t('auth.logout.title')}
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            {t('auth.logout.confirmation')}
          </p>
        </div>
        
        <div className="mt-6 flex flex-col gap-3">
          <Button
            variant="primary"
            onClick={handleLogout}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? t('auth.logout.loading') : t('auth.logout.confirm')}
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="w-full"
          >
            {t('auth.logout.cancel')}
          </Button>
        </div>
      </div>
    </div>
  );
} 