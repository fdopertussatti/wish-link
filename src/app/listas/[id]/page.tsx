'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useWishList } from '@/contexts/WishListContext';
import { WishCard } from '@/components/ui/WishCard';
import { Modal } from '@/components/ui/Modal';
import { WishItemForm } from '@/components/forms/WishItemForm';
import { WishListHeader } from '@/components/WishListHeader';
import { Category, Priority, WishItem } from '@/types';
import { formatPrice } from '@/utils/format';

const CATEGORY_LABELS: Record<Category, string> = {
  ELECTRONICS: 'Eletrônicos',
  BOOKS: 'Livros',
  FASHION: 'Moda',
  HOME: 'Casa',
  GAMES: 'Jogos',
  OTHER: 'Outros'
};

const PRIORITY_LABELS: Record<Priority, string> = {
  HIGH: 'Alta',
  MEDIUM: 'Média',
  LOW: 'Baixa'
};

const categoryIcons = {
  ELECTRONICS: '🔌',
  BOOKS: '📚',
  FASHION: '👕',
  HOME: '🏠',
  GAMES: '🎮',
  OTHER: '📦'
};

const priorityColors = {
  HIGH: 'bg-red-100 text-red-800',
  MEDIUM: 'bg-yellow-100 text-yellow-800',
  LOW: 'bg-green-100 text-green-800'
};

export default function WishListDetail() {
  const params = useParams();
  const router = useRouter();
  const { getWishList, addItemToList, updateItem, deleteItem, toggleItemReserved } = useWishList();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<WishItem | null>(null);
  const [showShareToast, setShowShareToast] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'ALL'>('ALL');
  const [selectedPriority, setSelectedPriority] = useState<Priority | 'ALL'>('ALL');
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');

  const wishList = getWishList(params.id as string);

  if (!wishList) {
    router.push('/listas');
    return null;
  }

  const filteredItems = wishList.items
    .filter(item => selectedCategory === 'ALL' || item.category === selectedCategory)
    .filter(item => selectedPriority === 'ALL' || item.priority === selectedPriority)
    .sort((a, b) => {
      const priorityOrder = { HIGH: 3, MEDIUM: 2, LOW: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/compartilhado/${wishList.id}`;
    navigator.clipboard.writeText(shareUrl);
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <WishListHeader
        wishList={wishList}
        onShare={handleShare}
        onAddItem={() => router.push(`/listas/${wishList.id}/adicionar`)}
      />

      <main className="container mx-auto px-4 py-8">
        {/* Filtros e controles */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-8 flex flex-col md:flex-row justify-between gap-4">
          <div className="flex flex-wrap gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categoria
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as Category | 'ALL')}
                className="rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              >
                <option value="ALL">Todas</option>
                {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prioridade
              </label>
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value as Priority | 'ALL')}
                className="rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              >
                <option value="ALL">Todas</option>
                {Object.entries(PRIORITY_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* View selector */}
          <div className="flex bg-gray-100 p-1 rounded-lg h-fit">
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

        {/* Lista de Items - Grid View */}
        {filteredItems.length > 0 ? (
          <>
            {viewType === 'grid' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
                {filteredItems.map((item) => (
                  <WishCard
                    key={item.id}
                    item={item}
                    onReserve={() => toggleItemReserved(wishList.id, item.id)}
                    onEdit={() => router.push(`/listas/${wishList.id}/editar/${item.id}`)}
                    onDelete={() => deleteItem(wishList.id, item.id)}
                  />
                ))}
              </div>
            )}

            {/* Lista de Items - List View */}
            {viewType === 'list' && (
              <div className="space-y-4 animate-fadeIn">
                {filteredItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col sm:flex-row"
                  >
                    <div className="sm:w-48 h-32 sm:h-auto relative flex-shrink-0">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <span className="text-4xl">{categoryIcons[item.category]}</span>
                        </div>
                      )}
                      {item.isReserved && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <div className="bg-white px-4 py-2 rounded-full text-sm font-medium">
                            Reservado {item.reservedBy ? `por ${item.reservedBy}` : ''}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[item.priority]}`}>
                          {PRIORITY_LABELS[item.priority]}
                        </span>
                      </div>
                      
                      {item.description && (
                        <p className="text-sm text-gray-600 mb-3">
                          {item.description}
                        </p>
                      )}
                      
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <span className="mr-1">{categoryIcons[item.category]}</span>
                          {CATEGORY_LABELS[item.category]}
                        </div>
                        
                        {item.price && (
                          <div className="text-lg font-semibold text-gray-900">
                            {formatPrice(item.price)}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-2 mt-auto">
                        <button
                          onClick={() => toggleItemReserved(wishList.id, item.id)}
                          disabled={item.isReserved}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                            ${item.isReserved 
                              ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                              : 'bg-purple-600 text-white hover:bg-purple-700'
                            }`}
                        >
                          {item.isReserved ? 'Reservado' : 'Reservar'}
                        </button>

                        {item.purchaseUrl && (
                          <a
                            href={item.purchaseUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                          >
                            Comprar
                          </a>
                        )}

                        <button
                          onClick={() => router.push(`/listas/${wishList.id}/editar/${item.id}`)}
                          className="p-2 rounded-lg text-gray-500 hover:bg-gray-100"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>

                        <button
                          onClick={() => deleteItem(wishList.id, item.id)}
                          className="p-2 rounded-lg text-red-500 hover:bg-red-50"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <div className="mx-auto h-24 w-24 text-gray-300">
              <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900 mb-2">
              Nenhum item encontrado
            </h3>
            <p className="text-gray-600">
              {selectedCategory !== 'ALL' || selectedPriority !== 'ALL'
                ? 'Tente ajustar os filtros para ver mais itens'
                : 'Comece adicionando seu primeiro item à lista'}
            </p>
            <button
              onClick={() => router.push(`/listas/${wishList.id}/adicionar`)}
              className="mt-6 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Adicionar Primeiro Item
            </button>
          </div>
        )}

        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingItem(null);
          }}
          title={editingItem ? 'Editar Item' : 'Novo Item'}
        >
          <WishItemForm
            initialData={editingItem || undefined}
            onSubmit={(data) => {
              if (editingItem) {
                updateItem(wishList.id, { ...editingItem, ...data });
              } else {
                addItemToList(wishList.id, data);
              }
              setIsModalOpen(false);
              setEditingItem(null);
            }}
          />
        </Modal>

        {showShareToast && (
          <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in">
            Link copiado para a área de transferência!
          </div>
        )}
      </main>
    </div>
  );
} 