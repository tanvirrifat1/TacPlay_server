import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { deleteFromCloudinary } from '../../../helpers/imageUploadHelper';
import { Catedory } from './catedory.model';

const createCatedory = async (catedory: ICatedory) => {
  const isExisting = await Catedory.findOne({ name: catedory.name });
  if (isExisting) {
    throw new ApiError(StatusCodes.CONFLICT, 'Catedory already exists');
  }

  const result = await Catedory.create(catedory);
  return result;
};

const updateCatedory = async (id: string, payload: Partial<ICatedory>) => {
  const isExisting = await Catedory.findById(id);
  if (!isExisting) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Catedory not found');
  }

  if (payload.image && isExisting.imagePublicId) {
    await deleteFromCloudinary(isExisting.imagePublicId);
  }

  const result = await Catedory.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

const getAllCategories = async (query: Record<string, unknown>) => {
  const { page, limit, searchTerm, ...filterData } = query;

  const anyConditions: any[] = [];

  if (searchTerm) {
    anyConditions.push({
      $or: [{ name: { $regex: searchTerm, $options: 'i' } }],
    });
  }

  if (Object.keys(filterData).length > 0) {
    const filterConditions = Object.entries(filterData).map(
      ([field, value]) => ({ [field]: value }),
    );
    anyConditions.push({ $and: filterConditions });
  }

  const whereConditions =
    anyConditions.length > 0 ? { $and: anyConditions } : {};

  const pages = parseInt(page as string) || 1;
  const size = parseInt(limit as string) || 10;
  const skip = (pages - 1) * size;

  const result = await Catedory.find(whereConditions)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(size)
    .lean();

  const total = await Catedory.countDocuments(whereConditions);

  const data: any = {
    result,
    meta: {
      page: pages,
      limit: size,
      total,
    },
  };
  return data;
};

export const CatedoryService = {
  createCatedory,
  updateCatedory,
  getAllCategories,
};
