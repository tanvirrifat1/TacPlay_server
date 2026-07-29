import express from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { WishListController } from './wishlist.controller';
import { WishListValidation } from './wishlist.validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLES.PLAYER, USER_ROLES.FIELD_OWNER, USER_ROLES.ADMIN),
  (req, res, next) => {
    req.body = WishListValidation.addToWishListZodSchema.parse(req.body);
    return WishListController.addToWishList(req, res, next);
  },
);

router.get(
  '/',
  auth(USER_ROLES.PLAYER, USER_ROLES.FIELD_OWNER, USER_ROLES.ADMIN),
  WishListController.getMyWishList,
);

router.delete(
  '/:id',
  auth(USER_ROLES.PLAYER, USER_ROLES.FIELD_OWNER, USER_ROLES.ADMIN),
  WishListController.removeFromWishList,
);

export const WishListRoutes = router;
