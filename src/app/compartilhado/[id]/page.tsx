'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useWishList } from '@/contexts/WishListContext';
import { WishCard } from '@/components/ui/WishCard';
import { Modal } from '@/components/ui/Modal';
import { Category, Priority } from '@/types';
import { formatPrice } from '@/utils/format';

const CATEGORY_LABELS: Record<Category, string> = {
  ELECTRONICS: 'Eletrônicos',
  BOOKS: 'Livros',
  FASHION: 'Moda',
  HOME: 'Casa',
  GAMES: 'Jogos',
  OTHER: 'Outros'
};

const categoryIcons = {
  ELECTRONICS: '🔌',
  BOOKS: '📚',
  FASHION: '👕',
  HOME: '🏠',
  GAMES: '🎮',
  OTHER: '📦'
};

export default function SharedWishList() {
  const params = useParams();
  const { getWishList, toggleItemReserved } = useWishList();
  const [reservingItem, setReservingItem] = useState<string | null>(null);
  const [reserverName, setReserverName] = useState('');
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');

  const wishList = getWishList(params.id as string);

  if (!wishList || !wishList.isPublic) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-sm max-w-md mx-auto">
          <div className="mx-auto h-24 w-24 text-gray-300 mb-4">
            <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Lista não encontrada
          </h1>
          <p className="text-gray-600">
            Esta lista não existe ou não está disponível publicamente.
          </p>
        </div>
      </div>
    );
  }

  const handleReserve = (itemId: string) => {
    if (reserverName.trim()) {
      toggleItemReserved(wishList.id, itemId);
      setReservingItem(null);
      setReserverName('');
    }
  };

  // Agrupar por categoria para exibição em lista
  const itemsByCategory = wishList.items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<Category, typeof wishList.items>);

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
            Lista de Desejos de {wishList.name}
          </h1>
          <p className="mt-3 text-lg text-purple-100 max-w-xl">
            {wishList.description || 'Confira os itens e faça uma surpresa especial'}
          </p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* Action bar */}
        <div className="bg-white rounded-xl shadow-sm p-4 -mt-8 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
          <div className="text-gray-600 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Quando você reserva um item, os outros saberão que já está sendo comprado
          </div>
          
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
              Grade
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
              Lista
            </button>
          </div>
        </div>

        {/* Grid View */}
        {viewType === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
            {wishList.items.map((item) => (
              <WishCard
                key={item.id}
                item={item}
                onReserve={() => setReservingItem(item.id)}
                showActions={!item.isReserved}
              />
            ))}
          </div>
        )}

        {/* List View */}
        {viewType === 'list' && (
          <div className="space-y-8 animate-fadeIn">
            {Object.entries(itemsByCategory).map(([category, items]) => (
              <div key={category} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b">
                  <div className="flex items-center">
                    <span className="mr-2 text-xl">{categoryIcons[category as Category]}</span>
                    <h2 className="text-lg font-medium text-gray-900">
                      {CATEGORY_LABELS[category as Category]}
                    </h2>
                    <span className="ml-2 px-2 py-1 bg-gray-200 rounded-full text-xs text-gray-700">
                      {items.length} {items.length === 1 ? 'item' : 'itens'}
                    </span>
                  </div>
                </div>
                <div className="divide-y divide-gray-100">
                  {items.map((item) => (
                    <div key={item.id} className="p-4 flex flex-col sm:flex-row gap-4">
                      <div className="sm:w-24 h-24 relative flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-3xl">{categoryIcons[item.category]}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <h3 className="font-medium text-gray-900">{item.name}</h3>
                          {item.price && (
                            <div className="text-lg font-semibold text-gray-900">
                              {formatPrice(item.price)}
                            </div>
                          )}
                        </div>
                        
                        {item.description && (
                          <p className="text-sm text-gray-600 mt-1 mb-3">
                            {item.description}
                          </p>
                        )}
                        
                        <div className="flex gap-3 mt-auto">
                          {item.isReserved ? (
                            <div className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm flex items-center">
                              <svg className="w-4 h-4 mr-1.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Reservado {item.reservedBy ? `por ${item.reservedBy}` : ''}
                            </div>
                          ) : (
                            <button
                              onClick={() => setReservingItem(item.id)}
                              className="px-3 py-1.5 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition-colors"
                            >
                              Reservar
                            </button>
                          )}
                          
                          {item.purchaseUrl && (
                            <a
                              href={item.purchaseUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors flex items-center"
                            >
                              <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                              Ver na loja
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Estado vazio */}
        {wishList.items.length === 0 && (
          <div className="text-center py-16 px-4 rounded-xl bg-white shadow-sm">
            <div className="mx-auto h-24 w-24 text-gray-300">
              <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              Nenhum item na lista ainda
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Esta lista de desejos ainda não possui itens. Volte mais tarde para verificar se há novidades.
            </p>
          </div>
        )}

        <Modal
          isOpen={!!reservingItem}
          onClose={() => {
            setReservingItem(null);
            setReserverName('');
          }}
          title="Reservar Item"
        >
          <div className="space-y-4">
            <p className="text-gray-600">
              Para reservar este item, por favor informe seu nome:
            </p>
            <input
              type="text"
              value={reserverName}
              onChange={(e) => setReserverName(e.target.value)}
              placeholder="Seu nome"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  setReservingItem(null);
                  setReserverName('');
                }}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleReserve(reservingItem!)}
                disabled={!reserverName.trim()}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg disabled:opacity-50 hover:bg-purple-700 transition-colors"
              >
                Confirmar
              </button>
            </div>
          </div>
        </Modal>
      </main>
    </div>
  );
} 