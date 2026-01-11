import { type Request, type Response } from 'express';

import { getAthleteProfile } from './athlete.service';

export const getAthlete = async (_req: Request, res: Response) => {
	const athlete = await getAthleteProfile();
	res.send({ athlete }).status(200);
};
