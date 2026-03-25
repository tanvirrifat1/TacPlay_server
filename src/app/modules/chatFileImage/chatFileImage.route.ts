import express from 'express';
import fileUploadHandler from '../../middlewares/fileUploadHandler';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import { ChatFileImageController } from './chatFileImage.controller';

const router = express.Router();

router.post(
  '/upload-image',
  fileUploadHandler,
  auth(USER_ROLES.PLAYER, USER_ROLES.FIELD_OWNER, USER_ROLES.ADMIN),
  ChatFileImageController.uploadChatFile,
);

export const ChatFileImageRoutes = router;
