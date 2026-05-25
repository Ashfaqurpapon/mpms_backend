import { Router } from 'express';

import { AuthRoutes } from '../authModule/auth.routes';
import { userRoutes } from '../modules/userNew/userRoutes';
import { ProjectRoutes } from '../modules/project/project.route';
import { SprintRoutes } from '../modules/sprint/sprint.route';
import { MemberRoutes } from '../modules/member/member.route';
import { TaskRoutes } from '../modules/task/task.route';



const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/user',
    route: userRoutes,
  },

  {
    path: '/project',
    route: ProjectRoutes,
  },
  {
    path: '/sprint',
    route: SprintRoutes,
  },
  {
    path: '/member',
    route: MemberRoutes,
  },
  {
    path: '/task',
    route: TaskRoutes,
  },


];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
