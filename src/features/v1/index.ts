import { Router } from 'express';

import authRoute from '@/features/v1/auth/auth.route';

const router = Router();

const routes = [
  {
    path: '/auth',
    route: authRoute,
  },
];

routes.forEach(({ path, route }) => router.use(path, route));

export default router;
