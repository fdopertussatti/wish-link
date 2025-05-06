'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { WishItemForm } from '@/components/forms/WishItemForm';
import { WishItem } from '@/types';

interface EditItemPageProps {
  params: {
    id: string;
    itemId: string;
  };
}

export default function EditItemPage({ params }: EditItemPageProps) {
  const router = useRouter();
  const listId = params.id;
  const itemId = params.itemId;
  const [item, setItem] = useState<WishItem | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate fetching item data
    // In a real app, this would be an API call
    setTimeout(() => {
      // Mock item data
      setItem({
        id: itemId,
        name: 'Item Sample',
        description: 'Sample description for testing',
        price: 99.99,
        category: 'ELECTRONICS',
        priority: 'MEDIUM',
        isReserved: false,
        createdAt: Date.now(),
      });
      setLoading(false);
    }, 500);
  }, [itemId]);
  
  const handleSubmit = async (data: Omit<WishItem, 'id' | 'createdAt'>) => {
    try {
      // In a real app, this would be an API call
      console.log('Updating item', itemId, data);
      
      // Mock API call success
      setTimeout(() => {
        router.push(`/listas/${listId}`);
      }, 500);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };
  
  const handleCancel = () => {
    router.push(`/listas/${listId}`);
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Carregando...</h1>
      </div>
    );
  }
  
  if (!item) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Item não encontrado</h1>
        <button 
          onClick={() => router.push(`/listas/${listId}`)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Voltar para a lista
        </button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Editar Item</h1>
      
      <WishItemForm
        initialData={item}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
} 