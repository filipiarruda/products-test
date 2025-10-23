'use client'
import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { orderSchema, OrderFormData } from '../../../model/schemas';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { useCreateOrderMutation } from '../../../model/queries';
import { useProductsQuery } from '@/modules/products/model/queries';
import { useRouter } from 'next/navigation';
import { PlusIcon, TrashIcon } from 'lucide-react';

const FormNewOrder: React.FC = () => {
  const { mutate, isPending } = useCreateOrderMutation();
  const { data: productsData, isLoading: isLoadingProducts } = useProductsQuery({ perPage: 999 });
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      customerName: '',
      orderDate: new Date().toISOString().split('T')[0], // Set default to today
      items: [{ productId: 0, quantity: 1 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const onSubmit = (data: OrderFormData) => {
    mutate(data, {
      onSuccess: () => {
        router.push('/orders');
      },
      onError: (error) => {
        console.error('Erro ao criar pedido:', error);
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl w-11/12 mx-auto bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-8 space-y-6 border"
    >
      <h3 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-zinc-100">Criação de Pedido</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="customerName">Nome do Cliente</Label>
          <Input
            id="customerName"
            type="text"
            {...register('customerName')}
            className={errors.customerName ? 'border-red-500' : ''}
            placeholder="Ex: João da Silva"
          />
          {errors.customerName && <span className="text-xs text-red-500">{errors.customerName.message}</span>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="orderDate">Data do Pedido</Label>
          <Input
            id="orderDate"
            type="date"
            {...register('orderDate')}
            className={errors.orderDate ? 'border-red-500' : ''}
          />
          {errors.orderDate && <span className="text-xs text-red-500">{errors.orderDate.message}</span>}
        </div>
      </div>

      <div>
        <Label>Itens do Pedido</Label>
        <div className="space-y-4 mt-2">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-4 p-4 border rounded-lg">
              <div className="flex-1 space-y-2">
                <Label htmlFor={`items.${index}.productId`}>Produto</Label>
                <select
                  id={`items.${index}.productId`}
                  {...register(`items.${index}.productId`, { valueAsNumber: true })}
                  className={`w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-zinc-800 ${errors.items?.[index]?.productId ? 'border-red-500' : 'border-zinc-300 dark:border-zinc-700'}`}
                  disabled={isLoadingProducts}
                >
                  <option value="0">Selecione um produto</option>
                  {productsData?.data?.map((product) => (
                    <option key={product.id} value={product.id}>{product.name}</option>
                  ))}
                </select>
                {errors.items?.[index]?.productId && <span className="text-xs text-red-500">{errors.items?.[index]?.productId?.message}</span>}
              </div>
              <div className="flex-1 space-y-2">
                <Label htmlFor={`items.${index}.quantity`}>Quantidade</Label>
                <Input
                  id={`items.${index}.quantity`}
                  type="number"
                  min="1"
                  {...register(`items.${index}.quantity`, { valueAsNumber: true })}
                  className={errors.items?.[index]?.quantity ? 'border-red-500' : ''}
                />
                {errors.items?.[index]?.quantity && <span className="text-xs text-red-500">{errors.items?.[index]?.quantity?.message}</span>}
              </div>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => remove(index)}
                disabled={fields.length === 1}
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-4"
          onClick={() => append({ productId: 0, quantity: 1 })}
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Adicionar Item
        </Button>
        {errors.items && <span className="text-xs text-red-500">{errors.items.message}</span>}
      </div>

      <div className="pt-4">
        <Button type="submit" disabled={isPending} className="w-full text-base font-semibold">
          {isPending ? <Skeleton className="h-6 w-24 mx-auto" /> : 'Criar Pedido'}
        </Button>
      </div>
    </form>
  );
};

export default FormNewOrder;
