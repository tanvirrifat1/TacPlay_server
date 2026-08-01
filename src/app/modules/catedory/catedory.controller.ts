import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../../shared/sendResponse';
import { CatedoryService } from './catedory.service';
import { uploadToCloudinary } from '../../../helpers/imageUploadHelper';
import ApiError from '../../../errors/ApiError';
import catchAsync from '../../../shared/catchAsync';

const createCatedory = catchAsync(async (req, res) => {
  if (!req.body.data) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Data field is required');
  }

  const parsedData = JSON.parse(req.body.data);

  const { name, type } = parsedData;

  let imageUrl: string | undefined;

  if (req.file) {
    const uploadResult = await uploadToCloudinary(
      req.file.buffer,
      'categories',
    );
    console.log(uploadResult.secure_url);
    imageUrl = uploadResult.secure_url;
  }

  const data = {
    name,
    type,
    image: imageUrl,
  };

  const result = await CatedoryService.createCatedory(data);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Category created successfully',
    data: result,
  });
});

const updateCatedory = catchAsync(async (req, res) => {
  const id = req.params.id;
  if (!req.body.data) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Data field is required');
  }

  const parsedData = JSON.parse(req.body.data);
  const { name, type } = parsedData;

  const updatePayload: {
    name?: string;
    type?: string;
    image?: string;
    imagePublicId?: string;
  } = { name, type };

  if (req.file) {
    const uploadResult = await uploadToCloudinary(
      req.file.buffer,
      'categories',
    );
    updatePayload.image = uploadResult.secure_url;
    updatePayload.imagePublicId = uploadResult.public_id;
  }

  const result = await CatedoryService.updateCatedory(id, updatePayload);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Category updated successfully',
    data: result,
  });
});

export const CatedoryController = {
  createCatedory,
  updateCatedory,
};
