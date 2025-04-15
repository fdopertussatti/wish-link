import { z } from 'zod';

export const wishListSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  description: z.string().optional(),
  coverImage: z.string().url('URL inválida').optional().or(z.literal('')),
  isPublic: z.boolean(),
  theme: z.object({
    primaryColor: z.string(),
    backgroundColor: z.string()
  })
});

export const wishItemSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  description: z.string().optional(),
  imageUrl: z.string().url('URL inválida').optional().or(z.literal('')),
  price: z.number().min(0, 'O preço deve ser maior que zero').optional(),
  category: z.enum(['ELECTRONICS', 'BOOKS', 'FASHION', 'HOME', 'GAMES', 'OTHER']),
  priority: z.enum(['HIGH', 'MEDIUM', 'LOW']),
  purchaseUrl: z.string().url('URL inválida').optional().or(z.literal('')),
  isReserved: z.boolean()
}); 