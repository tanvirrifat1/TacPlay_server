import express from 'express';
import { InboxController } from './inbox.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';

const router = express.Router();

router.post(
  '/send-message/:id',
  auth(USER_ROLES.ADMIN, USER_ROLES.PLAYER, USER_ROLES.FIELD_OWNER),
  InboxController.createInboxToDb,
);

router.get(
  '/get-inbox',
  auth(USER_ROLES.ADMIN, USER_ROLES.PLAYER, USER_ROLES.FIELD_OWNER),
  InboxController.getAllInboxs,
);

router.delete(
  '/delete-inbox/:id',
  auth(USER_ROLES.ADMIN, USER_ROLES.PLAYER, USER_ROLES.FIELD_OWNER),
  InboxController.deleteInbox,
);

export const InboxRoutes = router;
