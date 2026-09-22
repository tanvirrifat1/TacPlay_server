import { StatusCodes } from 'http-status-codes';
import { Types } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { deleteFromCloudinary } from '../../../helpers/imageUploadHelper';
import { Catedory } from '../catedory/catedory.model';
import { IProduct, IProductFilters } from './product.interface';
import { Product } from './product.model';

const createProduct = async (payload: IProduct) => {
  const isCategoryExist = await Catedory.findById(payload.category);
  if (!isCategoryExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Category not found');
  }

  const result = await (await Product.create(payload)).populate('category');
  return result;
};

const getAllProducts = async (
  filters: IProductFilters,
  paginationOptions: { page?: number; limit?: number; sort?: string },
) => {
  const { searchTerm, category, status, minPrice, maxPrice, ...otherFilters } =
    filters;

  const andConditions: any[] = [];

  if (searchTerm) {
    andConditions.push({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
      ],
    });
  }

  if (category) {
    andConditions.push({ category: new Types.ObjectId(category) });
  }

  if (status) {
    andConditions.push({ status });
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    const priceCondition: Record<string, number> = {};
    if (minPrice !== undefined) priceCondition.$gte = Number(minPrice);
    if (maxPrice !== undefined) priceCondition.$lte = Number(maxPrice);
    andConditions.push({ price: priceCondition });
  }

  if (Object.keys(otherFilters).length > 0) {
    const filterConditions = Object.entries(otherFilters).map(
      ([field, value]) => ({ [field]: value }),
    );
    andConditions.push({ $and: filterConditions });
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const page = Number(paginationOptions.page) || 1;
  const limit = Number(paginationOptions.limit) || 10;
  const skip = (page - 1) * limit;

  const sortOrder = paginationOptions.sort || '-createdAt';

  const result = await Product.find(whereConditions)
    .populate('category')
    .sort(sortOrder)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await Product.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
    result,
  };
};

const getProductById = async (id: string) => {
  const result = await Product.findById(id).populate('category').lean();
  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Product not found');
  }
  return result;
};

const updateProduct = async (id: string, payload: Partial<IProduct>) => {
  const isExisting = await Product.findById(id);
  if (!isExisting) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Product not found');
  }

  if (payload.category) {
    const isCategoryExist = await Catedory.findById(payload.category);
    if (!isCategoryExist) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Category not found');
    }
  }

  // If a new single image is being provided and an old one exists, remove the old one
  if (payload.image && isExisting.imagePublicId) {
    await deleteFromCloudinary(isExisting.imagePublicId);
  }

  const result = await Product.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).populate('category');

  return result;
};

const deleteProduct = async (id: string) => {
  const isExisting = await Product.findById(id);
  if (!isExisting) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Product not found');
  }

  // Clean up primary Cloudinary image
  if (isExisting.imagePublicId) {
    await deleteFromCloudinary(isExisting.imagePublicId);
  }

  console.log(isExisting.images);

  // Clean up multiple images if any
  if (isExisting.images && isExisting.images.length > 0) {
    for (const img of isExisting.images) {
      if (img.imagePublicId) {
        await deleteFromCloudinary(img.imagePublicId);
      }
    }
  }

  const result = await Product.findByIdAndDelete(id);
  return result;
};

export const ProductService = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
