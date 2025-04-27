export interface WishItem {
  id: string;
  name: string;
  description?: string;
  price?: number;
  url?: string;
  imageUrl?: string;
  isPurchased: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface WishList {
  id: string;
  name: string;
  description?: string;
  isPublic: boolean;
  items: WishItem[];
  userId: string;
  createdAt: Date;
  updatedAt: Date;
} 