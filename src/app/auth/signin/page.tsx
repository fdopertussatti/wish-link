'use client';

import { signIn } from 'next-auth/react';
import { useI18n } from '@/contexts/I18nContext';
import { Button } from '@/components/ui/Button';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaApple } from 'react-icons/fa';
import Link from 'next/link';
import { useEffect } from 'react';

export default function SignIn() {
  const { t, locale, isLoading, messages } = useI18n();

  useEffect(() => {
    console.log('Debug - Current locale:', locale);
    console.log('Debug - Loading state:', isLoading);
    console.log('Debug - Available messages:', messages);
    console.log('Debug - Auth messages:', messages?.auth);
  }, [locale, isLoading, messages]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  // Verificar se as traduções estão disponíveis
  const title = t('auth.signin.title') || 'Sign in to your account';
  const description = t('auth.signin.description') || 'Continue with one of the options below';
  const appName = t('common.app.name') || 'WishLink';
  const googleText = t('auth.signin.google') || 'Continue with Google';
  const facebookText = t('auth.signin.facebook') || 'Continue with Facebook';
  const appleText = t('auth.signin.apple') || 'Continue with Apple';
  const orText = t('auth.signin.or') || 'or';
  const noAccountText = t('auth.signin.noAccount') || "Don't have an account?";
  const createAccountText = t('auth.signin.createAccount') || 'Create account';
  const termsText = t('auth.signin.terms') || 'By continuing, you agree to our Terms of Use and Privacy Policy';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              {appName}
            </span>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {title}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {description}
          </p>
        </div>
        
        <div className="mt-8 space-y-6">
          <div className="space-y-4">
            <Button
              onClick={() => signIn('google', { callbackUrl: '/' })}
              variant="outline"
              className="w-full flex items-center justify-center gap-2 py-3"
            >
              <FcGoogle className="w-5 h-5" />
              {googleText}
            </Button>
            <Button
              onClick={() => signIn('facebook', { callbackUrl: '/' })}
              variant="outline"
              className="w-full flex items-center justify-center gap-2 py-3"
            >
              <FaFacebook className="w-5 h-5 text-blue-600" />
              {facebookText}
            </Button>
            <Button
              onClick={() => signIn('apple', { callbackUrl: '/' })}
              variant="outline"
              className="w-full flex items-center justify-center gap-2 py-3"
            >
              <FaApple className="w-5 h-5" />
              {appleText}
            </Button>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">
                {orText}
              </span>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-600">
              {noAccountText}{' '}
              <Link href="/auth/signin?callbackUrl=/onboarding" className="font-medium text-purple-600 hover:text-purple-500">
                {createAccountText}
              </Link>
            </p>
            <p className="mt-2 text-xs text-gray-500">
              {termsText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 