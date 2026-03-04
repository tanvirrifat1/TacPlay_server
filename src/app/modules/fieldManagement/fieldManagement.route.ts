import express, { NextFunction, Request, Response } from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import fileUploadHandler from '../../middlewares/fileUploadHandler';
import { FieldManagementValidation } from './fieldManagement.validation';
import { FieldManagementController } from './fieldManagement.controller';

const router = express.Router();

router.post(
  '/create',
  fileUploadHandler,
  auth(USER_ROLES.FIELD_OWNER),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = FieldManagementValidation.fieldManagementZodSchema.parse(
        JSON.parse(req.body.data),
      );
    }
    return FieldManagementController.createFiledOwnerFromDb(req, res, next);
  },
);

router.patch(
  '/update/:id',
  auth(USER_ROLES.FIELD_OWNER),
  fileUploadHandler,
  (req: Request, res: Response, next: NextFunction) => {
    const { imagesToDelete, data } = req.body;

    if (!data && imagesToDelete) {
      req.body = { imagesToDelete };
      return FieldManagementController.updateFiled(req, res, next);
    }

    if (data) {
      const parsedData =
        FieldManagementValidation.fieldManagementZodSchemaUpdate.parse(
          JSON.parse(data),
        );

      req.body = { ...parsedData, imagesToDelete };
    }

    return FieldManagementController.updateFiled(req, res, next);
  },
);

router.get(
  '/details/:id',
  auth(USER_ROLES.FIELD_OWNER, USER_ROLES.ADMIN, USER_ROLES.PLAYER),
  FieldManagementController.getDetails,
);

export const FieldManagementRoutes = router;
