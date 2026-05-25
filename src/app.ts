import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import httpStatus from 'http-status';
import AppError from './app/errors/AppError';
import config from './app/config';
import { setupSwagger } from './app/config/swagger';
import cookieParser from 'cookie-parser';
// import { StudentRoutes } from './app/modules/student/student.route';

const app: Application = express();

app.use(express.json());

/* The middleware will parse the Cookie header on the request and expose the 
cookie data as the property req.cookies */
app.use(cookieParser());



app.use(cors({ origin: '*' }));
setupSwagger(app);

//for productions
//app.use(cors({ origin: 'https://eshop-dun-five.vercel.app/' }));
// app.use(
//   cors({
//     origin: 'http://localhost:5173',
//     credentials: true,
//   }),
// );

app.use('/api', router);
app.use('/', (req: Request, res: Response) => {
  if (req.path === '/') {
    res.status(httpStatus.OK).send('Welcome to  Application');
  } else {
    throw new AppError(httpStatus.NOT_FOUND, 'This routes is not found');
  }
});

// Catch-all middleware for handling API not found
app.use((req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).send('API not found');
});
// app.use((req, res, next) => {
//   res.status(404).json({
//     success: false,
//     message: 'Route not found',
//   });
// });

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
