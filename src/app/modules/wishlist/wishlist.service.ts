import { StatusCodes } from 'http-status-codes';
import { Types } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { WishList } from './wishlist.model';

const addToWishList = async (userId: string, addSomething: string) => {
  try {
    const result = await WishList.create({
      userId: new Types.ObjectId(userId),
      addSomething: new Types.ObjectId(addSomething),
    });
    return result;
  } catch (err: unknown) {
    const code = (err as { code?: number })?.code;
    if (code === 11000) {
      throw new ApiError(
        StatusCodes.CONFLICT,
        'This item is already in your wish list',
      );
    }
    throw err;
  }
};

const getWishListByUser = async (userId: string) => {
  const result = await WishList.find({ userId })
    .sort({ createdAt: -1 })
    .lean();
  return result;
};

const removeFromWishList = async (userId: string, wishListId: string) => {
  const result = await WishList.findOneAndDelete({
    _id: wishListId,
    userId,
  });
  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Wish list entry not found');
  }
  return result;
};

export const WishListService = {
  addToWishList,
  getWishListByUser,
  removeFromWishList,
};
