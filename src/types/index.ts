export type Priority = 'HIGH' | 'MEDIUM' | 'LOW';

export type Category = 'ELECTRONICS' | 'BOOKS' | 'FASHION' | 'HOME' | 'GAMES' | 'OTHER';

export interface WishItem {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  additionalImages?: string[];
  price?: number;
  category: Category;
  priority: Priority;
  isReserved: boolean;
  reservedBy?: string;
  purchaseUrl?: string;
  createdAt: number;
}

export interface WishList {
  id: string;
  name: string;
  description?: string;
  coverImage?: string;
  isPublic: boolean;
  items: WishItem[];
  createdAt: number;
  theme?: {
    primaryColor: string;
    backgroundColor: string;
  };
}

export type NewWishList = Omit<WishList, 'id' | 'items' | 'createdAt'>;

// Adicione tipos para as props dos componentes
export interface WishListProviderProps {
  children: React.ReactNode;
}

// Tipos para o scraping de produtos
export interface ProductScrapingResult {
  name: string;
  description?: string;
  imageUrl?: string;
  additionalImages?: string[];
  price?: number;
  store: string;
  currency: string;
  available: boolean;
}

export interface ScrapingError {
  message: string;
  code: 'INVALID_URL' | 'STORE_NOT_SUPPORTED' | 'FETCH_ERROR' | 'PARSE_ERROR';
}

// Atualizar WishItemForm props
export interface WishItemFormProps {
  initialData?: Partial<WishItem>;
  onSubmit: (data: Omit<WishItem, 'id' | 'createdAt'>) => void;
  onCancel?: () => void;
}

// Novo componente de URL preview
export interface ProductPreviewProps {
  url: string;
  onDataExtracted: (data: ProductScrapingResult) => void;
  onError: (error: ScrapingError) => void;
}

// Suporte a lojas
export interface StoreParser {
  name: string;
  hostname: string[];
  parse: (html: string) => Promise<ProductScrapingResult>;
} 