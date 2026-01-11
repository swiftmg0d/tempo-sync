import { type Request, type Response } from 'express';

import { getActivitiesSummaryStats, getActivitySummaryById, getAthleteActivities } from './activity.service';

export const getActivities = async (req: Request<{ limit: number; page: number }>, res: Response) => {
	const page = Number(req.query.page) || 1;
	const limit = Number(req.query.limit) || 10;

	const activities = await getAthleteActivities(page, limit);

	res.send(activities).status(200);
};

export const getActivitySummary = async (req: Request<{ id: string }>, res: Response) => {
	const id = parseInt(req.params.id, 10);

	const activitySummary = await getActivitySummaryById(id);

	res.send({ ...activitySummary }).status(200);
};

export const getAllActivitiesSummary = async (_req: Request, res: Response) => {
	const activitiesSummary = await getActivitiesSummaryStats();

	res.send(activitiesSummary).status(200);
};
