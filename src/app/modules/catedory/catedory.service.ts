import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { Catedory } from './catedory.model';

const createCatedory = async (catedory: ICatedory) => {
  const isExisting = await Catedory.findOne({ name: catedory.name });
  if (isExisting) {
    throw new ApiError(StatusCodes.CONFLICT, 'Catedory already exists');
  }

  const result = await Catedory.create(catedory);
  return result;
};

export const CatedoryService = {
  createCatedory,
};
