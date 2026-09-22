import express from 'express';
import { USER_ROLES } from '../../../enums/user';
import { upload } from '../../../helpers/imageUploadHelper';
import auth from '../../middlewares/auth';
import { ProductController } from './product.controller';

const router = express.Router();

const productUpload = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'images', maxCount: 5 },
]);

router.post(
  '/create-product',
  auth(USER_ROLES.ADMIN, USER_ROLES.FIELD_OWNER),
  productUpload,
  ProductController.createProduct,
);

router.get('/all-products', ProductController.getAllProducts);
router.get('/', ProductController.getAllProducts);

router.get('/:id', ProductController.getProductById);

router.patch(
  '/update/:id',
  auth(USER_ROLES.ADMIN, USER_ROLES.FIELD_OWNER),
  productUpload,
  ProductController.updateProduct,
);

router.patch(
  '/:id',
  auth(USER_ROLES.ADMIN, USER_ROLES.FIELD_OWNER),
  productUpload,
  ProductController.updateProduct,
);

router.delete(
  '/:id',
  auth(USER_ROLES.ADMIN, USER_ROLES.FIELD_OWNER),
  ProductController.deleteProduct,
);

export const ProductRoutes = router;
