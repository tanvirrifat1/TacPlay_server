import express from 'express';

import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import { CatedoryController } from './catedory.controller';
import { upload } from '../../../helpers/imageUploadHelper';

const router = express.Router();

// router.post(
//   '/create-catedory',
//   auth(USER_ROLES.ADMIN, USER_ROLES.PLAYER, USER_ROLES.FIELD_OWNER),
//   CatedoryController.createCatedory,
// );

router.post(
  '/create-catedory',
  upload.single('image'), // field name in form-data must be "image"
  CatedoryController.createCatedory,
);

export const CatedoryRoutes = router;
