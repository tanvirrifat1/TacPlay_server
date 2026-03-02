import { z } from 'zod';

const createUserZodSchema = z.object({
  email: z.string({ required_error: 'Email name is required' }),
  password: z.string({ required_error: 'Password is required' }),
  fullName: z.string({ required_error: 'FullName is required' }),
});

const updateZodSchema = z.object({
  fullName: z.string().optional(),
  googleId: z.string().optional(),
  appleId: z.string().optional(),
  phone: z.string().optional(),
});

export const UserValidation = {
  createUserZodSchema,
  updateZodSchema,
};
