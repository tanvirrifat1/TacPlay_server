import { z } from 'zod';
import { Types } from 'mongoose';

// Package Schema
const packageSchema = z.object({
  package_name: z
    .string({
      required_error: 'Package name is required',
    })
    .min(1, 'Package name cannot be empty'),

  price: z
    .number({
      required_error: 'Price is required',
    })
    .min(0, 'Price must be positive'),

  pak_des: z.number({
    required_error: 'Package description value is required',
  }),

  item: z
    .string({
      required_error: 'Item is required',
    })
    .min(1, 'Item cannot be empty'),
});

// Main Field Schema
export const fieldManagementZodSchema = z.object({
  arena_name: z.string().min(1, 'Arena name is required'),

  arena_description: z.string().min(1, 'Arena description is required'),

  cuntry: z.string().min(1, 'Country is required'),

  city: z.string().min(1, 'City is required'),

  full_address: z.string().min(1, 'Full address is required'),

  min_player_team: z
    .number()
    .min(1, 'Minimum player per team must be at least 1'),

  max_player_team: z.number(),

  min_player_sessions: z.number().min(1),

  max_player_sessions: z.number(),

  default_session_duration: z.string().min(1, 'Session duration is required'),

  base_price_player: z.number().min(0, 'Base price must be positive'),

  allow_socal_matches: z.boolean().optional(),

  allow_ranked_matches: z.boolean().optional(),

  // Multiple packages allowed
  packages: z.array(packageSchema).optional(),

  business_name: z.string().min(1, 'Business name is required'),

  business_type: z.string().min(1, 'Business type is required'),

  contact_number: z.string().min(1, 'Contact number is required'),

  holder_name: z.string().min(1, 'Account holder name is required'),

  bank_name: z.string().min(1, 'Bank name is required'),

  account_number: z.string().min(1, 'Account number is required'),

  routing_number: z.string().min(1, 'Routing number is required'),

  swift_code: z.string().min(1, 'SWIFT code is required'),
});

export const FieldManagementValidation = {
  fieldManagementZodSchema,
};
