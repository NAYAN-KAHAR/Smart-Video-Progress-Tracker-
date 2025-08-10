
import getVideoInfo from '../Controllers/getVideoInfo.js';
import postVideoInfo from '../Controllers/postVideoInfo.js';

import { Router } from 'express'

const router = Router();

router.post('/', postVideoInfo);
router.get('/:userId/:videoId', getVideoInfo);


export default router;


// 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