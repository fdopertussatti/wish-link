'use client';

import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
} from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Category, Priority, WishItem } from '@/types';
import { formatCurrency } from '@/utils/format';

const wishItemSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().optional(),
  imageUrl: z.string().url('URL inválida').or(z.string().length(0)).optional(),
  price: z.coerce.number().min(0, 'Preço deve ser maior que zero'),
  purchaseUrl: z.string().url('URL inválida').or(z.string().length(0)).optional(),
  category: z.nativeEnum(Category, {
    errorMap: () => ({ message: 'Selecione uma categoria válida' }),
  }),
  priority: z.nativeEnum(Priority, {
    errorMap: () => ({ message: 'Selecione uma prioridade válida' }),
  }),
});

type WishItemFormValues = z.infer<typeof wishItemSchema>;

interface WishItemFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Partial<WishItem>;
  onSubmit: (data: WishItemFormValues) => void;
}

export function WishItemFormModal({ 
  isOpen, 
  onClose, 
  initialData, 
  onSubmit 
}: WishItemFormModalProps) {
  const isEditing = !!initialData?.id;
  
  const form = useForm<WishItemFormValues>({
    resolver: zodResolver(wishItemSchema),
    defaultValues: {
      name: '',
      description: '',
      imageUrl: '',
      price: 0,
      purchaseUrl: '',
      category: Category.OTHERS,
      priority: Priority.MEDIUM,
    }
  });

  // Reset the form with initialData when the modal opens or when initialData changes
  useEffect(() => {
    if (isOpen) {
      form.reset({
        name: initialData?.name || '',
        description: initialData?.description || '',
        imageUrl: initialData?.imageUrl || '',
        price: initialData?.price || 0,
        purchaseUrl: initialData?.purchaseUrl || '',
        category: initialData?.category || Category.OTHERS,
        priority: initialData?.priority || Priority.MEDIUM,
      });
    }
  }, [form, initialData, isOpen]);

  const handleSubmit = form.handleSubmit((data) => {
    onSubmit(data);
  });

  const handleInputPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    form.setValue('price', parseFloat(value) || 0, { shouldValidate: true });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Editar Item' : 'Adicionar Novo Item'}
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do item" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Descrição do item (opcional)" 
                      className="resize-none" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preço</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="0.00"
                        value={formatCurrency(field.value)}
                        onChange={handleInputPrice}
                        onBlur={field.onBlur}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(Category).map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prioridade</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a prioridade" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(Priority).map((priority) => (
                          <SelectItem key={priority} value={priority}>
                            {priority}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL da Imagem (opcional)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://exemplo.com/imagem.jpg" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="purchaseUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL de Compra (opcional)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://loja.com/produto" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter className="gap-2 sm:gap-0">
              <Button 
                type="button" 
                variant="secondary" 
                onClick={onClose}
              >
                Cancelar
              </Button>
              <Button type="submit">
                {isEditing ? 'Atualizar' : 'Adicionar'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
} 