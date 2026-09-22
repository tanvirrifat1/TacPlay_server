import { z } from 'zod';

const createProductZodSchema = z.object({
  name: z.string({ required_error: 'Product name is required' }),
  description: z.string().optional(),
  price: z.number({ required_error: 'Price is required' }).min(0),
  category: z
    .string({ required_error: 'Category is required' })
    .regex(/^[a-fA-F0-9]{24}$/, 'Invalid Category ID'),
  stock: z.number().min(0).optional(),
  status: z.enum(['active', 'inactive']).optional(),
});

const updateProductZodSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.number().min(0).optional(),
  category: z
    .string()
    .regex(/^[a-fA-F0-9]{24}$/, 'Invalid Category ID')
    .optional(),
  stock: z.number().min(0).optional(),
  status: z.enum(['active', 'inactive']).optional(),
});

export const ProductValidation = {
  createProductZodSchema,
  updateProductZodSchema,
};
