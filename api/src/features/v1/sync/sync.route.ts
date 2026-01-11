import { Router } from 'express';

import { checkSyncState } from './sync.controller';

const router = Router();

router.get('/state', checkSyncState);

export default router;
