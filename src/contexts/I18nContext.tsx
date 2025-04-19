'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useParams, usePathname } from 'next/navigation';

interface I18nContextType {
  locale: string;
  t: (key: string, namespace?: string, params?: Record<string, string | number>) => string;
  changeLocale: (locale: string) => void;
  availableLocales: { code: string; name: string }[];
  isLoading: boolean;
  messages: Record<string, any>;
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

const loadMessagesForNamespace = async (locale: string, namespace: string) => {
  try {
    const module = await import(`../../messages/${locale}/${namespace}.json`);
    return module.default;
  } catch (e) {
    // Only log warning if not falling back to English
    if (locale !== 'en') {
      console.warn(`Could not load ${namespace} messages for locale ${locale}, falling back to English`);
      try {
        const fallbackModule = await import(`../../messages/en/${namespace}.json`);
        return fallbackModule.default;
      } catch (fallbackError) {
        console.error(`Could not load fallback English messages for ${namespace}:`, fallbackError);
      }
    } else {
      console.error(`Could not load English messages for ${namespace}:`, e);
    }
    return null;
  }
};

export function I18nProvider({ children, initialMessages = {} }: I18nProviderProps) {
  const pathname = usePathname();
  const [locale, setLocale] = useState<string>('en');
  const [messages, setMessages] = useState<Record<string, any>>(initialMessages);
  const [isLoading, setIsLoading] = useState(true);
  const [fallbackMessages, setFallbackMessages] = useState<Record<string, any>>({});

  useEffect(() => {
    const storedLocale = localStorage.getItem('preferredLocale');
    if (storedLocale && availableLocales.some(loc => loc.code === storedLocale)) {
      setLocale(storedLocale);
    } else {
      const browserLang = navigator.language;
      const detectedLocale = availableLocales.find(loc => 
        browserLang.startsWith(loc.code)
      )?.code || 'en';
      setLocale(detectedLocale);
    }
  }, []);

  // Load English messages as fallback
  useEffect(() => {
    const loadFallbackMessages = async () => {
      const [commonMessages, authMessages] = await Promise.all([
        loadMessagesForNamespace('en', 'common'),
        loadMessagesForNamespace('en', 'auth')
      ]);

      const fallback: Record<string, any> = {};
      if (commonMessages) fallback.common = commonMessages;
      if (authMessages) fallback.auth = authMessages;
      setFallbackMessages(fallback);
    };

    loadFallbackMessages();
  }, []);

  const loadMessages = async () => {
    setIsLoading(true);
    try {
      const loadedMessages: Record<string, any> = {};

      // Load common and auth messages first
      const [commonMessages, authMessages] = await Promise.all([
        loadMessagesForNamespace(locale, 'common'),
        loadMessagesForNamespace(locale, 'auth')
      ]);

      if (commonMessages) loadedMessages.common = commonMessages;
      if (authMessages) loadedMessages.auth = authMessages;
      
      // Determine current page
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
      } else if (pathname.startsWith('/auth/')) {
        pageName = 'auth';
      }
      
      // Load page-specific messages
      const pageMessages = await loadMessagesForNamespace(locale, pageName);
      if (pageMessages) loadedMessages[pageName] = pageMessages;

      setMessages(loadedMessages);
    } catch (e) {
      console.error('Error loading messages:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (locale) {
      loadMessages();
    }
  }, [locale, pathname]);

  const changeLocale = (newLocale: string) => {
    if (availableLocales.some(loc => loc.code === newLocale)) {
      setMessages({});
      setIsLoading(true);
      localStorage.setItem('preferredLocale', newLocale);
      setLocale(newLocale);
    }
  };

  const t = (key: string, namespace = 'common', params?: Record<string, string | number>): string => {
    try {
      // First try to get from current locale
      const namespaceMessages = messages[namespace];
      if (namespaceMessages) {
        const keys = key.split('.');
        let value = namespaceMessages;
        
        for (const k of keys) {
          if (value === undefined || value === null) break;
          value = value[k];
        }

        if (value !== undefined && value !== null) {
          if (params) {
            return Object.entries(params).reduce(
              (str, [key, value]) => str.replace(`{${key}}`, String(value)),
              value
            );
          }
          return value;
        }
      }

      // If not found, try fallback English messages
      const fallbackNamespaceMessages = fallbackMessages[namespace];
      if (fallbackNamespaceMessages) {
        const keys = key.split('.');
        let value = fallbackNamespaceMessages;
        
        for (const k of keys) {
          if (value === undefined || value === null) break;
          value = value[k];
        }

        if (value !== undefined && value !== null) {
          if (params) {
            return Object.entries(params).reduce(
              (str, [key, value]) => str.replace(`{${key}}`, String(value)),
              value
            );
          }
          return value;
        }
      }

      return key;
    } catch (e) {
      console.error(`Error translating key ${key} in namespace ${namespace}:`, e);
      return key;
    }
  };

  if (isLoading && !Object.keys(messages).length) {
    return (
      <div className="min-h-screen flex items-center justify-center" key="loading">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600" />
      </div>
    );
  }

  return (
    <I18nContext.Provider value={{ locale, t, changeLocale, availableLocales, isLoading, messages }}>
      {children}
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

export function withI18n<P extends object>(
  Component: React.ComponentType<P & { t: I18nContextType['t']; locale: string }>
) {
  return function WithI18n(props: P) {
    const { t, locale } = useI18n();
    return <Component {...props} t={t} locale={locale} />;
  };
} 