'use client';

import React from 'react';
import Image from 'next/image';
import { WishItem, Category, Priority } from '@/types';
import { formatPrice } from '@/utils/format';

interface WishCardProps {
  item: WishItem;
  onReserve: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const CATEGORY_LABELS: Record<Category, string> = {
  ELECTRONICS: 'Eletrônicos',
  BOOKS: 'Livros',
  FASHION: 'Moda',
  HOME: 'Casa',
  GAMES: 'Jogos',
  OTHER: 'Outros'
};

const priorityColors: Record<Priority, string> = {
  HIGH: 'bg-red-100 text-red-800',
  MEDIUM: 'bg-yellow-100 text-yellow-800',
  LOW: 'bg-green-100 text-green-800'
};

const categoryIcons: Record<Category, string> = {
  ELECTRONICS: '🔌',
  BOOKS: '📚',
  FASHION: '👕',
  HOME: '🏠',
  GAMES: '🎮',
  OTHER: '📦'
};

export function WishCard({ item, onReserve, onEdit, onDelete }: WishCardProps) {
  const {
    name,
    description,
    imageUrl,
    price,
    category,
    priority,
    isReserved,
    reservedBy,
    purchaseUrl
  } = item;

  const priorityLabel = {
    HIGH: 'Alta',
    MEDIUM: 'Média',
    LOW: 'Baixa'
  }[priority];

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
      {/* Imagem ou ícone */}
      <div className="relative h-48">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <span className="text-6xl">{categoryIcons[category]}</span>
          </div>
        )}
        
        {/* Badge para itens reservados */}
        {isReserved && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white px-4 py-2 rounded-full text-sm font-medium">
              Reservado {reservedBy ? `por ${reservedBy}` : ''}
            </div>
          </div>
        )}
        
        {/* Badge de prioridade */}
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[priority]}`}>
            {priorityLabel}
          </span>
        </div>
      </div>
      
      {/* Conteúdo */}
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{name}</h3>
          <div className="flex flex-col items-end">
            {price !== undefined && (
              <span className="text-xl font-bold text-gray-900">
                {formatPrice(price)}
              </span>
            )}
          </div>
        </div>
        
        {description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        )}
        
        <div className="flex items-center gap-2 mt-2 mb-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <span className="mr-1">{categoryIcons[category]}</span>
            {CATEGORY_LABELS[category]}
          </span>
        </div>
        
        {/* Botões de ação */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={onReserve}
            disabled={isReserved}
            className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isReserved
                ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}
          >
            {isReserved ? 'Reservado' : 'Reservar'}
          </button>
          
          {purchaseUrl && (
            <a
              href={purchaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-lg text-sm font-medium bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
            >
              Comprar
            </a>
          )}
        </div>
      </div>
      
      {/* Menu de opções */}
      <div className="border-t border-gray-100 p-4 flex justify-end space-x-2">
        <button
          onClick={onEdit}
          className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Editar"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
        
        <button
          onClick={onDelete}
          className="p-2 text-gray-500 hover:text-red-600 transition-colors"
          aria-label="Excluir"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
} 