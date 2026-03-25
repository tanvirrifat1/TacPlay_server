import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ChatFileImageService } from './chatFileImage.service';
import { getFilePathMultiple } from '../../../shared/getFilePath';

const uploadChatFile = catchAsync(async (req, res) => {
  const value = {
    ...req.body,
  };

  let video = getFilePathMultiple(req.files, 'media', 'media');
  let image = getFilePathMultiple(req.files, 'image', 'image');

  if (image && image.length > 0) {
    value.image = image[0];
  }

  if (video && video.length > 0) {
    value.video = video[0];
  }

  const result = await ChatFileImageService.uploadChatFile(value);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'File uploaded successfully',
    data: result,
  });
});

export const ChatFileImageController = {
  uploadChatFile,
};
