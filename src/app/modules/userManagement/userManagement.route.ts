import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { UserValidation } from '../user/user.validation';
import { UserControllers } from './userManagement.controller';
import { USER_ROLES } from '../../../enums/user';

const router = express.Router();

router.post(
  '/update-location',
  auth(USER_ROLES.ADMIN, USER_ROLES.PLAYER, USER_ROLES.FIELD_OWNER),
  validateRequest(UserValidation.updateLocationZodSchema),
  UserControllers.updateUserLocation,
);

export const UserManagementRoutes = router;
