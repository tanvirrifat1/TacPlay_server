import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { FieldManagementService } from './fieldManagement.service';
import { getFilePathMultiple } from '../../../shared/getFilePath';

const createFiledOwnerFromDb = catchAsync(async (req, res) => {
  const { body, user, files } = req;

  // Extract images safely
  const images = getFilePathMultiple(files, 'image', 'image') ?? [];

  const payload = {
    ...body,
    userId: user?.id,
    ...(images.length && { image: images }),
  };

  const result = await FieldManagementService.createFiledOwnerFromDb(payload);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Field created successfully',
    data: result,
  });
});

export const FieldManagementController = {
  createFiledOwnerFromDb,
};
