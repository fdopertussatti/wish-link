'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { WishItemForm } from '@/components/forms/WishItemForm';
import { WishItem } from '@/types';

interface AddItemPageProps {
  params: {
    id: string;
  };
}

export default function AddItemPage({ params }: AddItemPageProps) {
  const router = useRouter();
  const listId = params.id;
  
  const handleSubmit = async (data: Omit<WishItem, 'id' | 'createdAt'>) => {
    try {
      // In a real app, this would be an API call
      console.log('Adding item to list', listId, data);
      
      // Mock API call success
      setTimeout(() => {
        router.push(`/listas/${listId}`);
      }, 500);
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };
  
  const handleCancel = () => {
    router.push(`/listas/${listId}`);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Adicionar Item à Lista</h1>
      
      <WishItemForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
} 