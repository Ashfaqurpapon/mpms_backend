import { Response } from 'express';

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data: T;
};

type TResponseWithToken<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data: T;
  token: string;
};

export const sendResponseWithToken = <T>(
  res: Response,
  data: TResponseWithToken<T>,
) => {
  res.status(data?.statusCode).json({
    success: data.success,
    message: data.message,
    data: data.data,
    token: data.token,
  });
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.statusCode).json({
    success: data.success,
    message: data.message,
    data: data.data,
  });
};

export default sendResponse;
