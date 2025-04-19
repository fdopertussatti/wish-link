'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useI18n } from '@/contexts/I18nContext';
import { Button } from '../ui/Button';
import { FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { LogoutConfirmation } from './LogoutConfirmation';
import Link from 'next/link';

export function UserMenu() {
  const { data: session } = useSession();
  const { t } = useI18n();
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  if (!session) {
    return (
      <div className="flex items-center gap-4">
        <Link href="/auth/signin">
          <Button variant="outline">{t('auth.signin.title')}</Button>
        </Link>
        <Link href="/auth/signup">
          <Button variant="primary">{t('auth.signup.title')}</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      <Button
        variant="secondary"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
      >
        <FaUser className="w-5 h-5" />
        <span className="hidden md:inline">{session.user?.name}</span>
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <Link
              href="/profile"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              <FaUser className="w-4 h-4 mr-2" />
              {t('auth.menu.profile')}
            </Link>
            <Link
              href="/settings"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              <FaCog className="w-4 h-4 mr-2" />
              {t('auth.menu.settings')}
            </Link>
            <button
              onClick={() => {
                setIsOpen(false);
                setShowLogoutConfirmation(true);
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              <FaSignOutAlt className="w-4 h-4 mr-2" />
              {t('auth.menu.logout')}
            </button>
          </div>
        </div>
      )}

      {showLogoutConfirmation && (
        <LogoutConfirmation onClose={() => setShowLogoutConfirmation(false)} />
      )}
    </div>
  );
} 