import httpStatus from 'http-status';
import config from '../../config';
import { TUser } from './user.interface';
import { User } from './user.model';
import AppError from '../../errors/AppError';

const createUserIntoDB = async (payload: TUser) => {
  const userData: Partial<TUser> = {};

  // if password is not given, use default password
  userData.password = payload.password || (config.default_password as string);

  // set role
  if (payload.role === 'admin') {
    userData.role = 'admin';
  } else if (payload.role === 'member') {
    userData.role = 'member';
  } else {
    userData.role = 'manager';
  }

  try {


    
    const newUser = await User.create(payload);

      
    if (!newUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    return newUser;
  } catch (err: any) {
    // Handle duplicate key error (Mongo E11000)
    if (err?.code === 11000) {
      throw new AppError(
        httpStatus.CONFLICT,
        'User with this phone number already exists'
      );
    }

    // Otherwise, throw a generic AppError
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
  }
};
const getSingleUserUserId = async (id: string) => {
  const result = User.findById(id);
  return result;
};

const getSingleUserUserByPhone = async (phone: string) => {
  const result = User.findOne({ phone: phone });
  return result;
};
const getSingleUserUserByEmail= async (email: string) => {
  const result = User.findOne({ email: email });
  return result;
};

const updateUserInfoInDB = async (id: string, payload: Partial<TUser>) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const getMe = async (userId: string, role: string) => {
  // const decoded = verifyToken(token, config.jwt_access_secret as string);
  // const { userId, role } = decoded;

  
  const result = User.findById(userId);
  // console.log('Limon : got GET ME id : ',result);
  return result;

  /**
   * Limon TODO : now you have id and role of the user from the token and you can
   * retrieve user information depending on the role and id from the respective
   */

  // let result = null;

  // if (role === 'student') {
  //   result = await Student.findOne({ id: userId }).populate('user');
  // }
  // if (role === 'admin') {
  //   result = await Admin.findOne({ id: userId }).populate('user');
  // }

  // if (role === 'faculty') {
  //   result = await Faculty.findOne({ id: userId }).populate('user');
  // }

  // return result;
};

const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

// Admin can do this
// const deleteUserAcccount = async () => {};
// const suspentUserAccount = async () => {};

export const UserServices = {
  createUserIntoDB,
  getSingleUserUserId,
  updateUserInfoInDB,
  getMe,
  changeStatus,
  getSingleUserUserByPhone,
  getSingleUserUserByEmail
};
