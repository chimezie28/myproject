// src/schemas/product.schema.ts
import { z } from 'zod';

export const productSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  price: z.number().min(0, 'Price should be greater than 0'),
  description: z.string().optional(),
  discount: z.number().min(0, 'Discount cannot be less than 0').max(100, 'Discount cannot exceed 100').optional(),
  tax: z.number().min(0, 'Tax cannot be negative').max(100, 'Tax cannot exceed 100').optional(),
  stock: z.number().int().min(0, 'Stock must be a non-negative integer').optional(),
  expirationDate: z.date().optional(),
  animalName: z.string().min(1, 'Animal name is required').optional(),
  animalDob: z.date().optional(),
  animalWeight: z.number().min(0, 'Animal weight must be positive').optional(),
  height: z.number().min(0, 'Height must be positive').optional(),
  healthCondition: z.string().optional(),
  address: z.string().optional(),
  media: z.array(z.string()).optional(),
  // Foreign Keys
  userId: z.bigint(),
  breedId: z.bigint().optional(),
  speciesId: z.bigint().optional(),
});

// Create TypeScript type inference based on the schema
export type ProductInput = z.infer<typeof productSchema>;

