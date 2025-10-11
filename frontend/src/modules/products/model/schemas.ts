import z from "zod";

export const productSchema = z.object({
  name: z.string()
    .min(3, 'O nome deve ter pelo menos 3 caracteres.')
    .max(100, 'O nome não pode exceder 100 caracteres.'),

  price: z.number({
    error: 'O preço é obrigatório e deve ser um número.',
  })
    .min(0.01, 'O preço deve ser maior que zero.'),

  category: z.string()
    .min(1, 'A categoria é obrigatória.'),
});

// Tipagem baseada no schema, útil para o TypeScript
export type ProductFormData = z.infer<typeof productSchema>;