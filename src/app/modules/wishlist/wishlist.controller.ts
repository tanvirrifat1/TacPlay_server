import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { WishListService } from './wishlist.service';

const addToWishList = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id as string;
  const { addSomething } = req.body;

  const result = await WishListService.addToWishList(userId, addSomething);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Added to wish list successfully',
    data: result,
  });
});

const getMyWishList = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id as string;
  const result = await WishListService.getWishListByUser(userId);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Wish list retrieved successfully',
    data: result,
  });
});

const removeFromWishList = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id as string;
  const { id } = req.params;

  const result = await WishListService.removeFromWishList(userId, id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Removed from wish list successfully',
    data: result,
  });
});

export const WishListController = {
  addToWishList,
  getMyWishList,
  removeFromWishList,
};
