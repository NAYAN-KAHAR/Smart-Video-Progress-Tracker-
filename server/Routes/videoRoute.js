import { Router } from 'express';
const router = Router();

import postVideoInfo from '../Controllers/postVideoInfo.js';
import getVideoInfo from '../Controllers/getVideoInfo.js';
import getAllVideo from '../Controllers/getAllVideo.js'



// Existing routes
router.post('/', postVideoInfo);
router.get('/:userId/:videoId', getVideoInfo);
router.get('/allvideo', getAllVideo);
export default router;



// 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