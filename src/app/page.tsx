'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { useI18n } from '@/contexts/I18nContext';

export default function Home() {
  const { t } = useI18n();

  // Features array from translations
  const features = t('features.items', 'home');

  // Showcase features list from translations
  const showcaseFeatures = t('showcase.featureList', 'home');

  // Benefits list from translations
  const benefits = t('callToAction.benefits', 'home');

  return (
    <div className="min-h-screen">
      {/* Hero Section com background animado */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 via-purple-800/70 to-indigo-900/70"></div>
          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
            <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-purple-400 to-indigo-500 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
          </div>
        </div>

        <div className="relative container mx-auto px-4 py-32 sm:py-48 lg:py-56">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6 drop-shadow-sm">
              <span 
                dangerouslySetInnerHTML={{ 
                  __html: t('hero.title', 'home')
                    .replace('<em>', '<span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-300">')
                    .replace('</em>', '</span>') 
                }} 
              />
            </h1>
            <p className="mt-6 text-lg leading-8 text-purple-100 max-w-xl">
              {t('hero.subtitle', 'home')}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/listas">
                <Button size="lg" className="bg-white text-purple-700 hover:bg-purple-50">
                  {t('cta.primary', 'home')}
                </Button>
              </Link>
              <Link href="/como-funciona" className="text-sm font-semibold leading-6 text-white flex items-center group">
                {t('cta.secondary', 'home')} <span aria-hidden="true" className="ml-1 transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Decoração de círculos */}
        <div className="absolute -bottom-24 left-1/2 transform -translate-x-1/2">
          <div className="w-48 h-48 rounded-full bg-gradient-to-r from-purple-500/30 to-indigo-500/30 blur-3xl"></div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50"></div>
        </div>
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-purple-600">{t('features.title', 'home')}</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t('features.subtitle', 'home')}
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {t('features.description', 'home')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {Array.isArray(features) && features.map((feature, idx) => (
              <div key={idx} className="relative bg-white p-6 rounded-2xl shadow-sm border border-gray-100 group hover:shadow-md transition-all flex flex-col items-center text-center">
                <div className={`w-16 h-16 ${idx === 0 ? 'bg-purple-100' : idx === 1 ? 'bg-blue-100' : 'bg-green-100'} rounded-2xl flex items-center justify-center mb-6 ${idx === 0 ? 'group-hover:bg-purple-200' : idx === 1 ? 'group-hover:bg-blue-200' : 'group-hover:bg-green-200'} transition-colors`}>
                  <svg className={`w-8 h-8 ${idx === 0 ? 'text-purple-600' : idx === 1 ? 'text-blue-600' : 'text-green-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {idx === 0 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />}
                    {idx === 1 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />}
                    {idx === 2 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />}
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Showcase Section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">
                {t('showcase.title', 'home')}
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                {t('showcase.description', 'home')}
              </p>
              <ul className="space-y-4">
                {Array.isArray(showcaseFeatures) && showcaseFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="ml-3 text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="absolute -inset-4">
                <div className="w-full h-full max-w-sm mx-auto rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 opacity-30 blur-2xl"></div>
              </div>
              <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="h-12 bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center px-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="h-24 bg-gray-200 rounded"></div>
                      <div className="h-24 bg-gray-200 rounded"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative bg-gradient-to-r from-purple-600 to-indigo-700 text-white overflow-hidden">
        <div className="absolute inset-0">
          <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 1463 360">
            <path className="text-purple-500 text-opacity-40" fill="currentColor" d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z" />
            <path className="text-indigo-700 text-opacity-40" fill="currentColor" d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z" />
          </svg>
        </div>
        <div className="relative container mx-auto px-4 py-16 sm:py-24">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div className="mb-12 lg:mb-0">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                {t('callToAction.title', 'home')}
              </h2>
              <p className="text-lg text-purple-100 mb-10">
                {t('callToAction.description', 'home')}
              </p>
              <Link href="/listas">
                <Button size="lg" className="bg-white text-purple-700 hover:bg-purple-50">
                  {t('callToAction.button', 'home')}
                </Button>
              </Link>
            </div>
            <div className="text-center">
              <div className="relative mx-auto w-full max-w-sm">
                <div className="absolute -inset-1">
                  <div className="w-full h-full max-w-full mx-auto rounded-3xl bg-white opacity-30 blur-xl"></div>
                </div>
                <div className="relative p-8 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20">
                  <div className="text-5xl font-bold mb-3">100%</div>
                  <div className="text-xl mb-6">{t('callToAction.freeTag', 'home')}</div>
                  <div className="space-y-3 text-sm text-purple-100">
                    {Array.isArray(benefits) && benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center">
                        <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 