'use client';

import { useState, useEffect } from 'react';
import { useI18n } from '@/contexts/I18nContext';
import { Button } from '@/components/ui/Button';

type CookieType = 'necessary' | 'analytics' | 'marketing' | 'preferences';
type CookiePreferences = Record<CookieType, boolean>;

const defaultPreferences: CookiePreferences = {
  necessary: true, // Always true, cannot be deselected
  analytics: false,
  marketing: false,
  preferences: false,
};

// Helper function to get region from locale
const getRegionFromLocale = (locale: string): 'eu' | 'br' | 'us' | 'other' => {
  if (locale.startsWith('pt-BR')) return 'br';
  
  // EU countries
  const euLocales = ['de', 'fr', 'es', 'it', 'nl', 'pt', 'pl', 'sv', 'da', 'fi', 'el'];
  if (euLocales.some(l => locale.startsWith(l))) return 'eu';
  
  // US/North America
  if (locale.startsWith('en-US') || locale === 'en') return 'us';
  
  return 'other';
};

// Fallback translations if needed
const fallbackTranslations: Record<string, string> = {
  'cookies.title': 'This site uses cookies',
  'cookies.description.br': 'Usamos cookies para melhorar sua experiência de navegação, personalizar conteúdo e anúncios, além de analisar nosso tráfego. Ao continuar navegando, você concorda com a nossa Política de Privacidade conforme a LGPD.',
  'cookies.description.eu': 'We use cookies to enhance your browsing experience, personalize content and ads, and analyze our traffic. By continuing, you consent to our use of cookies in accordance with our Privacy Policy and GDPR requirements.',
  'cookies.description.other': 'We use cookies to enhance your browsing experience, personalize content and ads, and analyze our traffic. By continuing, you consent to our use of cookies in accordance with our Privacy Policy.',
  'cookies.customize': 'Customize',
  'cookies.acceptAll': 'Accept All',
  'cookies.rejectAll': 'Reject Non-Essential',
  'cookies.savePreferences': 'Save Preferences',
  'cookies.back': 'Back',
  'cookies.privacyPolicy': 'Privacy Policy',
  'cookies.terms': 'Terms of Service',
  'cookies.preferences.title': 'Cookie Preferences',
  'cookies.preferences.description': 'Manage your cookie preferences. Necessary cookies help make a website usable by enabling basic functions.',
  'cookies.preferences.necessary.title': 'Necessary',
  'cookies.preferences.necessary.description': 'These cookies are required for the website to function and cannot be disabled.',
  'cookies.preferences.analytics.title': 'Analytics',
  'cookies.preferences.analytics.description': 'These cookies help us understand how visitors interact with our website.',
  'cookies.preferences.marketing.title': 'Marketing',
  'cookies.preferences.marketing.description': 'These cookies are used to track visitors across websites to display relevant advertisements.',
  'cookies.preferences.functional.title': 'Preferences',
  'cookies.preferences.functional.description': 'These cookies enable personalized features and functionality.'
};

export function CookieConsent() {
  const { t: translate, locale, isLoading } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);
  const [hasConsented, setHasConsented] = useState(true); // Default to true to prevent flashing
  
  const region = getRegionFromLocale(locale || 'en');

  // Custom translation function with fallback
  const t = (key: string, fallback: string): string => {
    const result = translate(key);
    console.log(`Translating key: ${key}, Result:`, result);
    
    // If the result is just the key itself, it means translation failed
    if (result === key) {
      // Try using our fallback translations
      return fallbackTranslations[key] || fallback;
    }
    
    return result;
  };

  // Load consent status from localStorage
  useEffect(() => {
    // Only run this on client-side
    if (typeof window === 'undefined') return;
    
    // Check if user has already given consent
    const consentStatus = localStorage.getItem('cookie-consent-status');
    if (consentStatus === null) {
      setHasConsented(false);
      setIsOpen(true);
    } else {
      try {
        const savedPreferences = JSON.parse(localStorage.getItem('cookie-preferences') || '{}');
        setPreferences({
          ...defaultPreferences,
          ...savedPreferences,
        });
      } catch (error) {
        console.error('Error parsing cookie preferences:', error);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const allEnabled = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    
    localStorage.setItem('cookie-consent-status', 'accepted');
    localStorage.setItem('cookie-preferences', JSON.stringify(allEnabled));
    setPreferences(allEnabled);
    setHasConsented(true);
    setIsOpen(false);
  };

  const handleRejectNonEssential = () => {
    localStorage.setItem('cookie-consent-status', 'rejected');
    localStorage.setItem('cookie-preferences', JSON.stringify(defaultPreferences));
    setPreferences(defaultPreferences);
    setHasConsented(true);
    setIsOpen(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookie-consent-status', 'customized');
    localStorage.setItem('cookie-preferences', JSON.stringify(preferences));
    setHasConsented(true);
    setIsOpen(false);
  };

  const handleTogglePreference = (type: CookieType) => {
    if (type === 'necessary') return; // Cannot disable necessary cookies
    setPreferences(prev => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  // Do not render anything if consent was given
  if (hasConsented && !isOpen) return null;
  
  // Show loading state when translations are loading
  if (isLoading) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-lg border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center animate-pulse">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            <div className="flex space-x-2">
              <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-lg border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto p-4 md:p-6">
        {!showPreferences ? (
          // Main consent banner
          <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {t('cookies.title', 'This site uses cookies')}
                </h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  {region === 'br' 
                    ? t('cookies.description.br', 'Usamos cookies para melhorar sua experiência de navegação, personalizar conteúdo e anúncios, além de analisar nosso tráfego. Ao continuar navegando, você concorda com a nossa Política de Privacidade conforme a LGPD.')
                    : region === 'eu'
                    ? t('cookies.description.eu', 'We use cookies to enhance your browsing experience, personalize content and ads, and analyze our traffic. By continuing, you consent to our use of cookies in accordance with our Privacy Policy and GDPR requirements.')
                    : t('cookies.description.other', 'We use cookies to enhance your browsing experience, personalize content and ads, and analyze our traffic. By continuing, you consent to our use of cookies in accordance with our Privacy Policy.')}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button 
                  onClick={() => setShowPreferences(true)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
                >
                  {t('cookies.customize', 'Customize')}
                </Button>
                
                {region === 'eu' || region === 'br' ? (
                  // GDPR/LGPD requires explicit reject option
                  <Button 
                    onClick={handleRejectNonEssential}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
                  >
                    {t('cookies.rejectAll', 'Reject Non-Essential')}
                  </Button>
                ) : null}
                
                <Button onClick={handleAcceptAll}>
                  {t('cookies.acceptAll', 'Accept All')}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          // Detailed preferences view
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {t('cookies.preferences.title', 'Cookie Preferences')}
              </h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                {t('cookies.preferences.description', 'Manage your cookie preferences. Necessary cookies help make a website usable by enabling basic functions.')}
              </p>
            </div>
            
            <div className="space-y-4 mb-6">
              {/* Necessary Cookies - Always enabled */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    {t('cookies.preferences.necessary.title', 'Necessary')}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {t('cookies.preferences.necessary.description', 'These cookies are required for the website to function and cannot be disabled.')}
                  </p>
                </div>
                <div className="relative inline-flex items-center">
                  <input 
                    type="checkbox" 
                    checked={true} 
                    disabled 
                    className="sr-only peer" 
                    id="necessary"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-500"></div>
                </div>
              </div>
              
              {/* Analytics Cookies */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    {t('cookies.preferences.analytics.title', 'Analytics')}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {t('cookies.preferences.analytics.description', 'These cookies help us understand how visitors interact with our website.')}
                  </p>
                </div>
                <div className="relative inline-flex items-center">
                  <input 
                    type="checkbox" 
                    checked={preferences.analytics} 
                    onChange={() => handleTogglePreference('analytics')} 
                    className="sr-only peer" 
                    id="analytics"
                  />
                  <label 
                    htmlFor="analytics" 
                    className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-500"
                  ></label>
                </div>
              </div>
              
              {/* Marketing Cookies */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    {t('cookies.preferences.marketing.title', 'Marketing')}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {t('cookies.preferences.marketing.description', 'These cookies are used to track visitors across websites to display relevant advertisements.')}
                  </p>
                </div>
                <div className="relative inline-flex items-center">
                  <input 
                    type="checkbox" 
                    checked={preferences.marketing} 
                    onChange={() => handleTogglePreference('marketing')} 
                    className="sr-only peer" 
                    id="marketing"
                  />
                  <label 
                    htmlFor="marketing" 
                    className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-500"
                  ></label>
                </div>
              </div>
              
              {/* Preferences Cookies */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    {t('cookies.preferences.functional.title', 'Preferences')}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {t('cookies.preferences.functional.description', 'These cookies enable personalized features and functionality.')}
                  </p>
                </div>
                <div className="relative inline-flex items-center">
                  <input 
                    type="checkbox" 
                    checked={preferences.preferences} 
                    onChange={() => handleTogglePreference('preferences')} 
                    className="sr-only peer" 
                    id="preferences"
                  />
                  <label 
                    htmlFor="preferences" 
                    className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-500"
                  ></label>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button 
                onClick={() => setShowPreferences(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
              >
                {t('cookies.back', 'Back')}
              </Button>
              <Button onClick={handleSavePreferences}>
                {t('cookies.savePreferences', 'Save Preferences')}
              </Button>
            </div>
          </div>
        )}
        
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          <a href="/privacy" className="underline hover:text-gray-700 dark:hover:text-gray-300">
            {t('cookies.privacyPolicy', 'Privacy Policy')}
          </a>
          {' | '}
          <a href="/terms" className="underline hover:text-gray-700 dark:hover:text-gray-300">
            {t('cookies.terms', 'Terms of Service')}
          </a>
        </div>
      </div>
    </div>
  );
}

// Hook to check if a specific type of cookie is allowed
export function useCookieConsent() {
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);
  
  useEffect(() => {
    try {
      const savedPreferences = JSON.parse(localStorage.getItem('cookie-preferences') || '{}');
      setPreferences({
        ...defaultPreferences,
        ...savedPreferences,
      });
    } catch (error) {
      console.error('Error parsing cookie preferences:', error);
    }
  }, []);
  
  const isCookieAllowed = (type: CookieType): boolean => {
    return preferences[type];
  };
  
  return { isCookieAllowed };
} 