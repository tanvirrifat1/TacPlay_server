import { User } from '../user/user.model';

const updateUserLocationIntoDB = async (
  userId: string,
  payload: { latitude: number; longitude: number },
) => {
  const lat = Number(payload.latitude);
  const lng = Number(payload.longitude);

  const result = await User.findByIdAndUpdate(
    userId,
    {
      location: {
        type: 'Point',
        coordinates: [lng, lat],
      },
    },
    { new: true },
  );

  return result;
};

const findUsersNear = async (
  latitude: number,
  longitude: number,
  maxDistanceMeterskm = 500,
) => {
  const users = await User.find({
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [longitude, latitude], // ⚠ order important
        },
        $maxDistance: maxDistanceMeterskm * 1000,
      },
    },
  });

  return users;
};
export const UserServices = {
  updateUserLocationIntoDB,
  findUsersNear,
};
