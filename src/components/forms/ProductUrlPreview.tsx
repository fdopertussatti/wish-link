'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ProductPreviewProps, ProductScrapingResult, ScrapingError } from '@/types';
import { Button } from '../ui/Button';

export function ProductUrlPreview({ url, onDataExtracted, onError }: ProductPreviewProps) {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<ProductScrapingResult | null>(null);
  const [error, setError] = useState<ScrapingError | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (!url) {
      setPreview(null);
      setError(null);
      return;
    }

    const fetchProductData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Pequeno delay para melhorar a UX
        await new Promise(resolve => setTimeout(resolve, 700));

        const response = await fetch('/api/scrape-product', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw data;
        }

        setPreview(data);
        // Inicializar a imagem selecionada com a imagem principal
        setSelectedImage(data.imageUrl || null);
        onDataExtracted(data);
      } catch (err) {
        const error: ScrapingError = {
          message: typeof err === 'object' && err && 'message' in err 
            ? (err as { message: string }).message 
            : 'Não foi possível extrair as informações do produto',
          code: 'FETCH_ERROR'
        };
        setError(error);
        onError(error);
      } finally {
        setLoading(false);
      }
    };

    // Debounce para evitar muitas requisições
    const timer = setTimeout(fetchProductData, 500);
    return () => clearTimeout(timer);
  }, [url, onDataExtracted, onError]);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  if (!url) return null;

  return (
    <div className="mt-6 transition-all">
      {loading && (
        <div className="animate-pulse space-y-4 bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3">
              <div className="h-48 bg-gray-200 rounded-lg mb-2"></div>
              <div className="flex gap-2">
                <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
            <div className="flex-1">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="flex gap-2">
                <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
                <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {error && !loading && (
        <div className="bg-red-50 border border-red-100 rounded-lg p-6 shadow-sm">
          <div className="flex items-center mb-4">
            <svg className="h-6 w-6 text-red-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-medium text-red-800">Falha ao carregar produto</h3>
          </div>
          <p className="text-sm text-red-600 mb-4">{error.message}</p>
          {error.code === 'STORE_NOT_SUPPORTED' && (
            <div className="bg-white p-4 rounded-lg border border-red-100 text-sm">
              <p className="mb-2 text-gray-700">
                <strong>Dica:</strong> Tente usar links diretos da página do produto de uma das lojas suportadas:
              </p>
              <ul className="list-disc pl-5 text-gray-600 space-y-1">
                <li>Amazon: links começando com "amazon.com.br/..."</li>
                <li>Mercado Livre: links começando com "mercadolivre.com.br/..."</li>
              </ul>
            </div>
          )}
        </div>
      )}

      {preview && !loading && (
        <div className="bg-white border rounded-lg overflow-hidden shadow-sm transition-all">
          <div className="p-6">
            <div className="flex flex-col md:flex-row items-start gap-6">
              {/* Imagem e galeria */}
              <div className="w-full md:w-1/3 flex-shrink-0">
                <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden mb-3 shadow-sm">
                  {selectedImage ? (
                    <Image
                      src={selectedImage}
                      alt={preview.name}
                      fill
                      className="object-contain"
                    />
                  ) : preview.imageUrl ? (
                    <Image
                      src={preview.imageUrl}
                      alt={preview.name}
                      fill
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

                {/* Galeria de Thumbnails */}
                {preview.additionalImages && preview.additionalImages.length > 1 && (
                  <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    {preview.additionalImages.map((img, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleImageClick(img)}
                        className={`relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all ${
                          selectedImage === img ? 'border-purple-500 scale-105' : 'border-gray-200 hover:border-gray-300'
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
              </div>

              {/* Informações do produto */}
              <div className="flex-1 min-w-0">
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 text-lg">
                    {preview.name}
                  </h4>
                  {preview.description && (
                    <p className="text-sm text-gray-500 mt-2 line-clamp-3">
                      {preview.description}
                    </p>
                  )}
                </div>
                
                {preview.price && (
                  <div className="mb-4">
                    <p className="text-xl font-semibold text-gray-900">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: preview.currency || 'BRL',
                      }).format(preview.price)}
                    </p>
                  </div>
                )}
                
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    {preview.store}
                  </span>
                  
                  {preview.available && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Disponível
                    </span>
                  )}
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Informações do produto detectadas automaticamente:</span>
                  </div>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• Nome do produto extraído da página</li>
                    <li>• Preço atual na loja</li>
                    <li>• {preview.additionalImages?.length || 0} imagens do produto encontradas</li>
                    <li>• Link de compra configurado para a URL informada</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 p-4 bg-gray-50 flex justify-end">
            <p className="text-xs text-gray-500 italic">
              Os dados foram extraídos automaticamente e podem ser editados no formulário acima.
            </p>
          </div>
        </div>
      )}
    </div>
  );
} 