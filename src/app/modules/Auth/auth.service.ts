// import httpStatus from 'http-status';
// import AppError from '../../errors/AppError';
// import { User } from '../userNew/user.model';
// import { TLoginUser } from './auth.model';
// import { createToken } from './auth.utils';
// import config from '../../config';
// import { TUser } from '../userNew/user.interface';

// const loginUser = async (payload: TLoginUser) => {
//   // checking if the user is exist
//   const user: TUser = await User.isUserExistsByPhone(payload.phone);
//   if (!user) {
//     throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
//   }
//   // checking if the user is already deleted

//   const isDeleted = user?.isDeleted;

//   if (isDeleted) {
//     throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
//   }

//   //checking if the password is correct

//   if (!(await User.isPasswordMatched(payload?.password, user?.password)))
//     throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

//   //create token and sent to the  client

//   const tempId: string = user._id!.toString();

//   const jwtPayload = {
//     userId: tempId,
//     role: user.role,
//   };

//   const accessToken = createToken(
//     jwtPayload,
//     config.jwt_access_secret as string,
//     config.jwt_access_expires_in as string,
//   );

//   const refreshToken = createToken(
//     jwtPayload,
//     config.jwt_refresh_secret as string,
//     config.jwt_refresh_expires_in as string,
//   );

//   return {
//     user,
//     accessToken,
//     refreshToken,
//   };
// };

// export const AuthServices = {
//   loginUser,
// };
