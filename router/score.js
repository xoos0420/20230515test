import express from 'express';
import * as scoreController from '../controller/score.js';

const router = express.Router();

router.get('/', scoreController.GetScoreAll);
router.post('/', scoreController.CreateScore);
router.put('/:score_idx', scoreController.UpdateScore);
router.delete('/:score_idx', scoreController.DeleteScore);

export default router;
