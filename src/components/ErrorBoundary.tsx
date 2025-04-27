'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { useI18n } from '@/contexts/I18nContext';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

// Componente para exibir mensagens de erro de forma amigável
const ErrorDisplay = ({ error }: { error: Error | null }) => {
  const { t } = useI18n();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          {t('error.title') || 'Something went wrong'}
        </h2>
        <p className="text-gray-600 mb-6">
          {t('error.description') || 'We\'re sorry, but something went wrong. Please try again later.'}
        </p>
        {error && process.env.NODE_ENV === 'development' && (
          <div className="mt-4 p-4 bg-gray-100 rounded-md text-left overflow-auto max-h-48">
            <p className="font-mono text-sm text-red-500">{error.message}</p>
            <p className="font-mono text-xs mt-2 text-gray-700">{error.stack}</p>
          </div>
        )}
        <button
          onClick={() => window.location.href = '/'}
          className="mt-6 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
        >
          {t('error.goHome') || 'Go to Homepage'}
        </button>
      </div>
    </div>
  );
};

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    
    // Aqui você poderia enviar o erro para um serviço de monitoramento como Sentry
    // if (typeof window !== 'undefined' && window.Sentry) {
    //   window.Sentry.captureException(error);
    // }
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || <ErrorDisplay error={this.state.error} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 