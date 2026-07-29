import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CatedoryService } from './catedory.service';

const createCatedory = catchAsync(async (req, res) => {
  const result = await CatedoryService.createCatedory(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    data: result,
  });
});

export const CatedoryController = {
  createCatedory,
};
