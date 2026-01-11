import { Router } from 'express';

import { getAthlete } from './athlete.controller';

const router = Router();

router.get('/', getAthlete);

export default router;
