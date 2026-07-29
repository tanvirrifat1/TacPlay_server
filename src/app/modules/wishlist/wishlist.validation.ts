import { z } from 'zod';

const objectIdString = z
  .string({
    required_error: 'addSomething is required',
  })
  .regex(/^[a-fA-F0-9]{24}$/, 'Invalid id format');

export const addToWishListZodSchema = z.object({
  addSomething: objectIdString,
});

export const WishListValidation = {
  addToWishListZodSchema,
};
