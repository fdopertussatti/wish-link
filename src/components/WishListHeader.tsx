import React from 'react';
import { WishList } from '@/types';
import { Button } from './ui/Button';
import Image from 'next/image';

interface WishListHeaderProps {
  wishList: WishList;
  onShare?: () => void;
  onAddItem?: () => void;
}

export function WishListHeader({ wishList, onShare, onAddItem }: WishListHeaderProps) {
  return (
    <div className="relative">
      {/* Cover Image */}
      <div className="h-48 md:h-64 relative">
        {wishList.coverImage ? (
          <Image
            src={wishList.coverImage}
            alt={wishList.name}
            fill
            className="object-cover"
          />
        ) : (
          <div 
            className="w-full h-full bg-gradient-to-r from-purple-500 to-blue-500"
            style={{
              backgroundColor: wishList.theme?.backgroundColor || '#F3F4F6'
            }}
          />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-30" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4">
        <div className="relative -mt-24 bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {wishList.name}
              </h1>
              {wishList.description && (
                <p className="text-gray-600">{wishList.description}</p>
              )}
            </div>
            <div className="flex gap-3">
              {onShare && (
                <Button variant="outline" onClick={onShare}>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Compartilhar
                </Button>
              )}
              {onAddItem && (
                <Button onClick={onAddItem}>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Adicionar Item
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 