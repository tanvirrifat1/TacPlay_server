import express from 'express';
import { AuthRoutes } from '../app/modules/auth/auth.route';
import { UserRoutes } from '../app/modules/user/user.route';
import { NotificationRoutes } from '../app/modules/Notification/Notification.route';
import { FieldManagementRoutes } from '../app/modules/fieldManagement/fieldManagement.route';
import { UserManagementRoutes } from '../app/modules/userManagement/userManagement.route';

const router = express.Router();

const apiRoutes = [
  { path: '/user', route: UserRoutes },
  { path: '/auth', route: AuthRoutes },
  { path: '/notification', route: NotificationRoutes },
  { path: '/field', route: FieldManagementRoutes },
  { path: '/userManagement', route: UserManagementRoutes },
];

apiRoutes.forEach(route => router.use(route.path, route.route));

export default router;
