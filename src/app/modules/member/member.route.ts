import express from 'express';

import auth from '../../middlewares/auth';
import { USER_ROLE } from '../userNew/user.constant';
import { MemberControllers } from './member.controller';

const router = express.Router();

router.get('/', MemberControllers.getAllProjectMembers);

router.post(
  '/create',
  auth(USER_ROLE.admin),
  //validateRequest(createProductValidationSchema),
  MemberControllers.createMember,
);

export const MemberRoutes = router;
