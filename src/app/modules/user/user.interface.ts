import { Model, Types } from 'mongoose';
import { USER_ROLES } from '../../../enums/user';

export type IUser = {
  role: USER_ROLES;
  name: string;
  email: string;
  password: string;
  verified: boolean;
  image: string;
  address?: string;
  phone: string;
  subscription: boolean;
  isFreeTrial: boolean;
  location: {
    type: { type: String; enum: ['Point']; default: 'Point' };
    coordinates: [number, number];
  };
  authentication?: {
    isResetPassword: boolean;
    oneTimeCode: number;
    expireAt: Date;
  };
};

export type UserModal = {
  isExistUserById(id: string): any;
  isExistUserByEmail(email: string): any;
  isAccountCreated(id: string): any;
  isMatchPassword(password: string, hashPassword: string): boolean;
} & Model<IUser>;
