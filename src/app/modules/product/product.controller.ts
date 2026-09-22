import { StatusCodes } from 'http-status-codes';
import { Types } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { uploadToCloudinary } from '../../../helpers/imageUploadHelper';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IProductImage } from './product.interface';
import { ProductService } from './product.service';
import { ProductValidation } from './product.validation';

const createProduct = catchAsync(async (req, res) => {
  let bodyData = req.body;
  if (req.body.data) {
    bodyData = JSON.parse(req.body.data);
  }

  // Validate request body
  const validatedData =
    ProductValidation.createProductZodSchema.parse(bodyData);

  let imageUrl: string | undefined;
  let imagePublicId: string | undefined;
  const uploadedImages: IProductImage[] = [];

  const filesMap = req.files as
    | { [fieldname: string]: Express.Multer.File[] }
    | Express.Multer.File[]
    | undefined;

  const singleImage =
    req.file ||
    (filesMap && !Array.isArray(filesMap) && filesMap['image']?.[0]);

  if (singleImage) {
    const uploadResult = await uploadToCloudinary(
      singleImage.buffer,
      'products',
    );
    imageUrl = uploadResult.secure_url;
    imagePublicId = uploadResult.public_id;
  }

  const multipleImages =
    filesMap && !Array.isArray(filesMap)
      ? filesMap['images']
      : Array.isArray(filesMap)
        ? filesMap
        : undefined;

  if (multipleImages && multipleImages.length > 0) {
    for (const file of multipleImages) {
      const uploadResult = await uploadToCloudinary(file.buffer, 'products');
      uploadedImages.push({
        url: uploadResult.secure_url,
        imagePublicId: uploadResult.public_id,
      });
    }
  }

  const payload: any = {
    ...validatedData,
    category: new Types.ObjectId(validatedData.category),
    ...(imageUrl && { image: imageUrl, imagePublicId }),
    ...(uploadedImages.length > 0 && { images: uploadedImages }),
  };

  if (req.user?.id) {
    payload.createdBy = new Types.ObjectId(req.user.id);
  }

  const result = await ProductService.createProduct(payload);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Product created successfully',
    data: result,
  });
});

const getAllProducts = catchAsync(async (req, res) => {
  const {
    page,
    limit,
    sort,
    searchTerm,
    category,
    status,
    minPrice,
    maxPrice,
    ...otherFilters
  } = req.query;

  const filters = {
    searchTerm: searchTerm as string | undefined,
    category: category as string | undefined,
    status: status as string | undefined,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    ...otherFilters,
  };

  const paginationOptions = {
    page: page ? Number(page) : undefined,
    limit: limit ? Number(limit) : undefined,
    sort: sort as string | undefined,
  };

  const result = await ProductService.getAllProducts(
    filters,
    paginationOptions,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Products retrieved successfully',
    data: result,
  });
});

const getProductById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductService.getProductById(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Product retrieved successfully',
    data: result,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  let bodyData = req.body;
  if (req.body.data) {
    bodyData = JSON.parse(req.body.data);
  }

  const validatedData =
    ProductValidation.updateProductZodSchema.parse(bodyData);

  const updatePayload: any = { ...validatedData };
  if (validatedData.category) {
    updatePayload.category = new Types.ObjectId(validatedData.category);
  }

  const filesMap = req.files as
    | { [fieldname: string]: Express.Multer.File[] }
    | Express.Multer.File[]
    | undefined;

  const singleImage =
    req.file ||
    (filesMap && !Array.isArray(filesMap) && filesMap['image']?.[0]);

  if (singleImage) {
    const uploadResult = await uploadToCloudinary(
      singleImage.buffer,
      'products',
    );
    updatePayload.image = uploadResult.secure_url;
    updatePayload.imagePublicId = uploadResult.public_id;
  }

  const multipleImages =
    filesMap && !Array.isArray(filesMap)
      ? filesMap['images']
      : Array.isArray(filesMap)
        ? filesMap
        : undefined;

  if (multipleImages && multipleImages.length > 0) {
    const uploadedImages: IProductImage[] = [];
    for (const file of multipleImages) {
      const uploadResult = await uploadToCloudinary(file.buffer, 'products');
      uploadedImages.push({
        url: uploadResult.secure_url,
        imagePublicId: uploadResult.public_id,
      });
    }
    updatePayload.images = uploadedImages;
  }

  const result = await ProductService.updateProduct(id, updatePayload);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Product updated successfully',
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductService.deleteProduct(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Product deleted successfully',
    data: result,
  });
});

export const ProductController = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
