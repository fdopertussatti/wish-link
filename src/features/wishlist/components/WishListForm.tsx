import React from 'react';
import { NewWishList } from '@/types';
import { Button } from '../ui/Button';

interface WishListFormProps {
  onSubmit: (data: NewWishList) => void;
  initialData?: Partial<NewWishList>;
}

export function WishListForm({ onSubmit, initialData }: WishListFormProps) {
  const [formData, setFormData] = React.useState<NewWishList>({
    name: initialData?.name || '',
    description: initialData?.description || '',
    coverImage: initialData?.coverImage || '',
    isPublic: initialData?.isPublic || false,
    theme: initialData?.theme || {
      primaryColor: '#7C3AED',
      backgroundColor: '#F5F3FF'
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nome da Lista *
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="mt-1"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Descrição
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          className="mt-1"
        />
      </div>

      <div>
        <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">
          URL da Imagem de Capa
        </label>
        <input
          type="url"
          id="coverImage"
          value={formData.coverImage}
          onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
          className="mt-1"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="isPublic"
          checked={formData.isPublic}
          onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
        />
        <label htmlFor="isPublic" className="ml-2 block text-sm text-gray-900">
          Lista Pública
        </label>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="submit">
          {initialData ? 'Salvar' : 'Criar Lista'}
        </Button>
      </div>
    </form>
  );
} 