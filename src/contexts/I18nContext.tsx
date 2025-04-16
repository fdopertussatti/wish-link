'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useParams, usePathname } from 'next/navigation';

interface I18nContextType {
  locale: string;
  t: (key: string, namespace?: string, params?: Record<string, string | number>) => string;
  changeLocale: (locale: string) => void;
  availableLocales: { code: string; name: string }[];
  isLoading: boolean;
}

const availableLocales = [
  { code: 'en', name: 'English' },
  { code: 'pt-BR', name: 'Português (Brasil)' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'zh', name: '中文' }
];

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: ReactNode;
  initialMessages?: Record<string, any>;
}

export function I18nProvider({ children, initialMessages = {} }: I18nProviderProps) {
  const pathname = usePathname();
  const [locale, setLocale] = useState<string>('en');
  const [messages, setMessages] = useState<Record<string, any>>(initialMessages);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Primeiro verificar localStorage para preferência salva
    const storedLocale = localStorage.getItem('preferredLocale');
    if (storedLocale && availableLocales.some(loc => loc.code === storedLocale)) {
      setLocale(storedLocale);
      return;
    }
    
    // Se não houver preferência salva, detectar idioma do navegador
    const browserLang = navigator.language;
    const detectedLocale = availableLocales.find(loc => 
      browserLang.startsWith(loc.code)
    )?.code || 'en';
    
    setLocale(detectedLocale);
  }, []);

  useEffect(() => {
    async function loadMessages() {
      setIsLoading(true);
      try {
        // Load common messages
        const commonModule = await import(`../../messages/${locale}/common.json`);
        
        // Try to determine the current page to load page-specific messages
        let pageMessages = {};
        
        // Extract the base page name
        let pageName = 'home';
        if (pathname === '/') {
          pageName = 'home';
        } else if (pathname.startsWith('/listas/') && pathname !== '/listas') {
          pageName = 'list-details';
        } else if (pathname.startsWith('/compartilhado')) {
          pageName = 'shared-list';
        } else if (pathname === '/listas') {
          pageName = 'lists';
        } else if (pathname === '/como-funciona') {
          pageName = 'how-it-works';
        }
        
        try {
          // Try to load page-specific messages
          const pageModule = await import(`../../messages/${locale}/${pageName}.json`);
          pageMessages = pageModule.default;
        } catch (e) {
          console.warn(`Could not load messages for page ${pageName} in locale ${locale}`);
        }
        
        setMessages({
          common: commonModule.default,
          [pageName]: pageMessages
        });
      } catch (e) {
        console.error('Failed to load messages', e);
      } finally {
        setIsLoading(false);
      }
    }
    
    if (locale) {
      loadMessages();
    }
  }, [locale, pathname]);

  const changeLocale = (newLocale: string) => {
    setLocale(newLocale);
    // Store the locale preference in localStorage
    localStorage.setItem('preferredLocale', newLocale);
    // Get the current URL
    const currentURL = window.location.href;
    // Update the URL with the new locale parameter (this will be a client-side transition)
    window.history.pushState({}, '', currentURL);
  };

  // Translation function
  const t = (key: string, namespace = 'common', params?: Record<string, string | number>): string => {
    // If messages are not loaded yet, return empty string to avoid flashing
    if (!messages || !messages[namespace]) {
      return '';
    }
    
    // Split the key by dots to access nested properties
    const keys = key.split('.');
    
    // Get the namespace object
    const namespaceObj = messages[namespace] || {};
    
    // Navigate through the object using the keys
    let result = keys.reduce((obj, k) => (obj && obj[k] !== undefined ? obj[k] : undefined), namespaceObj);
    
    // If no translation found, return empty string to avoid flashing
    if (result === undefined) {
      return '';
    }
    
    // If the result is a string and there are parameters, replace the placeholders
    if (typeof result === 'string' && params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        result = result.replace(new RegExp(`{${paramKey}}`, 'g'), String(paramValue));
      });
    }
    
    return result;
  };

  return (
    <I18nContext.Provider value={{ locale, t, changeLocale, availableLocales, isLoading }}>
      {!isLoading && children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

// Create a withI18n HOC to make it easier to use the translation function in components
export function withI18n<P extends object>(
  Component: React.ComponentType<P & { t: I18nContextType['t']; locale: string }>
) {
  return function WithI18n(props: P) {
    const { t, locale } = useI18n();
    return <Component {...props} t={t} locale={locale} />;
  };
} 