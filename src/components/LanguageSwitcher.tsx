'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useI18n } from '@/contexts/I18nContext';

export function LanguageSwitcher() {
  const { locale, changeLocale, availableLocales } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isAutoDetected, setIsAutoDetected] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    // Verificar se o idioma atual foi detectado automaticamente
    const storedLocale = localStorage.getItem('preferredLocale');
    setIsAutoDetected(!storedLocale || storedLocale !== locale);
  }, [locale]);

  const handleChangeLocale = (code: string) => {
    changeLocale(code);
    setIsOpen(false);
  };

  // Obter os detalhes do idioma atual
  const currentLocale = availableLocales.find(l => l.code === locale) || availableLocales[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="mr-1">{currentLocale.name}</span>
        {isAutoDetected && (
          <span className="text-xs text-gray-400 mr-1">(auto)</span>
        )}
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg z-50 ring-1 ring-black ring-opacity-5">
          {availableLocales.map((l) => (
            <button
              key={l.code}
              className={`block w-full text-left px-4 py-2 text-sm ${
                l.code === locale
                  ? 'bg-purple-50 text-purple-600 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => handleChangeLocale(l.code)}
            >
              {l.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 