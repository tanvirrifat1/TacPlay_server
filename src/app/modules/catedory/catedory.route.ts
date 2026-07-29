import express from 'express';

import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import { CatedoryController } from './catedory.controller';

const router = express.Router();

router.post(
  '/create-catedory',
  auth(USER_ROLES.ADMIN, USER_ROLES.PLAYER, USER_ROLES.FIELD_OWNER),
  CatedoryController.createCatedory,
);

export const CatedoryRoutes = router;
