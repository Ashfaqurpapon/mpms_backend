import express from 'express';

import auth from '../../middlewares/auth';
import { USER_ROLE } from '../userNew/user.constant';
import { ProjectControllers } from './project.controller';

const router = express.Router();

router.get('/', ProjectControllers.getAllProjects);
// router.get(
//   '/allProduct',
//   auth(USER_ROLE.admin),
//   ProductControllers.getAllProductsByAdmin,
// );
// router.get(
//   '/LeafCategoryProduct',
//   ProductControllers.getAllProductsInLeafCategory,
// );

router.post(
  '/create',
  auth(USER_ROLE.admin),
  //validateRequest(createProductValidationSchema),
  ProjectControllers.createProject,
);
router.get(
  '/myProject',
  //   auth(USER_ROLE.admin),
  ProjectControllers.getMyProjects,
);
router.get(
  '/:projectId',
  //   auth(USER_ROLE.admin),
  ProjectControllers.getSingleProject,
);


export const ProjectRoutes = router;
