import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';
import AppError from '../../errors/AppError';
import { Request, Response } from 'express';

const createSingleUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createUserIntoDB(req.body);
  //console.log(`${req.body.role}`);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${result.name} has been registered successfully.`,
    data: result,
  });
});



const getSingleUserByEmail = catchAsync(async (req: Request, res: Response) => {
    const { email} =req.query;
   
    

    const singleUser = await UserServices.getSingleUserUserByEmail(email as string);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'singleUser retrieved successfully',
        data: singleUser,
    });
});
const getSingleUserFromDb = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const result = await UserServices.getSingleUserUserId(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is retrieved succesfully',
    data: result,
  });
});

const upadateUserInfo = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const result = await UserServices.updateUserInfoInDB(userId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is updated succesfully',
    data: result,
  });
});

const getMe = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new AppError(httpStatus.NOT_FOUND, 'Token not found !');
  }

  const { userId, role } = req.user;

  const result = await UserServices.getMe(userId, role);
 
  

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is retrieved succesfully',
    data: result,
  });
});

const changeStatus = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await UserServices.changeStatus(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Status is updated succesfully',
    data: result,
  });
});

export const UserControllers = {
  createSingleUser,
  getSingleUserFromDb,
  upadateUserInfo,
  getMe,
  changeStatus,
  getSingleUserByEmail
};
