import { Router } from 'express';

import authRoute from '@/features/v1/auth/auth.route';
import webhookRoute from '@/features/v1/webhook/webhook.route';
import { Routes } from '@/types/auth.type';

const router = Router();

const routes: Routes[] = [
	{
		path: '/auth',
		route: authRoute,
	},
	{
		path: '/webhook',
		route: webhookRoute,
	},
];

routes.forEach(({ path, route }) => router.use(path, route));

export default router;
