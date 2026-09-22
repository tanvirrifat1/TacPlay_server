import { model, Schema } from 'mongoose';
import { IProduct } from './product.interface';

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Catedory',
      required: true,
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    image: {
      type: String,
    },
    imagePublicId: {
      type: String,
    },
    images: [
      {
        url: { type: String, required: true },
        imagePublicId: { type: String },
      },
    ],
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

productSchema.index({ name: 'text', description: 'text' });

export const Product = model<IProduct>('Product', productSchema);
