'use client';

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { WishList, WishItem } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { sampleWishList } from '@/utils/sampleData';

interface WishListContextType {
  wishLists: WishList[];
  isLoading: boolean;
  addWishList: (wishList: Omit<WishList, 'id' | 'createdAt'>) => void;
  updateWishList: (wishList: WishList) => void;
  deleteWishList: (id: string) => void;
  addItemToList: (listId: string, item: Omit<WishItem, 'id' | 'createdAt'>) => void;
  updateItem: (listId: string, item: WishItem) => void;
  deleteItem: (listId: string, itemId: string) => void;
  toggleItemReserved: (listId: string, itemId: string) => void;
  getWishList: (id: string) => WishList | undefined;
}

const WishListContext = createContext<WishListContextType | undefined>(undefined);

export function WishListProvider({ children }: { children: ReactNode }) {
  const [wishLists, setWishLists] = useLocalStorage<WishList[]>('wishLists', [sampleWishList]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular um tempo de carregamento para demonstração
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const addWishList = (wishList: Omit<WishList, 'id' | 'createdAt'>) => {
    const newWishList: WishList = {
      ...wishList,
      id: crypto.randomUUID(),
      createdAt: Date.now()
    };
    setWishLists([...wishLists, newWishList]);
  };

  const updateWishList = (updatedList: WishList) => {
    setWishLists(wishLists.map(list => 
      list.id === updatedList.id ? updatedList : list
    ));
  };

  const deleteWishList = (id: string) => {
    setWishLists(wishLists.filter(list => list.id !== id));
  };

  const addItemToList = (listId: string, item: Omit<WishItem, 'id' | 'createdAt'>) => {
    const newItem: WishItem = {
      ...item,
      id: crypto.randomUUID(),
      createdAt: Date.now()
    };

    setWishLists(wishLists.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          items: [...list.items, newItem]
        };
      }
      return list;
    }));
  };

  const updateItem = (listId: string, updatedItem: WishItem) => {
    setWishLists(wishLists.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          items: list.items.map(item => 
            item.id === updatedItem.id ? updatedItem : item
          )
        };
      }
      return list;
    }));
  };

  const deleteItem = (listId: string, itemId: string) => {
    setWishLists(wishLists.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          items: list.items.filter(item => item.id !== itemId)
        };
      }
      return list;
    }));
  };

  const toggleItemReserved = (listId: string, itemId: string) => {
    setWishLists(wishLists.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          items: list.items.map(item => {
            if (item.id === itemId) {
              return { ...item, isReserved: !item.isReserved };
            }
            return item;
          })
        };
      }
      return list;
    }));
  };

  const getWishList = (id: string) => {
    return wishLists.find(list => list.id === id);
  };

  const value = {
    wishLists,
    isLoading,
    addWishList,
    updateWishList,
    deleteWishList,
    addItemToList,
    updateItem,
    deleteItem,
    toggleItemReserved,
    getWishList
  };

  return (
    <WishListContext.Provider value={value}>
      {children}
    </WishListContext.Provider>
  );
}

export function useWishList() {
  const context = useContext(WishListContext);
  if (context === undefined) {
    throw new Error('useWishList must be used within a WishListProvider');
  }
  return context;
} 