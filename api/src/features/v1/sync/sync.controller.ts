import { type Request, type Response } from 'express';

import { checkStatus } from './sync.service';

export const checkSyncState = async (req: Request, res: Response) => {
	const state = await checkStatus();

	res.json({
		state,
	});
};
