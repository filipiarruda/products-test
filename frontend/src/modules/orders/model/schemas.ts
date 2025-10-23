import { z } from 'zod';

export const orderSchema = z.object({
  customerName: z.string().min(1, 'O nome do cliente é obrigatório.'),
  orderDate: z.string().min(1, 'A data do pedido é obrigatória.'),
  items: z.array(z.object({
    productId: z.number().min(1, 'Selecione um produto.'),
    quantity: z.number().min(1, 'A quantidade deve ser pelo menos 1.'),
  })).min(1, 'Adicione pelo menos um item ao pedido.'),
});

export type OrderFormData = z.infer<typeof orderSchema>;
