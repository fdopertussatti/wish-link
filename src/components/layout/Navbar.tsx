'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/Button';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { useI18n } from '@/contexts/I18nContext';

export function Navbar() {
  const pathname = usePathname();
  const { t } = useI18n();

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              {t('app.name')}
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link 
              href="/listas"
              className={`text-sm font-medium ${
                pathname.startsWith('/listas')
                  ? 'text-purple-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {t('navigation.myLists')}
            </Link>
            <Link 
              href="/como-funciona"
              className={`text-sm font-medium ${
                pathname === '/como-funciona'
                  ? 'text-purple-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {t('navigation.howItWorks')}
            </Link>
            <LanguageSwitcher />
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              Entrar
            </Button>
            <Button size="sm">
              Criar Conta
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
} 