'use client';

import { useSession } from 'next-auth/react';

interface UseAuthResult {
  isAuthenticated: boolean;
  isLoading: boolean;
  isAuthDisabled: boolean;
  user: any;
}

/**
 * Hook personalizado para verificar o status de autenticação,
 * respeitando a configuração de DISABLE_AUTH quando necessário.
 */
export function useAuth(): UseAuthResult {
  const { data: session, status } = useSession();
  
  // Verificar se a autenticação está desabilitada diretamente do ambiente
  const isAuthDisabled = process.env.NEXT_PUBLIC_DISABLE_AUTH === 'true';
  
  return {
    isAuthenticated: isAuthDisabled ? true : status === 'authenticated',
    isLoading: status === 'loading',
    isAuthDisabled,
    user: session?.user
  };
} 