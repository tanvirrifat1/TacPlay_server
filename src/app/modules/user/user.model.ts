import bcrypt from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
import { model, Schema } from 'mongoose';
import config from '../../../config';
import { USER_ROLES } from '../../../enums/user';
import ApiError from '../../../errors/ApiError';
import { IUser, UserModal } from './user.interface';

const userSchema = new Schema<IUser, UserModal>(
  {
    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
      minlength: 8,
    },

    address: {
      type: String,
      required: false,
    },

    verified: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      required: false,
    },

    phone: {
      type: String,
      required: false,
    },

    isFreeTrial: {
      type: Boolean,
      default: true,
    },

    subscription: {
      type: Boolean,
      default: false,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: {
        type: [Number],
      },
    },

    authentication: {
      type: {
        isResetPassword: {
          type: Boolean,
          default: false,
        },
        oneTimeCode: {
          type: Number,
          default: null,
        },
        expireAt: {
          type: Date,
          default: null,
        },
      },
      select: 0,
    },
  },
  { timestamps: true },
);

userSchema.index({ location: '2dsphere' });

userSchema.statics.isExistUserById = async (id: string) => {
  const isExist = await User.findById(id);
  return isExist;
};

userSchema.statics.isExistUserByEmail = async function (email: string) {
  return await User.findOne({ email }).select('+password');
};

//account check
userSchema.statics.isAccountCreated = async (id: string) => {
  const isUserExist: any = await User.findById(id);
  return isUserExist.accountInformation.status;
};

//is match password
userSchema.statics.isMatchPassword = async (
  password: string,
  hashPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hashPassword);
};

userSchema.pre('save', async function (next) {
  if (this.isModified('email')) {
    const existingUser = await User.findOne({ email: this.email });

    if (existingUser && existingUser._id.toString() !== this._id.toString()) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Email already exist!');
    }
  }

  if (this.isModified('password')) {
    this.password = await bcrypt.hash(
      this.password,
      Number(config.bcrypt_salt_rounds),
    );
  }

  next();
});

export const User = model<IUser, UserModal>('User', userSchema);
