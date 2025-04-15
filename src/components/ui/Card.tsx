import React from 'react';
import Image from 'next/image';
import { WishItem } from '@/types';
import { Button } from './Button';

interface CardProps {
  item: WishItem;
  onReserve?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function Card({ item, onReserve, onEdit, onDelete }: CardProps) {
  const priorityColors = {
    HIGH: 'bg-red-100 text-red-800',
    MEDIUM: 'bg-yellow-100 text-yellow-800',
    LOW: 'bg-green-100 text-green-800'
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="relative h-48 w-full">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">Sem imagem</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[item.priority]}`}>
            {item.priority}
          </span>
        </div>
        
        {item.description && (
          <p className="text-gray-600 text-sm mb-4">{item.description}</p>
        )}
        
        <div className="flex items-center justify-between gap-2">
          <Button
            variant={item.isReserved ? 'secondary' : 'primary'}
            size="sm"
            onClick={onReserve}
            className="flex-1"
          >
            {item.isReserved ? 'Reservado' : 'Reservar'}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onEdit}
          >
            Editar
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onDelete}
            className="text-red-600 border-red-600 hover:bg-red-50"
          >
            Excluir
          </Button>
        </div>
      </div>
    </div>
  );
} 