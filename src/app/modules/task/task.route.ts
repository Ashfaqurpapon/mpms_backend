import express from 'express';

import auth from '../../middlewares/auth';
import { USER_ROLE } from '../userNew/user.constant';
import { TaskController } from './task.controller';
const router = express.Router();

router.get('/', TaskController.getAllTask);
router.post(
  '/create',
   auth(USER_ROLE.admin),
  TaskController.createTask,
);


export const TaskRoutes = router;
