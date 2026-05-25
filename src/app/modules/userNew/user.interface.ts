import { Document, Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface TUser extends Document {
  _id?: string;
  name?: string;
  email: string;
  role?: 'admin' | 'manager' | 'member';
  password: string;
  
  address?: string;
  needsPasswordChange?: boolean;
  passwordChangedAt?: Date;
  status?: 'in-progress' | 'blocked';
  isDeleted?: boolean;
}

export interface UserModel extends Model<TUser> {
  //instance methods for checking if the user exist
  // eslint-disable-next-line no-unused-vars
  isUserExistsByEmail(email: string): Promise<TUser>;

  // eslint-disable-next-line no-unused-vars
  isUserExistsByPhone(email: string): Promise<TUser>;
  //instance methods for checking if passwords are matched

  // eslint-disable-next-line no-unused-vars
  isUserExistsID(_id: string): Promise<TUser>;
  isPasswordMatched(
    // eslint-disable-next-line no-unused-vars
    plainTextPassword: string,
    // eslint-disable-next-line no-unused-vars
    hashedPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    // eslint-disable-next-line no-unused-vars
    passwordChangedTimestamp: Date,
    // eslint-disable-next-line no-unused-vars
    jwtIssuedTimestamp: number,
  ): boolean;
}
export type TUserRole = keyof typeof USER_ROLE;
