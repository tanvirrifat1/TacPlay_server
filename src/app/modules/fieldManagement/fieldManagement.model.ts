import { Schema, model, Types } from 'mongoose';
import { IField } from './fieldManagement.interface';

const packageSchema = new Schema(
  {
    package_name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    pak_des: {
      type: Number,
      required: true,
    },
    item: {
      type: String,
      required: true,
    },
  },
  { _id: false }, // prevents automatic _id for each package (optional)
);

const fieldManagementSchema = new Schema<IField>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    arena_name: {
      type: String,
      required: true,
      trim: true,
    },

    arena_description: {
      type: String,
      required: true,
    },

    cuntry: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    full_address: {
      type: String,
      required: true,
    },

    image: [
      {
        type: String,
        required: true,
      },
    ],

    min_player_team: {
      type: Number,
      required: true,
    },

    max_player_team: {
      type: Number,
      required: true,
    },

    min_player_sessions: {
      type: Number,
      required: true,
    },

    max_player_sessions: {
      type: Number,
      required: true,
    },

    default_session_duration: {
      type: String,
      required: true,
    },

    base_price_player: {
      type: Number,
      required: true,
    },

    allow_socal_matches: {
      type: Boolean,
      default: false,
    },

    allow_ranked_matches: {
      type: Boolean,
      default: false,
    },

    // Multiple packages allowed
    packages: {
      type: [packageSchema], // This allows unlimited packages
      default: [],
    },

    business_name: {
      type: String,
      required: true,
    },

    business_type: {
      type: String,
      required: true,
    },

    contact_number: {
      type: String,
      required: true,
    },

    holder_name: {
      type: String,
      required: true,
    },

    bank_name: {
      type: String,
      required: true,
    },

    account_number: {
      type: String,
      required: true,
    },

    routing_number: {
      type: String,
      required: true,
    },

    swift_code: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const FieldManagement = model<IField>(
  'FieldManagement',
  fieldManagementSchema,
);
