'use client';

import { useEffect } from 'react';
import { useI18n } from '@/contexts/I18nContext';

export function LocaleHtmlLang() {
  const { locale } = useI18n();

  useEffect(() => {
    // Update the HTML lang attribute when the locale changes
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
} 