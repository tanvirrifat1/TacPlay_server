import { model, Schema } from 'mongoose';
import { IWishList } from './wishlist.interface';

const wishlistSchema = new Schema<IWishList>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    addSomething: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

wishlistSchema.index({ userId: 1, addSomething: 1 }, { unique: true });

export const WishList = model<IWishList>('WishList', wishlistSchema);
