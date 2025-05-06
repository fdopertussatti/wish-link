'use client';

import React from 'react';
import Link from 'next/link';
import { WishList } from '@/types';
import { formatDate } from '@/utils/format';

interface WishListHeaderProps {
  wishList: WishList;
  onShare: () => void;
  onAddItem: () => void;
}

export function WishListHeader({ wishList, onShare, onAddItem }: WishListHeaderProps) {
  return (
    <div className="relative bg-gradient-to-r from-purple-700 to-indigo-800 text-white">
      {/* Background com overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-700/70 to-indigo-800/70"></div>
        {wishList.coverImage && (
          <div className="absolute inset-0">
            <img 
              src={wishList.coverImage} 
              alt={wishList.name} 
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-indigo-900/80"></div>
          </div>
        )}
      </div>

      {/* Conteúdo do cabeçalho */}
      <div className="relative container mx-auto px-4 pt-16 pb-12">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <div className="flex items-center text-sm text-purple-200">
            <Link href="/listas" className="hover:text-white transition-colors">
              Minhas Listas
            </Link>
            <svg className="h-4 w-4 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-white">{wishList.name}</span>
          </div>
        </div>

        {/* Título e descrição */}
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mr-3">
              {wishList.name}
            </h1>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              wishList.isPublic 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {wishList.isPublic ? 'Pública' : 'Privada'}
            </span>
          </div>
          {wishList.description && (
            <p className="text-lg text-purple-100">{wishList.description}</p>
          )}
          <p className="mt-2 text-sm text-purple-200">
            Criada em {formatDate(wishList.createdAt)} • {wishList.items.length} {wishList.items.length === 1 ? 'item' : 'itens'}
          </p>
        </div>

        {/* Botões de ação */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={onAddItem}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Adicionar Item
          </button>
          
          <button
            onClick={onShare}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Compartilhar
          </button>
          
          <Link
            href={`/listas/${wishList.id}/edit`}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-transparent hover:bg-white/10 focus:outline-none"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Editar Lista
          </Link>
        </div>
      </div>
    </div>
  );
} 