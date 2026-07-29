import { Types } from 'mongoose';

export type IWishList = {
  userId: Types.ObjectId;
  addSomething: Types.ObjectId;
};
