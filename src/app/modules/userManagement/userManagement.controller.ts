import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserServices } from './userManagement.service';

const updateUserLocation = catchAsync(async (req, res) => {
  const userId = req.user.id; // from auth middleware
  const { latitude, longitude } = req.body;

  const result = await UserServices.updateUserLocationIntoDB(userId, {
    latitude,
    longitude,
  });

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Location updated successfully',
    data: result,
  });
});

export const UserControllers = {
  updateUserLocation,
};
