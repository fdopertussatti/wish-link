import { WishList, Category } from '@/types';

export const sampleWishList: WishList = {
  id: '1',
  name: 'Minha Lista de Desejos',
  description: 'Itens que gostaria de ganhar',
  coverImage: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634',
  isPublic: true,
  createdAt: Date.now(),
  theme: {
    primaryColor: '#7C3AED',
    backgroundColor: '#F5F3FF'
  },
  items: [
    {
      id: '1',
      name: 'Fone de Ouvido Sony WH-1000XM4',
      description: 'Fone de ouvido com cancelamento de ruído ativo',
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
      price: 1499.90,
      category: 'ELECTRONICS',
      priority: 'HIGH',
      isReserved: false,
      purchaseUrl: 'https://amazon.com.br',
      createdAt: Date.now()
    },
    {
      id: '2',
      name: 'Kindle Paperwhite',
      description: 'E-reader com tela antirreflexo e luz ajustável',
      imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c',
      price: 499.90,
      category: 'ELECTRONICS',
      priority: 'MEDIUM',
      isReserved: true,
      reservedBy: 'João Silva',
      purchaseUrl: 'https://amazon.com.br',
      createdAt: Date.now()
    },
    {
      id: '3',
      name: 'Box Harry Potter',
      description: 'Coleção completa dos 7 livros',
      imageUrl: 'https://images.unsplash.com/photo-1500697017927-f8396223316b',
      price: 299.90,
      category: 'BOOKS',
      priority: 'LOW',
      isReserved: false,
      purchaseUrl: 'https://amazon.com.br',
      createdAt: Date.now()
    }
  ]
}; 