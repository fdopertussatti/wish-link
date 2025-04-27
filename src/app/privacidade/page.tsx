'use client';

import React from 'react';
import { useI18n } from '@/contexts/I18nContext';
import { PolicyContentStyles } from '@/components/PolicyStyles';

export default function PrivacyPolicy() {
  const { t } = useI18n();
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 shadow-md">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-white">
            {t('title', 'privacy')}
          </h1>
          <p className="text-purple-100 mt-2">
            {t('lastUpdated', 'privacy', { date: 'Abril de 2025' })}
          </p>
        </div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-10">
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-10 max-w-4xl mx-auto">
          <PolicyContentStyles />
          <div className="policy-content">
            <div dangerouslySetInnerHTML={{ __html: t('content', 'privacy') }} />
          </div>
        </div>
        
        <div className="mt-10 text-center">
          <a 
            href="/"
            className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors duration-200 shadow-sm"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {t('backToHome', 'common')}
          </a>
        </div>
      </div>
    </div>
  );
} 