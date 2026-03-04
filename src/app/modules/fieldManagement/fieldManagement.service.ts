import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { IField, UpdateFiledPayload } from './fieldManagement.interface';
import { FieldManagement } from './fieldManagement.model';
import unlinkFile from '../../../shared/unlinkFile';

const createFiledOwnerFromDb = async (data: IField) => {
  const result = await FieldManagement.create(data);
  return result;
};

const updateFiled = async (id: string, payload: UpdateFiledPayload) => {
  const isExistProducts = await FieldManagement.findById(id);

  if (!isExistProducts) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Product doesn't exist!");
  }

  if (payload.imagesToDelete && payload.imagesToDelete.length > 0) {
    for (let image of payload.imagesToDelete) {
      unlinkFile(image);
    }

    isExistProducts.image = isExistProducts.image.filter(
      (img: string) => !payload.imagesToDelete!.includes(img),
    );
  }

  const updatedImages = payload.image
    ? [...isExistProducts.image, ...payload.image]
    : isExistProducts.image;

  const updateData = {
    ...payload,
    image: updatedImages,
  };

  const result = await FieldManagement.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  return result;
};

const getDetails = async (id: string) => {
  const isExist = await FieldManagement.findById(id);
  if (!isExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Product doesn't exist!");
  }

  const result = await FieldManagement.findById(id);
  return result;
};

export const FieldManagementService = {
  createFiledOwnerFromDb,
  updateFiled,
  getDetails,
};
