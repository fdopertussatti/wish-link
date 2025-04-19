import { WishList, Category } from '@/types';

export const sampleWishList: WishList = {
  id: 'sample-list',
  title: 'Minha Lista de Desejos',
  description: 'Uma lista de exemplo para demonstrar o funcionamento do app',
  items: [
    {
      id: 'item-1',
      name: 'Smartphone',
      description: 'Um smartphone novo',
      price: 2000,
      url: 'https://example.com/smartphone',
      image: 'https://example.com/smartphone.jpg',
      isReserved: false,
      createdAt: Date.now()
    }
  ],
  createdAt: Date.now(),
  userId: 'sample-user',
  coverImage: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634',
  isPublic: true,
  theme: {
    primaryColor: '#7C3AED',
    backgroundColor: '#F5F3FF'
  },
  priority: 'HIGH'
}; 