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

// router.patch(
//   '/update/:id',
//   auth(USER_ROLES.ADMIN),
//   fileUploadHandler,
//   (req: Request, res: Response, next: NextFunction) => {
//     const { imagesToDelete, data } = req.body;

//     if (!data && imagesToDelete) {
//       req.body = { imagesToDelete };
//       return ProductController.updateProduct(req, res, next);
//     }

//     if (data) {
//       const parsedData = ProductValidation.updateProductSchema.parse(
//         JSON.parse(data)
//       );

//       req.body = { ...parsedData, imagesToDelete };
//     }

//     return ProductController.updateProduct(req, res, next);
//   }
// );

export const FieldManagementRoutes = router;
