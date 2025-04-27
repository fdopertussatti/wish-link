import React from 'react';
import Image from 'next/image';
import { WishItem } from '@/types/wishlist';
import { formatPrice } from '@/utils/format';

type Category = 'ELECTRONICS' | 'BOOKS' | 'FASHION' | 'HOME' | 'GAMES' | 'OTHER';
type Priority = 'HIGH' | 'MEDIUM' | 'LOW';

interface WishCardProps {
  item: WishItem & {
    category?: Category;
    priority?: Priority;
    isReserved?: boolean;
    reservedBy?: string;
    purchaseUrl?: string;
  };
  onReserve?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  showActions?: boolean;
}

const categoryIcons: Record<Category, string> = {
  ELECTRONICS: '🔌',
  BOOKS: '📚',
  FASHION: '👕',
  HOME: '🏠',
  GAMES: '🎮',
  OTHER: '📦'
};

const priorityColors: Record<Priority, string> = {
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
            <span className="text-4xl">{item.category ? categoryIcons[item.category] : categoryIcons.OTHER}</span>
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
          {item.priority && (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[item.priority]}`}>
              {item.priority}
            </span>
          )}
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
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
            )}

            {onDelete && (
              <button
                onClick={onDelete}
                className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 