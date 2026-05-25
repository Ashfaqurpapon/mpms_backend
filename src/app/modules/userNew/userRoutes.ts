import express from 'express';
import { UserControllers } from './user.controller';
import { USER_ROLE } from './user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from './user.validation';
import auth from '../../authModule/auth.middleware/auth.middlewares';

const router = express.Router();


router.post('/signup',
  //validateRequest(createUserValidationSchema),
  UserControllers.createSingleUser,
);

router.get(
  '/getUser/:userId',
  auth(USER_ROLE.admin),
  UserControllers.getSingleUserFromDb
);

router.get(
  '/getUserByEmail',
  // auth(USER_ROLE.admin),
  UserControllers.getSingleUserByEmail
);
// router.put('/updateUser',
//   auth(USER_ROLE.customer),
//   UserControllers.upadateUserInfo,
// );
// router.post('/change-status/:id',
//   auth('admin'),
//   validateRequest(UserValidations.changeStatusValidationSchema),
//   UserControllers.changeStatus,
// );


/** This route will retrieve only my user personal information depending
 * on if auth token is valid and mathes with the user id in the token
 */

router.get(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.member,USER_ROLE.manager),
  UserControllers.getMe,
);
// router.post(
//   '/signup',
//   auth(USER_ROLE.admin),
//   validateRequest(createStudentValidationSchema),
//   UserControllers.createStudent,
// );


export const userRoutes = router;
