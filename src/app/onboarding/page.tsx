'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useI18n } from '@/contexts/I18nContext';
import { Button } from '@/components/ui/Button';

export default function Onboarding() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { t } = useI18n();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {t('onboarding.welcome', { name: session.user?.name })}
          </h1>
          <p className="text-gray-600 mb-8">
            {t('onboarding.description')}
          </p>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-semibold">1</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">
                  {t('onboarding.step1.title')}
                </h3>
                <p className="text-gray-600 mt-1">
                  {t('onboarding.step1.description')}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-semibold">2</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">
                  {t('onboarding.step2.title')}
                </h3>
                <p className="text-gray-600 mt-1">
                  {t('onboarding.step2.description')}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-semibold">3</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">
                  {t('onboarding.step3.title')}
                </h3>
                <p className="text-gray-600 mt-1">
                  {t('onboarding.step3.description')}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <Button
              onClick={() => router.push('/listas')}
              className="w-full"
            >
              {t('onboarding.getStarted')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 