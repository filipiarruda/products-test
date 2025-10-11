'use client'
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema, ProductFormData } from '../../../model/schemas';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { useCreateProductMutation } from '../../../model/queries';
import { useRouter } from 'next/navigation';

// Exemplo de lista de categorias (opcional)
const categories = ['Eletrônicos', 'Roupas', 'Alimentos', 'Livros'];

const FormNewProduct: React.FC = () => {
  const { mutate, isPending } = useCreateProductMutation();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    // Configuração opcional para garantir que o 'price' seja tratado como número
    defaultValues: {
      name: '',
      price: 0, 
      category: ''
    }
  });

  const onSubmit = (data: ProductFormData) => {
    const payload = {
      ...data,
      price: Math.round(data.price * 100),
    };
    mutate(payload, {
        onSuccess: () => {
            router.push('/products');
        },
        onError: (error) => {
            console.error('Erro ao criar produto:', error);
        }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg w-11/12 mx-auto bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-8 space-y-6 border"
    >
      <h3 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-zinc-100">Criação de Produto</h3>

      {/* Campo NOME */}
      <div className="space-y-2">
        <Label htmlFor="name">Nome do Produto</Label>
        <Input
          id="name"
          type="text"
          {...register('name')}
          className={errors.name ? 'border-red-500' : ''}
          placeholder="Ex: Smartphone X"
        />
        {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
      </div>

      {/* Campo PREÇO */}
      <div className="space-y-2">
        <Label htmlFor="price">Preço (R$)</Label>
        <Input
          id="price"
          type="text"
          inputMode="decimal"
          className={errors.price ? 'border-red-500' : ''}
          placeholder="0,00"
          {...register('price', {
            setValueAs: (value) => {
              // Remove tudo que não for número
              const clean = String(value).replace(/\D/g, "");
              // Converte para float com 2 casas decimais
              return clean ? parseFloat(clean) / 100 : 0;
            },
          })}
          onChange={e => {
            const raw = e.target.value.replace(/\D/g, "");
            const masked = raw ? (parseFloat(raw) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : "";
            e.target.value = masked.replace('R$', '').trim();
          }}
        />
        {errors.price && <span className="text-xs text-red-500">{errors.price.message}</span>}
      </div>

      {/* Campo CATEGORIA */}
      <div className="space-y-2">
        <Label htmlFor="category">Categoria</Label>
        <select
          id="category"
          {...register('category')}
          className={`w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-zinc-800 ${errors.category ? 'border-red-500' : 'border-zinc-300 dark:border-zinc-700'}`}
        >
          <option value="">Selecione uma categoria</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        {errors.category && <span className="text-xs text-red-500">{errors.category.message}</span>}
      </div>

          <div className="pt-4">
        <Button type="submit" disabled={isPending} className="w-full text-base font-semibold">
          {isPending ? <Skeleton className="h-6 w-24 mx-auto" /> : 'Criar Produto'}
        </Button>
      </div>
    </form>
  );
};

export default FormNewProduct;