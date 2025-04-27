'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { WishItem, Priority, Category, WishItemFormProps, ProductScrapingResult, ScrapingError } from '@/types';
import { Button } from '../ui/Button';
import { PriceInput } from '../ui/PriceInput';
import { ProductUrlPreview } from './ProductUrlPreview';

const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'ELECTRONICS', label: 'Eletrônicos' },
  { value: 'BOOKS', label: 'Livros' },
  { value: 'FASHION', label: 'Moda' },
  { value: 'HOME', label: 'Casa' },
  { value: 'GAMES', label: 'Jogos' },
  { value: 'OTHER', label: 'Outros' }
];

const PRIORITIES: { value: Priority; label: string }[] = [
  { value: 'HIGH', label: 'Alta' },
  { value: 'MEDIUM', label: 'Média' },
  { value: 'LOW', label: 'Baixa' }
];

const SAMPLE_IMAGES = [
  'https://m.media-amazon.com/images/I/81kRd88s3UL._AC_SL1500_.jpg',
  'https://m.media-amazon.com/images/I/71aQ3u78A3L._AC_SL1500_.jpg',
  'https://m.media-amazon.com/images/I/71IW-3ZL6LL._AC_SL1500_.jpg',
  'https://m.media-amazon.com/images/I/71ztd9BXhuL._AC_SL1500_.jpg',
];

export function WishItemForm({ onSubmit, initialData, onCancel }: WishItemFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    imageUrl: initialData?.imageUrl || '',
    additionalImages: initialData?.additionalImages || [],
    price: initialData?.price || undefined,
    category: initialData?.category || 'OTHER',
    priority: initialData?.priority || 'MEDIUM',
    purchaseUrl: initialData?.purchaseUrl || '',
    isReserved: initialData?.isReserved || false
  });

  const [productUrl, setProductUrl] = useState('');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isProductPreviewVisible, setIsProductPreviewVisible] = useState(false);

  const [productImages, setProductImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Quando o form for inicializado com dados existentes, 
    // configura as imagens da galeria
    if (initialData?.imageUrl) {
      const images = [initialData.imageUrl];
      if (initialData.additionalImages?.length) {
        initialData.additionalImages.forEach(img => {
          if (!images.includes(img)) {
            images.push(img);
          }
        });
      }
      setProductImages(images);
    }
  }, [initialData]);

  const handleProductData = (data: ProductScrapingResult) => {
    setIsLoading(false);
    setFormData(prev => ({
      ...prev,
      name: data.name,
      description: data.description || prev.description,
      imageUrl: data.imageUrl || prev.imageUrl,
      price: data.price,
      purchaseUrl: productUrl
    }));

    // Configurar a galeria de imagens
    if (data.imageUrl) {
      const images = [data.imageUrl];
      
      if (data.additionalImages && data.additionalImages.length > 0) {
        data.additionalImages.forEach(img => {
          if (!images.includes(img)) {
            images.push(img);
          }
        });
      }
      
      setProductImages(images);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const finalData = {
      ...formData,
      additionalImages: productImages.filter(img => img !== formData.imageUrl)
    };
    
    onSubmit(finalData);
  };

  const setMainImage = (imageUrl: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      imageUrl: imageUrl
    }));
    setSelectedImageIndex(index);
  };

  const handleFetchProduct = () => {
    if (productUrl.trim()) {
      setIsLoading(true);
      setIsProductPreviewVisible(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl mx-auto">
      {/* Seção de URL do produto */}
      <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          Adicionar Produto por URL
        </h3>
        
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
            <div className="flex-1 w-full">
              <input
                type="url"
                id="productUrl"
                value={productUrl}
                onChange={(e) => setProductUrl(e.target.value)}
                placeholder="Cole aqui o link de um produto da Amazon, Mercado Livre..."
                className="w-full h-full border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 px-4 py-2"
              />
            </div>
            <Button 
              type="button" 
              onClick={handleFetchProduct}
              disabled={isLoading}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 px-4 py-2 h-full whitespace-nowrap"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Buscando...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Buscar Produto
                </>
              )}
            </Button>
          </div>
          
          <p className="mt-2 text-sm text-gray-500 flex items-center">
            <svg className="w-4 h-4 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Cole o link de um produto para preencher automaticamente os dados
          </p>
        </div>

        {isProductPreviewVisible && (
          <div className="mt-4 transition-all duration-200 ease-in-out">
            <ProductUrlPreview 
              url={productUrl}
              onDataExtracted={handleProductData}
              onError={(error) => {
                console.error(error);
                setIsLoading(false);
              }}
            />
          </div>
        )}
      </div>

      {/* Seção do formulário principal */}
      <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
        <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
          <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Informações do Produto
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Campos do formulário */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nome do Produto *
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 px-4 py-2"
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
                rows={4}
                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 px-4 py-2"
                placeholder="Descreva o produto (cor, tamanho, modelo, etc.)"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Preço
                </label>
                <PriceInput
                  id="price"
                  value={formData.price}
                  onChange={(value) => setFormData({ ...formData, price: value })}
                  className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 px-4 py-2"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Categoria *
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 px-4 py-2 h-[42px]"
                >
                  {CATEGORIES.map(({ value, label }) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                  Prioridade *
                </label>
                <div className="mt-1 flex flex-wrap gap-3">
                  {PRIORITIES.map(({ value, label }) => (
                    <label 
                      key={value} 
                      className={`flex items-center px-3 py-2 rounded-md border cursor-pointer transition-colors ${
                        formData.priority === value 
                          ? 'bg-purple-50 border-purple-200 text-purple-700' 
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="priority"
                        value={value}
                        checked={formData.priority === value}
                        onChange={() => setFormData({ ...formData, priority: value })}
                        className="sr-only"
                      />
                      <span className={`w-2 h-2 rounded-full mr-2 ${
                        value === 'HIGH' ? 'bg-red-500' : 
                        value === 'MEDIUM' ? 'bg-yellow-500' : 
                        'bg-green-500'
                      }`}></span>
                      <span className="text-sm">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="purchaseUrl" className="block text-sm font-medium text-gray-700">
                  Link para Compra
                </label>
                <input
                  type="url"
                  id="purchaseUrl"
                  value={formData.purchaseUrl}
                  onChange={(e) => setFormData({ ...formData, purchaseUrl: e.target.value })}
                  className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 px-4 py-2"
                  placeholder="https://loja.com/produto"
                />
              </div>
            </div>

            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
                URL da Imagem Principal
              </label>
              <input
                type="url"
                id="imageUrl"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 px-4 py-2"
                placeholder="https://exemplo.com/imagem.jpg"
              />
            </div>
          </div>

          {/* Preview do produto */}
          <div className="lg:col-span-2">
            <div className="sticky top-4 bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
              <div className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white py-3 px-4">
                <h4 className="text-sm font-medium">Visualização do Produto</h4>
              </div>
              
              <div className="p-4">
                {/* Imagem principal */}
                <div className="relative aspect-square w-full bg-gray-50 mb-3 rounded-lg overflow-hidden">
                  {formData.imageUrl ? (
                    <Image
                      src={formData.imageUrl}
                      alt={formData.name || "Imagem do produto"}
                      fill
                      sizes="(max-width: 768px) 100vw, 300px"
                      className="object-contain"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg
                        className="h-16 w-16 text-gray-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Imagens adicionais */}
                {productImages.length > 1 && (
                  <div className="flex overflow-x-auto gap-2 pb-2 mb-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    {productImages.map((img, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setMainImage(img, index)}
                        className={`relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all ${
                          formData.imageUrl === img ? 'border-purple-500 scale-105' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`Imagem ${index + 1}`}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Informações do produto */}
                <div className="mt-4 space-y-2">
                  <h3 className="font-medium text-gray-900 line-clamp-2">
                    {formData.name || "Nome do produto"}
                  </h3>
                  
                  {formData.description && (
                    <p className="text-sm text-gray-500 line-clamp-3">
                      {formData.description}
                    </p>
                  )}
                  
                  {formData.price && (
                    <div className="mt-3">
                      <span className="text-lg font-semibold text-gray-900">
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        }).format(formData.price)}
                      </span>
                    </div>
                  )}

                  {formData.priority && (
                    <div className="mt-1 flex items-center">
                      <span className="text-xs uppercase font-semibold mr-2">Prioridade:</span>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                        ${formData.priority === 'HIGH' ? 'bg-red-100 text-red-800' : 
                          formData.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-green-100 text-green-800'}`}>
                        {PRIORITIES.find(p => p.value === formData.priority)?.label}
                      </span>
                    </div>
                  )}

                  {formData.category && (
                    <div className="mt-1 flex items-center">
                      <span className="text-xs uppercase font-semibold mr-2">Categoria:</span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                        {CATEGORIES.find(c => c.value === formData.category)?.label}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Botões de ação */}
      <div className="flex justify-end gap-3 mt-6">
        {onCancel && (
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            className="px-4 py-2"
          >
            Cancelar
          </Button>
        )}
        <Button 
          type="submit"
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 px-4 py-2"
        >
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {initialData ? 'Salvar Alterações' : 'Adicionar Produto'}
        </Button>
      </div>
    </form>
  );
} 