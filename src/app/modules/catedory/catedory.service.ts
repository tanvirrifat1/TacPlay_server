import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { Catedory } from './catedory.model';
import { deleteFromCloudinary } from '../../../helpers/imageUploadHelper';

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

export const CatedoryService = {
  createCatedory,
  updateCatedory,
};
