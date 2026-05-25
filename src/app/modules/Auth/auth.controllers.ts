// import httpStatus from 'http-status';
// import catchAsync from '../../utils/catchAsync';
// import { sendResponseWithToken } from '../../utils/sendResponse';
// // import config from '../../config';
// import { AuthServices } from './auth.service';

// const loginUser = catchAsync(async (req, res) => {
//   const result = await AuthServices.loginUser(req.body);
//   //console.log(result);

//   const { accessToken, user } = result;

//   // res.cookie('refreshToken', refreshToken, {
//   //   secure: config.NODE_ENV === 'production',
//   //   httpOnly: true,
//   // });

//   sendResponseWithToken(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: `${result.user.role} has been registered successfully.`,
//     data: user,
//     token: accessToken,
//   });
// });

// export const AuthControllers = {
//   loginUser,
//   //   changePassword,
//   //   refreshToken,
// };
