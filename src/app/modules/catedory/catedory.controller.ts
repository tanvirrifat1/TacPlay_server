import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CatedoryService } from './catedory.service';
import { NextFunction } from 'express';
import { uploadToCloudinary } from '../../../helpers/imageUploadHelper';
// import { uploadToCloudinary } from '../../../helpers/imageUploadHelper';

// const createCatedory = catchAsync(async (req, res) => {
//   const result = await CatedoryService.createCatedory(req.body);

//   sendResponse(res, {
//     statusCode: StatusCodes.CREATED,
//     success: true,
//     data: result,
//   });
// });

const createCatedory = async (req: any, res: any, next: NextFunction) => {
  try {
    const { name, type } = req.body;

    let imageUrl: string | undefined;

    if (req.file) {
      const uploadResult = await uploadToCloudinary(
        req.file.buffer,
        'categories', // folder name in Cloudinary
      );
      imageUrl = uploadResult.secure_url;
    }

    const result = await CatedoryService.createCatedory({
      name,
      type,
      image: imageUrl,
    });

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'Category created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const CatedoryController = {
  createCatedory,
};
