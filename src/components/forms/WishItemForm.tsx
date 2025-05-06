'use client';

import React, { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { WishItemFormProps } from '@/types';
import { formatPrice } from '@/utils/format';

// Define custom components for form elements that might not exist yet
const Input = ({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    {...props}
  />
);

const Textarea = ({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea
    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    {...props}
  />
);

// Form components that might not exist yet
const FormRoot = ({ className, ...props }: React.FormHTMLAttributes<HTMLFormElement>) => (
  <form className={className} {...props} />
);

const FormGroup = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`mb-4 ${className}`}>{children}</div>
);

const FormLabel = ({ children }: { children: React.ReactNode }) => (
  <label className="block text-sm font-medium text-gray-700 mb-1">{children}</label>
);

const FormControl = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-1">{children}</div>
);

const FormMessage = ({ children }: { children: React.ReactNode }) => (
  <p className="mt-1 text-sm text-red-600">{children}</p>
);

const wishItemSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().optional(),
  imageUrl: z.string().url('URL inválida').or(z.string().length(0)).optional(),
  price: z.coerce.number().min(0, 'Preço deve ser maior que zero'),
  purchaseUrl: z.string().url('URL inválida').or(z.string().length(0)).optional(),
  category: z.enum(['ELECTRONICS', 'BOOKS', 'FASHION', 'HOME', 'GAMES', 'OTHER'], {
    errorMap: () => ({ message: 'Selecione uma categoria válida' }),
  }),
  priority: z.enum(['HIGH', 'MEDIUM', 'LOW'], {
    errorMap: () => ({ message: 'Selecione uma prioridade válida' }),
  }),
});

type WishItemFormValues = z.infer<typeof wishItemSchema>;

export function WishItemForm({ 
  initialData, 
  onSubmit,
  onCancel
}: WishItemFormProps) {
  const isEditing = !!initialData?.id;
  
  const form = useForm<WishItemFormValues>({
    resolver: zodResolver(wishItemSchema),
    defaultValues: {
      name: '',
      description: '',
      imageUrl: '',
      price: 0,
      purchaseUrl: '',
      category: 'OTHER',
      priority: 'MEDIUM',
    }
  });

  // Reset the form with initialData when component mounts or initialData changes
  useEffect(() => {
    form.reset({
      name: initialData?.name || '',
      description: initialData?.description || '',
      imageUrl: initialData?.imageUrl || '',
      price: initialData?.price || 0,
      purchaseUrl: initialData?.purchaseUrl || '',
      category: initialData?.category || 'OTHER' as WishItemFormValues['category'],
      priority: initialData?.priority || 'MEDIUM' as WishItemFormValues['priority'],
    });
  }, [form, initialData]);

  const handleSubmit = form.handleSubmit((data: WishItemFormValues) => {
    onSubmit({
      ...data,
      isReserved: initialData?.isReserved || false,
    });
  });

  const handleInputPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    form.setValue('price', parseFloat(value) || 0, { shouldValidate: true });
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">
        {isEditing ? 'Editar Item' : 'Adicionar Novo Item'}
      </h2>
      
      <FormRoot onSubmit={handleSubmit} className="space-y-4">
        <FormGroup>
          <FormLabel>Nome</FormLabel>
          <FormControl>
            <Input
              placeholder="Nome do item"
              {...form.register('name')}
            />
          </FormControl>
          {form.formState.errors.name && (
            <FormMessage>{form.formState.errors.name.message}</FormMessage>
          )}
        </FormGroup>
        
        <FormGroup>
          <FormLabel>Descrição</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Descrição do item (opcional)"
              className="resize-none"
              {...form.register('description')}
            />
          </FormControl>
          {form.formState.errors.description && (
            <FormMessage>{form.formState.errors.description.message}</FormMessage>
          )}
        </FormGroup>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormGroup>
            <FormLabel>Preço</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="0.00"
                value={form.getValues('price') ? formatPrice(form.getValues('price')) : ''}
                onChange={handleInputPrice}
                onBlur={() => form.trigger('price')}
              />
            </FormControl>
            {form.formState.errors.price && (
              <FormMessage>{form.formState.errors.price.message}</FormMessage>
            )}
          </FormGroup>
          
          <FormGroup>
            <FormLabel>Categoria</FormLabel>
            <FormControl>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...form.register('category')}
              >
                <option value="">Selecione uma categoria</option>
                <option value="ELECTRONICS">ELECTRONICS</option>
                <option value="BOOKS">BOOKS</option>
                <option value="FASHION">FASHION</option>
                <option value="HOME">HOME</option>
                <option value="GAMES">GAMES</option>
                <option value="OTHER">OTHER</option>
              </select>
            </FormControl>
            {form.formState.errors.category && (
              <FormMessage>{form.formState.errors.category.message}</FormMessage>
            )}
          </FormGroup>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormGroup>
            <FormLabel>Prioridade</FormLabel>
            <FormControl>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...form.register('priority')}
              >
                <option value="">Selecione uma prioridade</option>
                <option value="HIGH">HIGH</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="LOW">LOW</option>
              </select>
            </FormControl>
            {form.formState.errors.priority && (
              <FormMessage>{form.formState.errors.priority.message}</FormMessage>
            )}
          </FormGroup>
          
          <div className="h-0 md:h-auto"></div>
        </div>
        
        <FormGroup>
          <FormLabel>URL da Imagem (opcional)</FormLabel>
          <FormControl>
            <Input
              placeholder="https://exemplo.com/imagem.jpg"
              {...form.register('imageUrl')}
            />
          </FormControl>
          {form.formState.errors.imageUrl && (
            <FormMessage>{form.formState.errors.imageUrl.message}</FormMessage>
          )}
        </FormGroup>
        
        <FormGroup>
          <FormLabel>URL de Compra (opcional)</FormLabel>
          <FormControl>
            <Input
              placeholder="https://exemplo.com/produto"
              {...form.register('purchaseUrl')}
            />
          </FormControl>
          {form.formState.errors.purchaseUrl && (
            <FormMessage>{form.formState.errors.purchaseUrl.message}</FormMessage>
          )}
        </FormGroup>
        
        <div className="flex justify-end space-x-2 pt-4">
          {onCancel && (
            <Button
              type="button"
              onClick={onCancel}
            >
              Cancelar
            </Button>
          )}
          <Button type="submit">
            {isEditing ? 'Salvar Alterações' : 'Adicionar Item'}
          </Button>
        </div>
      </FormRoot>
    </div>
  );
} 