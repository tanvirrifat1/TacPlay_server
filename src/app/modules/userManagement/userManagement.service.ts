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

export const UserServices = {
  updateUserLocationIntoDB,
};
