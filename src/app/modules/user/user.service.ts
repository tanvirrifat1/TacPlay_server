import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import { USER_ROLES } from '../../../enums/user';
import ApiError from '../../../errors/ApiError';
import { emailHelper } from '../../../helpers/emailHelper';
import { emailTemplate } from '../../../shared/emailTemplate';
import generateOTP from '../../../util/generateOTP';
import { IUser } from './user.interface';
import { User } from './user.model';
import { sendNotifications } from '../../../helpers/notificationHelper';
import unlinkFile from '../../../shared/unlinkFile';

const createPlayerFromDb = async (payload: IUser) => {
  if (payload.role && payload.role === USER_ROLES.ADMIN) {
    throw new ApiError(
      StatusCodes.FORBIDDEN,
      'You cannot create an Admin user from this route.',
    );
  }

  payload.role = USER_ROLES.PLAYER;

  const newUser = await User.create(payload);
  if (!newUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User couldn't be created");
  }

  const otp = generateOTP();
  const authentication = {
    oneTimeCode: otp,
    expireAt: new Date(Date.now() + 30 * 60 * 1000),
  };

  const emailContent = emailTemplate.createAccount({
    name: newUser.name,
    otp,
    email: newUser.email,
  });
  emailHelper.sendEmail(emailContent);

  const updatedUser = await User.findByIdAndUpdate(
    newUser._id,
    { authentication },
    { new: true },
  );

  if (!updatedUser) {
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      'Failed to update authentication info',
    );
  }

  if (updatedUser) {
    await sendNotifications({
      text: `Registered successfully, ${updatedUser.name}`,
      type: 'ADMIN',
    });
  }

  return updatedUser;
};

const createFiledOwnerFromDb = async (payload: IUser) => {
  if (payload.role && payload.role === USER_ROLES.ADMIN) {
    throw new ApiError(
      StatusCodes.FORBIDDEN,
      'You cannot create an Admin user from this route.',
    );
  }

  payload.role = USER_ROLES.FIELD_OWNER;

  const newUser = await User.create(payload);
  if (!newUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User couldn't be created");
  }

  const otp = generateOTP();
  const authentication = {
    oneTimeCode: otp,
    expireAt: new Date(Date.now() + 30 * 60 * 1000),
  };

  const emailContent = emailTemplate.createAccount({
    name: newUser.name,
    otp,
    email: newUser.email,
  });
  emailHelper.sendEmail(emailContent);

  const updatedUser = await User.findByIdAndUpdate(
    newUser._id,
    { authentication },
    { new: true },
  );

  if (!updatedUser) {
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      'Failed to update authentication info',
    );
  }

  if (updatedUser) {
    await sendNotifications({
      text: `Registered successfully, ${updatedUser.name}`,
      type: 'ADMIN',
    });
  }

  return updatedUser;
};

const getAllUsers = async (query: Record<string, unknown>) => {
  const { page, limit, searchTerm, ...filterData } = query;

  const anyConditions: any[] = [];

  if (searchTerm) {
    anyConditions.push({
      $or: [{ type: { $regex: searchTerm, $options: 'i' } }],
    });
  }

  if (Object.keys(filterData).length > 0) {
    const filterConditions = Object.entries(filterData).map(
      ([field, value]) => ({ [field]: value }),
    );
    anyConditions.push({ $and: filterConditions });
  }

  anyConditions.push({ role: { $ne: USER_ROLES.ADMIN } });

  const whereConditions =
    anyConditions.length > 0 ? { $and: anyConditions } : {};

  // Pagination setup
  const pages = parseInt(page as string) || 1;
  const size = parseInt(limit as string) || 10;
  const skip = (pages - 1) * size;

  const result = await User.find(whereConditions)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(size)
    .lean();

  const total = await User.countDocuments(whereConditions);

  const data: any = {
    result,
    meta: {
      page: pages,
      limit: size,
      total,
    },
  };
  return data;
};

const getUserProfileFromDB = async (
  user: JwtPayload,
): Promise<Partial<IUser>> => {
  const { id } = user;
  const isExistUser = await User.findById(id);
  if (!isExistUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
  }

  return isExistUser;
};

const updateProfileToDB = async (
  user: JwtPayload,
  payload: Partial<IUser>,
): Promise<Partial<IUser | null>> => {
  const { id } = user;
  const isExistUser = await User.isExistUserById(id);

  if (!isExistUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
  }

  if (payload.image && isExistUser.image) {
    unlinkFile(isExistUser.image as string);
  }

  const updateDoc = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return updateDoc;
};

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const isExistUser = await User.findById(id);
  if (!isExistUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
  }

  const result = await User.findById(id);
  return result;
};

const updateUserDataFormAdmin = async (id: string, payload: Partial<IUser>) => {
  const isExistUser = await User.findById(id);
  if (!isExistUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
  }

  const result = await User.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

export const UserService = {
  createPlayerFromDb,
  getUserProfileFromDB,
  updateProfileToDB,
  getAllUsers,
  getSingleUser,
  updateUserDataFormAdmin,
  createFiledOwnerFromDb,
};
