import { Schema, model } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';
import { UserStatus } from './user.constant';

const userSchema = new Schema<TUser, UserModel>(
  {
    // id is automatically managed by MongoDB
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'manager', 'member'],
      default: 'member',
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
   
    // address: {
    //   type: String,
    //   required: false,
    // },
    // needsPasswordChange: {
    //   type: Boolean,
    //   default: true,
    // },
    // passwordChangedAt: {
    //   type: Date,
    // },
    // isDeleted: {
    //   type: Boolean,
    //   default: false,
    // },
    // status: {
    //   type: String,
    //   enum: UserStatus,
    //   default: 'in-progress',
    // },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  // hashing password and save into DB

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// set '' after saving password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

//user static method

userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email }).select('+password');
};
userSchema.statics.isUserExistsByPhone = async function (phone: string) {
  return this.findOne({ phone, isDeleted: false }).select('+password');
};
userSchema.statics.isUserExistsID = async function (_id: string) {
  return await User.findOne({ _id }).select('+password');
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

export const User = model<TUser, UserModel>('User1', userSchema);
