'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { useI18n } from '@/contexts/I18nContext';
import { NewWishList } from '@/types';

interface WishListFormProps {
  initialData?: Partial<NewWishList>;
  onSubmit: (data: NewWishList) => void;
  onCancel?: () => void;
}

export function WishListForm({ initialData, onSubmit, onCancel }: WishListFormProps) {
  const { t } = useI18n();
  
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [isPublic, setIsPublic] = useState(initialData?.isPublic ?? true);
  const [coverImage, setCoverImage] = useState(initialData?.coverImage || '');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Validação simples do formulário
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!name.trim()) {
      newErrors.name = t('validation.required', 'Este campo é obrigatório');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const wishListData: NewWishList = {
      name: name.trim(),
      description: description.trim() || undefined,
      isPublic,
      coverImage: coverImage || undefined,
      theme: {
        primaryColor: '#9333EA', // Default purple
        backgroundColor: '#F3F4F6' // Default light gray
      }
    };
    
    onSubmit(wishListData);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Nome da lista */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          {t('labels.name', 'common')}*
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.name ? 'border-red-300' : 'border-gray-300'
          } rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500`}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
        )}
      </div>
      
      {/* Descrição */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          {t('labels.description', 'common')}
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
        />
      </div>
      
      {/* Imagem de capa */}
      <div>
        <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">
          {t('labels.image', 'common')}
        </label>
        <input
          type="url"
          id="coverImage"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
          placeholder="https://example.com/image.jpg"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
        />
        <p className="mt-1 text-xs text-gray-500">
          {t('newList.imageHelp', 'Adicione uma URL de imagem para personalizar sua lista')}
        </p>
        
        {/* Preview da imagem */}
        {coverImage && (
          <div className="mt-2 relative h-32 w-full">
            <img 
              src={coverImage} 
              alt="Preview" 
              className="h-32 w-full object-cover rounded-md"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        )}
      </div>
      
      {/* Visibilidade */}
      <div>
        <span className="block text-sm font-medium text-gray-700 mb-2">
          Visibilidade
        </span>
        <div className="flex items-center space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              checked={isPublic}
              onChange={() => setIsPublic(true)}
              className="form-radio h-4 w-4 text-purple-600 transition duration-150 ease-in-out"
            />
            <span className="ml-2 text-sm text-gray-700">
              {t('common.public', 'common')}
            </span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              checked={!isPublic}
              onChange={() => setIsPublic(false)}
              className="form-radio h-4 w-4 text-purple-600 transition duration-150 ease-in-out"
            />
            <span className="ml-2 text-sm text-gray-700">
              {t('common.private', 'common')}
            </span>
          </label>
        </div>
        <p className="mt-1 text-xs text-gray-500">
          {isPublic
            ? t('newList.publicHelp', 'Listas públicas podem ser compartilhadas e vistas por qualquer pessoa')
            : t('newList.privateHelp', 'Listas privadas são visíveis apenas para você')}
        </p>
      </div>
      
      {/* Botões */}
      <div className="flex justify-end space-x-3 pt-4">
        {onCancel && (
          <Button 
            type="button" 
            onClick={onCancel}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800"
          >
            {t('buttons.cancel', 'common')}
          </Button>
        )}
        <Button type="submit">
          {t('buttons.save', 'common')}
        </Button>
      </div>
    </form>
  );
} 