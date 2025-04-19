'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '../ui/Button';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { useI18n } from '@/contexts/I18nContext';
import { useSession } from 'next-auth/react';
import { LogoutConfirmation } from '../auth/LogoutConfirmation';

type TranslationKey = 
  | 'app.name'
  | 'navigation.myLists'
  | 'navigation.howItWorks'
  | 'navigation.login'
  | 'navigation.signup'
  | 'navigation.logout';

const defaultTranslations: Record<TranslationKey, string> = {
  'app.name': 'WishLink',
  'navigation.myLists': 'My Lists',
  'navigation.howItWorks': 'How It Works',
  'navigation.login': 'Login',
  'navigation.signup': 'Sign Up',
  'navigation.logout': 'Logout'
};

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { t, isLoading } = useI18n();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const { data: session, status } = useSession();

  const translate = (key: TranslationKey, namespace = 'common') => {
    const value = t(key, namespace);
    return value === key ? defaultTranslations[key] : value;
  };

  const handleLogin = () => {
    router.push('/auth/signin');
  };

  const handleSignup = () => {
    router.push('/auth/signin?callbackUrl=/onboarding');
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirmation(true);
  };

  const handleMyLists = () => {
    if (!session) {
      router.push('/auth/signin?callbackUrl=/listas');
      return;
    }
    router.push('/listas');
  };

  if (isLoading) {
    return (
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="h-8 w-32 bg-gray-100 animate-pulse rounded-md" />
            <div className="hidden md:flex items-center gap-6">
              <div className="h-4 w-20 bg-gray-100 animate-pulse rounded-md" />
              <div className="h-4 w-24 bg-gray-100 animate-pulse rounded-md" />
            </div>
            <div className="hidden md:flex items-center gap-3">
              <div className="h-9 w-20 bg-gray-100 animate-pulse rounded-md" />
              <div className="h-9 w-20 bg-gray-100 animate-pulse rounded-md" />
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
                {translate('app.name')}
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              <Link 
                href="/listas"
                onClick={(e) => {
                  e.preventDefault();
                  handleMyLists();
                }}
                className={`text-sm font-medium ${
                  pathname.startsWith('/listas')
                    ? 'text-purple-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {translate('navigation.myLists')}
              </Link>
              <Link 
                href="/como-funciona"
                className={`text-sm font-medium ${
                  pathname === '/como-funciona'
                    ? 'text-purple-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {translate('navigation.howItWorks')}
              </Link>
              <LanguageSwitcher />
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center gap-3">
              {status === 'loading' ? (
                <div className="h-9 w-20 bg-gray-100 animate-pulse rounded-md" />
              ) : session ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">
                    {session.user?.name || session.user?.email}
                  </span>
                  <Button variant="outline" size="sm" onClick={handleLogoutClick}>
                    {translate('navigation.logout')}
                  </Button>
                </div>
              ) : (
                <>
                  <Button variant="outline" size="sm" onClick={handleLogin}>
                    {translate('navigation.login')}
                  </Button>
                  <Button size="sm" onClick={handleSignup}>
                    {translate('navigation.signup')}
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
            >
              <span className="sr-only">Open menu</span>
              {!isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link 
                  href="/listas"
                  onClick={(e) => {
                    e.preventDefault();
                    handleMyLists();
                    setIsMenuOpen(false);
                  }}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname.startsWith('/listas')
                      ? 'text-purple-600 bg-purple-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {translate('navigation.myLists')}
                </Link>
                <Link 
                  href="/como-funciona"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname === '/como-funciona'
                      ? 'text-purple-600 bg-purple-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {translate('navigation.howItWorks')}
                </Link>
                {session ? (
                  <button
                    onClick={() => {
                      handleLogoutClick();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  >
                    {translate('navigation.logout')}
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        handleLogin();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    >
                      {translate('navigation.login')}
                    </button>
                    <button
                      onClick={() => {
                        handleSignup();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    >
                      {translate('navigation.signup')}
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {showLogoutConfirmation && (
        <LogoutConfirmation onClose={() => setShowLogoutConfirmation(false)} />
      )}
    </>
  );
} 