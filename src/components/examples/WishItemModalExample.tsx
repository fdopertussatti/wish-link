'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { WishItemFormModal } from '@/components/forms/WishItemFormModal';
import { WishItem } from '@/types';

export function WishItemModalExample() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<Partial<WishItem> | undefined>(undefined);
  
  const openAddModal = () => {
    setItemToEdit(undefined);
    setIsModalOpen(true);
  };
  
  const openEditModal = (item: WishItem) => {
    setItemToEdit(item);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  const handleSubmit = (data: Omit<WishItem, 'id' | 'createdAt'>) => {
    // Aqui você faria a lógica para salvar o item 
    // (adicionar novo ou atualizar existente)
    console.log('Item submitted:', data);
    
    // Fechar o modal após o envio bem-sucedido
    setIsModalOpen(false);
  };
  
  // Exemplo de item para edição
  const exampleItem: WishItem = {
    id: '1',
    name: 'iPhone 13',
    description: 'Smartphone Apple com tela de 6.1"',
    price: 5499.99,
    category: 'ELECTRONICS',
    priority: 'HIGH',
    isReserved: false,
    createdAt: Date.now(),
  };
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Exemplo do Modal de Itens</h1>
        <p className="text-gray-600 mb-4">
          Este exemplo mostra como usar o componente WishItemFormModal para adicionar ou editar items
          sem navegar para uma nova página.
        </p>
      </div>
      
      <div className="flex space-x-4">
        <Button onClick={openAddModal}>
          Adicionar Novo Item
        </Button>
        
        <Button 
          onClick={() => openEditModal(exampleItem)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Editar Item Exemplo
        </Button>
      </div>
      
      {/* O Modal */}
      <WishItemFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        initialData={itemToEdit}
        onSubmit={handleSubmit}
      />
    </div>
  );
} 