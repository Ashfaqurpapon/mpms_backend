import express from 'express';

import auth from '../../middlewares/auth';
import { USER_ROLE } from '../userNew/user.constant';

import { SprintControllers } from './sprint.controller';

const router = express.Router();

router.get('/',SprintControllers.getAllSprints);
// router.get(


router.post(
  '/create',
  auth(USER_ROLE.admin),
  //validateRequest(createProductValidationSchema),
  SprintControllers.createSprint,
);

router.get(
  '/:sprintId',
//   auth(USER_ROLE.admin),
  SprintControllers.getSingleSprint)


export const SprintRoutes = router;
