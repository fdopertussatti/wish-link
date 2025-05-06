'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useWishList } from '@/contexts/WishListContext';
import { useI18n } from '@/contexts/I18nContext';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { WishListForm } from '@/components/forms/WishListForm';
import { NewWishList } from '@/types';

export default function WishLists() {
  const router = useRouter();
  const { isAuthenticated, isLoading: isLoadingAuth, isAuthDisabled } = useAuth();
  const { wishLists, isLoading: isLoadingWishLists, addWishList } = useWishList();
  const { t } = useI18n();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    // Somente redirecionar se a autenticação estiver habilitada e o usuário não estiver autenticado
    if (!isLoadingAuth && !isAuthenticated && !isAuthDisabled) {
      router.push('/auth/signin?callbackUrl=/listas');
      return;
    }
  }, [isAuthenticated, isLoadingAuth, router, isAuthDisabled]);

  const handleCreateList = (data: NewWishList) => {
    addWishList({
      ...data,
      items: []
    });
    setIsModalOpen(false);
  };

  // Mostrar estado de carregamento se estiver carregando autenticação ou listas
  if (isLoadingAuth || isLoadingWishLists) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-gray-200 rounded mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm">
                <div className="h-48 bg-gray-200" />
                <div className="p-4">
                  <div className="h-6 w-3/4 bg-gray-200 rounded mb-2" />
                  <div className="h-4 w-1/2 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Não mostrar nada se não estiver autenticado (e a autenticação não estiver desabilitada)
  if (!isAuthenticated && !isAuthDisabled) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero header */}
      <div className="relative bg-gradient-to-r from-purple-700 to-indigo-800 text-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-700/70 to-indigo-800/70"></div>
        </div>
        <div className="relative container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t('hero.title', 'lists')}
          </h1>
          <p className="mt-3 text-lg text-purple-100 max-w-xl">
            {t('hero.subtitle', 'lists')}
          </p>
        </div>
      </div>
      
      {/* Exibir notificação se a autenticação estiver desabilitada */}
      {isAuthDisabled && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 mx-4 mt-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Modo de desenvolvimento: autenticação desabilitada
              </p>
            </div>
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 py-8">
        {/* Action bar */}
        <div className="bg-white rounded-xl shadow-sm p-4 -mt-8 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
          {/* View selector */}
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setViewType('grid')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium flex items-center ${
                viewType === 'grid'
                  ? 'bg-white shadow-sm text-gray-900'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              {t('viewType.grid', 'lists')}
            </button>
            <button
              onClick={() => setViewType('list')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium flex items-center ${
                viewType === 'list'
                  ? 'bg-white shadow-sm text-gray-900'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              {t('viewType.list', 'lists')}
            </button>
          </div>

          <Button onClick={() => setIsModalOpen(true)} className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            {t('newList.button', 'lists')}
          </Button>
        </div>

        {/* Empty state */}
        {wishLists.length === 0 && (
          <div className="text-center py-16 px-4 rounded-xl bg-white shadow-sm">
            <div className="mx-auto h-24 w-24 text-gray-300">
              <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">{t('emptyState.title', 'lists')}</h3>
            <p className="mt-2 text-gray-500 max-w-md mx-auto">
              {t('emptyState.description', 'lists')}
            </p>
            <div className="mt-6">
              <Button onClick={() => setIsModalOpen(true)}>
                {t('emptyState.createButton', 'lists')}
              </Button>
            </div>
          </div>
        )}

        {/* Modal para criar lista */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={t('newList.title', 'Nova Lista de Desejos')}
        >
          <WishListForm
            onSubmit={handleCreateList}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>

        {/* Grid View */}
        {viewType === 'grid' && wishLists.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
            {wishLists.map((list) => (
              <Link key={list.id} href={`/listas/${list.id}`}>
                <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer group card-hover">
                  <div className="h-48 relative">
                    {list.coverImage ? (
                      <Image
                        src={list.coverImage}
                        alt={list.name}
                        fill
                        className="object-cover"
                        unoptimized // Evitar erros de domínio
                      />
                    ) : (
                      <div 
                        className="w-full h-full bg-gradient-to-r from-purple-500 to-indigo-500"
                        style={{
                          backgroundColor: list.theme?.backgroundColor || '#F3F4F6'
                        }}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent group-hover:from-black/40 transition-opacity" />
                    
                    {/* Badge de itens */}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700">
                      {list.items.length} {list.items.length === 1 ? 'item' : 'itens'}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                      {list.name}
                    </h2>
                    {list.description && (
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {list.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {new Date(list.createdAt).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'short'
                        })}
                      </span>
                      <span>
                        {list.isPublic ? (
                          <div className="flex items-center text-green-600 text-sm font-medium">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                            </svg>
                            Pública
                          </div>
                        ) : (
                          <div className="flex items-center text-gray-500 text-sm font-medium">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            Privada
                          </div>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* List View */}
        {viewType === 'list' && wishLists.length > 0 && (
          <div className="space-y-4 animate-fadeIn">
            {wishLists.map((list) => (
              <Link key={list.id} href={`/listas/${list.id}`}>
                <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col sm:flex-row">
                  <div className="sm:w-48 h-32 sm:h-auto relative flex-shrink-0">
                    {list.coverImage ? (
                      <Image
                        src={list.coverImage}
                        alt={list.name}
                        fill
                        className="object-cover"
                        unoptimized // Evitar erros de domínio
                      />
                    ) : (
                      <div 
                        className="w-full h-full bg-gradient-to-r from-purple-500 to-indigo-500"
                        style={{
                          backgroundColor: list.theme?.backgroundColor || '#F3F4F6'
                        }}
                      />
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-20 transition-opacity" />
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h2 className="text-xl font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                          {list.name}
                        </h2>
                        <span>
                          {list.isPublic ? (
                            <div className="flex items-center text-green-600 text-sm font-medium">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                              </svg>
                              Pública
                            </div>
                          ) : (
                            <div className="flex items-center text-gray-500 text-sm font-medium">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z" />
                              </svg>
                              Privada
                            </div>
                          )}
                        </span>
                      </div>
                      {list.description && (
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {list.description}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        {list.items.length} {list.items.length === 1 ? 'item' : 'itens'}
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(list.createdAt).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
} 