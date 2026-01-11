import { RequestHandler, Router } from 'express';

import athleteRoute from '@/features/v1/athlete/athlete.route';
import authRoute from '@/features/v1/auth/auth.route';
import syncRoute from '@/features/v1/sync/sync.route';
import webhookRoute from '@/features/v1/webhook/webhook.route';
import proxyAuth from '@/middleware/proxy-auth.middleware';
import { Routes } from '@/types/auth.type';

import activityRoute from './activity/activity.route';

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
	{
		middleware: [proxyAuth],
		path: '/athlete',
		route: athleteRoute,
	},
	{
		middleware: [proxyAuth],
		path: '/activity',
		route: activityRoute,
	},
	{
		middleware: [proxyAuth],
		path: '/sync',
		route: syncRoute,
	},
];

routes.forEach(({ middleware, path, route }) => router.use(path, ...((middleware as RequestHandler[]) || []), route));

export default router;
