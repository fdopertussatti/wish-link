'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { useI18n } from '@/contexts/I18nContext';

export default function HowItWorks() {
  const { t, isLoading } = useI18n();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }
  
  const steps = [
    {
      number: '01',
      title: t('steps.0.title', 'how-it-works'),
      description: t('steps.0.description', 'how-it-works'),
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      )
    },
    {
      number: '02',
      title: t('steps.1.title', 'how-it-works'),
      description: t('steps.1.description', 'how-it-works'),
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      )
    },
    {
      number: '03',
      title: t('steps.2.title', 'how-it-works'),
      description: t('steps.2.description', 'how-it-works'),
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
      )
    },
    {
      number: '04',
      title: t('steps.3.title', 'how-it-works'),
      description: t('steps.3.description', 'how-it-works'),
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  const faqs = [
    {
      question: t('faq.questions.0.question', 'how-it-works'),
      answer: t('faq.questions.0.answer', 'how-it-works')
    },
    {
      question: t('faq.questions.1.question', 'how-it-works'),
      answer: t('faq.questions.1.answer', 'how-it-works')
    },
    {
      question: t('faq.questions.2.question', 'how-it-works'),
      answer: t('faq.questions.2.answer', 'how-it-works')
    },
    {
      question: t('faq.questions.3.question', 'how-it-works'),
      answer: t('faq.questions.3.answer', 'how-it-works')
    },
    {
      question: t('faq.questions.4.question', 'how-it-works'),
      answer: t('faq.questions.4.answer', 'how-it-works')
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white py-20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 via-purple-800/70 to-indigo-900/70"></div>
        </div>
        
        <div className="relative container mx-auto px-4 z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              {t('hero.title', 'how-it-works').split('<em>').map((part, i) => {
                if (i === 0) return part;
                const parts = part.split('</em>');
                return (
                  <React.Fragment key={i}>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-blue-300 font-bold">
                      {parts[0]}
                    </span>
                    {parts[1]}
                  </React.Fragment>
                );
              })}
            </h1>
            <p className="text-lg text-purple-100 max-w-xl mx-auto">
              {t('hero.subtitle', 'how-it-works')}
            </p>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-16 h-16 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
                    {step.icon}
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-medium">
                      {step.number}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Workflow Visualization */}
      <div className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              {t('workflow.title', 'how-it-works')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('workflow.subtitle', 'how-it-works')}
            </p>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            {/* Connection Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-200 via-indigo-200 to-green-200 -translate-y-1/2 z-0 hidden md:block"></div>
            
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center bg-white/50 backdrop-blur-sm rounded-xl p-6">
                <div className="mb-6 relative">
                  <div className="w-16 h-16 rounded-full bg-purple-600 text-white flex items-center justify-center z-10 relative">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <div className="absolute -inset-1 bg-purple-100 rounded-full blur opacity-60 z-0"></div>
                </div>
                <h3 className="text-xl font-medium mb-2 text-gray-900">{t('workflow.phases.0.title', 'how-it-works')}</h3>
                <p className="text-gray-600">
                  {t('workflow.phases.0.description', 'how-it-works')}
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center bg-white/50 backdrop-blur-sm rounded-xl p-6">
                <div className="mb-6 relative">
                  <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center z-10 relative">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  </div>
                  <div className="absolute -inset-1 bg-indigo-100 rounded-full blur opacity-60 z-0"></div>
                </div>
                <h3 className="text-xl font-medium mb-2 text-gray-900">{t('workflow.phases.1.title', 'how-it-works')}</h3>
                <p className="text-gray-600">
                  {t('workflow.phases.1.description', 'how-it-works')}
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center bg-white/50 backdrop-blur-sm rounded-xl p-6">
                <div className="mb-6 relative">
                  <div className="w-16 h-16 rounded-full bg-green-600 text-white flex items-center justify-center z-10 relative">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="absolute -inset-1 bg-green-100 rounded-full blur opacity-60 z-0"></div>
                </div>
                <h3 className="text-xl font-medium mb-2 text-gray-900">{t('workflow.phases.2.title', 'how-it-works')}</h3>
                <p className="text-gray-600">
                  {t('workflow.phases.2.description', 'how-it-works')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              {t('faq.title', 'how-it-works')}
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {t('cta.title', 'how-it-works')}
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {t('cta.description', 'how-it-works')}
          </p>
          <Link href="/listas">
            <Button size="lg">
              {t('cta.button', 'how-it-works')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 