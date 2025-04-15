import React from 'react';
import Image from 'next/image';
import { WishItem } from '@/types';
import { formatPrice } from '@/utils/format';

interface WishCardProps {
  item: WishItem;
  onReserve?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  showActions?: boolean;
}

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

export function WishCard({ item, onReserve, onEdit, onDelete, showActions = true }: WishCardProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative aspect-square">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-cover"
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

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-gray-900 line-clamp-2">{item.name}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[item.priority]}`}>
            {item.priority}
          </span>
        </div>

        {item.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {item.description}
          </p>
        )}

        {item.price && (
          <div className="text-lg font-semibold text-gray-900 mb-4">
            {formatPrice(item.price)}
          </div>
        )}

        {showActions && (
          <div className="flex gap-2">
            <button
              onClick={onReserve}
              disabled={item.isReserved}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors
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

            {onEdit && (
              <button
                onClick={onEdit}
                className="p-2 rounded-lg text-gray-500 hover:bg-gray-100"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
            )}

            {onDelete && (
              <button
                onClick={onDelete}
                className="p-2 rounded-lg text-red-500 hover:bg-red-50"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 