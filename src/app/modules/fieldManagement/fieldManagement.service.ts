import { IField } from './fieldManagement.interface';
import { FieldManagement } from './fieldManagement.model';

const createFiledOwnerFromDb = async (data: IField) => {
  const result = await FieldManagement.create(data);
  return result;
};

export const FieldManagementService = {
  createFiledOwnerFromDb,
};
