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

const findUsersNear = catchAsync(async (req, res) => {
  const latitude = Number(req.query.latitude);
  const longitude = Number(req.query.longitude);
  const maxDistance = Number(req.query.maxDistance) || 5000;

  const result = await UserServices.findUsersNear(
    latitude,
    longitude,
    maxDistance,
  );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Nearby users fetched successfully',
    data: result,
  });
});

export const UserControllers = {
  updateUserLocation,
  findUsersNear,
};
